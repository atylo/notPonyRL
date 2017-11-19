function TFieldHive()
{
	ExtClass.call(this, {AbstractField: null});
	this.id = FIELD_HIVE;
	this.scoreMult = 1.5;
	
	this.gameEnd = function(res)
	{
		if(res != ENDING_BAD && res != ENDING_CORRUPTION)
		{
			World.wrapper.addPossibleAchievement(REWARD_HIVE);
			return 100;	
		}
		
		return 0;
	}
	
	this.init = function()
	{
		World.map = new TMap();
		World.player.x     = World.seedRandom.mt_rand(5,9);
		World.player.y     = World.seedRandom.mt_rand(5,9);
		World.player.level = 1;
		World.player.gp    = 20;
		
		World.map.init(16, 16, TERRAIN_FLOOR);
		this.placeWalls(MAP_V_TUNNELS, 5);
		
				// common mobs
		var levels = [0, 5, 4, 4, 4, 3, 3, 3, 4, 4, 2, 1];
		var mobs   = [];

		///*
		mobs[NPC_CHANGELING_MAGE]      = [0, 1,1,1,0,0,0,1,1,1,0,1]; 
		mobs[NPC_CHANGELING_ENCHANTER] = [0, 0,0,0,1,1,1,1,1,1,0,1]; 
		mobs[NPC_CHANGELING_LESSER]    = [0, 1,1,1,1,1,1,0,0,0,0,0]; 
		mobs[NPC_CHANGELING]           = [0, 0,0,0,0,1,1,1,1,1,1,1]; 
		//*/
		
		this.fillMobs(mobs, levels);
		
				// distribute objects
		var num = (World.player._class == CLASS_MERCHANT)?4:2;
		this.placeObjects(num, [TObjectMoney]);
		num = (World.player._class == CLASS_SCOUT)?4:2;
		this.placeObjects(num, [TObjectClearPool, TObjectSmallPool, TObjectGems]);
		this.placeObjects(5, [TObjectTrapTeleport]);
		this.placeObjects(6, [TObjectTrapPit]);
		this.placeObjects(5, [TObjectTrapCorruption]);
		this.addGods(1);
				// finishing!
		World.player.refresh();
		World.map.initFoV(World.player.x, World.player.y, World.player.sight, 1);
	};
}

TConfig.objects[KEY_FIELD][FIELD_HIVE] = new TFieldHive();
addField(FIELD_HIVE , REWARD_GAME  , TYPE_LEVEL);

