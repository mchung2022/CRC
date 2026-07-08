import requests
import json
import os

def fetch_osm_data():
    cache_file = "ntnu_osm_data.json"
    
    if os.path.exists(cache_file):
        print("Loading data from local cache...")
        with open(cache_file, "r", encoding="utf-8") as f:
            return json.load(f)
            
    print("Fetching data from OpenStreetMap Overpass API...")
    bbox = "25.024,121.524,25.0285,121.531"
    
    overpass_query = f"""
    [out:json][timeout:60];
    (
      way["building"]({bbox});
      relation["building"]({bbox});
      way["highway"]({bbox});
      way["leisure"]({bbox});
      way["landuse"]({bbox});
      way["sport"]({bbox});
      way["amenity"="university"]({bbox});
      relation["amenity"="university"]({bbox});
    );
    out body;
    >;
    out skel qt;
    """
    
    url = "https://overpass-api.de/api/interpreter"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://overpass-api.de/"
    }
    
    # Overpass expects raw query string in the 'data' parameter, let's send it as standard form data or params
    try:
        response = requests.post(url, data={"data": overpass_query}, headers=headers, timeout=60)
        if response.status_code == 200:
            data = response.json()
            with open(cache_file, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print("Data fetched and saved to cache.")
            return data
        else:
            print(f"Error fetching data: {response.status_code}")
            print(response.text[:500])
    except Exception as e:
        print(f"Exception during request: {e}")
        
    # If overpass-api.de is failing, let's try another public Overpass instance
    print("Trying backup Overpass API server...")
    backup_urls = [
        "https://overpass.kumi.systems/api/interpreter",
        "https://overpass.osm.ch/api/interpreter",
        "https://overpass.nchc.org.tw/api/interpreter"  # Taiwan local instance! Very good!
    ]
    
    for backup_url in backup_urls:
        print(f"Trying backup: {backup_url}")
        try:
            response = requests.post(backup_url, data={"data": overpass_query}, headers=headers, timeout=30)
            if response.status_code == 200:
                data = response.json()
                with open(cache_file, "w", encoding="utf-8") as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                print(f"Data fetched from {backup_url} and saved to cache.")
                return data
            else:
                print(f"Backup server {backup_url} returned code: {response.status_code}")
        except Exception as e:
            print(f"Exception during request to {backup_url}: {e}")
            
    return None

if __name__ == "__main__":
    data = fetch_osm_data()
    if data:
        print(f"Elements fetched: {len(data.get('elements', []))}")
        types = {}
        for elem in data.get('elements', []):
            types[elem['type']] = types.get(elem['type'], 0) + 1
        print("Element types:", types)
