import xml.etree.ElementTree as ET
import sys

try:
    # Parse the XML file
    tree = ET.parse('Northwatch_Wardens.xml')
    root = tree.getroot()
    
    print("✓ XML is well-formed and valid!")
    print(f"\nRoot element: <{root.tag}>")
    print(f"Version attribute: {root.get('version')}")
    
    # Check for campaign element
    campaign = root.find('campaign')
    if campaign is None:
        print("✗ ERROR: No <campaign> element found!")
        sys.exit(1)
    
    # Get campaign name
    campaign_name = campaign.find('name')
    if campaign_name is not None:
        print(f"Campaign name: {campaign_name.text}")
    
    # Count elements
    npcs = campaign.findall('npc')
    adventures = campaign.findall('adventure')
    
    print(f"\n✓ Number of NPCs: {len(npcs)}")
    print(f"✓ Number of adventures: {len(adventures)}")
    
    # Check for required Game Master 5e structure
    print("\n--- Validating Game Master 5e XML Format ---")
    
    if root.tag != 'data':
        print(f"✗ ERROR: Root element should be <data>, found <{root.tag}>")
        sys.exit(1)
    else:
        print("✓ Root element is <data>")
    
    if root.get('version') != '5':
        print(f"✗ ERROR: Version should be '5', found '{root.get('version')}'")
        sys.exit(1)
    else:
        print("✓ Version is '5' (Game Master 5e format)")
    
    # Validate NPC UIDs are unique
    uids = []
    duplicate_uids = []
    for npc in npcs:
        uid_elem = npc.find('uid')
        if uid_elem is not None:
            uid = uid_elem.text
            if uid in uids:
                duplicate_uids.append(uid)
            uids.append(uid)
    
    if duplicate_uids:
        print(f"✗ WARNING: Duplicate NPC UIDs found: {set(duplicate_uids)}")
    else:
        print(f"✓ All {len(uids)} NPC UIDs are unique")
    
    # Check UID range
    if uids:
        uid_numbers = [int(uid) for uid in uids if uid.isdigit()]
        if uid_numbers:
            print(f"✓ NPC UID range: {min(uid_numbers)} to {max(uid_numbers)}")
    
    # Validate adventures have UIDs
    adventure_uids = []
    for adv in adventures:
        uid_elem = adv.find('uid')
        if uid_elem is not None:
            adventure_uids.append(uid_elem.text)
    
    print(f"✓ Adventures with UIDs: {len(adventure_uids)}")
    
    # Sample validation of nested encounters
    encounter_count = 0
    combatant_count = 0
    for adv in adventures:
        encounters = adv.findall('.//encounter')
        encounter_count += len(encounters)
        for enc in encounters:
            combatants = enc.findall('combatant')
            combatant_count += len(combatants)
    
    if encounter_count > 0:
        print(f"✓ Total encounters across adventures: {encounter_count}")
        print(f"✓ Total combatants in encounters: {combatant_count}")
    
    print("\n✅ XML validation complete! File is valid Game Master 5e XML format.")
    
except ET.ParseError as e:
    print(f"✗ XML Parse Error: {e}")
    sys.exit(1)
except FileNotFoundError:
    print("✗ File not found: Northwatch_Wardens.xml")
    sys.exit(1)
except Exception as e:
    print(f"✗ Unexpected error: {e}")
    sys.exit(1)
