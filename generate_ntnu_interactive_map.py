import json
import os

def load_osm_data(filepath="ntnu_osm_data.json"):
    if not os.path.exists(filepath):
        print(f"Error: {filepath} not found.")
        return None
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)

def generate_geojson():
    data = load_osm_data()
    if not data:
        return None
        
    elements = data.get("elements", [])
    
    # 1. Parse Nodes
    nodes = {}
    for elem in elements:
        if elem["type"] == "node":
            nodes[elem["id"]] = (elem["lon"], elem["lat"])
            
    # 2. Convert Ways to GeoJSON Features
    features = []
    
    # Campus boundary markers or areas
    for elem in elements:
        if elem["type"] == "way":
            w_nodes = elem.get("nodes", [])
            coords = [nodes[nid] for nid in w_nodes if nid in nodes]
            if not coords:
                continue
                
            tags = elem.get("tags", {})
            
            # Categorize the feature type
            feature_type = "unknown"
            if "building" in tags:
                # Determine if it's NTNU
                name = tags.get("name", "") + tags.get("name:zh", "") + tags.get("name:en", "")
                operator = tags.get("operator", "")
                
                is_ntnu = False
                ntnu_keywords = ["師範大學", "師大", "ntnu", "國立台灣師範大學", "校本部", "圖書館校區"]
                building_names = ["教育大樓", "誠正大樓", "理學大樓", "禮堂", "行政大樓", "體育館", "圖書館", 
                                  "綜合大樓", "博愛樓", "科技大樓", "機械大樓", "女一舍", "女二舍", "男一舍", 
                                  "學生宿舍", "樂群堂", "樂智樓", "文學院", "音樂系", "美術系", "普字樓"]
                
                if any(k in name.lower() or k in operator.lower() for k in ntnu_keywords):
                    is_ntnu = True
                elif any(bn in name for bn in building_names):
                    is_ntnu = True
                elif tags.get("building") == "university" and ("name" in tags or "name:zh" in tags):
                    is_ntnu = True
                    
                feature_type = "building_ntnu" if is_ntnu else "building_other"
            elif "highway" in tags:
                feature_type = "road"
            elif tags.get("leisure") in ["park", "garden"] or tags.get("landuse") in ["grass", "forest", "meadow"]:
                feature_type = "greenery"
            elif tags.get("leisure") in ["pitch", "track"] or "sport" in tags:
                # Track is red, pitch is teal
                if tags.get("leisure") == "track" or tags.get("sport") in ["athletics", "running"]:
                    feature_type = "sport_track"
                else:
                    feature_type = "sport_pitch"
            elif tags.get("natural") == "water" or tags.get("water") or tags.get("leisure") == "swimming_pool":
                feature_type = "water"
            elif tags.get("amenity") == "university":
                feature_type = "campus_ground"
                
            # Create GeoJSON Geometry
            # If start and end node are same, it is a Polygon, else LineString
            if coords[0] == coords[-1] and len(coords) >= 4:
                geometry = {
                    "type": "Polygon",
                    "coordinates": [coords]  # Outer ring
                }
            else:
                geometry = {
                    "type": "LineString",
                    "coordinates": coords
                }
                
            feature = {
                "type": "Feature",
                "geometry": geometry,
                "properties": {
                    "id": elem["id"],
                    "name": tags.get("name:zh") or tags.get("name") or tags.get("name:en") or "未命名地標",
                    "type": feature_type,
                    "tags": tags
                }
            }
            features.append(feature)
            
    geojson = {
        "type": "FeatureCollection",
        "features": features
    }
    return geojson

def write_interactive_map():
    geojson = generate_geojson()
    if not geojson:
        return
        
    geojson_str = json.dumps(geojson, ensure_ascii=False)
    
    html_content = f"""<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>國立臺灣師範大學 (NTNU) 主校區互動地景圖</title>
  
  <!-- Leaflet CSS & JS from CDN -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
  
  <style>
    body, html {{
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans TC", sans-serif;
      background-color: #0f172a;
      color: #f8fafc;
      overflow: hidden;
    }}
    
    #map {{
      width: 100%;
      height: 100%;
      z-index: 1;
    }}
    
    /* Control panels */
    .info-panel {{
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 1000;
      background: rgba(15, 23, 42, 0.95);
      border: 1.5px solid #0ea5e9;
      border-radius: 12px;
      padding: 20px;
      max-width: 320px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(8px);
    }}
    
    .info-panel h2 {{
      margin-top: 0;
      font-size: 1.25rem;
      color: #38bdf8;
      border-bottom: 1px solid #334155;
      padding-bottom: 8px;
    }}
    
    .info-panel p {{
      font-size: 0.9rem;
      line-height: 1.5;
      color: #94a3b8;
    }}
    
    .legend-item {{
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      font-size: 0.85rem;
    }}
    
    .legend-color {{
      width: 16px;
      height: 16px;
      border-radius: 4px;
      margin-right: 10px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }}
    
    /* Leaflet popup customization */
    .leaflet-popup-content-wrapper {{
      background: #1e293b !important;
      color: #f8fafc !important;
      border: 1px solid #38bdf8 !important;
      border-radius: 8px !important;
    }}
    
    .leaflet-popup-tip {{
      background: #1e293b !important;
      border-left: 1px solid #38bdf8 !important;
      border-bottom: 1px solid #38bdf8 !important;
    }}
    
    .popup-title {{
      font-weight: bold;
      font-size: 0.95rem;
      color: #38bdf8;
      margin-bottom: 4px;
    }}
    
    .popup-desc {{
      font-size: 0.8rem;
      color: #cbd5e1;
    }}
    
    .back-btn {{
      position: absolute;
      bottom: 20px;
      left: 20px;
      z-index: 1000;
      background: #0284c7;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      text-decoration: none;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.4);
      transition: all 0.2s ease;
    }}
    
    .back-btn:hover {{
      background: #0ea5e9;
      transform: translateY(-2px);
    }}
  </style>
</head>
<body>

  <div id="map"></div>
  
  <div class="info-panel">
    <h2>臺師大主校區互動地景圖</h2>
    <p>結合 Python GIS 解析 OpenStreetMap 地理資訊系統數據繪製，呈現和平校區校本部與圖書館校區地景分佈。</p>
    
    <div style="margin-top: 15px; border-top: 1px solid #334155; padding-top: 12px;">
      <div class="legend-item">
        <div class="legend-color" style="background: #0284c7; border-color: #38bdf8;"></div>
        <span>師大校區建築 (NTNU Buildings)</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #334155; border-color: #475569;"></div>
        <span>社區住宅與一般大樓 (Others)</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #991b1b; border-color: #ef4444;"></div>
        <span>運動場跑道 (Athletic Track)</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #115e59; border-color: #14b8a6;"></div>
        <span>體育場球場 (Sports Pitches)</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #065f46; border-color: #059669;"></div>
        <span>綠地、植被與公園 (Greenery)</span>
      </div>
    </div>
  </div>
  
  <a href="index.html" class="back-btn">← 回到主簡報系統</a>

  <script>
    // Initialize map centered at NTNU main campus
    const map = L.map('map', {{
      center: [25.0265, 121.5278],
      zoom: 17,
      minZoom: 16,
      maxZoom: 19
    }});

    // Load CartoDB Dark Matter tile layer for a premium dark styling
    L.tileLayer('https://{{s}}.basemaps.cartocdn.com/dark_all/{{z}}/{{x}}/{{y}}{{r}}.png', {{
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }}).addTo(map);

    // Dynamic GeoJSON Data
    const geojsonData = {geojson_str};

    // Styling rules based on features
    function getFeatureStyle(feature) {{
      const type = feature.properties.type;
      switch (type) {{
        case 'building_ntnu':
          return {{
            fillColor: '#0284c7',
            fillOpacity: 0.75,
            color: '#38bdf8',
            weight: 1.5,
            opacity: 1
          }};
        case 'building_other':
          return {{
            fillColor: '#334155',
            fillOpacity: 0.5,
            color: '#475569',
            weight: 0.5,
            opacity: 0.6
          }};
        case 'greenery':
          return {{
            fillColor: '#065f46',
            fillOpacity: 0.6,
            color: '#059669',
            weight: 0,
            opacity: 0
          }};
        case 'sport_track':
          return {{
            fillColor: '#991b1b',
            fillOpacity: 0.7,
            color: '#ef4444',
            weight: 1,
            opacity: 0.8
          }};
        case 'sport_pitch':
          return {{
            fillColor: '#115e59',
            fillOpacity: 0.75,
            color: '#14b8a6',
            weight: 0.5,
            opacity: 0.8
          }};
        case 'water':
          return {{
            fillColor: '#0369a1',
            fillOpacity: 0.8,
            color: '#0ea5e9',
            weight: 0.5,
            opacity: 1
          }};
        case 'road':
          return {{
            color: feature.properties.tags.highway === 'primary' || feature.properties.tags.highway === 'secondary' ? '#475569' : '#334155',
            weight: feature.properties.tags.highway === 'primary' || feature.properties.tags.highway === 'secondary' ? 4 : 2,
            opacity: 0.8
          }};
        case 'campus_ground':
          return {{
            fillColor: '#1e293b',
            fillOpacity: 0.2,
            color: '#0ea5e9',
            weight: 1.5,
            dashArray: '5, 5',
            opacity: 0.7
          }};
        default:
          return {{
            fillColor: '#475569',
            fillOpacity: 0.2,
            color: '#64748b',
            weight: 1,
            opacity: 0.5
          }};
      }}
    }}

    // Interactivity
    function onEachFeature(feature, layer) {{
      const props = feature.properties;
      const type = props.type;
      
      // Bind popups to buildings and facilities
      if (type.startsWith('building_ntnu') || type.startsWith('sport') || type === 'water') {{
        let popupContent = `<div class="popup-title">${{props.name}}</div>`;
        
        if (props.tags.building) {{
          popupContent += `<div class="popup-desc">地標類型：校區大樓 (${{props.tags.building}})</div>`;
        }} else if (props.tags.leisure) {{
          popupContent += `<div class="popup-desc">體育設施：${{props.tags.leisure}} (${{props.tags.sport || '綜合'}})</div>`;
        }}
        
        layer.bindPopup(popupContent);
        
        // Highlight on hover
        layer.on({{
          mouseover: function(e) {{
            const l = e.target;
            l.setStyle({{
              fillOpacity: 0.9,
              weight: 2.5,
              color: '#38bdf8'
            }});
            l.openTooltip();
          }},
          mouseout: function(e) {{
            geoJsonLayer.resetStyle(e.target);
            e.target.closeTooltip();
          }}
        }});
        
        // Add simple tooltip for quick hover identification
        layer.bindTooltip(props.name, {{
          permanent: false,
          direction: 'center',
          className: 'leaflet-tooltip-own'
        }});
      }}
    }}

    // Draw GeoJSON layer
    const geoJsonLayer = L.geoJSON(geojsonData, {{
      style: getFeatureStyle,
      onEachFeature: onEachFeature
    }}).addTo(map);

    // Draw manual campus dashed polygons to emphasize 校本部 and 圖書館校區
    const hq1 = L.polygon([
      [25.0264, 121.5268], [25.0264, 121.5284], [25.0248, 121.5286], 
      [25.0248, 121.5273], [25.0252, 121.5268]
    ], {{
      color: '#0ea5e9',
      weight: 1.5,
      dashArray: '5, 5',
      fillColor: '#1e293b',
      fillOpacity: 0.15,
      interactive: false
    }}).addTo(map);
    
    const hq2 = L.polygon([
      [25.0269, 121.5270], [25.0269, 121.5292], [25.0282, 121.5292], 
      [25.0282, 121.5270]
    ], {{
      color: '#0ea5e9',
      weight: 1.5,
      dashArray: '5, 5',
      fillColor: '#1e293b',
      fillOpacity: 0.15,
      interactive: false
    }}).addTo(map);

  </script>
</body>
</html>
"""
    
    output_filename = "ntnu_interactive_map.html"
    with open(output_filename, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Interactive map successfully generated and saved to {output_filename}")

if __name__ == "__main__":
    write_interactive_map()
