var TConfig = 	
	{ 
		sizeX     : 23,
		sizeY     : 10,
		debug     :  0,
		mapD      :  0,
		
		pwd       : 'ajwi211m',

		version   : '?.?.?',

			//html elements
					//menu elements
		menuID          : "#menu",
					//in-game elements
		gameID          : "#game",
		replayControlsID: "#replay_controls_holder",
		consoleID       : "#console",
		consoleAlertID  : "#consoleAlert",
		mapID           : "#map_placeholder",
		btnID           : "#b_holder",
		
		charmenuID      : "#main_menu",
		shopID          : "#shop",
		messageID       : "#message",

		preloadID       : "#preloader",
		preloadBarID    : "#preload-bar",

					//splash screen
		splashID        : "#splash",
		splashConsole   : "#splash_console",
		splashLog       : "#splash_log",
		splashTime      : "#splash_time",
		
				//basic classes
		btnClass        : "btn",
		btnSmallClass   : "btn-small",
		
				// map
		fogClass        : "fog-",
		npcLevelClass   : "npc-level",
		
				// shop
		itemTypeClass   : "item-",
		
					//all predefined data goes here
		data      : new Array(),
					//object instances go here
		objects   : new Array(),
					//skills
		skills    : new Array(),
					//game state handlers
		handlers  : new Array(),
					//changelog
		changelog : new Array()
	};

		// simple data
TConfig.data[KEY_RACE]        = new Array();
TConfig.data[KEY_CLASS]       = new Array();
TConfig.data[KEY_FIELD]       = new Array();
TConfig.data[KEY_ACHIEVEMENT] = new Array();
TConfig.data[KEY_LANG]        = new Array();
TConfig.data[KEY_LANGUAGE]    = new Array();

		// different objects
TConfig.objects[KEY_FIELD]       = new Array();
TConfig.objects[KEY_ENEMY]       = new Array();
TConfig.objects[KEY_ITEM]        = new Array();
TConfig.objects[KEY_TERRAIN]     = new Array();
TConfig.objects[KEY_GOD]         = new Array();
TConfig.objects[KEY_CLASS]       = new Array();
TConfig.objects[KEY_RACE]        = new Array();
TConfig.objects[KEY_OBJECT]      = new Array();

TConfig.possibleHerbs = [HERB_BLUE, HERB_GREEN, HERB_RED];

