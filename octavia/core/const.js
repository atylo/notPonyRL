
	// player state flags
FLAG_SKILL          = 1;
FLAG_RENOUNCE       = 2;
FLAG_SPECIAL        = 3;
FLAG_RACE           = 4;

	//audio constants
AUDIO_AMBIENT       = 1;
AUDIO_SKILL         = 2;
AUDIO_EVENT         = 3;

	//achievement constants
REWARD_NONE              = 0;
REWARD_GAME              = 1;
REWARD_100_DMG           = 2;
REWARD_TUTORIAL          = 3;
REWARD_POSTGRADUATE      = 4;
REWARD_SCOUT             = 6;
REWARD_DASH              = 7;
REWARD_NIGHTMARE         = 8;
REWARD_HIVE              = 9;
REWARD_ALMOST_CELLY      = 10;
REWARD_GEMHUNTER         = 11;
REWARD_NOT_A_BETA        = 15;
REWARD_LEGACY            = 16;
REWARD_ADVENTURE_BOOM    = 17;
REWARD_VOGUE_ROGUE       = 18;
REWARD_HUNTMASTER        = 19;
REWARD_LAST_PONY         = 20;
REWARD_DESPERATION       = 21;
REWARD_LIKE_A_BOSS       = 22;
REWARD_HOLY_ONE          = 23;
REWARD_HAT_AND_WHIP      = 24;
REWARD_WEAKLING          = 25;
REWARD_STRIPED_ALCHEMIST = 26;
REWARD_SERENITY          = 27;
REWARD_REAVER            = 28;
REWARD_ESCAPE_VELOCITY   = 29;
REWARD_SPICY_HERBS       = 30;
REWARD_PRESCIENCE        = 31;
REWARD_DRAGON_OVERLORD   = 32;
REWARD_BRAVE_SIR_ROBIN   = 33;
REWARD_PLANNING          = 34;

	//Attributes
ATTR_HP           = 1;
ATTR_MP           = 2;

	// Modifiers
MOD_ATTACK_BASE   = 1;
MOD_ATTACK_MULT   = 2;
MOD_HP_BASE       = 3;
MOD_HP_MULT       = 4;
MOD_HP_REGEN      = 5;
MOD_MP_BASE       = 6;
MOD_MP_MULT       = 7;
MOD_MP_REGEN      = 8;
MOD_ARMOR         = 9; 
MOD_RESIST        = 10;

	// replay controls
REPLAY_CTRL_FIRST = 1;
REPLAY_CTRL_BACK  = 2;
REPLAY_CTRL_NEXT  = 3;
REPLAY_CTRL_LAST  = 4;
REPLAY_CTRL_STOP  = 5;
REPLAY_CTRL_GO    = 6;

	// fields constants
FIELD_TUTORIAL       = 1;
FIELD_NORMAL         = 2;
FIELD_MINES          = 3;
FIELD_NIGHTMARE      = 4;
FIELD_HIVE           = 5;
FIELD_EVERFREE       = 6;
FIELD_FROZEN_CAVERNS = 7;
FIELD_OLD_CASTLE     = 8;

FIELD_PYRAMID       = 100;
FIELD_MOON          = 102;

FIELD_BARN_1        = 201;
FIELD_BARN_2        = 202;
FIELD_BARN_3        = 203;
FIELD_BARN_4        = 204;

FIELD_POLYGON       = 50;
FIELD_TEST          = 51;

	// terrain constants
TERRAIN_WALL            = 1;
TERRAIN_FLOOR           = 2;
TERRAIN_GRASS           = 3;
TERRAIN_HORIZONTAL_DOOR = 4;
TERRAIN_VERTICAL_DOOR   = 5;
TERRAIN_ICE_FLOOR       = 6;

TERRAIN_SAND            = 100;
TERRAIN_SANDSTONE       = 101;


	// replay constants
REPLAY_VERSION          = 0;
REPLAY_TASK             = 1;
REPLAY_ACHIEVEMENTS     = 2;
REPLAY_ACTIONS          = 3;

	// field pages. 
PAGE_BACK           = -1;
PAGE_NEXT           =  1;
PAGE_SIZE           =  8;

	// Types of maps for generator
MAP_H_TUNNELS       = 1;
MAP_V_TUNNELS       = 2;
MAP_CUSTOM          = 3;

	// game states
STATE_START         = 0;
STATE_MENU          = 1;
STATE_GAME          = 2;
STATE_SPLASH_SCREEN = 3;
STATE_REPLAY        = 4;
STATE_PRELOAD       = 5;

	// options
OPTION_EXT_LOGS       = 1;
OPTION_HERO_NAME      = 2;
OPTION_EXT_SAVE       = 3;
OPTION_TOUCH_CONTROLS = 4;
OPTION_SOUND          = 5;

	// possible actions
ACTION_MOVE     = 0;
ACTION_LOOK     = 1;
ACTION_SKILL    = 2;
ACTION_PASS     = 3;
ACTION_MOUSE    = 4;
ACTION_HOVER    = 5;
ACTION_MOUSEOUT = 6;

	// fog of war modes
SEEN_NO         = 0;
SEEN_YES        = 1;
SEEN_VISITED    = 2;
SEEN_FOG        = 3;
	
	// health and mana modes
MODE_HP         = -1;
MODE_MP         = -2;
MODE_ALL        = -3;
	
	// struct keys
KEY_REWARD      = 1;
KEY_TYPE        = 2;

	// map types
TYPE_LEVEL  = 1;
TYPE_QUEST  = 2;

	// changelog
CHANGELOG_ID    = 1;
CHANGELOG_TITLE = 2;
CHANGELOG_DATE  = 3;
CHANGELOG_TEXT  = 4;

	// log events
					// Description			Power
LOG_KILL         = 1;	// Mob killed			level difference
LOG_DEATH        = 2;	// Player dead			player level
LOG_CONFRONT     = 3;	// Boss confront		player level
LOG_END          = 4;	// Game ended			player level
LOG_LVLUP        = 5;	// Level up				player level
LOG_EXPLORE      = 6;	// Explore map			squares explored
LOG_CAST         = 7;	// Some skill			-
LOG_BUY          = 8   // Buy item
LOG_USE          = 9;  // Use item
LOG_SACRIFICE    = 10; // Sacrifice an item	item cost
LOG_ACTIVATE     = 11; // Some map object		-
LOG_STATE        = 12; // Got buff/debuff		Buff/debuff strength.
LOG_WORSHIP      = 13; // Started to worship god
LOG_RENOUNCE     = 14; // Was punished by the god
LOG_INVOKE       = 15; // Invoked a god's power
LOG_KEY_ACTION   = 16; //Player pressed key or mouse on field 
LOG_CHOOSE_SKILL = 17; //Player chose a skill
LOG_MOD_CHANGE   = 18; // Modifier change
LOG_TURN_PASSED  = 19; // Turn passes
LOG_GAME_START   = 20; // Game started
LOG_GOLD_GET     = 21; // Got some gold

	//Event data keys. Call = e[EVENT_TYPE, EVENT_TARGET_TYPE, EVENT_TARGET_ID, EVENT_TARGET_LVL, EVENT_TAG ]
EVENT_TYPE         = 0;
EVENT_TIME         = 1;
EVENT_TARGET_TYPE  = 2;  //Use object type keys like KEY_ENEMY
EVENT_TARGET_ID    = 3;  //Use specific object keys like NPC_CHANGELING 
EVENT_TARGET_LVL   = 4;
EVENT_TAG          = 5;
EVENT_LEVEL        = 6;  // Player level at the moment of the event

	// hero events
HERO_NAME         = 1;
HERO_SCORE        = 2;
HERO_LOCATION     = 3;
HERO_TURNS        = 4;
HERO_LEVEL        = 5;
HERO_ACHIEVEMENTS = 6;
HERO_LAST_MSG     = 7;
HERO_RACE         = 8;
HERO_CLASS        = 9;
HERO_DT           = 10;
HERO_GENDER       = 11;
HERO_ENDING       = 12;

	// object type keys
KEY_RACE        = 0;
KEY_CLASS       = 1;
KEY_FIELD       = 2;
KEY_ACHIEVEMENT = 3;
KEY_LANG        = 4;
KEY_OBJECT      = 5;
KEY_ENEMY       = 6;
KEY_ITEM        = 7;
KEY_TERRAIN     = 8;
KEY_LANGUAGE    = 9;
KEY_GOD         = 10;
KEY_PAGE        = 11;
KEY_NONE        = 12;

	// languages
LANGUAGE_EN     = 1;
LANGUAGE_FR     = 2;
LANGUAGE_RU     = 3;
LANGUAGE_IT     = 4;

LANGUAGE_TECH   = 5;

	// fight keys
BATTLE_INFLICTED   = 0;
BATTLE_RECEIVED    = 1;
BATTLE_MESSAGE     = 2;
BATTLE_MANA        = 3;
BATTLE_RESULT      = 4;
BATTLE_LIFE_PLAYER = 5;
BATTLE_LIFE_ENEMY  = 6;

	// battle modes
BATTLE_REGULAR     = 0;
BATTLE_RAINBOW     = 1;
BATTLE_SICKLE      = 2;
BATTLE_NAKED       = 3;
BATTLE_DRAGON      = 4;
BATTLE_NET         = 5; 

	//item types
ITEM_TYPE_COMMON  = 0;
ITEM_TYPE_MAGE    = 1;
ITEM_TYPE_FIGHTER = 2;

	//item subtypes
ITEM_SUBTYPE_UNDEFINED  = 0;
ITEM_SUBTYPE_CONSUMABLE = 1;
ITEM_SUBTYPE_BOOST      = 2;
ITEM_SUBTYPE_SKILL      = 3;

	//item states
ITEM_STATE_SHOP      = 0;
ITEM_STATE_BOUGHT    = 1;
ITEM_STATE_DESTROYED = 2;

	//npc traits
TRAIT_BLOODLESS      = 1;
TRAIT_BEAST          = 2;
TRAIT_BERSERK        = 3;
TRAIT_BLINK          = 4;
TRAIT_COWARD         = 5;
TRAIT_CURSED         = 6;
TRAIT_DEATH_WARD     = 7;
TRAIT_FIRST_STRIKE   = 8;
TRAIT_MAGICAL_ATTACK = 9;
TRAIT_MANA_DRAIN     = 10;
TRAIT_NO_EXPERIENCE  = 11;
TRAIT_POISON         = 12;
TRAIT_REGENERATE     = 13;
TRAIT_SLOW           = 14;
TRAIT_SPAWNS         = 15;
TRAIT_VAMPIRIC       = 16;
TRAIT_WEAKEN         = 17;
TRAIT_CHAMPION       = 18;
TRAIT_CASTER         = 19;
TRAIT_PEACEFUL       = 20;
TRAIT_FORESTER       = 21;
TRAIT_FOLLOWING      = 22;
TRAIT_SCARY          = 23;
TRAIT_CRYSTALS       = 24;

TRAIT_PHYS_DEF       = 50;
TRAIT_MAG_DEF        = 51;
TRAIT_CORRUPTION     = 52;
TRAIT_WEAKNESS       = 53;
TRAIT_LIFESTEAL      = 54;
TRAIT_INTEGRITY      = 55;
TRAIT_HOARD          = 56;

TRAIT_BOMB           = 70;
TRAIT_CAMOUFLAGE     = 71;
TRAIT_FLANKING       = 72;
TRAIT_CHARGE         = 73;
TRAIT_CHARGE2        = 74;
TRAIT_CHARGE3        = 75;
TRAIT_CHARGE4        = 76;

EFFECT_CURSED        = 100;
EFFECT_MANA_DRAIN    = 101;
EFFECT_POISON        = 102;
EFFECT_DEATH_WARD    = 103;
EFFECT_STONESKIN     = 104;
EFFECT_EMPOWER       = 105;
EFFECT_WHINE         = 106;
EFFECT_PEACEFUL      = 107;
EFFECT_SCARED        = 108;

	// skills
SKILL_ATTACK             = 1;
SKILL_MISSILE            = 2;
SKILL_SHIELD             = 3;
SKILL_APPLEKINESIS       = 4;
SKILL_BLINK              = 5;
SKILL_HEAL               = 6;
SKILL_STONESKIN          = 7;
SKILL_EMPOWER            = 8;
SKILL_WHINE              = 9;
SKILL_STARE              = 10;
SKILL_FORCE              = 11;
SKILL_FORCE_WAVE         = 12;
SKILL_FORCE_PONY         = 13;
SKILL_TALISMAN_SPIRITS   = 14;
SKILL_TALISMAN_WARRIOR   = 15;
SKILL_TALISMAN_ENDURANCE = 16;
SKILL_HOARD              = 17;

SKILL_SANTA_BELLS    = 100;
SKILL_SANTA_STRONG   = 101;
SKILL_SANTA_REWARD   = 102;

SKILL_FROST_ICEBORN  = 110;
SKILL_FROST_GENERAL  = 111;
SKILL_FROST_TOUCH    = 112;

SKILL_RARITY_ARMOR      = 120;
SKILL_RARITY_RESTOCK    = 121;
SKILL_RARITY_TOUCH      = 122;
SKILL_RARITY_GENEROSITY = 123;

SKILL_TWILIGHT_AFFINITY = 130;
SKILL_TWILIGHT_RECHARGE = 131;
SKILL_TWILIGHT_MINDLINK = 132;
SKILL_TWILIGHT_LEAK     = 133;
SKILL_TWILIGHT_BASICS   = 134;

SKILL_FLUTTERSHY_REMEDY    = 140;
SKILL_FLUTTERSHY_FORTITUDE = 141;
SKILL_FLUTTERSHY_PEACE     = 142;

SKILL_APPLEJACK_AXIOM      = 150;
SKILL_APPLEJACK_VISION     = 151;
SKILL_APPLEJACK_PRAGMATISM = 152;
SKILL_APPLEJACK_EVOLUTION  = 153;

	//items
ITEM_CUTIEMARK_STICKER   = 1;
ITEM_FARM_HAT            = 2;
ITEM_FORK                = 3;
ITEM_NAKED_OUTFIT        = 4;
ITEM_POWER_ARMOR         = 5;
ITEM_RAINBOW_ROD         = 6;
ITEM_SPOON               = 7;
ITEM_VOODOO_DOLL         = 8;
ITEM_WHINING             = 9;
ITEM_WIZARDS_CAP         = 10;
ITEM_WORN_ROBE           = 11;
ITEM_WORN_SADDLE         = 12;
ITEM_ZEBRA_CHARM         = 13;
ITEM_BINOCULAR           = 14;
ITEM_MOON_SICKLE         = 15;
ITEM_NET                 = 16;
ITEM_PINKIE_STIMULANT    = 17;
ITEM_ELDERS_SCROLL       = 18;
ITEM_CUP                 = 19;
ITEM_ROD_OF_AGES         = 20;
ITEM_DRAINING_WHIP       = 21;
ITEM_BLOODTHRISTER       = 22;
ITEM_GAS_MASK            = 23;
ITEM_BLOOD_GEM           = 24;
ITEM_CURSED_MONOCLE      = 25;
ITEM_CAULDRON            = 26;
ITEM_SOCKS               = 27;

ITEM_SCROLL_APPLEKINESIS = 101;
ITEM_SCROLL_BLINK        = 102;
ITEM_SCROLL_EMPOWER      = 103;
ITEM_SCROLL_FORCE        = 104;
ITEM_SCROLL_HEAL         = 105;
ITEM_SCROLL_SHIELD       = 106;
ITEM_SCROLL_STARE        = 107;
ITEM_SCROLL_STONESKIN    = 108;
ITEM_SCROLL_WHINE        = 109;

ITEM_MUFFIN              = 201;
ITEM_POTION_HEALTH       = 202;
ITEM_POTION_MANA         = 203;
ITEM_POTION_EXP          = 204;
ITEM_POTION_STRENGTH     = 205;
ITEM_POTION_ENDURANCE    = 206;
ITEM_POTION_WONDER       = 207;

	// herbs
HERB_GREEN               = 1;
HERB_RED                 = 2;
HERB_BLUE                = 3;

	// map objects
OBJECT_UNKNOWN           = 0;
OBJECT_BRIGHT_TORCH      = 1;
OBJECT_CLEAR_POOL        = 2;
OBJECT_ELEMENT_MAGIC     = 3;
OBJECT_GEMS              = 4;
OBJECT_MONEY             = 5;
OBJECT_SIGN              = 6;
OBJECT_SMALL_POOL        = 7;
OBJECT_TOMES             = 8;
OBJECT_TORCH             = 9;
OBJECT_TRAP_PIT          = 10;
OBJECT_TRAP_TELEPORT     = 11;
OBJECT_VICTORY           = 12;
OBJECT_ALTHAR            = 13;
OBJECT_TRAP_CORRUPTION   = 14;
OBJECT_TREE              = 15;
OBJECT_ICE_WALL          = 16;
OBJECT_ICE_STATUE        = 17;
OBJECT_RAINBOW           = 18;
OBJECT_HERB              = 19;
OBJECT_SWITCH            = 20;
OBJECT_WARD              = 21;
OBJECT_TRAP_WALLPASS     = 22;
OBJECT_TRAP_SPOOKS       = 23;

	// npc
NPC_CHANGELING           = 1;
NPC_CHANGELING_ENCHANTER = 2;
NPC_CHANGELING_MAGE      = 3;
NPC_DIAMOND_DOG          = 4;
NPC_DIAMOND_GUARD        = 5;
NPC_DUMMY                = 6;
NPC_DUSTER               = 7;
NPC_FILLYFOOLER          = 8;
NPC_FLYING_HOOF          = 9;
NPC_FOALFIDDLER          = 10;
NPC_HYDRA                = 11;
NPC_CHANGELING_LESSER    = 12;
NPC_VORTEX               = 13;
NPC_MANTICORE            = 14;
NPC_MOLE                 = 15;
NPC_PARASPRITE           = 16;
NPC_MUMMY                = 17;
NPC_TIMBERWOLF           = 18;
NPC_WILD_BRONY           = 19;
NPC_WINDIGO              = 20;
NPC_WRABBIT              = 21;
NPC_HAY_PILE             = 22;
NPC_MIMIC                = 23;
NPC_TENTACLESHY          = 24;
NPC_WHICH_KING           = 25;
NPC_ANIMATED_ARMOUR      = 26;
NPC_SHADOW               = 27;
	

	// race constants
RACE_PONY       = 1;
RACE_PEGASUS    = 2;
RACE_UNICORN    = 3;
RACE_ALICORN    = 4;
RACE_ZEBRA      = 5;
RACE_DRAGON     = 6;
RACE_CHANGELING = 7;
RACE_GRYPHON    = 8;

	// class constants
CLASS_WIZARD    = 1;
CLASS_HEALER    = 2;
CLASS_WARRIOR   = 3;
CLASS_ROGUE     = 4;
CLASS_ALCHEMIST = 5;
CLASS_SCOUT     = 6;
CLASS_TRICKSTER = 7;
CLASS_FARMER    = 8;
CLASS_MERCHANT  = 9;

CLASS_NPC       = 100;

	// endings
ENDING_BAD        = 0;
ENDING_GOOD       = 1;
ENDING_NEUTRAL    = 2;
ENDING_CORRUPTION = 3;

	// religions
RELIGION_NONE       = 0;
RELIGION_RARITY     = 1;
RELIGION_FLUTTERSHY = 2;
RELIGION_DASH       = 3;
RELIGION_TWILIGHT   = 4;
RELIGION_PINKIE     = 5;
RELIGION_APPLEJACK  = 6;
RELIGION_LUNA       = 7;
RELIGION_CELESTIA   = 8;
RELIGION_DISCORD    = 9;


RELIGION_SANTA      = -1;
RELIGION_FROST      = -2;