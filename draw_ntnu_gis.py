import json
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon
import matplotlib.patheffects as path_effects
import os

# Configure matplotlib for Chinese rendering on Windows
plt.rcParams['font.sans-serif'] = ['Microsoft JhengHei', 'Microsoft YaHei', 'DFKai-SB', 'MingLiU', 'sans-serif']
plt.rcParams['axes.unicode_minus'] = False  # Correct rendering of negative signs on coordinates

def load_data(filepath="ntnu_osm_data.json"):
    if not os.path.exists(filepath):
        print(f"Error: {filepath} not found.")
        return None
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)

def calculate_centroid(coords):
    # coords is a list of (lon, lat)
    x = [c[0] for c in coords[:-1]]
    y = [c[1] for c in coords[:-1]]
    if not x:
        return (0, 0)
    return (sum(x) / len(x), sum(y) / len(y))

def draw_map():
    data = load_data()
    if not data:
        return
        
    elements = data.get("elements", [])
    
    # 1. Parse Nodes
    nodes = {}
    for elem in elements:
        if elem["type"] == "node":
            nodes[elem["id"]] = (elem["lon"], elem["lat"])
            
    # 2. Parse Ways
    ways = []
    for elem in elements:
        if elem["type"] == "way":
            w_nodes = elem.get("nodes", [])
            coords = [nodes[nid] for nid in w_nodes if nid in nodes]
            if coords:
                ways.append({
                    "id": elem["id"],
                    "coords": coords,
                    "tags": elem.get("tags", {})
                })
                
    # 3. Define Categorization Rules & Colors
    # Theme: Modern dark digital theme
    colors = {
        "bg": "#0f172a",             # Slate-900
        "campus_ground": "#1e293b",  # Slate-800
        "building_ntnu": "#0284c7",  # Sky-600
        "building_other": "#334155", # Slate-700
        "greenery": "#065f46",       # Emerald-800
        "grass": "#065f46",
        "sport_pitch": "#115e59",    # Teal-800
        "sport_track": "#991b1b",    # Red-800 (Athletic track)
        "water": "#0369a1",          # Sky-700
        "road_major_case": "#1e293b",# Road border
        "road_major": "#475569",     # Major roads
        "road_minor": "#334155",     # Minor roads
        "road_footway": "#475569",   # Footpaths/internal paths (dashed)
        "text_main": "#f8fafc",      # Slate-50
        "text_accent": "#38bdf8"     # Sky-300
    }
    
    # Bounding Box for Heping Main Campus (I & II)
    # longitude: 121.525 to 121.5305
    # latitude: 25.0245 to 25.0285
    min_lon, max_lon = 121.5245, 121.5305
    min_lat, max_lat = 25.0245, 25.0285
    
    fig, ax = plt.subplots(figsize=(15, 12), facecolor=colors["bg"])
    ax.set_facecolor(colors["bg"])
    
    # Prioritized layering
    # Layer 1: Campus boundary and grounds
    # Layer 2: Greenery and parks
    # Layer 3: Sports facilities (Track, pitches, swimming pool)
    # Layer 4: Roads and paths
    # Layer 5: Buildings (Other, then NTNU)
    # Layer 6: Text labels
    
    campus_ways = []
    green_ways = []
    sport_ways = []
    water_ways = []
    major_roads = []
    minor_roads = []
    footways = []
    ntnu_buildings = []
    other_buildings = []
    
    for w in ways:
        tags = w["tags"]
        # Skip objects entirely outside our display bounding box
        coords = np.array(w["coords"])
        lons, lats = coords[:, 0], coords[:, 1]
        if np.max(lons) < min_lon or np.min(lons) > max_lon or np.max(lats) < min_lat or np.min(lats) > max_lat:
            continue
            
        # Categorize
        if tags.get("amenity") == "university":
            campus_ways.append(w)
        elif "building" in tags:
            # Check if it's an NTNU building
            is_ntnu = False
            name = tags.get("name", "") + tags.get("name:zh", "") + tags.get("name:en", "")
            operator = tags.get("operator", "")
            brand = tags.get("brand", "")
            
            # Key NTNU buildings
            ntnu_keywords = ["師範大學", "師大", "ntnu", "國立台灣師範大學", "校本部", "圖書館校區"]
            building_names = ["教育大樓", "誠正大樓", "理學大樓", "禮堂", "行政大樓", "體育館", "圖書館", 
                              "綜合大樓", "博愛樓", "科技大樓", "機械大樓", "女一舍", "女二舍", "男一舍", 
                              "學生宿舍", "樂群堂", "樂智樓", "文學院", "音樂系", "美術系", "普字樓"]
            
            if any(k in name.lower() or k in operator.lower() or k in brand.lower() for k in ntnu_keywords):
                is_ntnu = True
            elif any(bn in name for bn in building_names):
                is_ntnu = True
            elif tags.get("building") == "university" and ("name" in tags or "name:zh" in tags):
                is_ntnu = True
                
            if is_ntnu:
                ntnu_buildings.append(w)
            else:
                other_buildings.append(w)
        elif "highway" in tags:
            h_type = tags.get("highway")
            if h_type in ["primary", "secondary", "tertiary"]:
                major_roads.append(w)
            elif h_type in ["footway", "path", "steps", "pedestrian"]:
                footways.append(w)
            else:
                minor_roads.append(w)
        elif tags.get("leisure") in ["park", "garden"] or tags.get("landuse") in ["grass", "forest", "meadow"]:
            green_ways.append(w)
        elif tags.get("leisure") in ["pitch", "track"] or "sport" in tags:
            sport_ways.append(w)
        elif tags.get("natural") == "water" or tags.get("water") or tags.get("leisure") == "swimming_pool":
            water_ways.append(w)

    print(f"Categorized: {len(campus_ways)} campus grounds, {len(green_ways)} greenery, {len(sport_ways)} sports, "
          f"{len(major_roads)} major roads, {len(minor_roads)} minor roads, {len(footways)} footpaths, "
          f"{len(ntnu_buildings)} NTNU buildings, {len(other_buildings)} other buildings.")

    # --- Plotting ---
    
    # 1. Campus Grounds
    # (Sometimes campus boundary is defined as relation, but we plot university-tagged ways here)
    for w in campus_ways:
        poly = Polygon(w["coords"], closed=True, facecolor=colors["campus_ground"], edgecolor="none", alpha=0.5, zorder=1)
        ax.add_patch(poly)
        
    # Manually define NTNU campus polygons if OSM lacks direct polygon representation
    # 校本部 (Heping Campus I): south of Heping East Road, east of Shida Road
    hq1_coords = [
        (121.5268, 25.0264), (121.5284, 25.0264), (121.5286, 25.0248), 
        (121.5273, 25.0248), (121.5268, 25.0252)
    ]
    # 圖書館校區 (Heping Campus II): north of Heping East Road, east of Lishui Road
    hq2_coords = [
        (121.5270, 25.0269), (121.5292, 25.0269), (121.5292, 25.0282), 
        (121.5270, 25.0282)
    ]
    for coords, name in [(hq1_coords, "校本部"), (hq2_coords, "圖書館校區")]:
        poly = Polygon(coords, closed=True, facecolor=colors["campus_ground"], edgecolor="#38bdf8", 
                       linewidth=1.5, linestyle="--", alpha=0.4, zorder=1.5)
        ax.add_patch(poly)
        # Add labels for campus areas
        centroid = calculate_centroid(coords)
        txt = ax.text(centroid[0], centroid[1] - 0.0003 if name=="校本部" else centroid[1] + 0.0004, 
                      f"國立臺灣師範大學\n【{name}】", color="#e2e8f0", fontsize=13, fontweight="bold",
                      ha="center", va="center", zorder=6, alpha=0.8)
        txt.set_path_effects([path_effects.withStroke(linewidth=3, foreground=colors["bg"])])

    # 2. Greenery & Parks
    for w in green_ways:
        poly = Polygon(w["coords"], closed=True, facecolor=colors["greenery"], edgecolor="none", alpha=0.6, zorder=2)
        ax.add_patch(poly)
        
    # 3. Sports Fields
    for w in sport_ways:
        sport_type = w["tags"].get("sport", "")
        leisure_type = w["tags"].get("leisure", "")
        
        # Color athletic track red, and pitches teal
        if leisure_type == "track" or sport_type in ["athletics", "running"]:
            color = colors["sport_track"]
        else:
            color = colors["sport_pitch"]
            
        poly = Polygon(w["coords"], closed=True, facecolor=color, edgecolor="#475569", linewidth=0.5, alpha=0.8, zorder=3)
        ax.add_patch(poly)
        
    # 4. Water
    for w in water_ways:
        poly = Polygon(w["coords"], closed=True, facecolor=colors["water"], edgecolor="#0284c7", linewidth=0.5, zorder=3.5)
        ax.add_patch(poly)

    # 5. Roads & Paths
    # Plot footpaths (thin dashed)
    for w in footways:
        x = [c[0] for c in w["coords"]]
        y = [c[1] for c in w["coords"]]
        ax.plot(x, y, color=colors["road_footway"], linewidth=1.0, linestyle=":", zorder=4, alpha=0.6)
        
    # Plot minor roads
    for w in minor_roads:
        x = [c[0] for c in w["coords"]]
        y = [c[1] for c in w["coords"]]
        ax.plot(x, y, color=colors["road_minor"], linewidth=2.0, zorder=4.2, alpha=0.8)
        
    # Plot major roads with double line styling (outline casing + main line)
    for w in major_roads:
        x = [c[0] for c in w["coords"]]
        y = [c[1] for c in w["coords"]]
        # Casing
        ax.plot(x, y, color=colors["road_major_case"], linewidth=7.0, zorder=4.5)
        # Main line
        ax.plot(x, y, color=colors["road_major"], linewidth=5.0, zorder=4.7)
        
        # Draw labels for main roads
        road_name = w["tags"].get("name", "")
        if road_name and "和平東路" in road_name:
            # Add label at center of Heping East Road
            mid_idx = len(x) // 2
            txt = ax.text(x[mid_idx], y[mid_idx] + 0.00008, "和平東路一段 (Heping E. Rd. Sec. 1)", 
                          color="#94a3b8", fontsize=10, fontstyle="italic", ha="center", va="center", zorder=4.9)
            txt.set_path_effects([path_effects.withStroke(linewidth=2, foreground=colors["bg"])])
        elif road_name and "師大路" in road_name:
            mid_idx = len(x) // 2
            txt = ax.text(x[mid_idx] - 0.0001, y[mid_idx], "師大路 (Shida Rd.)", 
                          color="#94a3b8", fontsize=10, fontstyle="italic", rotation=90, ha="center", va="center", zorder=4.9)
            txt.set_path_effects([path_effects.withStroke(linewidth=2, foreground=colors["bg"])])

    # 6. Other Buildings
    for w in other_buildings:
        poly = Polygon(w["coords"], closed=True, facecolor=colors["building_other"], edgecolor="#475569", linewidth=0.5, alpha=0.7, zorder=5)
        ax.add_patch(poly)

    # 7. NTNU Buildings (High contrast, labeled)
    for w in ntnu_buildings:
        poly = Polygon(w["coords"], closed=True, facecolor=colors["building_ntnu"], edgecolor="#0ea5e9", linewidth=1.2, zorder=5.5)
        ax.add_patch(poly)
        
        # Calculate centroid for text labels
        centroid = calculate_centroid(w["coords"])
        
        name = w["tags"].get("name:zh") or w["tags"].get("name")
        if name:
            # Clean name for presentation
            clean_name = name.replace("國立臺灣師範大學", "").replace("校本部", "").replace("圖書館校區", "").strip()
            # If name is too long, insert newlines or skip very generic names
            if len(clean_name) > 6:
                clean_name = clean_name[:4] + "\n" + clean_name[4:]
            
            # Draw building text
            txt = ax.text(centroid[0], centroid[1], clean_name, color=colors["text_main"], fontsize=9.5, fontweight="bold",
                          ha="center", va="center", zorder=7)
            txt.set_path_effects([path_effects.withStroke(linewidth=3, foreground=colors["bg"])])

    # 8. Set Plot Limits & Aesthetics
    ax.set_xlim(min_lon, max_lon)
    ax.set_ylim(min_lat, max_lat)
    
    # Hide grid and coordinate axes ticks
    ax.set_xticks([])
    ax.set_yticks([])
    for spine in ax.spines.values():
        spine.set_visible(False)
        
    # --- Map decorations ---
    # Draw Scale Bar
    # 1 degree longitude at latitude 25 is approx 100.7 km (100700 meters)
    # 0.001 degree lon is approx 100.7 meters.
    # Let's draw a 100m scale bar at the bottom right.
    scale_y = min_lat + 0.0003
    scale_x_start = max_lon - 0.0015
    scale_x_end = scale_x_start + (100.0 / 100700.0) # 100m in degrees lon
    
    ax.plot([scale_x_start, scale_x_end], [scale_y, scale_y], color=colors["text_main"], linewidth=3, zorder=8)
    ax.plot([scale_x_start, scale_x_start], [scale_y - 0.00005, scale_y + 0.00005], color=colors["text_main"], linewidth=2, zorder=8)
    ax.plot([scale_x_end, scale_x_end], [scale_y - 0.00005, scale_y + 0.00005], color=colors["text_main"], linewidth=2, zorder=8)
    
    ax.text((scale_x_start + scale_x_end)/2, scale_y + 0.00008, "100 m", color=colors["text_main"], 
            fontsize=10, fontweight="bold", ha="center", va="bottom", zorder=8)
            
    # Draw Compass Rose (North Arrow)
    arrow_x = min_lon + 0.0005
    arrow_y = max_lat - 0.0005
    ax.annotate("N", xy=(arrow_x, arrow_y + 0.0002), xytext=(arrow_x, arrow_y - 0.0002),
                arrowprops=dict(facecolor=colors["text_accent"], edgecolor=colors["text_accent"], width=3, headwidth=10, shrink=0.05),
                color=colors["text_accent"], fontsize=12, fontweight="bold", ha="center", va="top", zorder=8)
    
    # Title & Legend Block
    title_box = dict(boxstyle="round,pad=0.8", facecolor="#1e293b", edgecolor="#0ea5e9", linewidth=1.5, alpha=0.9)
    ax.text(min_lon + 0.0004, min_lat + 0.0003, 
            "國立臺灣師範大學 (NTNU) 主校區地景圖\n"
            "【和平校區本部 與 圖書館校區】\n\n"
            "■ 師大校區建築 (University Buildings)\n"
            "■ 社區住宅/商業大樓 (Other Buildings)\n"
            "■ 操場/體育設施 (Sports Fields & Track)\n"
            "■ 綠地及公園景觀 (Parks & Greenery)", 
            color=colors["text_main"], fontsize=11, fontweight="medium", 
            ha="left", va="bottom", bbox=title_box, zorder=8)
            
    # Legend color patches in title text (custom colored squares can be simulated or we use manual rectangles)
    # The text already aligns nicely and labels tell the story.
    
    # Metadata footer
    ax.text(max_lon - 0.0002, min_lat + 0.0001, "資料來源: OpenStreetMap | 繪製: Python & Matplotlib GIS", 
            color="#64748b", fontsize=8, ha="right", va="bottom", zorder=8)

    plt.tight_layout()
    
    # Save Image
    output_filename = "ntnu_main_campus_landscape.png"
    plt.savefig(output_filename, dpi=300, bbox_inches='tight', facecolor=colors["bg"])
    plt.close()
    
    print(f"Map successfully rendered and saved to {output_filename}")

if __name__ == "__main__":
    draw_map()
