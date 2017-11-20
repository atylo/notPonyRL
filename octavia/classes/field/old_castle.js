function TFieldOldCastle()
{
	ExtClass.call(this, {AbstractField: null});
	this.id = FIELD_OLD_CASTLE;
	
	this.gameEnd = function(res)
	{
		if(res != ENDING_BAD && res != ENDING_CORRUPTION)
		{		
			if (this.spellCast == "evil" && World.player._race == RACE_DRAGON)
				World.wrapper.addPossibleAchievement(REWARD_DRAGON_OVERLORD);
			if (this.bossWasConfronted == false)
				World.wrapper.addPossibleAchievement(REWARD_BRAVE_SIR_ROBIN);
				
			return 75;
		}
		return 0;
	}
	
	this.init = function()
	{
	
		addLang('ending.header.'+ FIELD_OLD_CASTLE + '.' + ENDING_BAD , lang('ending.header.' + FIELD_OLD_CASTLE + '.regularDefeat'));
		addLang('ending.text.'+ FIELD_OLD_CASTLE + '.'+ ENDING_BAD, lang('ending.text.' + FIELD_OLD_CASTLE + '.regularDefeat'));
		addLang('ending.header.'+ FIELD_OLD_CASTLE + '.' + ENDING_GOOD ,  lang('ending.header.' + FIELD_OLD_CASTLE +'.noSpellVictory'));
		addLang('ending.text.'+ FIELD_OLD_CASTLE + '.'+ ENDING_GOOD,  lang('ending.text.' + FIELD_OLD_CASTLE +'.noSpellVictory'));
	
		this.tempX             = 0;
		this.switchMap         = [];
		this.spellOrder        = [];
		this.spellCast         = "none";
		this.turnBossAppeared  = -99999;
		this.boss              = "";
		this.bossWasConfronted = false;
				
		World.map = new TMap();
		World.player.level = 1;
		World.map.init(19, 19, TERRAIN_FLOOR);
		
		this.spellOrder = [1,2,3,4];
		shuffle(this.spellOrder);
		this.spellOrder.unshift(0);
		this.currentOrder = [];
		
		var a = this.generateMap();
		
		var levels = [0, 4, 4, 4, 3, 3, 3, 3, 2, 2, 1, 1];
		var mobs   = [];
		
		mobs[NPC_PARASPRITE]		   = [0, 1,1,0,0,0,0,0,0,0,0,0]; 
		mobs[NPC_FLYING_HOOF]          = [0, 0,1,1,0,0,0,0,0,0,0,0]; 
		mobs[NPC_CHANGELING] 		   = [0, 1,1,1,1,1,1,0,0,0,0,0];
		mobs[NPC_DUSTER]               = [0, 0,0,1,1,1,0,0,0,0,0,0];
		mobs[NPC_WINDIGO]              = [0, 0,0,0,1,1,1,0,0,0,0,0];
		mobs[NPC_DIAMOND_GUARD]        = [0, 0,0,0,1,1,1,1,0,0,0,0];
		mobs[NPC_MIMIC]                = [0, 0,0,1,1,1,1,1,0,0,0,0];
		mobs[NPC_VORTEX]               = [0, 0,0,0,0,1,1,1,0,0,0,0];
		mobs[NPC_CHANGELING_ENCHANTER] = [0, 0,0,0,0,1,1,1,1,1,1,0];		
		mobs[NPC_ANIMATED_ARMOUR]      = [0, 0,0,1,1,1,1,1,1,1,0,0];
		mobs[NPC_SHADOW]               = [0, 0,1,1,1,1,1,1,1,1,0,1];
		
		
		
		this.placeObjects(4, [TObjectTrapSpooks]);
		this.placeObjects(3, [TObjectTrapCorruption]);
		this.placeObjects(3, [TObjectTrapPit]);
		this.placeObjects(3, [TObjectMoney]);
		
			// place journal pieces
		for (var i = 0; i<7; i++)
		{
			var s = new TObjectSign();
			if (i >= 2 && i <= 5)
			{
				s.init(lang("old_castle.journal." + i) + " " + lang("old_castle.journal.element." + this.spellOrder[i-1]));
			}
			else
				s.init(lang("old_castle.journal." + i));
			s.show = '~'
			s.description = lang("old_castle.journal.description");
			World.map.placeObject(s);
		}
		
		this.fillMobs(mobs, levels);
		this.addGods(2);
		this.placeObjects(3, [TObjectTrapWallPass]);
		
		
			// placing floor titles where needed. Place boss monsters.
		for (var x = 0; x < World.map.sizeX; x++)
			for (var y = 0; y < World.map.sizeY; y++)
				if (a[y][x] == '.' || a[y][x] == 'C' || a[y][x] == 'S')
				{
					World.map.terrain[y][x] = TERRAIN_FLOOR;	
					if (a[y][x] == 'S')
					{
						for(var ym in World.map.objects)
							for(var xm in World.map.objects[ym])
								for(var zm in World.map.objects[ym][xm])
									if(World.map.objects[ym][xm][zm].getType() == KEY_ENEMY && World.map.objects[ym][xm][zm].level == 11)
									{
										World.map.objects[ym][xm][zm].removeAbility(TRAIT_BLINK);
										World.map.objects[ym][xm][zm].removeAbility(TRAIT_FOLLOWING);
										World.map.objects[ym][xm][zm].description = lang("old_castle.shadow.description");
										World.map.objects[ym][xm][zm].move(x,y);
									}
										
									
					}
					if (a[y][x] == 'C')
					{
						for(var ym in World.map.objects)
							for(var xm in World.map.objects[ym])
								for(var zm in World.map.objects[ym][xm])
									if(World.map.objects[ym][xm][zm].getType() == KEY_ENEMY && World.map.objects[ym][xm][zm].level == 10)
										World.map.objects[ym][xm][zm].move(x,y);
					}
				}
				
	
			// placement cheat
		/*
		World.player.x = this.tempX+2;
		World.player.y = 2;
		*/
		
			// level cheat
		//World.player.level = 15;
		
			// Vision cheat
		/*
		for(var x = 0; x < World.map.sizeX; x++)
			for(var y = 0; y < World.map.sizeY; y++)
				World.map.seen[y][x] = SEEN_VISITED;	
		*/
		World.player.refresh();
		World.map.initFoV(World.player.x, World.player.y, World.player.sight, 1);
			
	}
	
	this.initMob = function(mob)
	{
		if (World.seedRandom.mt_rand(1, 5) == 3)
			mob.abilities.push(TRAIT_CRYSTALS);
		
		if (mob.id == NPC_CHANGELING_ENCHANTER)
			mob.abilities.push(TRAIT_CRYSTALS);
			
		return mob;
	};
	
		
	this.react = function(e)
	{
	
		if (e[EVENT_TYPE] == LOG_CAST &&  e[EVENT_TAG] == SKILL_ATTACK && e[EVENT_TARGET_LVL] == 12)
			this.bossWasConfronted = true;

		if (e[EVENT_TYPE] == LOG_KILL && e[EVENT_TAG].hasAbility(TRAIT_CRYSTALS))
			for (var i = 0; i< e[EVENT_TAG].hasAbilityLevel(TRAIT_CRYSTALS); i++)
				World.player.abilities.push(TRAIT_CRYSTALS);
				
			//react to switches in nexus room
		if (e[EVENT_TYPE] == LOG_ACTIVATE && e[EVENT_TARGET_ID] == OBJECT_SWITCH)
		{
			// reset in the middle
			if (e[EVENT_TAG] == 6 && this.spellCast == "none")
			{
				for (var i = 0; i<6; i++)
				{
					this.switchMap[i].isOn = false;
					this.switchMap[i].show = this.switchMap[i].showOff;
					this.switchMap[i].color = this.switchMap[i].colorOff;
					World.map.invalidate(this.switchMap[i].x, this.switchMap[i].y);
					this.switchMap[6].description = lang('old_castle.nexus.core.desc') + " " + lang('old_castle.nexus.core.desc.off');
					this.currentOrder = [];
				}
			}
			else if (this.spellCast == "none")
			{
				// update text on nexus center 

				if (this.switchMap[6].description == lang('old_castle.nexus.core.desc') + " " + lang('old_castle.nexus.core.desc.off'))
				{
					this.switchMap[6].description = lang('old_castle.nexus.core.desc') + " " +  lang('old_castle.nexus.core.desc.on')
					this.switchMap[6].description = this.switchMap[6].description + " " +  lang('old_castle.nexus.element.' + e[EVENT_TAG]);
				}
				else
				{
					this.switchMap[6].description = this.switchMap[6].description + ", " + lang('old_castle.nexus.element.' + e[EVENT_TAG]);
				}

				if (e[EVENT_TAG] == 5 && this.currentOrder.length == 5)
				{
					if (this.currentOrder.toString() == this.spellOrder.toString())
						{
							this.spellCast = "evil";
							World.queue.add(lang('old_castle.nexus.spell.evil'));
							$("body").fadeToggle(200);
							World.player.color = 'CornflowerBlue'
							World.map.invalidate(World.player.x , World.player.y);
							$("body").fadeToggle(200);
							
							
							if (World.player.corruption > 0)
								World.player.lifesteal += World.player.corruption;
							
							this.boss.removeAbility(TRAIT_BLOODLESS);
							if (!World.player.hasAbility(TRAIT_MAGICAL_ATTACK))
								World.player.addAbility(TRAIT_MAGICAL_ATTACK);
							
							addLang('ending.header.'+ FIELD_OLD_CASTLE + '.' + ENDING_BAD , lang('ending.header.' + FIELD_OLD_CASTLE + '.evilSpellDefeat'));
							addLang('ending.text.'+ FIELD_OLD_CASTLE + '.'+ ENDING_BAD, lang('ending.text.' + FIELD_OLD_CASTLE + '.evilSpellDefeat'));
							addLang('ending.header.'+ FIELD_OLD_CASTLE + '.' + ENDING_GOOD ,  lang('ending.header.' + FIELD_OLD_CASTLE +'.evilSpellVictory', {'r': lang('race.' + World.player._race + '.title')}));
							addLang('ending.text.'+ FIELD_OLD_CASTLE + '.'+ ENDING_GOOD,  lang('ending.text.' + FIELD_OLD_CASTLE + '.evilSpellVictory'));	
							
								
							this.switchMap[6].description = lang('old_castle.nexus.core.cast');
							this.switchMap[6].textReset = lang('old_castle.nexus.core.cast');
							for (var i = 0; i<6; i++)
								this.switchMap[i].textStuck = lang('old_castle.nexus.element.textSpent');
								
							
							World.menu.need_draw = 1;
							World.menu.draw();
						}
				}
				
				if (e[EVENT_TAG] == 0 && this.currentOrder.length == 5)
				{
					var tempOrder = []
						// "-5" is to reverse the elements. Water -> fire, ects
					for (var i = 0; i< 5; i++)
						tempOrder[i] = Math.abs(this.currentOrder[i] - 5)
					if (tempOrder.toString() == this.spellOrder.toString())
					{
						this.spellCast = "good";
						World.queue.add(lang('old_castle.nexus.spell.good'));
						$("body").fadeToggle(200);
						World.player.color = 'Yellow'
						World.map.invalidate(World.player.x , World.player.y);
						$("body").fadeToggle(200);
						
							
						World.player.addCorruption(-4);
						World.player.addEffect(EFFECT_EMPOWER);
						World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, World.player, 4, lang('field.' + this.id + '.title'));
						this.boss.addWeakness(3);
						
						addLang('ending.header.'+ FIELD_OLD_CASTLE + '.' + ENDING_BAD , lang('ending.header.' + FIELD_OLD_CASTLE + '.goodSpellDefeat'));
						addLang('ending.text.'+ FIELD_OLD_CASTLE + '.'+ ENDING_BAD, lang('ending.text.' + FIELD_OLD_CASTLE + '.goodSpellDefeat'));
						addLang('ending.header.'+ FIELD_OLD_CASTLE + '.' + ENDING_GOOD ,  lang('ending.header.' + FIELD_OLD_CASTLE +'.goodSpellVictory'));
						addLang('ending.text.'+ FIELD_OLD_CASTLE + '.'+ ENDING_GOOD,  lang('ending.text.' + FIELD_OLD_CASTLE +'.goodSpellVictory'));		
						
						this.switchMap[6].description = lang('old_castle.nexus.core.cast');
						this.switchMap[6].textReset = lang('old_castle.nexus.core.cast');
						for (var i = 0; i<6; i++)
							this.switchMap[i].textStuck = lang('old_castle.nexus.element.textSpent');
						
						World.menu.need_draw = 1;
						World.menu.draw();
					}
				}
				this.currentOrder.push(e[EVENT_TAG]);
			}
		}

			// Boss appears
		if (e[EVENT_TYPE] == LOG_KILL && e[EVENT_TARGET_LVL] == 11)
		{
			var s = lang('old_castle.boss.appearence.body');
			if (World.player.corruption > 3)
				s = s + lang('old_castle.boss.appearence.corrupted');

			World.queue.add(lang('old_castle.boss.appearence.start') + s + lang('old_castle.boss.appearence.end'));
			
			var note = new TObjectSign();
			note.init(s);
			note.show = '~'
			note.description = lang('old_castle.boss.appearence.note');
			World.map.addObject(note, e[EVENT_TAG].x, e[EVENT_TAG].y-1 );
			World.map.invalidate(e[EVENT_TAG].x , e[EVENT_TAG].y-1);
			
			addLang('ending.header.'+ FIELD_OLD_CASTLE + '.' + ENDING_BAD , lang('ending.header.' + FIELD_OLD_CASTLE + '.noSpellDefeat'));
			addLang('ending.text.'+ FIELD_OLD_CASTLE + '.'+ ENDING_BAD, lang('ending.text.' + FIELD_OLD_CASTLE + '.noSpellDefeat'));
				
			this.boss = new TNPCShadow();
			this.boss.init(12);
			this.boss.addAbility(TRAIT_CHAMPION);
			this.boss.removeAbility(TRAIT_BLINK);
			this.boss.lifesteal += 4;
			this.boss.id = NPC_SHADOW;
			this.boss.hp = this.boss.getMaxHP();
			this.boss.description = lang('old_castle.boss.description');
			this.boss.timesWillFollow = 1000;
			this.turnBossAppeared = World.turns;
				
			for (var x = 0; x < World.map.sizeX; x++)
				if (World.map.terrain[World.map.sizeY-1][x] == TERRAIN_FLOOR)
				{
					World.map.addObject(this.boss, x, World.map.sizeY-1);
					World.map.invalidate(x, World.map.sizeY-1);
					break;
				}
			$("body").fadeToggle(200);
			$("body").fadeToggle(200);
		};
		
		if (e[EVENT_TYPE] == LOG_TURN_PASSED && World.turns == this.turnBossAppeared + 5) 
		{
			this.boss.startFollowing();
		}
		return false;
	};
	
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
		
			//Entrance 
		var entranceX = World.seedRandom.mt_rand(6, World.map.sizeX-12);	
		var entranceY = World.map.sizeY-3;
		
		var entranceMap = [	['.','.','.','.','.','.','.'],
							['.','#','#','-','#','#','.'],
							['#','#','.','T','.','#','#']]
		for (var x = 0; x < 7; x++)
		{
			for (var y = 0; y < 3; y++)
			{
			switch (entranceMap[y][x])
				{	
				case 'T': 
					a[entranceY+y][entranceX+x] = TERRAIN_FLOOR;
					var sign = new TObjectSign();
					sign.init(lang('old_castle.sign.entrance.text'));
					World.map.addObject(sign, entranceX+x, entranceY+y);
					break;
				default:
					a[entranceY+y][entranceX+x] = entranceMap[y][x];
					break;
				}
			}
		}
		
			// Library
		var libraryX   = World.seedRandom.mt_rand(4, World.map.sizeX-9);	
		var libraryY   = 6;	
		var libraryMap = [	['#','#','#','#','#'],
							['#','~','.','~','#'],
							['#','#','C','#','#'],
							['#','~','.','~','#'],
							['#','-','#','-','#'],
							['.','.','T','.','.']]
		var bookNum    = 0;
		var bookOrder  = [1,2,3,4];
		shuffle(bookOrder);
		
		for (var x = 0; x < 5; x++)
		{
			for (var y = 0; y < 6; y++)
			{
			switch (libraryMap[y][x])
				{	
				case '~': 
					a[libraryY+y][libraryX+x] = TERRAIN_FLOOR;
					var book = new TObjectTomes();
					book.init(lang('old_castle.history.' + bookOrder[bookNum]));
					bookNum ++;
					World.map.addObject(book, libraryX+x, libraryY+y);
					break;
				case 'T': 
					a[libraryY+y][libraryX+x] = '.';
					var sign = new TObjectSign();
					sign.init(lang('old_castle.sign.library.text'));
					World.map.addObject(sign, libraryX+x, libraryY+y);
					break;
				default:
					a[libraryY+y][libraryX+x] = libraryMap[y][x];
					break;
				
				}
			}
		}		
			// magical nexus
		var nexusX   = World.map.sizeX-libraryX-5;	
		var nexusY   = 0;	
		var nexusMap = [	['#','#','#','#','#'],
							['#','?','.','?','#'],
							['#','?','A','?','#'],
							['#','?','.','?','#'],
							['#','#','S','#','#'],
							['.','.','T','.','.']]
		
		var elementsNum    = 0;
		var elementsOrder  = [0,1,2,3,4,5];
		shuffle(elementsOrder);
		this.tempX = nexusX;
		
		for (var x = 0; x < 5; x++)
		{
			for (var y = 0; y < 6; y++)
			{
			switch (nexusMap[y][x])
				{	
				case '?': 
					a[nexusY+y][nexusX+x] = TERRAIN_FLOOR;
					var element = new TObjectSwitch();
					var context = {
					switchNum  : elementsOrder[elementsNum], 
					stucks     : true, 
					description: lang('old_castle.nexus.element.A') + " " + lang('old_castle.nexus.element.' + elementsOrder[elementsNum]),
					textOn     : lang('old_castle.nexus.element.textOn'),
					textStuck  : lang('old_castle.nexus.element.textStuck'),
					showOn     :'o',
					showOff    : 'o'};
					element.init(context);
					World.map.addObject(element, nexusX+x, nexusY+y);
					this.switchMap[elementsOrder[elementsNum]] = element;
					elementsNum ++;
					break;
				case 'T': 
					a[nexusY+y][nexusX+x] = '.';
					var sign = new TObjectSign();
					sign.init(lang('old_castle.sign.nexus.text'));
					World.map.addObject(sign, nexusX+x, nexusY+y);
					break;
				case 'A': 
					a[nexusY+y][nexusX+x] = TERRAIN_FLOOR;
					var core = new TObjectSwitch();
					var context = {
					switchNum   : 6,
					showOn      : '✡',
					showOff     : '✡',
					show        : '✡',
					colorOff    : 'orange',
					description : lang('old_castle.nexus.core.desc') + " " + lang('old_castle.nexus.core.desc.off'),
					textReset   : lang('old_castle.nexus.core.reset'),
					resets      : true}
					core.init(context);
					World.map.addObject(core, nexusX+x, nexusY+y);
					this.switchMap[6] = core;
					break;
				default:
					a[nexusY+y][nexusX+x] = nexusMap[y][x];
					break;
				}
			}
		}			
				
			// create regular rooms
		var roomTypes = [[1,2], [2,3], [2,4], [3,4], [3,5]];

		for (var x = 1; x < World.map.sizeX-1; x++)
		{
			for (var y = 1; y < World.map.sizeY-1; y++)
			{
				if (a[y][x] == TERRAIN_WALL)
				{
					shuffle(roomTypes);
					var fit = false;
					for (var c = 0; c < roomTypes.length && fit == false; c++)
					{
						fit = true;
						for (var dx = -1; dx < roomTypes[c][0]+1; dx++)
							for (var dy = -1; dy < roomTypes[c][1]+1; dy++)
								if (y+dy > World.map.sizeY-1 || x+dx > World.map.sizeX-1 || !(a[y+dy][x+dx] == TERRAIN_WALL || a[y+dy][x+dx] == '#' || a[y+dy][x+dx] == '.'))
									fit = false;
									
						if (fit == true)
						{
							for (var rx = 0; rx < roomTypes[c][0]; rx++)
								for (var ry = 0; ry < roomTypes[c][1]; ry++)
									a[y+ry][x+rx] = TERRAIN_FLOOR;							
							break;
						}
					}
				}
			}
		}

			// create passages between rooms. Look for specific configurations in surrounding tiles
		for (var x = 1; x < World.map.sizeX-1; x++)
		{
			for (var y = 1; y < World.map.sizeY-1; y++)
			{
				if (a[y][x] == TERRAIN_FLOOR || a[y][x] == '.')
				{
					if (y <World.map.sizeY-2)
					{
						if (a[y+1][x] == TERRAIN_WALL && (
							a[y+1][x+1] == TERRAIN_WALL && 
							a[y+1][x-1] == TERRAIN_WALL ) && 
							(a[y+2][x] == TERRAIN_FLOOR || a[y+2][x] == '.'))
						{
							a[y+1][x] = '-';
						}
					}
				
					if (x <World.map.sizeX-2)
					{
						if (a[y][x+1] == TERRAIN_WALL && 
							a[y+1][x+1] == TERRAIN_WALL && 
							a[y-1][x+1] == TERRAIN_WALL && 
							(a[y][x+2] == TERRAIN_FLOOR || a[y][x+2] == '.'))
						{
							a[y][x+1] = '|';
						}
					}
					
					if (y>1)
					{
						if (a[y-1][x] == TERRAIN_WALL && 
							a[y-1][x+1] == TERRAIN_WALL && 
							a[y-1][x-1] == TERRAIN_WALL && 
							(a[y-2][x] == TERRAIN_FLOOR || a[y-2][x] == '.'))
						{
							a[y-1][x] = '-';
						}
					}
					
					if (x>1)
					{
						if (a[y][x-1] == TERRAIN_WALL && 
							a[y+1][x-1] == TERRAIN_WALL && 
							a[y-1][x-1] == TERRAIN_WALL && 
							(a[y][x-2] == TERRAIN_FLOOR || a[y][x-2] == '.'))
						{
							a[y][x-1] = '|';
						}
					}
				}
			}
		}
		
			// validate all rooms are connected
		this.val = []; 
		for (var y = 0; y < World.map.sizeY; y++)
		{
			this.val[y] = [];
			for (var x = 0; x < World.map.sizeX; x++)
			{
				if (a[y][x] == '#' || a[y][x] == TERRAIN_WALL)
					this.val[y][x] = '#';
				else 
					this.val[y][x] = '.';
			}
		}

		this.recursiveFill(entranceX+2, entranceY+2)
		
		for (var x = 0; x < World.map.sizeX; x++)
			for (var y = 0; y < World.map.sizeY; y++)
			{
				if (this.val[y][x] != '#' && this.val[y][x] != 'v')
					console.log("bad map");
			}

			// put walls and wards in place. '.' are placeholders for empty cells without monsters/objects, will be changed to floor tiles after placements.
		for (var x = 0; x < World.map.sizeX; x++)
			for (var y = 0; y < World.map.sizeY; y++)
			{
				if (a[y][x] == '#' || a[y][x] == '.')
					World.map.terrain[y][x] = TERRAIN_WALL;	
				else if (a[y][x] == '|' || a[y][x] == '-')
				{
					World.map.terrain[y][x] = TERRAIN_FLOOR;	
					var ward = new TObjectWard();
					(a[y][x] == '|')?(ward.init(true)):(ward.init(false));
					World.map.addObject(ward, x, y);
				}
				else if (a[y][x] == 'C' || a[y][x] == 'S')
					World.map.terrain[y][x] = TERRAIN_WALL;
				else
					World.map.terrain[y][x] = a[y][x];
			}
			
					
			// place player
		World.player.x     = entranceX+2;
		World.player.y     = entranceY+2;
		
		return a;
	};
	
	this.recursiveFill = function (x,y)
	{
		if (x > World.map.sizeX-1 || x < 0 || y > World.map.sizeY-1 || y < 0)
			return false;
		
		if (this.val[y][x] == '#' || this.val[y][x] == 'v')
			return false;
		
		this.val[y][x] = 'v';
		
		this.recursiveFill (x-1,y);
		this.recursiveFill (x+1,y);
		this.recursiveFill (x,y-1);
		this.recursiveFill (x,y+1);
	};
}

TConfig.objects[KEY_FIELD][FIELD_OLD_CASTLE] = new TFieldOldCastle();
addField(FIELD_OLD_CASTLE    ,REWARD_HIVE , TYPE_LEVEL);	


