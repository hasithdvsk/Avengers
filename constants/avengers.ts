export type Avenger = {
  id: string;
  alias: string;
  realName: string;
  biography: string;
  portraitImage: string;
  actionImage: string;
  firstAppearance: {
    comic: string;
    year: number;
  };
  highlightMovie: string;
  weapons: string[];
  strengths: string[];
  themeColor: string;
};

export const AVENGERS: Avenger[] = [
  {
    id: "iron-man",
    alias: "Iron Man",
    realName: "Tony Stark",
    biography:
      "Intel Report: Tony Stark is a weapons-industrialist-turned-protector whose armored systems redefine modern hero warfare. His arc reactor platform supports modular nano-weaponry, autonomous threat targeting, and extreme survival in orbital and terrestrial combat zones. Psychological profiling shows high-risk impulsivity balanced by elite tactical improvisation under pressure. His final Endgame maneuver confirms willingness to trade personal survival for universal continuity.",
    portraitImage: "https://cdn.marvel.com/content/2x/002irm_ons_mas_mob_01_0.jpg",
    actionImage: "https://cdn.marvel.com/content/2x/002irm_ons_mas_mob_01_0.jpg",
    firstAppearance: {
      comic: "Tales of Suspense #39",
      year: 1963,
    },
    highlightMovie: "Avengers: Endgame",
    weapons: [
      "Modular Iron Man Armors",
      "Repulsor Cannons",
      "Unibeam Arc Reactor Core",
      "Nano-Tech Blade Systems",
    ],
    strengths: [
      "Genius-level intellect and systems design",
      "Adaptive combat analysis in real time",
      "Extreme resilience through powered armor",
      "Leadership under existential pressure",
    ],
    themeColor: "#FFD700",
  },
  {
    id: "captain-america",
    alias: "Captain America",
    realName: "Steve Rogers",
    biography:
      "Intel Report: Steve Rogers remains a top-tier close-quarters commander enhanced by the Super-Soldier Serum’s peak physiology package. Field logs indicate exceptional decision-making in asymmetric conflicts where ideology and loyalty fracture alliances. His vibranium shield usage combines kinetic defense with ricochet precision that reshapes battle geometry in real time. Rogers consistently stabilizes high-chaos team environments through mission-first leadership ethics.",
    portraitImage: "https://cdn.marvel.com/content/2x/003cap_ons_mas_mob_01_3.jpg",
    actionImage: "https://cdn.marvel.com/content/2x/003cap_ons_mas_mob_01_3.jpg",
    firstAppearance: {
      comic: "Captain America Comics #1",
      year: 1941,
    },
    highlightMovie: "Captain America: The Winter Soldier",
    weapons: [
      "Vibranium Shield",
      "Tactical Combat Gear",
      "Motorcycle and Field Arsenal",
    ],
    strengths: [
      "Peak human strength, agility, and stamina",
      "Master hand-to-hand combatant",
      "Battlefield-level strategic command",
      "Unshakable moral resolve",
    ],
    themeColor: "#1E3A8A",
  },
  {
    id: "thor",
    alias: "Thor",
    realName: "Thor Odinson",
    biography:
      "Intel Report: Thor Odinson is an Asgardian frontline force multiplier with weather-scale energy control and god-tier durability. Combat telemetry confirms devastating output through Mjolnir/Stormbreaker channeling combined with sustained aerial assault patterns. Behavioral evolution from royal aggression to strategic guardianship has increased mission reliability across interstellar theaters. In apocalyptic scenarios, Thor functions as both shock unit and morale catalyst.",
    portraitImage: "https://cdn.marvel.com/content/2x/004tho_ons_mas_mob_04.jpg",
    actionImage: "https://cdn.marvel.com/content/2x/004tho_ons_mas_mob_04.jpg",
    firstAppearance: {
      comic: "Journey into Mystery #83",
      year: 1962,
    },
    highlightMovie: "Thor: Ragnarok",
    weapons: [
      "Mjolnir",
      "Stormbreaker",
      "Asgardian Lightning Mastery",
    ],
    strengths: [
      "Divine durability and raw strength",
      "Summoning and channeling lightning storms",
      "Centuries of warrior experience",
      "Aerial combat mobility",
    ],
    themeColor: "#60A5FA",
  },
  {
    id: "hulk",
    alias: "Hulk",
    realName: "Bruce Banner",
    biography:
      "Intel Report: Bruce Banner’s gamma-induced transformation produces one of the strongest known terrestrial combat entities. Strength curves suggest escalation proportional to emotional stress, creating severe unpredictability in prolonged engagements. Integrated Banner-Hulk cognition has improved strategic control while retaining catastrophic output potential. Deployment is recommended only when collateral envelopes are understood and acceptable.",
    portraitImage: "https://cdn.marvel.com/content/2x/006hbb_ons_mas_mob_01_0.jpg",
    actionImage: "https://cdn.marvel.com/content/2x/006hbb_ons_mas_mob_01_0.jpg",
    firstAppearance: {
      comic: "The Incredible Hulk #1",
      year: 1962,
    },
    highlightMovie: "The Avengers",
    weapons: ["Gamma-Enhanced Physiology", "Environmental Improvisation"],
    strengths: [
      "Exponential strength amplification",
      "Near-instant tissue regeneration",
      "Shockwave-level physical impact",
      "Dual-genius potential (Banner + Hulk states)",
    ],
    themeColor: "#355E3B",
  },
  {
    id: "black-widow",
    alias: "Black Widow",
    realName: "Natasha Romanoff",
    biography:
      "Intel Report: Natasha Romanoff is a high-value intelligence operative specializing in infiltration, extraction, and psychological disruption. Red Room conditioning produced elite lethality, later redirected into precision fieldcraft for Avengers operations. Mission records indicate superior performance in urban covert theaters where overt force would compromise objectives. Romanoff’s profile emphasizes sacrifice-driven decision-making under morally complex conditions.",
    portraitImage: "https://cdn.marvel.com/content/2x/011blw_lob_mas_mob_06.jpg",
    actionImage: "https://cdn.marvel.com/content/2x/011blw_lob_mas_mob_06.jpg",
    firstAppearance: {
      comic: "Tales of Suspense #52",
      year: 1964,
    },
    highlightMovie: "Captain America: Civil War",
    weapons: [
      "Widow's Bite Electroshock Gauntlets",
      "Twin Batons",
      "Covert Tactical Arsenal",
    ],
    strengths: [
      "Elite espionage and infiltration",
      "Master martial artist and acrobat",
      "Psychological and social manipulation expertise",
      "Mission-critical adaptability",
    ],
    themeColor: "#B91C1C",
  },
  {
    id: "hawkeye",
    alias: "Hawkeye",
    realName: "Clint Barton",
    biography:
      "Intel Report: Clint Barton is a precision-strike specialist whose ballistic prediction and archery control are near-unique among non-enhanced agents. He excels in support roles that demand surgical elimination, reconnaissance, and threat redirection. His adaptive munitions platform allows dynamic response across armored, aerial, and stealth targets. Barton’s psychological stability and team trust metrics remain exceptionally high under sustained stress.",
    portraitImage: "https://cdn.marvel.com/content/2x/hawkeye_ons_mas_mob_01.jpg",
    actionImage: "https://cdn.marvel.com/content/2x/hawkeye_ons_mas_mob_01.jpg",
    firstAppearance: {
      comic: "Tales of Suspense #57",
      year: 1964,
    },
    highlightMovie: "Avengers: Age of Ultron",
    weapons: [
      "Recurve Bow",
      "Specialized Trick Arrows",
      "Close-Quarters Tactical Blade",
    ],
    strengths: [
      "Perfected archery accuracy",
      "High-threat tactical awareness",
      "Stealth and recon specialization",
      "Mentorship and field leadership",
    ],
    themeColor: "#6D28D9",
  },
  {
    id: "black-panther",
    alias: "Black Panther",
    realName: "T'Challa",
    biography:
      "Intel Report: T’Challa combines sovereign command authority with elite kinetic combat proficiency enhanced by the Heart-Shaped Herb. Vibranium suit architecture absorbs and re-disperses impact energy, making him uniquely resilient in close confrontation. Wakandan intelligence and science infrastructure amplify his strategic reach beyond traditional battlefield limits. Operational conduct reflects disciplined restraint paired with decisive, high-impact intervention.",
    portraitImage: "https://cdn.marvel.com/content/2x/007blp_ons_mas_mob_01_3.jpg",
    actionImage: "https://cdn.marvel.com/content/2x/007blp_ons_mas_mob_01_3.jpg",
    firstAppearance: {
      comic: "Fantastic Four #52",
      year: 1966,
    },
    highlightMovie: "Black Panther",
    weapons: [
      "Vibranium Panther Habit",
      "Retractable Vibranium Claws",
      "Kimoyo Bead Tactical Systems",
    ],
    strengths: [
      "Enhanced speed, strength, and agility",
      "Panther-form stealth and reflex precision",
      "Monarch-level strategic leadership",
      "Access to advanced Wakandan technology",
    ],
    themeColor: "#7C3AED",
  },
  {
    id: "scarlet-witch",
    alias: "Scarlet Witch",
    realName: "Wanda Maximoff",
    biography:
      "Intel Report: Wanda Maximoff channels chaos magic capable of large-scale reality distortion and high-precision psionic attack vectors. Combat records confirm telekinetic suppression, energy projection, and battlefield-level mental disruption against elite threats. Her emotional state has strong correlation with power amplitude, demanding careful strategic framing in joint operations. Despite risk factors, her raw potential places her among the most formidable Avengers-tier assets.",
    portraitImage: "https://cdn.marvel.com/content/2x/012scw_ons_mas_mob_01_1.jpg",
    actionImage: "https://cdn.marvel.com/content/2x/012scw_ons_mas_mob_01_1.jpg",
    firstAppearance: {
      comic: "X-Men #4",
      year: 1964,
    },
    highlightMovie: "Doctor Strange in the Multiverse of Madness",
    weapons: [
      "Chaos Magic Manipulation",
      "Telekinetic Force Constructs",
      "Hex Field Reality Warping",
    ],
    strengths: [
      "Extreme psionic and magical output",
      "Wide-area crowd control capacity",
      "Reality-level threat potential",
      "Fast adaptive spell improvisation",
    ],
    themeColor: "#DC2626",
  },
];
