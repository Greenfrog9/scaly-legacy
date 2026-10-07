/* Scaly Legacy gene tables. Alleles on the same locus are not independent.
   Line-bred looks are listed under lines, not as fake Mendelian genes. */
window.SPECIES = {
  "Western Hognose": {
    sci: "Heterodon nasicus", size: "1.5–3 ft", clutch: [6, 16], basePrice: 150,
    body: "hognose",
    note: "Most common hognose in the pet trade. Broad incomplete-dominant and recessive morph set.",
    lines: ["Green (selective, not a single gene)"],
    loci: {
      albino: { type: "recessive", alleles: { albino: { label: "Albino", tags: { melanin: 0.05, red: 0.85, yellow: 0.7, eye: "pink" } } } },
      axanthic: { type: "recessive", alleles: { axanthic: { label: "Axanthic", tags: { red: 0.05, yellow: 0.05, eye: "dark" } } } },
      hypo: { type: "recessive", alleles: { hypo: { label: "Hypo", tags: { melanin: 0.35, red: 0.7 } } } },
      toffee: { type: "recessive", alleles: { toffee: { label: "Toffee", tags: { yellow: 0.75, red: 0.45, melanin: 0.4 } } } },
      lavender: { type: "recessive", alleles: { lavender: { label: "Lavender", tags: { hue: "lavender", red: 0.25, yellow: 0.2 } } } },
      extremeRed: { type: "recessive", alleles: { extremeRed: { label: "Extreme Red", tags: { red: 1, yellow: 0.35 } } } },
      caramel: { type: "recessive", alleles: { caramel: { label: "Caramel", tags: { yellow: 0.8, red: 0.45, melanin: 0.35 } } } },
      leucistic: { type: "recessive", alleles: { leucistic: { label: "Leucistic", tags: { melanin: 0.02, red: 0.15, yellow: 0.15, pattern: 0.05, eye: "dark" } } } },
      mocha: { type: "recessive", alleles: { mocha: { label: "Mocha", tags: { melanin: 0.55, yellow: 0.45, red: 0.3 } } } },
      granite: { type: "recessive", alleles: { granite: { label: "Granite", tags: { pattern: 0.85, speckle: 1 } } } },
      shadow: { type: "recessive", alleles: { shadow: { label: "Shadow", tags: { melanin: 0.7, yellow: 0.25 } } } },
      tiger: { type: "recessive", alleles: { tiger: { label: "Tiger", tags: { patternStyle: "stripe" } } } },
      cinnamon: { type: "recessive", alleles: { cinnamon: { label: "Cinnamon", tags: { red: 0.55, yellow: 0.5, melanin: 0.4 } } } },
      evans: { type: "recessive", alleles: { evans: { label: "Evans Hypo", tags: { melanin: 0.28, red: 0.65 } } } },
      anaconda: { type: "incomplete", alleles: { anaconda: { label: "Anaconda", het: { pattern: 0.35 }, super: { pattern: 0.05, label: "Superconda" } } } },
      arctic: { type: "incomplete", alleles: { arctic: { label: "Arctic", het: { contrast: 1, yellow: 0.25 }, super: { contrast: 1, melanin: 0.3, yellow: 0.1, label: "Super Arctic" } } } },
      jaguar: { type: "incomplete", alleles: { jaguar: { label: "Jaguar", het: { patternStyle: "broken" }, super: { patternStyle: "broken", pattern: 0.2, label: "Super Jaguar" } } } },
      toxic: { type: "incomplete", alleles: { toxic: { label: "Toxic", het: { yellow: 0.8, melanin: 0.45 }, super: { yellow: 0.95, melanin: 0.25, label: "Super Toxic" } } } },
      sable: { type: "incomplete", alleles: { sable: { label: "Sable", het: { melanin: 0.75 }, super: { melanin: 0.9, label: "Super Sable" } } } },
      pinkPastel: { type: "incomplete", alleles: { pinkPastel: { label: "Pink Pastel", het: { red: 0.7, melanin: 0.4 }, super: { red: 0.85, melanin: 0.2, label: "Super Pink Pastel" } } } },
      pistachio: { type: "incomplete", alleles: { pistachio: { label: "Pistachio", het: { hue: "green", yellow: 0.6 }, super: { hue: "green", yellow: 0.8, melanin: 0.3, label: "Super Pistachio" } } } }
    },
    combos: [
      { id: "yeti", label: "Yeti", when: { albino: "vis", axanthic: "vis", anaconda: "vis" } },
      { id: "snow", label: "Snow", when: { albino: "vis", axanthic: "vis" } },
      { id: "coral", label: "Coral", when: { albino: "vis", hypo: "vis" } },
      { id: "ghost", label: "Ghost", when: { hypo: "vis", axanthic: "vis" } }
    ]
  },
  "Eastern Hognose": {
    sci: "Heterodon platirhinos", size: "2–3.5 ft", clutch: [5, 14], basePrice: 180, body: "hognose",
    note: "Larger hognose. Often harder to switch to rodents. Fewer designer morphs than Western.",
    lines: ["Red phase and dark phase are localities/lines, not single genes"],
    loci: {
      albino: { type: "recessive", alleles: { albino: { label: "Albino", tags: { melanin: 0.05, red: 0.8, yellow: 0.65, eye: "pink" } } } },
      hypo: { type: "recessive", alleles: { hypo: { label: "Hypo", tags: { melanin: 0.35 } } } },
      axanthic: { type: "recessive", alleles: { axanthic: { label: "Axanthic", tags: { red: 0.05, yellow: 0.05 } } } },
      melanistic: { type: "recessive", alleles: { melanistic: { label: "Melanistic", tags: { melanin: 0.95, pattern: 0.2 } } } },
      anery: { type: "recessive", alleles: { anery: { label: "Anery", tags: { red: 0.08, yellow: 0.1 } } } },
      tangerine: { type: "recessive", alleles: { tangerine: { label: "Tangerine", tags: { red: 0.75, yellow: 0.7 } } } }
    },
    combos: [{ id: "snow", label: "Snow", when: { albino: "vis", axanthic: "vis" } }]
  },
  "Southern Hognose": {
    sci: "Heterodon simus", size: "1.5–2.5 ft", clutch: [4, 12], basePrice: 200, body: "hognose",
    note: "Smallest Heterodon. Least common in the hobby. Wild animals are conservation-sensitive; this game uses captive-bred stock only.",
    lines: [],
    loci: {
      albino: { type: "recessive", alleles: { albino: { label: "Albino", tags: { melanin: 0.05, red: 0.7, yellow: 0.6, eye: "pink" } } } },
      hypo: { type: "recessive", alleles: { hypo: { label: "Hypo", tags: { melanin: 0.35 } } } },
      axanthic: { type: "recessive", alleles: { axanthic: { label: "Axanthic", tags: { red: 0.05, yellow: 0.05 } } } },
      melanistic: { type: "recessive", alleles: { melanistic: { label: "Melanistic", tags: { melanin: 0.95, pattern: 0.15 } } } }
    },
    combos: [{ id: "snow", label: "Snow", when: { albino: "vis", axanthic: "vis" } }]
  },
  "Rosy Boa": {
    sci: "Lichanura trivirgata", size: "2–3 ft", clutch: [3, 8], basePrice: 90, body: "boa",
    note: "Small desert boa. Locality color is common; only proven single genes are Punnett traits here.",
    lines: ["Coastal, desert, and Mexican locality color forms"],
    loci: {
      albino: { type: "recessive", alleles: { albino: { label: "Albino", tags: { melanin: 0.05, yellow: 0.7, red: 0.45, eye: "pink" } } } },
      anery: { type: "recessive", alleles: { anery: { label: "Anery", tags: { red: 0.05, yellow: 0.12 } } } },
      hypo: { type: "recessive", alleles: { hypo: { label: "Hypo", tags: { melanin: 0.3 } } } }
    },
    combos: [{ id: "snow", label: "Snow", when: { albino: "vis", anery: "vis" } }]
  },
  "Kenyan Sand Boa": {
    sci: "Eryx colubrinus", size: "1.5–2.5 ft", clutch: [4, 12], basePrice: 80, body: "sand",
    note: "Burrowing boa. Paradox spots are a condition, not a breedable color gene, so they are not in the Punnett.",
    lines: [],
    loci: {
      albino: { type: "recessive", alleles: { albino: { label: "Albino", tags: { melanin: 0.05, yellow: 0.85, red: 0.45, eye: "pink" } } } },
      anery: { type: "recessive", alleles: { anery: { label: "Anery", tags: { red: 0.05, yellow: 0.15 } } } },
      hypo: { type: "recessive", alleles: { hypo: { label: "Hypo", tags: { melanin: 0.32, yellow: 0.7 } } } }
    },
    combos: [{ id: "snow", label: "Snow", when: { albino: "vis", anery: "vis" } }]
  },
  "Common Garter Snake": {
    sci: "Thamnophis sirtalis", size: "1.5–3 ft", clutch: [8, 25], basePrice: 40, body: "garter",
    note: "Active diurnal snake. Flame and melanistic are established looks; many locality stripes are not single genes.",
    lines: ["Checkered, red-sided, and maritime locality forms"],
    loci: {
      albino: { type: "recessive", alleles: { albino: { label: "Albino", tags: { melanin: 0.05, yellow: 0.8, eye: "pink" } } } },
      melanistic: { type: "recessive", alleles: { melanistic: { label: "Melanistic", tags: { melanin: 0.95, pattern: 0.15 } } } },
      anery: { type: "recessive", alleles: { anery: { label: "Anery", tags: { red: 0.05, yellow: 0.15 } } } },
      flame: { type: "recessive", alleles: { flame: { label: "Flame", tags: { red: 0.9, yellow: 0.55, melanin: 0.25 } } } }
    },
    combos: [{ id: "snow", label: "Snow", when: { albino: "vis", anery: "vis" } }]
  },
  "Children's Python": {
    sci: "Antaresia childreni", size: "2–3.5 ft", clutch: [4, 12], basePrice: 100, body: "python",
    note: "Small Australian python. T+ and T− albino are different loci.",
    lines: [],
    loci: {
      tMinus: { type: "recessive", alleles: { tMinus: { label: "T− Albino", tags: { melanin: 0.04, yellow: 0.8, red: 0.35, eye: "pink" } } } },
      tPlus: { type: "recessive", alleles: { tPlus: { label: "T+ Albino", tags: { melanin: 0.12, yellow: 0.7, red: 0.4, eye: "pink" } } } },
      axanthic: { type: "recessive", alleles: { axanthic: { label: "Axanthic", tags: { red: 0.05, yellow: 0.08 } } } },
      granite: { type: "recessive", alleles: { granite: { label: "Granite", tags: { speckle: 1, pattern: 0.7 } } } },
      platinum: { type: "incomplete", alleles: { platinum: { label: "Platinum", het: { melanin: 0.35, yellow: 0.25 }, super: { melanin: 0.15, pattern: 0.2, label: "Super Platinum" } } } }
    },
    combos: [{ id: "snow", label: "Snow", when: { tMinus: "vis", axanthic: "vis" } }]
  },
  "Milk Snake": {
    sci: "Lampropeltis triangulum", size: "2–4 ft", clutch: [4, 10], basePrice: 70, body: "king",
    note: "Tricolor kingsnake complex. Pueblan, Honduran, and Sinaloan are localities, not morph genes.",
    lines: ["Pueblan", "Honduran", "Sinaloan", "Nelson’s"],
    loci: {
      albino: { type: "recessive", alleles: { albino: { label: "Albino", tags: { melanin: 0.05, red: 0.8, yellow: 0.7, eye: "pink" } } } },
      anery: { type: "recessive", alleles: { anery: { label: "Anery", tags: { red: 0.05, yellow: 0.12 } } } },
      tangerine: { type: "recessive", alleles: { tangerine: { label: "Tangerine", tags: { red: 0.7, yellow: 0.85 } } } }
    },
    combos: [{ id: "snow", label: "Snow", when: { albino: "vis", anery: "vis" } }]
  },
  "California Kingsnake": {
    sci: "Lampropeltis californiae", size: "3–4 ft", clutch: [5, 12], basePrice: 60, body: "king",
    note: "Hardy banded snake. House singly. Banana and many stripe styles are selective lines, not simple recessives.",
    lines: ["Banana (selective)", "High-white band", "Desert and coastal localities"],
    loci: {
      albino: { type: "recessive", alleles: { albino: { label: "Albino", tags: { melanin: 0.05, yellow: 0.75, eye: "pink" } } } },
      lavender: { type: "recessive", alleles: { lavender: { label: "Lavender", tags: { hue: "lavender", red: 0.2, yellow: 0.2 } } } },
      hypo: { type: "recessive", alleles: { hypo: { label: "Hypo", tags: { melanin: 0.3 } } } },
      striped: { type: "incomplete", alleles: { striped: { label: "Striped", het: { patternStyle: "stripe" }, super: { patternStyle: "stripe", pattern: 0.4, label: "Wide stripe" } } } }
    },
    combos: []
  },
  "Corn Snake": {
    sci: "Pantherophis guttatus", size: "3–5 ft", clutch: [8, 20], basePrice: 45, body: "corn",
    note: "Classic beginner species. Most morphs are recessive. Motley and Stripe are alleles of one pattern locus.",
    lines: ["Okeetee (selective high-contrast line, not a gene)"],
    loci: {
      amel: { type: "recessive", alleles: { amel: { label: "Amel", tags: { melanin: 0.05, red: 0.85, yellow: 0.7, eye: "pink" } } } },
      anery: { type: "recessive", alleles: { anery: { label: "Anery", tags: { red: 0.06, yellow: 0.1 } } } },
      charcoal: { type: "recessive", alleles: { charcoal: { label: "Charcoal", tags: { red: 0.04, yellow: 0.06, melanin: 0.7 } } } },
      caramel: { type: "recessive", alleles: { caramel: { label: "Caramel", tags: { yellow: 0.85, red: 0.35, melanin: 0.25 } } } },
      hypo: { type: "recessive", alleles: { hypo: { label: "Hypo", tags: { melanin: 0.32 } } } },
      sunkissed: { type: "recessive", alleles: { sunkissed: { label: "Sunkissed", tags: { melanin: 0.3, yellow: 0.7, pattern: 0.7 } } } },
      lava: { type: "recessive", alleles: { lava: { label: "Lava", tags: { red: 0.8, yellow: 0.55, melanin: 0.35 } } } },
      lavender: { type: "recessive", alleles: { lavender: { label: "Lavender", tags: { hue: "lavender", red: 0.2, yellow: 0.15 } } } },
      diffused: { type: "recessive", alleles: { diffused: { label: "Diffused", tags: { pattern: 0.25, patternStyle: "wash" } } } },
      pattern: { type: "recessive", alleles: {
        motley: { label: "Motley", tags: { patternStyle: "motley" } },
        stripe: { label: "Stripe", tags: { patternStyle: "stripe" } }
      } },
      tessera: { type: "incomplete", alleles: { tessera: { label: "Tessera", het: { patternStyle: "tessera" }, super: { patternStyle: "tessera", pattern: 0.45, label: "Super Tessera" } } } },
      buf: { type: "incomplete", alleles: { buf: { label: "Buf", het: { melanin: 0.25, yellow: 0.7 }, super: { melanin: 0.12, yellow: 0.85, label: "Super Buf" } } } }
    },
    combos: [
      { id: "snow", label: "Snow", when: { amel: "vis", anery: "vis" } },
      { id: "blizzard", label: "Blizzard", when: { amel: "vis", charcoal: "vis", diffused: "vis" } },
      { id: "ghost", label: "Ghost", when: { hypo: "vis", anery: "vis" } },
      { id: "butter", label: "Butter", when: { amel: "vis", caramel: "vis" } },
      { id: "amber", label: "Amber", when: { hypo: "vis", caramel: "vis" } },
      { id: "opal", label: "Opal", when: { amel: "vis", lavender: "vis" } }
    ]
  },
  "Boa Constrictor": {
    sci: "Boa constrictor", size: "6–10 ft", clutch: [10, 30], basePrice: 150, body: "boa",
    note: "Large snake. Kahl albino and Sharp albino are different loci. Super Jungle often has fertility problems.",
    lines: ["Locality boas (Hog Island, Jungle Colombia, etc.) are not morph genes"],
    loci: {
      kahl: { type: "recessive", alleles: { kahl: { label: "Kahl Albino", tags: { melanin: 0.05, yellow: 0.75, red: 0.4, eye: "pink" } } } },
      sharp: { type: "recessive", alleles: { sharp: { label: "Sharp Albino", tags: { melanin: 0.08, yellow: 0.7, red: 0.5, eye: "pink" } } } },
      anery: { type: "recessive", alleles: { anery: { label: "Anery", tags: { red: 0.05, yellow: 0.15 } } } },
      leopard: { type: "recessive", alleles: { leopard: { label: "Leopard", tags: { patternStyle: "spots", pattern: 0.8 } } } },
      hypo: { type: "incomplete", alleles: { hypo: { label: "Hypo", het: { melanin: 0.4 }, super: { melanin: 0.2, label: "Super Hypo" } } } },
      jungle: { type: "incomplete", alleles: { jungle: { label: "Jungle", het: { patternStyle: "aberrant" }, super: { patternStyle: "aberrant", pattern: 0.25, label: "Super Jungle", problem: "Super Jungle often has reduced fertility." } } } },
      motley: { type: "incomplete", alleles: { motley: { label: "Motley", het: { patternStyle: "motley" }, super: { patternStyle: "motley", pattern: 0.3, label: "Super Motley" } } } },
      aztec: { type: "incomplete", alleles: { aztec: { label: "Aztec", het: { patternStyle: "broken" }, super: { patternStyle: "broken", pattern: 0.2, label: "Super Aztec" } } } },
      blood: { type: "incomplete", alleles: { blood: { label: "Blood", het: { red: 0.85 }, super: { red: 1, pattern: 0.4, label: "Super Blood" } } } },
      arabesque: { type: "dominant", alleles: { arabesque: { label: "Arabesque", het: { patternStyle: "arabesque" }, super: { patternStyle: "arabesque", label: "Arabesque" } } } }
    },
    combos: [
      { id: "snow", label: "Snow", when: { kahl: "vis", anery: "vis" } },
      { id: "sharpSnow", label: "Sharp Snow", when: { sharp: "vis", anery: "vis" } }
    ]
  },
  "Ball Python": {
    sci: "Python regius", size: "3–5 ft", clutch: [4, 10], basePrice: 80, body: "ball",
    note: "Deepest morph library in the hobby. This is the established core: complexes are real loci, not every combo name. Spider-complex genes can carry a neurological wobble.",
    lines: ["Thousands of combo names are stacks of these genes"],
    loci: {
      albino: { type: "recessive", alleles: {
        albino: { label: "Albino", tags: { melanin: 0.05, yellow: 0.8, red: 0.35, eye: "pink" } },
        candy: { label: "Candy", tags: { melanin: 0.08, yellow: 0.75, red: 0.55, eye: "pink" } }
      } },
      axanthic: { type: "recessive", alleles: { axanthic: { label: "Axanthic", tags: { red: 0.04, yellow: 0.06 } } } },
      piebald: { type: "recessive", alleles: { piebald: { label: "Piebald", tags: { piebald: 1 } } } },
      clown: { type: "recessive", alleles: {
        clown: { label: "Clown", tags: { patternStyle: "clown" } },
        cryptic: { label: "Cryptic", tags: { patternStyle: "clown", pattern: 0.7 } }
      } },
      geneticStripe: { type: "recessive", alleles: { geneticStripe: { label: "Genetic Stripe", tags: { patternStyle: "stripe" } } } },
      bel: { type: "incomplete", alleles: {
        mojave: { label: "Mojave", het: { contrast: 1, melanin: 0.45 }, super: { melanin: 0.04, pattern: 0.05, eye: "blue", label: "Blue-Eyed Leucistic", problem: "Super of the BEL complex is a blue-eyed leucistic, not a darker Mojave." } },
        lesser: { label: "Lesser", het: { melanin: 0.4, yellow: 0.7 }, super: { melanin: 0.04, pattern: 0.05, eye: "blue", label: "Blue-Eyed Leucistic" } },
        butter: { label: "Butter", het: { yellow: 0.85, melanin: 0.35 }, super: { melanin: 0.04, pattern: 0.05, eye: "blue", label: "Blue-Eyed Leucistic" } },
        phantom: { label: "Phantom", het: { melanin: 0.5, yellow: 0.3 }, super: { melanin: 0.04, pattern: 0.05, eye: "blue", label: "Blue-Eyed Leucistic" } },
        bamboo: { label: "Bamboo", het: { patternStyle: "stripe", yellow: 0.6 }, super: { melanin: 0.04, pattern: 0.05, eye: "blue", label: "Blue-Eyed Leucistic" } }
      } },
      pastel: { type: "incomplete", alleles: { pastel: { label: "Pastel", het: { yellow: 0.8, melanin: 0.45 }, super: { yellow: 0.95, melanin: 0.2, label: "Super Pastel" } } } },
      fire: { type: "incomplete", alleles: { fire: { label: "Fire", het: { yellow: 0.75, pattern: 0.55 }, super: { yellow: 0.9, pattern: 0.25, label: "Super Fire" } } } },
      enchi: { type: "incomplete", alleles: { enchi: { label: "Enchi", het: { yellow: 0.7, pattern: 0.6 }, super: { yellow: 0.85, pattern: 0.3, label: "Super Enchi" } } } },
      banana: { type: "incomplete", alleles: { banana: { label: "Banana", het: { yellow: 0.9, speckle: 0.8 }, super: { yellow: 0.95, speckle: 1, melanin: 0.25, label: "Super Banana" } } } },
      yellowbelly: { type: "incomplete", alleles: { yellowbelly: { label: "Yellow Belly", het: { yellow: 0.7, patternStyle: "flames" }, super: { pattern: 0.15, yellow: 0.8, label: "Super Yellow Belly" } } } },
      spider: { type: "incomplete", alleles: {
        spider: { label: "Spider", het: { patternStyle: "web" }, super: { patternStyle: "web", pattern: 0.15, label: "Super Spider", problem: "Spider-complex genes are associated with a neurological wobble. Super Spider is rarely viable." } },
        champagne: { label: "Champagne", het: { patternStyle: "web", melanin: 0.4 }, super: { patternStyle: "web", pattern: 0.1, label: "Super Champagne", problem: "Champagne is in the spider complex and can carry a wobble." } },
        woma: { label: "Woma", het: { patternStyle: "web", pattern: 0.55 }, super: { patternStyle: "web", pattern: 0.2, label: "Super Woma", problem: "Woma is in the spider complex and can carry a wobble." } },
        spotnose: { label: "Spotnose", het: { patternStyle: "web" }, super: { patternStyle: "web", pattern: 0.2, label: "Super Spotnose", problem: "Spotnose is in the spider complex and can carry a wobble." } }
      } },
      cinnamon: { type: "incomplete", alleles: { cinnamon: { label: "Cinnamon", het: { red: 0.45, melanin: 0.55 }, super: { melanin: 0.85, pattern: 0.2, label: "Super Cinnamon", problem: "Super Cinnamon (super black pastel complex) often has head and jaw deformities." } } } },
      pied: { type: "incomplete", alleles: { ghi: { label: "GHI", het: { pattern: 0.45, contrast: 1 }, super: { pattern: 0.15, label: "Super GHI" } } } }
    },
    combos: [
      { id: "snow", label: "Snow", when: { albino: "vis", axanthic: "vis" } },
      { id: "bel", label: "Blue-Eyed Leucistic", when: { bel: "super" } }
    ]
  }
};
