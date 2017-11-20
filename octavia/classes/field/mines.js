function TFieldMines()
{
	ExtClass.call(this, {AbstractField: null});
	this.id = FIELD_MINES;
	this.scoreMult = 1.25;
	
	this.gameEnd = function(res)
	{
		if(res != ENDING_BAD && res != ENDING_CORRUPTION)
		{
			if(World.player.gp > 120)
				World.wrapper.addPossibleAchievement(REWARD_GEMHUNTER);

			if (World.player._class == CLASS_ROGUE && World.player._race == RACE_UNICORN)
				World.wrapper.addPossibleAchievement(REWARD_VOGUE_ROGUE);
			
			if (World.player._class == CLASS_SCOUT && World.player._race == RACE_PONY)
				World.wrapper.addPossibleAchievement(REWARD_HAT_AND_WHIP);
			
			return 100;	
		}
		
		return 0;
	}
	
	this.init = function()
	{
		World.map = new TMap();
		World.player.x     = 7;
		World.player.y     = 7;
		World.player.level = 1;
		
		World.map.init(16, 16, TERRAIN_FLOOR);
		this.placeWalls(MAP_H_TUNNELS, 3);
		
				// common mobs
		var levels = [0, 10, 4, 4, 4, 4, 4, 3, 3, 2, 1];
		var mobs   = [];

		///*
		mobs[NPC_PARASPRITE]        = [0, 0,0,1,1,1,1,1,0,0,0]; 
		mobs[NPC_DUSTER]            = [0, 1,1,1,1,0,0,0,0,0,0]; 
		mobs[NPC_DIAMOND_DOG]       = [0, 1,1,1,1,1,1,1,1,1,1]; 
		mobs[NPC_DIAMOND_GUARD]     = [0, 1,1,1,1,1,1,1,1,1,1]; 
		mobs[NPC_MOLE]              = [0, 1,1,1,1,1,1,1,1,1,0]; 
		mobs[NPC_CHANGELING_LESSER] = [0, 1,1,1,1,1,1,1,1,0,0]; 
		mobs[NPC_VORTEX]            = [0, 1,1,1,1,1,1,1,1,1,0]; 
		mobs[NPC_WILD_BRONY]        = [0, 1,1,1,1,1,1,1,1,1,0]; 
		mobs[NPC_FILLYFOOLER]       = [0, 0,0,1,1,1,1,1,1,1,0]; 
		mobs[NPC_FOALFIDDLER]       = [0, 0,0,1,1,1,1,1,1,1,0]; 
		mobs[NPC_WINDIGO]           = [0, 0,0,0,0,0,0,1,1,1,0]; 
		//*/
		this.fillMobs(mobs, levels);
		
		// distribute objects
		var num = (World.player._class == CLASS_MERCHANT)?6:4;
		this.placeObjects(num, [TObjectMoney]);
		num = (World.player._class == CLASS_SCOUT)?6:4;
		this.placeObjects(num, [TObjectClearPool, TObjectSmallPool, TObjectTomes]); 	
		this.placeObjects(8, [TObjectTrapTeleport]);
		this.placeObjects(10, [TObjectTrapPit]);
		this.placeObjects(4, [TObjectGems]);
		this.addGods(2);
				// finishing!
		World.player.refresh();
		World.map.initFoV(World.player.x, World.player.y, World.player.sight, 1);
	};
}

TConfig.objects[KEY_FIELD][FIELD_MINES] = new TFieldMines();
addField(FIELD_MINES     , REWARD_GAME     , TYPE_LEVEL);


