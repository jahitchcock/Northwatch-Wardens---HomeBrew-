Here you go, Joshua — a **clean, structured, ready‑to‑paste Markdown file** that summarizes everything we’ve built in this conversation.  
You can drop this straight into VS Code and let Copilot help you refine or expand the XML campaign file.

---

# **Northwatch Wardens — Campaign Build Summary (Markdown for VS Code)**

## **Purpose of This File**
This document summarizes the entire design conversation so far, giving Copilot (in VS Code) the context it needs to help you generate and refine a **Game Master 5e / FightClub5eXML** campaign compendium.

Use this as the “source of truth” when editing your XML.

---

# **1. Campaign Overview**

**Campaign Title:** *Northwatch Wardens: Season One*  
**Theme:** Frontier‑based contract work for a Warden guild headquartered at the Waystone Inn.  
**Tone:** Low‑magic frontier, grounded, with occasional whimsical beats (Wild Sheep Chase).  
**Structure:** A sequence of 5e adventures unified into a single region called **Northreach**.

### **Included Adventures**
- **Wolves of Welton** (Level 1–3)
- **Wild Sheep Chase** (comic relief, optional)
- **Frozen Sick** (Level 2–4)
- **Peril in Pinebrook** (side trek)
- **Temple of the Dragonknights** (Level 4–5 capstone)

---

# **2. Canonical Northreach Geography**

This is the **authoritative layout** for all maps and XML location references.

| Location | Position | Notes |
|---------|----------|-------|
| **Waystone Inn** | Center | Guild HQ, mission hub |
| **Welton** | Southwest | Wolves of Welton |
| **Westly’s Farm** | West of Welton | Attack site |
| **Shepherd’s Crook Inn** | Inside Welton | Village hub |
| **Pinebrook** | Southeast | Peril in Pinebrook |
| **Palebank Village** | Northeast coast | Frozen Sick |
| **Croaker Cave** | North of Palebank | Bandit hideout |
| **Salsvault** | Far north of Palebank | Aeorian ruin |
| **Temple of the Dragonknights** | Northwest mountains | Capstone |
| **Noke’s Tower** | West of Waystone | Wild Sheep Chase |

---

# **3. Tools Being Used**

### **Primary Tools**
- **Game Master 5e (Lion’s Den)** — campaign tracking
- **FightClub5eXML format** — compendium XML
- **CompendiumEditor** — GUI editor for XML

### **Map Tools (recommended)**
- Inkarnate  
- Dungeon Scrawl  
- Watabou City Generator  
- Azgaar’s Fantasy Map Generator  

---

# **4. XML Structure Needed for Game Master 5e**

Your compendium file will be named something like:

```
Northwatch_Wardens.xml
```

### **Required XML Sections**
- `<info>` — metadata
- `<adventures>` — each module as an adventure entry
- `<npcs>` — guild staff, villagers, recurring characters
- `<monsters>` — custom statblocks (optional)
- `<items>` — contracts, badges, unique loot
- `<tables>` — rumor tables, random events

---

# **5. XML Template (High-Level)**

This is the structure Copilot should expand:

```
<compendium>
  <info>...</info>

  <adventures>
    <adventure>Northwatch Wardens: Season One</adventure>
    <adventure>Wolves of Welton</adventure>
    <adventure>Frozen Sick</adventure>
    <adventure>Temple of the Dragonknights</adventure>
    <adventure>Wild Sheep Chase</adventure>
    <adventure>Peril in Pinebrook</adventure>
  </adventures>

  <npcs>
    <!-- Marshal Brenna Thorne -->
    <!-- Westly of Welton -->
    <!-- Welton Council -->
    <!-- Palebank NPCs -->
    <!-- Pinebrook NPCs -->
  </npcs>

  <monsters>
    <!-- Optional custom wolves, cultists, constructs -->
  </monsters>

  <items>
    <!-- Warden’s Badge -->
    <!-- Contract W-17 -->
  </items>

  <tables>
    <!-- Rumors for Welton -->
    <!-- Rumors for Palebank -->
  </tables>
</compendium>
```

---

# **6. Key NPCs to Include**

### **Guild NPCs**
- Marshal Brenna Thorne  
- Steward Mara Fenwick  
- Lorewarden Elric Vael  

### **Welton NPCs**
- Westly (shepherd)  
- Welton Council (Tillus Merrion, Leanor Slatebeard, etc.)  

### **Palebank NPCs**
- Pelc  
- Tulgi  
- Urgon  
- Elro Aldataur  

### **Pinebrook NPCs**
- Village elder  
- Missing persons  
- Local hunters  

### **Wild Sheep Chase NPCs**
- Finethir Shinebright (sheep wizard)  
- Noke (villain)  

---

# **7. Items to Include**

- **Warden’s Badge** (common wondrous item)  
- **Contract W‑17: Disturbance Near Welton**  
- **Frozen Relics** (Frozen Sick)  
- **Dragonknight Artifacts** (Temple)  

---

# **8. Tables to Include**

### **Rumors — Welton**
- Wolves opening gates  
- Missing sorcerer  
- Strange behavior  
- Talking wolves (rare rumor)

### **Rumors — Palebank**
- Sickness spreading  
- Relics from the north  
- Strange lights in the glacier  

---

# **9. Maps (for your reference)**

You attempted multiple maps; the final unified layout is the one above.  
Use external tools to generate consistent maps and import them into Game Master 5e as images.

---

# **10. Next Steps for Copilot in VS Code**

Tell Copilot to:

- Expand each `<adventure>` into full text blocks  
- Generate `<npc>` entries for all major characters  
- Add `<item>` entries for contracts and artifacts  
- Add `<table>` entries for rumors and random events  
- Validate XML structure for FightClub5e compatibility  

You can paste the XML skeleton into a file named:

```
Northwatch_Wardens.xml
```

