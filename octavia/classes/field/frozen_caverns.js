function TFieldFrozenCaverns()
{
	ExtClass.call(this, {AbstractField: null});
	this.id = FIELD_FROZEN_CAVERNS;
	this.gameEnd = function(res)
	{
		if(res != ENDING_BAD && res != ENDING_CORRUPTION)
		{
			World.wrapper.addPossibleAchievement(REWARD_GAME);
			return 50;	
		}
		return 0;
	}
	
	this.init = function()
	{
		this.bossBlinked    = false;
		this.bossConfronted = false;
		this.bossTurnCount  = 0;
		this.bossX          = 0;
		this.bossY          = 0;
		this.firstWall      = true;
		
		World.map = new TMap();
		World.player.level = 1;
		World.map.init(18, 18, TERRAIN_ICE_FLOOR);
		
		this.generateMap();
		
		var levels = [0, 5, 6, 5, 5, 4, 4, 4, 3, 3, 2, 1];
		var mobs   = [];

		
		mobs[NPC_FLYING_HOOF]          = [0, 1,1,1,1,1,0,0,0,0,0,0]; 
		mobs[NPC_MIMIC]                = [0, 0,0,0,1,1,1,1,0,0,0,0]; 
		mobs[NPC_VORTEX]               = [0, 0,0,0,0,1,1,1,1,0,0,0]; 
		mobs[NPC_TIMBERWOLF]           = [0, 1,1,0,0,0,0,0,0,0,0,0];
		mobs[NPC_DIAMOND_DOG]          = [0, 0,0,1,1,1,1,0,0,0,0,0]; 
		mobs[NPC_DIAMOND_GUARD]        = [0, 0,0,0,0,0,1,1,1,1,0,0];
		mobs[NPC_WINDIGO]              = [0, 0,1,1,1,1,1,1,1,1,0,0];
		mobs[NPC_CHANGELING_ENCHANTER] = [0, 0,0,0,0,0,0,0,0,0,1,0];
		mobs[NPC_WHICH_KING]           = [0, 0,0,0,0,0,0,0,0,0,0,1];
		
		
		this.fillMobs(mobs, levels);
		this.addGods(2);
		
		
				// make sure the boss is away from start
		for(var y in World.map.objects)
			for(var x in World.map.objects[y])
				for(var z in World.map.objects[y][x])
					if(World.map.objects[y][x][z].getType() == KEY_ENEMY && World.map.objects[y][x][z].hasAbility(TRAIT_CHAMPION))
					{
						do
						{
							var coords = World.map.getFreeCell();
						}
						while (Math.abs(coords[0]-World.player.x) < World.map.sizeX/2 || Math.abs(coords[1]-World.player.y) < World.map.sizeY/3)
						
						World.map.objects[y][x][z].move(coords[0],coords[1]);
						break;
					}
				
		var statues = 0;
		var fallen  = [];
		
		for(var i in World.wrapper.heroes)
			if(World.wrapper.heroes[i][HERO_LOCATION] == FIELD_FROZEN_CAVERNS)
				if(World.wrapper.heroes[i][HERO_ENDING] == ENDING_BAD)
				{
					statues++;
					fallen.push(World.wrapper.heroes[i][HERO_RACE]);
				}
			
		if(statues > 0 && World.state == STATE_GAME)
			for(var x = 1; x <= 3; x++)
				for(var y = 1; y <= 3; y++)
				{
					var dt = [[y, x], [y, -x], [-y, x], [-y, -x]];
					for(var s in dt)
					{
						var cx = coords[0] + dt[s][0];
						var cy = coords[1] + dt[s][1];

						if(World.map.objects[cy] != undefined && World.map.objects[cy][cx] != undefined && statues > 0)
							for(var z in World.map.objects[cy][cx])
							{
								if(World.map.objects[cy][cx][z].getType() == KEY_OBJECT && World.map.objects[cy][cx][z].id == OBJECT_ICE_WALL)
								{
									World.map.removeObject(World.map.objects[cy][cx][z]);

									var statue = new TObjectIceStatue();
									statue.init();
									statue._race = fallen[statues - 1];
									World.map.addObject(statue, cx, cy);

									statues--;
									break;
								}
							}		
					}
				}
		
				// distribute objects
		var num = (World.player._class == CLASS_MERCHANT)?2:0;
		this.placeObjects(num, [TObjectMoney]);		
		num = (World.player._class == CLASS_SCOUT)?5:3;
		this.placeObjects(num, [TObjectClearPool, TObjectSmallPool, TObjectTomes]);
		num = (World.player._class == CLASS_SCOUT)?2:4;
		this.placeObjects(num, [TObjectTrapPit,TObjectTrapTeleport]);
		
			// finishing!
		World.player.refresh();
		World.map.initFoV(World.player.x, World.player.y, World.player.sight, 1);

	}
	
	this.addWall = function()
	{
			// random placement in a square between player and boss.
		var coords = World.map.getFreeCellXY(World.player.x, World.player.y, this.bossX, this.bossY);
		if(coords != false)
		{			
			World.map.invalidate(coords[0], coords[1]);
			var iceWall = new TObjectIceWall();
			iceWall.init();
			World.map.addObject(iceWall, coords[0], coords[1]);
		}

			// and another 2 walls randomly on field
		for (var i = 0; i < 2; i++)
		{
			var coords = World.map.getFreeCell();
			World.map.invalidate(coords[0], coords[1]);
			var iceWall = new TObjectIceWall();
			iceWall.init();
			World.map.addObject(iceWall, coords[0], coords[1]);
		}
		World.draw();
	}
	
	this.react = function(e)
	{
		if (e[EVENT_TYPE] == LOG_CONFRONT && this.bossConfronted == false)
		{
			World.queue.add(lang('frozen_caverns.boss_confront'));
			this.bossConfronted = true;
		}
		
		
		if (e[EVENT_TYPE] == LOG_KEY_ACTION && this.bossBlinked == true)
		{
			this.bossTurnCount++
			if (this.bossTurnCount%2 == 0)
			{
				this.addWall();
				if(this.firstWall == true)
				{
					World.queue.add(lang('frozen_caverns.wall_appears'));
					this.firstWall = false;
				}
			}
		}
		return false;
	}
	
	this.generateMap = function()
	{
		var walls = 0;
		var a = [];
		
		for (var x = 0; x < World.map.sizeX; x++)
		{
			a[x] = [];
			for (var y = 0; y < World.map.sizeY; y++)
				a[x][y] = TERRAIN_WALL;
		}

		for (var x = 1; x < World.map.sizeX-1; x++)
		{
			for (var y = 1; y < World.map.sizeY-1; y++)
			{	
					// find a place with many walls
				for (var j = -1; j <= 1; j++)
					for (var k = -1; k <= 1; k++)
						if (x+k > 0 && x+k < World.map.sizeX && y+j > 0 && y+j < World.map.sizeY)
							if (a[x+k][y+j] == TERRAIN_WALL)
								walls++;
					
				if (walls > 7)
				{
					var drawX = x;
					var drawY = y;
						// dig a new tunnel/cave up to 5 spots big
					for (var i = 0; i < 5; i++)
					{
						a[drawX][drawY] = TERRAIN_ICE_FLOOR;
						var direction = World.seedRandom.mt_rand(0,3);
						switch (direction)
						{
							case 0:	if (drawY > 0 && a[drawX][drawY-1] == TERRAIN_WALL) 
										drawY--;
									break;
							case 1:	if (drawX < World.map.sizeX-1 && a[drawX+1][drawY] == TERRAIN_WALL)
										drawX++;
									break;
							case 2:	if (drawY < World.map.sizeY-1 && a[drawX][drawY+1] == TERRAIN_WALL)
										drawY++;
									break;
							case 3:	if (drawX > 0 && a[drawX-1][drawY] == TERRAIN_WALL)
										drawX--;
									break;
							default:
									break;
						}
					}
				}
				walls = 0;
			}
		}
		
			//place player
		World.player.x     = 0;
		World.player.y     = World.seedRandom.mt_rand(1,World.map.sizeY-2);
		for (var j = 0; j <= 3; j++)
			for (var k = -1; k <= 1; k++)
				a[World.player.x+j][World.player.y+k] = TERRAIN_ICE_FLOOR;
				
			//change walls to ice walls
		for (var x = 0; x < World.map.sizeX; x++)
			for (var y = 0; y < World.map.sizeY; y++)
				if (a[x][y] == TERRAIN_WALL)
				{
					var iceWall = new TObjectIceWall();
					iceWall.init();
					World.map.addObject(iceWall, x, y);
				}
				
		
		// add tomes,money and note randomly between 6 locations in front of player. Needs to do before mobs are filled.
		var arr = [0,1,2,3,4,5];
		shuffle(arr);
		
		var temp = arr.pop();
		var tomes = new TObjectTomes();
		tomes.init();
		World.map.addObject(tomes, Math.floor(temp/3)+1, World.player.y-1+temp%3);
		
		temp = arr.pop();
		var money = new TObjectMoney();
		money.init();
		World.map.addObject(money, Math.floor(temp/3)+1, World.player.y-1+temp%3);
		
		temp = arr.pop();
		var note = new TObjectSign();
		note.description = lang('frozen_caverns.note.description');
		note.text        = lang('frozen_caverns.note.text');
		note.show         = '%';
		World.map.addObject(note, Math.floor(temp/3)+1, World.player.y-1+temp%3);
		
	};
		
}

TConfig.objects[KEY_FIELD][FIELD_FROZEN_CAVERNS] = new TFieldFrozenCaverns();
addField(FIELD_FROZEN_CAVERNS    , REWARD_ALMOST_CELLY , TYPE_LEVEL);	


