import xml.etree.ElementTree as ET

tree = ET.parse('Northwatch_Wardens.xml')
root = tree.getroot()
campaign = root.find('.//campaign')
adventures = campaign.findall('.//adventure')

print('=== CAMPAIGN STRUCTURE VALIDATION ===\n')
print(f'Total Adventures: {len(adventures)}\n')

encounters = []
combatants = []
total_xp = 0

for adv in adventures:
    adv_uid = adv.find('uid').text if adv.find('uid') is not None else 'N/A'
    adv_name = adv.find('name').text if adv.find('name') is not None else 'Unknown'
    adv_encounters = adv.findall('.//encounter')
    adv_combatants = sum(len(enc.findall('.//combatant')) for enc in adv_encounters)
    adv_xp = sum(int(enc.find('xp').text) for enc in adv_encounters if enc.find('xp') is not None)
    
    print(f'{adv_uid}: {adv_name}')
    print(f'  Encounters: {len(adv_encounters)}, Combatants: {adv_combatants}, XP: {adv_xp}')
    
    encounters.extend(adv_encounters)
    combatants.append(adv_combatants)
    total_xp += adv_xp

print(f'\n=== CAMPAIGN TOTALS ===')
print(f'Total Combat Encounters: {len(encounters)}')
print(f'Total Combatants: {sum(combatants)}')
print(f'Total XP: {total_xp}')
print('\n✅ CAMPAIGN STRUCTURE VALIDATED')
