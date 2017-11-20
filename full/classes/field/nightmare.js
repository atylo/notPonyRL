function TFieldNightmare()
{
	ExtClass.call(this, {AbstractField: null});
	this.id = FIELD_NIGHTMARE;
	this.scoreMult = 2;
	
	this.gameEnd = function(res)
	{
		if(res != ENDING_BAD && res != ENDING_CORRUPTION)
		{
			World.wrapper.addPossibleAchievement(REWARD_NIGHTMARE);
			
			if(World.player.hp == World.player.getMaxHP())
				World.wrapper.addPossibleAchievement(REWARD_LIKE_A_BOSS);
			if(World.player._race == RACE_DRAGON)
				World.wrapper.addPossibleAchievement(REWARD_PLANNING);

			return 200;
		}
		
		return 0;
	}
	
	this.init = function()
	{
		World.map = new TMap();
		World.player.x     = 7;
		World.player.y     = 7;
		World.player.level = 1;
		
		World.map.init(16,16, TERRAIN_FLOOR);
		this.placeWalls(MAP_H_TUNNELS, 3);

				// common mobs
		var levels = [0, 8, 5, 4, 4, 4, 3, 3, 4, 2, 2];
		var mobs   = [];

		///*
		mobs[NPC_PARASPRITE]           = [0, 0,0,1,1,1,1,1,0,0,0];
		mobs[NPC_DUSTER]               = [0, 1,1,1,1,1,1,1,1,1,1]; 
		mobs[NPC_CHANGELING_LESSER]    = [0, 0,0,0,1,1,1,1,1,0,0];
		mobs[NPC_CHANGELING_MAGE]      = [0, 0,0,0,0,0,0,0,1,1,1];
		mobs[NPC_CHANGELING_ENCHANTER] = [0, 0,0,0,0,0,0,0,1,1,1];
		mobs[NPC_VORTEX]               = [0, 1,1,1,1,1,1,1,1,1,0]; 
		mobs[NPC_WILD_BRONY]           = [0, 1,1,1,1,1,1,1,1,1,0]; 
		mobs[NPC_FILLYFOOLER]          = [0, 0,0,1,1,1,1,1,1,1,0]; 
		mobs[NPC_FOALFIDDLER]          = [0, 0,0,1,1,1,1,1,1,1,0]; 
		mobs[NPC_TIMBERWOLF]           = [0, 0,0,0,0,0,1,1,1,1,0];
		mobs[NPC_HYDRA]                = [0, 0,0,0,0,0,0,1,1,1,0]; 
		mobs[NPC_MANTICORE]            = [0, 0,0,0,0,0,0,1,1,1,0]; 
		mobs[NPC_CHANGELING]           = [0, 0,0,0,0,0,0,0,0,0,1]; 
		mobs[NPC_MIMIC]                = [0, 0,0,0,1,1,1,1,1,0,0];
		mobs[NPC_SHADOW]               = [0, 0,1,1,1,1,1,1,1,1,1];
		//*/
		
		this.fillMobs(mobs, levels);
		
				// distribute objects
		var num = (World.player._class == CLASS_MERCHANT)?5:3;
		this.placeObjects(num, [TObjectMoney]);
		num = (World.player._class == CLASS_SCOUT)?5:3;
		this.placeObjects(num, [TObjectClearPool, TObjectSmallPool, TObjectTomes, TObjectGems]);
		this.addGods(1);
				// finishing!
		World.player.refresh();
		World.map.initFoV(World.player.x, World.player.y, World.player.sight, 1);
	};
	
	this.initMob = function(mob)
	{
		if(World.seedRandom.mt_rand(0,1) == 0)
			mob.effects.push(EFFECT_EMPOWER);
		else
			mob.effects.push(EFFECT_STONESKIN);
		if(!mob.hasEffect(EFFECT_DEATH_WARD) && World.seedRandom.mt_rand(0,1) == 0)
			mob.effects.push(EFFECT_DEATH_WARD);
		
		return mob;
	};
}

TConfig.objects[KEY_FIELD][FIELD_NIGHTMARE] = new TFieldNightmare();
addField(FIELD_NIGHTMARE , REWARD_100_DMG  , TYPE_LEVEL);

