function TFieldNormal()
{
	ExtClass.call(this, {AbstractField: null});
	this.id = FIELD_NORMAL;
	
	this.gameEnd = function(res)
	{
		if(res != ENDING_BAD && res != ENDING_CORRUPTION)
		{
			World.wrapper.addPossibleAchievement(REWARD_GAME);
			if(World.turns <= 430)
				World.wrapper.addPossibleAchievement(REWARD_ADVENTURE_BOOM);
			
			return 50;	
		}
		
		return 0;
	}
	
	this.init = function()
	{
		World.map = new TMap();
		World.player.x     = 7;
		World.player.y     = 7;
		World.player.level = 1;
		World.player.gp    = 10;
		
		World.map.init(16, 16, TERRAIN_FLOOR);
		this.placeWalls(MAP_H_TUNNELS, 3);

				// common mobs
		var levels = [0, 10, 5, 4, 4, 4, 3, 3, 3, 2, 1];
		var mobs   = [];

		///*
		mobs[NPC_FLYING_HOOF]       = [0, 1,1,1,1,1,0,0,0,0,0]; 
		mobs[NPC_PARASPRITE]        = [0, 0,0,1,1,1,1,1,0,0,0]; 
		mobs[NPC_DUSTER]            = [0, 1,1,1,1,0,0,0,0,0,0]; 
		mobs[NPC_DIAMOND_DOG]       = [0, 1,1,1,1,1,1,1,1,1,0]; 
		mobs[NPC_DIAMOND_GUARD]     = [0, 1,1,1,1,1,1,1,1,1,0]; 
		mobs[NPC_MOLE]              = [0, 1,1,1,1,1,1,1,1,0,0]; 
		mobs[NPC_CHANGELING_LESSER] = [0, 0,0,0,1,1,1,1,1,0,0]; 
		mobs[NPC_CHANGELING_MAGE]   = [0, 0,0,0,1,1,1,1,1,0,0]; 
		mobs[NPC_VORTEX]            = [0, 1,1,1,1,1,1,1,1,1,0]; 
		mobs[NPC_WILD_BRONY]        = [0, 1,1,1,1,1,1,1,1,1,0]; 
		mobs[NPC_FILLYFOOLER]       = [0, 0,0,1,1,1,1,1,1,1,0]; 
		mobs[NPC_FOALFIDDLER]       = [0, 0,0,1,1,1,1,1,1,1,0]; 
		mobs[NPC_WRABBIT]           = [0, 0,1,1,1,1,1,1,0,0,0]; 
		mobs[NPC_TIMBERWOLF]        = [0, 0,0,0,0,0,1,1,1,1,0]; 
		mobs[NPC_WINDIGO]           = [0, 0,0,0,0,0,0,1,1,1,0]; 
		mobs[NPC_HYDRA]             = [0, 0,0,0,0,0,0,1,1,1,0]; 
		mobs[NPC_MANTICORE]         = [0, 0,0,0,0,0,0,1,1,1,0]; 
		mobs[NPC_CHANGELING]        = [0, 0,0,0,0,0,0,0,0,0,1]; 
		//*/
		
		this.fillMobs(mobs, levels);
		
				// distribute objects
		var num = (World.player._class == CLASS_MERCHANT)?5:3;
		this.placeObjects(num, [TObjectMoney]);
		
		num = (World.player._class == CLASS_SCOUT)?5:3;
		this.placeObjects(num, [TObjectClearPool, TObjectSmallPool, TObjectTomes, TObjectGems]); 
		
		this.addGods(2);
				// finishing!
		World.player.refresh();
		World.map.initFoV(World.player.x, World.player.y, World.player.sight, 1);
	};
}

TConfig.objects[KEY_FIELD][FIELD_NORMAL] = new TFieldNormal();
addField(FIELD_NORMAL    , REWARD_TUTORIAL , TYPE_LEVEL);	


