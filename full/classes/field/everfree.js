function TFieldEverfree()
{
	ExtClass.call(this, {AbstractField: null});
	this.id        = FIELD_EVERFREE;
	this.scoreMult = 1.5;
	this.trees     = 0;
	this.trees_cut = 0;
	
	this.gameEnd = function(res)
	{		
		if(res != ENDING_BAD && res != ENDING_CORRUPTION)
		{
			if (World.player._class == CLASS_ALCHEMIST && World.player._race == RACE_ZEBRA)
				World.wrapper.addPossibleAchievement(REWARD_STRIPED_ALCHEMIST);
			if (World.player._class == CLASS_HEALER && World.player._race == RACE_PEGASUS && this.trees_cut == 0)
				World.wrapper.addPossibleAchievement(REWARD_SERENITY);
			if (this.trees_cut >= this.trees*0.8)
				World.wrapper.addPossibleAchievement(REWARD_REAVER);
			if(World.turns <= 300)
				World.wrapper.addPossibleAchievement(REWARD_ESCAPE_VELOCITY);
			
			return 75;
		}
		
		return 0;
	}
	
	this.generateMap = function()
	{
		var a = [];
		for(var x = 0; x < World.map.sizeX; x++)
		{
			a[x] = [];
			for(var y = 0; y < World.map.sizeY; y++)
				a[x][y] = '?';
		}	
		
		var types = ['H','V','R','R'];
		var assert = true;
		while(assert)
		{
			var px = 0;
			var py = 0;
			
			for(x = 0; x < World.map.sizeX; x++)
				for(y = 0; y < World.map.sizeY; y++)
					if(a[x][y] == '?')
					{
						px = x;
						py = y;
					}
			
			var type = types[World.seedRandom.mt_rand(0, types.length - 1)];
			var size = World.seedRandom.mt_rand(2, 4);
			if(type == 'H' || type == 'V')
				size = size*2;
			
			for(x = px; x > px - size; x--)
				for(y = py; y > py - size; y--)
					if(a[x] != undefined && a[x][y] != undefined && a[x][y] == '?')
					{
						if(x == px && type == 'H')
							a[x][y] = '.';
						if(y == py && type == 'V')
							a[x][y] = '.';
						if(type == 'R' && World.seedRandom.mt_rand(0, 3) > 0)
							a[x][y] = '.';
					}
					
			assert = false;
			for(x = 0; x < World.map.sizeX; x++)
				for(y = 0; y < World.map.sizeY; y++)
					if(a[x][y] == '?')
					{
						var is_wall = false;
						for(var i = x - 1; i <= x + 1; i++)
							for(var j = y - 1; j <= y + 1; j++)
								if(a[i] != undefined && a[i][j] != undefined && a[i][j] == '.')
									is_wall = true;
						
						if(is_wall)
						{
							if(World.seedRandom.mt_rand(0, 1) > 0)
								a[x][y] = '#';
							else
								a[x][y] = '.';
						}
						else
							assert = true;
					}
		}
		
		
		this.trees = 0;
		for(x = 0; x < World.map.sizeX; x++)
			for(y = 0; y < World.map.sizeY; y++)
				if(a[x][y] == '#')
				{
					var s = new TObjectTree();
					s.init();
					World.map.addObject(s, x, y);
					this.trees++;
				}	
	}
	
	this.init = function()
	{
		World.map = new TMap();
		World.player.x     = World.seedRandom.mt_rand(5,9);
		World.player.y     = World.seedRandom.mt_rand(5,9);
		World.player.level = 1;
		World.player.gp    = 20;
		
		World.map.init(18, 14, TERRAIN_GRASS);
		this.generateMap();
		
				// common mobs
		var levels = [0, 5, 5, 5, 5, 3, 3, 3, 3, 3, 0, 1];
		var mobs   = [];

		///*
		mobs[NPC_TENTACLESHY] = [0, 0,0,0,0,0,0,0,0,0,0,1]; 
		mobs[NPC_HYDRA]       = [0, 0,0,0,0,0,0,1,1,1,0,0]; 
		mobs[NPC_FLYING_HOOF] = [0, 1,1,1,1,1,0,0,0,0,0,0]; 
		mobs[NPC_MANTICORE]   = [0, 0,0,0,0,1,1,1,0,1,1,0]; 
		mobs[NPC_MIMIC]       = [0, 0,0,0,1,1,1,1,0,0,0,0]; 
		mobs[NPC_MOLE]        = [0, 0,1,1,0,0,1,1,0,1,1,0]; 
		mobs[NPC_PARASPRITE]  = [0, 0,0,1,1,1,1,1,1,0,0,0]; 
		mobs[NPC_TIMBERWOLF]  = [0, 0,0,0,0,0,1,1,1,1,1,0]; 
		//*/
		
		this.fillMobs(mobs, levels);
		this.addGods(2);
		
				// distribute objects
		var num = (World.player._class == CLASS_MERCHANT)?2:0;
		this.placeObjects(num, [TObjectMoney]);		
		num = (World.player._class == CLASS_SCOUT)?5:3;
		this.placeObjects(num, [TObjectClearPool, TObjectSmallPool]);
		num = (World.player._class == CLASS_SCOUT)?1:2;
		this.placeObjects(num, [TObjectTrapPit]);

			// finishing!
		World.player.refresh();
		World.map.initFoV(World.player.x, World.player.y, World.player.sight, 1);
		
//		for(var x = 0; x < World.map.sizeX; x++)
//			for(var y = 0; y < World.map.sizeY; y++)
//				World.map.seen[y][x] = SEEN_VISITED;		
	};
}

TConfig.objects[KEY_FIELD][FIELD_EVERFREE] = new TFieldEverfree();
addField(FIELD_EVERFREE , REWARD_GAME  , TYPE_LEVEL);

