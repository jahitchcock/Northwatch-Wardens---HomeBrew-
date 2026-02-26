path = "Season 1/Adventures/Opening/Wolves - Contract.md"

content = """# **Contract: W\u201117 \u2014 Disturbance Near Welton**
{{wide
{{note
**Campaign Note (DM):** This contract is the campaign\u2019s **inciting incident** \u2014 the first visible sign of the Aeorian Echo. The \u201cunusual wolf intelligence\u201d is not natural behavior; it\u2019s the result of ancient magic awakening. 
}}

## **Issuing Party:**
Welton Village Council, Northreach Frontier

## **Classification:**
Field Contract \u2014 Threat Suppression
Initiate\u2011Eligible

## **Summary:**
The agricultural village of Welton reports **increasingly aggressive wolf activity** along its grazing hills and outer farms. Livestock losses have escalated beyond the capacity of local shepherds and militia. The council requests **Warden intervention** to secure the area and restore safety to the region.

## **Objectives:**

- Travel to Welton
- Assess the situation on-site
- Locate the source of the wolf attacks
- Neutralize the threat to Welton\u2019s people and livestock
- Report findings to the Council and to the Northwatch Wardens

## **Reward:**
800 gp, paid upon confirmation of mission completion by the Welton Council

- Standard Warden credit toward Initiate advancement

## **Notes for Initiates:**

- Expect rural terrain, livestock enclosures, and forested hills
- Local leadership may provide additional context upon arrival
- This contract is considered a test of readiness for new Wardens
- Maintain professionalism; Welton is a valued frontier settlement

## **Signed:**
Marshal Brenna Thorne, Northwatch Wardens
Attested by Steward Mara Fenwick
}}

{{watercolor3,top:99px,left:412px,width:369px,background-color:#BBAD82,opacity:80%}}
"""

with open(path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

lines = open(path, 'r', encoding='utf-8').readlines()
bom = open(path, 'rb').read(3) == bytes([0xef, 0xbb, 0xbf])
print(f"Written {len(lines)} lines, BOM={bom}")
print("Title:", lines[0].strip())
print("L2:", lines[1].strip())
print("L3:", lines[2].strip())
