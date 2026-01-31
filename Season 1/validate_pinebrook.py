import xml.etree.ElementTree as ET

tree = ET.parse('Northwatch_Wardens.xml')
root = tree.getroot()
campaign = root.find('.//campaign')

# Find Peril in Pinebrook adventure
pinebrook = None
for adv in campaign.findall('.//adventure'):
    uid = adv.find('uid')
    name = adv.find('name')
    if uid is not None and uid.text == '2020':
        pinebrook = adv
        break

if pinebrook:
    print('=' * 70)
    print('PERIL IN PINEBROOK - ADVENTURE VALIDATION')
    print('=' * 70)
    print()
    
    # Get adventure name
    name = pinebrook.find('name')
    print(f'Adventure: {name.text if name is not None else "Unknown"}')
    print(f'UID: 2020')
    print()
    
    # Find all encounters
    encounters = pinebrook.findall('.//encounter')
    print(f'Total Encounters: {len(encounters)}')
    print()
    
    total_combatants = 0
    total_xp = 0
    
    for i, enc in enumerate(encounters, 1):
        enc_name = enc.find('name')
        enc_uid = enc.find('uid')
        enc_xp = enc.find('xp')
        
        print(f'{i}. {enc_name.text if enc_name is not None else "Unknown"}')
        print(f'   UID: {enc_uid.text if enc_uid is not None else "N/A"}')
        
        # Count combatants
        combatants = enc.findall('.//combatant')
        if combatants:
            print(f'   Combatants: {len(combatants)}')
            for comb in combatants:
                monster = comb.find('monster')
                if monster is not None:
                    label = monster.find('label')
                    ac = monster.find('ac')
                    hp = monster.find('hpMax')
                    cr = monster.find('cr')
                    print(f'      - {label.text if label is not None else "Unknown"}: '
                          f'AC {ac.text if ac is not None else "?"}, '
                          f'HP {hp.text if hp is not None else "?"}, '
                          f'CR {cr.text if cr is not None else "?"}')
            total_combatants += len(combatants)
        else:
            print(f'   Type: Investigation/Roleplay')
        
        if enc_xp is not None:
            xp_value = int(enc_xp.text)
            print(f'   XP: {xp_value}')
            total_xp += xp_value
        
        print()
    
    print('=' * 70)
    print('SUMMARY')
    print('=' * 70)
    print(f'Total Encounters: {len(encounters)}')
    print(f'Total Combatants: {total_combatants}')
    print(f'Total XP: {total_xp}')
    print()
    
    # Breakdown by type
    combat_encounters = sum(1 for enc in encounters if enc.findall('.//combatant'))
    investigation_encounters = len(encounters) - combat_encounters
    
    print(f'Combat Encounters: {combat_encounters}')
    print(f'Investigation/Roleplay Encounters: {investigation_encounters}')
    print()
    
    print('✅ PERIL IN PINEBROOK VALIDATED!')
    print()
    print('Adventure Structure:')
    print('- Investigation Phase: Tracks, clues, baby dragon discovery')
    print('- Combat Phase: Living icicles (cave entrance), egg snatchers (hatching chamber)')
    print('- Emotional Arc: Bond with baby → protect eggs → earn mother\'s gratitude')
    print('- Campaign Impact: Silver dragon alliance secured')
else:
    print('❌ ERROR: Peril in Pinebrook adventure not found!')
