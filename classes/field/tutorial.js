function TFieldTutorial()
{
	ExtClass.call(this, {AbstractField: null});
	
	this.scoreMult = 0.25;
	this.id = FIELD_TUTORIAL
	
	this.gameEnd = function(res)
	{
		if(res == ENDING_GOOD && res != ENDING_CORRUPTION)
		{
			World.wrapper.addPossibleAchievement(REWARD_TUTORIAL);
			
			if(World.map.objects[6] != undefined && World.map.objects[6][23] != undefined && World.map.objects[6][23][1] != undefined)
				World.wrapper.addPossibleAchievement(REWARD_POSTGRADUATE);
		}
		
		return 0;
	}
	
	this.init = function()
	{
		World.map = new TMap();
		World.map.init(29, 9, TERRAIN_WALL);

		World.player.x     = 1;
		World.player.y     = 1;
		
		World.player.init(RACE_UNICORN, CLASS_WIZARD);
		World.player._name  = lang('tutorial.playerName'); 
		
		World.player.gp       = 10;
		World.player.color    = 'violet';
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.player, 0.3, lang('field.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_BASE, World.player, 20, lang('field.' + this.id  + '.title'));
		
		for(var y = 1; y < 7; y++)
			World.map.terrain[y][1] = TERRAIN_FLOOR;

		for(var y = 1; y < 7; y++)
			World.map.terrain[y][15] = TERRAIN_FLOOR;
		
		World.map.terrain[3][2] = TERRAIN_FLOOR;
		World.map.terrain[4][2] = TERRAIN_FLOOR;

		for(var x = 1; x <= 23; x++)
			World.map.terrain[6][x] = TERRAIN_FLOOR;
		
			// placeholder for objects
		var s = false;

				// library
		for(x = 9; x < 13; x++)
			for(y = 5; y <= 7; y++)
			{
				World.map.terrain[y][x] = TERRAIN_FLOOR;
				if(y != 6)
				{
					s = new TObjectTomes();
					s.init();
					World.map.addObject(s, x, y);
				}
			}

				// element room
		for(x = 18; x <= 22; x++)
			for(y = 5; y <= 7; y++)
				World.map.terrain[y][x] = TERRAIN_FLOOR;
		World.map.terrain[5][19] = TERRAIN_WALL;
		World.map.terrain[5][21] = TERRAIN_WALL;
		World.map.terrain[7][19] = TERRAIN_WALL;
		World.map.terrain[7][21] = TERRAIN_WALL;
		
				// finishing
		for(x = 13; x <= 17; x++)
			for(y = 1; y <= 3; y++)
				World.map.terrain[y][x] = TERRAIN_GRASS;


			// adding some objects
		var s1 = new TObjectSign();
		s1.init(lang('tutorial.move'));
		World.map.addObject(s1, 1, 1);
		
		s = new TObjectSign();
		s.init(lang('tutorial.enemy'));
		World.map.addObject(s, 1, 5);
				
		s = new TObjectTorch();
		s.init();
		World.map.addObject(s, 2, 4);
		
		s = new TNPCDummy();
		s.id = NPC_DUMMY;
		s.init(1);
		World.map.addObject(s, 1, 6);
		
		s = new TObjectSign();
		s.init(lang('tutorial.first_blood'));
		World.map.addObject(s, 2, 6);
				
		s = new TObjectBrightTorch();
		s.init();
		World.map.addObject(s, 3, 6);
		
		s = new TNPCDummy();
		s.id = NPC_DUMMY;
		s.init(1);
		World.map.addObject(s, 5, 6);
		
		s = new TObjectSign();
		s.init(lang('tutorial.levelup'));
		World.map.addObject(s, 6, 6);
				
		s = new TObjectSign();
		s.init(lang('tutorial.library'));
		World.map.addObject(s, 8, 6);
				
		s = new TObjectSign();
		s.init(lang('tutorial.fireball'));
		World.map.addObject(s, 19, 6);
		
		s = new TObjectSign();
		s.init(lang('tutorial.finish'));
		World.map.addObject(s, 15, 6);
		
		s = new TNPCDiamondGuard();
		s.id = NPC_DIAMOND_GUARD;
		s.init(5);
		World.map.addObject(s, 17, 6);
		
		s = new TNPCMagicVortex();
		s.id = NPC_VORTEX;
		s.init(6);
		World.map.addObject(s, 22, 7);
		
		s = new TNPCMagicVortex();
		s.id = NPC_VORTEX;
		s.init(6);
		World.map.addObject(s, 22, 5);
		
		s = new TNPCMagicVortex();
		s.id = NPC_VORTEX;
		s.init(10);
		s.abilities.push(TRAIT_CHAMPION);
		World.map.addObject(s, 15, 3);
		
		s = new TObjectElementMagic();
		s.init();
		World.map.addObject(s, 23, 6);
		
				// finishing!
		World.player.refresh();
		World.map.initFoV(World.player.x, World.player.y, 2, 1);
		s1.onLook();
	};
	
	this.isItemBanned = function (itemCode)
	{
		if (itemCode == ITEM_SCROLL_BLINK)
			return true;
		
		return false;
	};
}

TConfig.objects[KEY_FIELD][FIELD_TUTORIAL] = new TFieldTutorial();
addField(FIELD_TUTORIAL  , REWARD_NONE     , TYPE_LEVEL);	
