import json

with open("ntnu_osm_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

elements = data.get("elements", [])
print(f"Total elements: {len(elements)}")

# Find elements with tags and see what they are
tagged_ways = []
for elem in elements:
    if elem.get("type") == "way" and "tags" in elem:
        tagged_ways.append(elem)

print(f"Tagged ways: {len(tagged_ways)}")

# Print some of the buildings with names
print("\nSome named buildings:")
building_count = 0
for way in tagged_ways:
    tags = way.get("tags", {})
    if "building" in tags:
        building_count += 1
        name = tags.get("name")
        name_zh = tags.get("name:zh")
        name_en = tags.get("name:en")
        if name or name_zh or name_en:
            print(f"Way {way['id']}: {name or name_zh or name_en} (Building type: {tags.get('building')})")

# Print some of the highways/roads
print("\nSome highways/roads:")
road_types = {}
for way in tagged_ways:
    tags = way.get("tags", {})
    if "highway" in tags:
        h_type = tags.get("highway")
        road_types[h_type] = road_types.get(h_type, 0) + 1
        name = tags.get("name")
        if name:
            print(f"Way {way['id']}: {name} ({h_type})")

print("\nHighway types count:", road_types)

# Print leisure/landuse
print("\nLeisure/Landuse elements:")
for way in tagged_ways:
    tags = way.get("tags", {})
    for key in ["leisure", "landuse", "sport"]:
        if key in tags:
            print(f"Way {way['id']}: {tags.get(key)} - {tags.get('name', 'unnamed')}")
