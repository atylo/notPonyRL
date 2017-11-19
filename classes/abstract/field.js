function AbstractField()
{
	this.gods      = [];
	this.scoreMult = 1;
	
	this.addGods = function(num)
	{
		this.gods = [];
		
		var gods = new Array()
		for(i in TConfig.objects[KEY_GOD])
		{
			var cur_god = TConfig.objects[KEY_GOD][i];
			if(cur_god.achievement && World.getHandler().achievements[cur_god.achievement] == undefined)
				continue;
				
			
			if(i != RELIGION_NONE)
				gods.push(TConfig.objects[KEY_GOD][i].id);
		}

		shuffle(gods);
		
		for(var i = 0; i < num; i++)
			if(gods[i] != undefined)
			{
				this.gods.push(gods[i]);
			}
			
		for(i in this.gods)
		{
			var a = new TObjectAlthar();
			a.initGod(this.gods[i]);
			World.map.placeObject(a);
		}
		return this.gods.length;
	};
	
	this.fillMobs = function(mobs, levels)
	{
		for(var lvl in levels)
		{
			var i = lvl;
			var mob_arr = [];
			for(var j in mobs)
				if(mobs[j][i] == 1)
					mob_arr.push(j);
			
			for(var j = 1; j <= levels[i]; j++)
			{
				var d = mob_arr[World.seedRandom.mt_rand(0, mob_arr.length-1)];
				var mob = jQuery.extend(true, {}, TConfig.objects[KEY_ENEMY][d]);
				
				mob.init(i);
				mob = this.initMob(mob);
				if(lvl == (levels.length - 1))
					mob.abilities.push(TRAIT_CHAMPION);
				World.map.placeObject(mob);
			}
		}
	}
	
		// Randomly distributes some random objects from array given.
	this.placeObjects = function(qty, objectTypes) 
	{	
		if (objectTypes instanceof Array) 
		{
			for(var i = 0; i < qty; i++)
			{
				var s = new objectTypes[World.seedRandom.mt_rand(0, objectTypes.length-1)];
				s.init();
				World.map.placeObject(s);
				s.initAfterPlacement();
			}
		}
	}
	
	this.placeWalls = function(mapType, scatterFactor) 
	{
		if (mapType == MAP_H_TUNNELS) 
		{
			for(var y = 0; y < World.map.sizeY/2; y++)
				for(var x = 0; x < World.map.sizeX; x++)
					World.map.terrain[y*2][x] = TERRAIN_WALL;

			for(var y = 0; y < World.map.sizeY/2; y++)
				for(var i = 1; i < scatterFactor+World.seedRandom.mt_rand(0,3); i++)
					World.map.terrain[y*2][World.seedRandom.mt_rand(0,World.map.sizeX-1)] = World.map.default_terrain;


			for(var dy = -1; dy <= 1; dy++)
				for(var dx = -1; dx <= 1; dx++)
					World.map.terrain[World.player.y + dy][World.player.x + dx]  = World.map.default_terrain;
					
		}
		else if (mapType == MAP_V_TUNNELS)
		{
			for(var x = 0; x < World.map.sizeX/2; x++)
				for(var y = 0; y < World.map.sizeY; y++)
					World.map.terrain[y][x*2] = TERRAIN_WALL;
					
			for(var x = 0; x < World.map.sizeX/2; x++)
				for(var i = 1; i < scatterFactor+World.seedRandom.mt_rand(0,3); i++)
					World.map.terrain[World.seedRandom.mt_rand(0,World.map.sizeY-1)][x*2] = World.map.default_terrain;
					
			for(var dy = -1; dy <= 1; dy++)
				for(var dx = -1; dx <= 1; dx++)
					World.map.terrain[World.player.y + dy][World.player.x + dx] = World.map.default_terrain;
		}
		else if (mapType == MAP_CUSTOM) 
		{
		
		}
	}
		
	this.react = function(e)
	{
		return false;
	};
	
	this.customReact = function(e)
	{
		return false;
	};
	
	this.gameEnd = function(res)
	{
		return 0;
	}
	
	this.init = function()
	{
		
	};
	
	this.initMob = function(mob)
	{
		return mob;
	};
	
	this.show = function()
	{
		var output = new Array();
	};
	
	this.isCustom = function()
	{
		return false;
	}
	
	this.isItemBanned = function (itemCode)
	{
		return false;
	};
}
