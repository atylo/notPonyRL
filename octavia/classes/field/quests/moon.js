function TFieldMoon()
{
	ExtClass.call(this, {CustomField: null});
	this.id                  = FIELD_MOON;
	this.fieldFile           = 'moon.html';
	this.defaultTerrain      = TERRAIN_SAND;
	this.FLAG_BACKDOORSWITCH = 0;
	this.FLAG_SELENA         = 1;
	this.FLAG_ENCHANTRESS    = 2;
	this.FLAG_GLASS          = 3;
	this.FLAG_SPACESHIP      = 4;
		
	this.scoreMult = 0.75;

	this.customInit = function()
	{
		this.flags = [0,0,0,0,0];
		addLang('ending.text.'+ FIELD_MOON +'.1', lang('ending.text.'+ FIELD_MOON +'.1save'));
		
		this.spawnSign('A', lang('moon.signA'));
		this.spawnSign('B', lang('moon.signB'));
		this.spawnSign('C', lang('moon.signC'));
		this.spawnSign('D', lang('moon.signD'));
		this.spawnSign('E', lang('moon.signE'));

		
		this.spawnSign('M', lang('moon.signM'));
		this.spawnSign('N', lang('moon.signN'));
		this.spawnSign('O', lang('moon.signO'));
		this.spawnSign('P', lang('moon.signP'));
		this.spawnSign('Q', lang('moon.signQ'));
		this.spawnSign('R', lang('moon.signR'));
		this.spawnSign('T', lang('moon.signT'));
		this.spawnSign('V', lang('moon.signV'));
		
			//	place riddle
		var mode = World.seedRandom.mt_rand(1,3);
		this.spawnSign('F', lang('moon.signF.' + mode));
		this.spawnSign('G', lang('moon.signG.' + mode));
		this.spawnSign('H', lang('moon.signH.' + mode));
		this.spawnSign('I', lang('moon.signI.' + mode));
			// mode = 1, answer = 1
			// mode = 2, answer = 2
			// mode = 3, answer = 3

		alpha = (mode == 1)?new TMoonAnswerPassage():new TMoonDeathPassage();
		beta  = (mode == 2)?new TMoonAnswerPassage():new TMoonDeathPassage();
		gamma = (mode == 3)?new TMoonAnswerPassage():new TMoonDeathPassage();
		
		this.placeBookmarkObject(alpha, 'J');
		this.placeBookmarkObject(beta , 'K');
		this.placeBookmarkObject(gamma, 'L');
		
			// place events
		
		this.placeBookmarkObject(new TMoonEvent('a'), 'a');
		this.placeBookmarkObject(new TMoonEvent('b'), 'b');
		this.placeBookmarkObject(new TMoonEvent('c'), 'c');
		
		this.placeBookmarkObject(new TMoonEvent('p'), 'p');
		this.placeBookmarkObject(new TMoonEvent('q'), 'q');
		this.placeBookmarkObject(new TMoonEvent('r'), 'r');
		this.placeBookmarkObject(new TMoonEvent('s'), 's');
		this.placeBookmarkObject(new TMoonEvent('t'), 't');
		this.placeBookmarkObject(new TMoonEvent('v'), 'v');
		
		this.placeBookmarkObject(new TMoonEvent('z'), 'z');
		return true;
	};

	this.getCustomObjects = function(c)
	{
		if(c == '`') 
		{
			res = new TObjectTrapPit();
			res.init();
			return res;
		}
		if (c == '&')
		{
			res = new TObjectTrapCorruption();
			res.init();
			return res;
		}
		this.placeBookmarkObject(new TMoonEvent('o'), 'o');
		return false;
	};

	this.getCustomTerrain = function(c)
	{
		if(c == '#') return TERRAIN_SANDSTONE;
		return false;		
	};	

	this.getMobTable = function()
	{
		var mobs   = [];
		mobs[NPC_WINDIGO]              = [0, 1,0,0,0,0,0,0,0,0,0];
		mobs[NPC_FLYING_HOOF]          = [0, 1,0,0,0,0,0,0,0,0,0]; 		
		mobs[NPC_DUSTER]               = [0, 0,1,0,0,0,0,0,0,0,0];
		mobs[NPC_DIAMOND_DOG]          = [0, 0,0,1,1,0,0,0,0,0,0];
		mobs[NPC_DIAMOND_GUARD]        = [0, 0,0,0,1,1,0,0,0,0,0];
		mobs[NPC_CHANGELING]           = [0, 0,0,0,0,0,1,0,0,0,0];
		mobs[NPC_CHANGELING_MAGE]      = [0, 0,0,0,0,0,0,1,0,0,1];
		mobs[NPC_CHANGELING_ENCHANTER] = [0, 0,0,0,0,0,0,1,0,1,0];		
		mobs[NPC_VORTEX]               = [0, 0,0,0,0,0,0,0,1,0,0]; 
		
		return mobs;
	};
	
	this.spawnSign = function(bookmark, description)
	{
		s = new TObjectSign();
		s.init(description);
		this.placeBookmarkObject(s, bookmark);
		
	};
	
	this.initMob = function(mob)
	{
		if(mob.level == 9)
		{
			mob.addEffect(EFFECT_EMPOWER);
			mob.addEffect(EFFECT_STONESKIN);
		}
		return mob;
	};
	
	this.isItemBanned = function (itemCode)
	{
		if (itemCode == ITEM_SCROLL_BLINK)
			return true;
		
		return false;
	};
}

TConfig.objects[KEY_FIELD][FIELD_MOON] = new TFieldMoon();
addField(FIELD_MOON   , REWARD_NONE     , TYPE_QUEST);

		// CUSTOM CLASSES
		
function TMoonDeathPassage()
{
	ExtClass.call(this, {AbstractObject: null});
	this.show        = 'n';
	this.color       = 'cyan';
	this.onHover = function()
	{
		if (World.player.x == this.x && World.player.y == this.y)
			return false;
		World.queue.addAlert(lang('moon.passageText'));
		World.queue.drawAlerts();
		return true;
	};
	
	this.onLook = function()
	{
		World.queue.add(lang('moon.passageText'));
		return true;
	};
	
	this.onMove = function()
	{
		World.queue.add(lang('moon.passageWrong'));
		World.player.hp -= 578;
		World.player.die();
		return true;
	};
}

function TMoonAnswerPassage()
{
	ExtClass.call(this, {AbstractObject: null});
	this.show        = 'n';
	this.color       = 'cyan';
	
	this.onHover = function()
	{
		if (World.player.x == this.x && World.player.y == this.y)
			return false;
		World.queue.addAlert(lang('moon.passageText'));
		World.queue.drawAlerts();
		return true;
	};
	
	this.onLook = function()
	{
		World.queue.add(this.description);
		return true;
	};
	
	this.onMove = function()
	{
		World.queue.add(lang('moon.passageRight'));
		World.map.removeObject(this);
		return true;
	};
};
		
function TMoonEvent(letter)	
{
	ExtClass.call(this, {AbstractObject: null});
	
	this.show = '.';
	
	switch(letter)
	{
		case 'a':
			this.show = '%';
			this.color = 'pink';
			break;
	
		case 't':
			this.show = 'I';
			this.color = 'white';
			break;
	
		case 'q':
			this.show = '&';
			this.color = 'cyan';
			break;
	
		case 's':
			this.show = ':';
			this.color = 'green';
			break;
	
		case 'o':
			this.show = 'o';
			this.color = 'grey';
			break;
		
		case 'z':		
			this.show = 'O';
			this.color = 'cyan';
			break;
		}
	
	this.onHover = function()
	{
		if (letter == 'a')
			World.queue.addAlert(lang('moon.event.a.0'));
			
		if (letter == 'o')
			World.queue.addAlert(lang('moon.event.o.0'));
			
		if (letter == 'z')
			World.queue.addAlert(lang('moon.event.z.0'));
			
		World.queue.drawAlerts();
		return true;
	};
	
	this.onLook = function()
	{
		if (letter == 'a')
		{
			if (World.field.flags[World.field.FLAG_SPACESHIP] == 0)
			{
				World.queue.add(lang('moon.event.a.2'));
				World.player.receiveGold(4);
				World.field.flags[World.field.FLAG_SPACESHIP] = 1;
			}
		}
	};
	
	this.onMove = function()
	{
		if (letter == 'a')
		{
		World.queue.add(lang('moon.event.a.1'));
		}
		if (letter == 'b')
		{
		World.queue.add(lang('moon.event.b.0'));
		}
		if (letter == 'c')
		{
			if (World.field.flags[World.field.FLAG_BACKDOORSWITCH] == 0) 
			{
				World.queue.add(lang('moon.event.c.0'));
				World.field.flags[World.field.FLAG_BACKDOORSWITCH] = 1;
				World.map.terrain[5][2] = TERRAIN_FLOOR;
				var r = World.map.initFoV(2, 5, 1, 1);
				World.player.explore(r);
			}
			else
				World.queue.add(lang('moon.event.c.1'));
		};
		
		if (letter == 'o')
		{
		
			var tMatrix = 	[[14,5,12,5],[10,5,10,7],[12,3,11,1],[12,1,16,9],[10,3,14,2],[14,1,14,7],[6,1,7,3],[8,3,3,7],[8,5,3,2]];	
			World.queue.add(lang('moon.event.o.1'));
			World.menu.need_draw = 1;
			for (var i in tMatrix) {
				if (tMatrix[i][0] == this.x && tMatrix[i][1] == this.y)
				{
					World.map.seen[this.y][this.x] = SEEN_VISITED;
					World.map.invalidate(World.player.x, World.player.y);
					World.player.x = tMatrix[i][2];
					World.player.y = tMatrix[i][3];
					var r = World.map.initFoV(World.player.x, World.player.y, 1, 1);
					World.player.explore(r);
					return false;
				}
			}
		};
		
		if (letter == 'p')
		{	
			if (World.field.flags[World.field.FLAG_ENCHANTRESS] == 0 && World.field.flags[World.field.FLAG_SELENA] == 0)
				World.queue.add(lang('moon.event.p.0'));
			if (World.field.flags[World.field.FLAG_ENCHANTRESS] == 1 || World.field.flags[World.field.FLAG_SELENA] != 0)
				World.queue.add(lang('moon.event.p.1'));
		};
		
		if (letter == 'q')
		{
				//Princess already dead
			if (World.field.flags[World.field.FLAG_SELENA] == 1)
				World.queue.add(lang('moon.event.q.1'));
				// Princess already alive
			if (World.field.flags[World.field.FLAG_SELENA] == 2)
				World.queue.add(lang('moon.event.q.3'));
				
				//kill Princess
			if (World.field.flags[World.field.FLAG_ENCHANTRESS] == 0 && World.field.flags[World.field.FLAG_SELENA] == 0)
			{
				World.queue.add(lang('moon.event.q.0'));
				World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.player, 1, lang('field.' + this.id + '.title'));
				World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, World.player, 5, lang('field.' + this.id + '.title'));
				this.color = 'grey'
				World.menu.need_draw = 1;
				World.field.flags[World.field.FLAG_SELENA] = 1;
				World.map.objects[3][1][0].removeEffect(EFFECT_EMPOWER);
				World.map.objects[3][1][0].removeEffect(EFFECT_STONESKIN);
			}
				// save Princess
			if (World.field.flags[World.field.FLAG_ENCHANTRESS] == 1 && World.field.flags[World.field.FLAG_SELENA] == 0)
			{
				World.queue.add(lang('moon.event.q.2'));
				World.field.flags[World.field.FLAG_SELENA] = 2;
					// overwrite the win by killing the champion text
				addLang('ending.text.'+ FIELD_MOON +'.1', lang('ending.text.'+ FIELD_MOON +'.1great'));
			}
		};
		
		if (letter == 'r')
		{
			if (World.field.flags[World.field.FLAG_ENCHANTRESS] == 0 && World.field.flags[World.field.FLAG_SELENA] == 0)
				World.queue.add(lang('moon.event.r.0'));
			if (World.field.flags[World.field.FLAG_ENCHANTRESS] == 0 && World.field.flags[World.field.FLAG_SELENA] == 1)
				World.queue.add(lang('moon.event.r.1'));
		};
		
		if (letter == 's')
		{
			if (World.field.flags[World.field.FLAG_ENCHANTRESS] == 0)
			{
				if (World.field.flags[World.field.FLAG_SELENA] == 0)
					World.queue.add(lang('moon.event.s.0'));
					
				if (World.field.flags[World.field.FLAG_SELENA] == 1)
					World.queue.add(lang('moon.event.s.1'));
					
				this.color = 'grey';
				World.field.flags[World.field.FLAG_ENCHANTRESS] = 1;
			}
			else 
				World.queue.add(lang('moon.event.s.2'));
	
		};

		if (letter == 't')
		{
			World.queue.add(lang('moon.event.t.0'));
			World.field.flags[World.field.FLAG_GLASS] = 1;
			World.map.removeObject(this);
		};
		
		if (letter == 'v')
			World.queue.add(lang('moon.event.v.0'));
		
		if (letter == 'z')
			World.changeGameState(STATE_SPLASH_SCREEN, [ENDING_NEUTRAL, World.getHandler().isValidForAchievements]);
		
		
	return true;
	};	
};