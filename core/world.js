function TWorld()
{
		/**
		 *	@type TPlayer
		 */
	this.player    = '';
	this.state     = STATE_START;
	this.turns     = 0;

	this.audio     = [];
	this.howl      = [];
	
	/**
	 * @var TMap
	 */
	this.map = false;

	this.action = function(x, y, type)
	{
		x = x*1;
		y = y*1;
		
			// only for game and replay state
		if(this.state != STATE_GAME && this.state != STATE_REPLAY)
			return false;
		
		msg_clear();
		
				// no mouse for replays
		if(type == ACTION_MOUSE && this.state == STATE_GAME)
			type = (x == this.player.x && y == this.player.y)?ACTION_LOOK:ACTION_MOVE;
			
		if(type == ACTION_MOVE)
		{
			World.player.last_hp = World.player.hp;
			var skill = TConfig.skills[this.player.active_skill];
			
			if(Math.abs(x - this.player.x) > skill.range || Math.abs(y - this.player.y) > skill.range)
				return false;
			
			this.move(x, y);
		}
		
		if(type == ACTION_LOOK)
		{
			World.player.last_hp = World.player.hp;
			this.look(x, y);
		}
		this.draw();
		return true;
	};
	
	this.audio = function(channel, src, options)
	{
		if (!soundsOn)
			return true;

		//console.log(channel + " <- " + src + " (" + this.wrapper.getOption(OPTION_SOUND) + ")");
		//console.log(options);

		if(this.audio[channel] !== undefined)
			this.howl[this.audio[channel]].stop();
		
		if(!this.wrapper.getOption(OPTION_SOUND))
			return false;

		this.audio[channel] = src;
		this.howl[this.audio[channel]].play();
	};
	
	this.changeGameState = function(state, params)
	{
		if(state == this.state)
			return false;
		
		this.getHandler().stopObserving(params);
		this.state = state;
		this.getHandler().startObserving(params);

		if(this.getHandler().ambient)
			this.audio(AUDIO_AMBIENT, this.getHandler().ambient, {loop: true});

		this.draw();
		
		return true;
	};
	
	this.chooseSkill = function(skill)
	{
		this.raiseEvent(LOG_CHOOSE_SKILL, false, false, false, skill);
		for(var i in this.player._skills)
			if(this.player._skills[i] == skill && TConfig.skills[skill].onClick())
			{
				this.player.active_skill = skill;
				this.menu.need_draw = 1;
				this.menu.draw();
				return true;
			}
			
		var godSkills = this.player.getGod().getSkills();
		for(i in godSkills)
			if(godSkills[i] == skill && TConfig.skills[skill].onClick())
			{
				this.player.active_skill = skill;
				this.menu.need_draw = 1;
				this.menu.draw();
				return true;
			}

		return false;
	};
	
	this.draw = function()
	{
		if(this.state != undefined && this.state != false)
			this.getHandler().draw();
	};
	
	this.getObject = function(id, type)
	{
		return TConfig.objects[type][id];
	};

	/**
	 * @type THandlerStart
	 */

	this.getHandler = function(s)
	{		
		s = (s != undefined)?s:this.state;
		return (TConfig.handlers[s] != undefined)?TConfig.handlers[s]:TConfig.handlers[STATE_MENU];
	};
	
	this.init = function()
	{
		this.seedRandom = new TSeedRandom();
		this.queue      = new TQueue();
		this.events     = new TEventCollection();
		this.wrapper    = new TWrapper();
		this.menu       = new TMenu();
		this.shop       = new TShop();
		this.replay     = new TReplay();
		
		this.state      = STATE_START;
	};
	
	this.hover = function(x, y)
	{
		if(this.map.objects[y][x].length > 0)
			for(var z in this.map.objects[y][x])
			{
				TConfig.skills[this.player.active_skill].onHover(this.map.objects[y][x][z], this.map.objects[y][x][z].getType());
				this.map.objects[y][x][z].onHover();
			}
	};
	
	this.keyAction = function(dx, dy, mode)
	{
		return this.action(this.player.x*1 + dx, this.player.y*1 + dy, mode);
	};
	
	this.look = function(x, y)
	{
		if(this.map.objects[y][x].length > 0)
		{
			this.raiseEvent(LOG_KEY_ACTION, false, false, false, World.player.y*100+World.player.x);
			for(var z in this.map.objects[y][x])
				return this.map.objects[y][x][z].onLook();
		}
		else
			this.player.waitMessage();
		return false;
	};
	
	this.move = function(x, y, turnPass)
	{
		if (turnPass !== false)
			turnPass = true;
			
		if(x < 0 || x >= this.map.sizeX || y < 0 || y >= this.map.sizeY)
			return false;
		
		var skill     = TConfig.skills[this.player.active_skill];
		var t         = this.getObject(this.map.terrain[y][x], KEY_TERRAIN);
		
	
		t.x = x;
		t.y = y;
				// пробуем применить умение
				// если у нас есть эффект - все чудесно!
		if(skill.onApply(t, KEY_TERRAIN))
		{
			if(skill.audio)
				World.audio(AUDIO_SKILL, skill.audio, {});
			return true;
		}
		
		if(t.passable == false)
			return false;
		
		var s = true;
		
				// надо проверить - там объект остался ещё?..
		if(this.map.objects[y][x].length > 0)
			for(var z in this.map.objects[y][x])
			{
				s = s && this.map.objects[y][x][z].onMove();
				if(!s)
					break;
			}
			
		this.raiseEvent(LOG_KEY_ACTION, false, false, false, y*100+x);
			
		if(this.map.objects[y][x].length > 0)
			for(var z in this.map.objects[y][x])
				if(skill.onApply(this.map.objects[y][x][z], this.map.objects[y][x][z].getType()) && skill.audio)
					World.audio(AUDIO_SKILL, skill.audio, {});
				
		this.map.invalidate(x, y);
		
		if(!s)
		{
			var r = this.map.initFoV(this.player.x, this.player.y, this.player.sight, 1);
			this.raiseEvent(LOG_EXPLORE, false, false, false, r);
			if (turnPass) {
				this.turns++;
				this.raiseEvent(LOG_TURN_PASSED, false, false, false, this.turns);
			}
			return false;
		}
		
		this.map.invalidate(this.player.x, this.player.y);
		this.player.x = x;
		this.player.y = y;
		
		var r = this.map.initFoV(x, y, this.player.sight, 1);
		this.raiseEvent(LOG_EXPLORE, false, false, false, r);
		
			// now we see if the place we move to does something to the player
		if(this.map.objects[y][x].length > 0)
			for(var z in this.map.objects[y][x])
				this.map.objects[y][x][z].afterMove()
		
		if (turnPass) {
			this.turns++;
			this.raiseEvent(LOG_TURN_PASSED, false, false, false, this.turns);
		}

		return true;
	};
	
	this.raiseEvent = function(type, targetType, targetId, targetLevel, tag)
	{
		if(type == LOG_KILL)
			World.audio(AUDIO_EVENT, 'audio/event-kill.mp3', {});
		if(type == LOG_CONFRONT)
			World.audio(AUDIO_EVENT, 'audio/event-confront.mp3', {});
		if(type == LOG_DEATH)
			World.audio(AUDIO_EVENT, 'audio/event-death.mp3', {});
		if(type == LOG_ACTIVATE && targetType == KEY_OBJECT)
		{			
			if(targetId == OBJECT_TRAP_CORRUPTION || targetId == OBJECT_TRAP_PIT)
				World.audio(AUDIO_EVENT, 'audio/event-object-trap.mp3', {});
			if(targetId == OBJECT_TRAP_TELEPORT)
				World.audio(AUDIO_EVENT, 'audio/event-object-portal.mp3', {});
			if(targetId == OBJECT_ICE_STATUE)
				World.audio(AUDIO_EVENT, 'audio/event-object-ice.mp3', {});
			if(targetId == OBJECT_TOMES)
				World.audio(AUDIO_EVENT, 'audio/event-object-book.mp3', {});
			if(targetId == OBJECT_GEMS)
				World.audio(AUDIO_EVENT, 'audio/event-object-gem.mp3', {});
			if(targetId == OBJECT_SMALL_POOL || targetId == OBJECT_CLEAR_POOL)
				World.audio(AUDIO_EVENT, 'audio/event-object-pool.mp3', {});
			if(targetId == OBJECT_MONEY && tag <= 5)
				World.audio(AUDIO_EVENT, 'audio/event-object-coin-1.mp3', {});
			if(targetId == OBJECT_MONEY && tag > 5)
				World.audio(AUDIO_EVENT, 'audio/event-object-coin-2.mp3', {});
		}
		if(type == LOG_TURN_PASSED)
		{
				// reacting on all our objects
			var move = [];
			for(var x in World.map.objects)
				for(var y in World.map.objects[x])
					for(var z in World.map.objects[x][y])
					{
						var obj = World.map.objects[x][y][z];
						if(obj.followsRemaining != undefined && obj.followsRemaining > 0 && obj.turnFollowed != this.turns-1)
							move.push(obj);
					}

			for(var i in move)
				move[i].follow(World.player.x, World.player.y);

		}
		
		var e = [];
		e[EVENT_TYPE]        = type;
		e[EVENT_TIME]        = World.turns;
		e[EVENT_TARGET_TYPE] = targetType;
		e[EVENT_TARGET_ID]   = targetId;
		e[EVENT_TARGET_LVL]  = targetLevel;
		e[EVENT_TAG]         = tag;
		e[EVENT_LEVEL]       = World.player.level;
		
		if (e[EVENT_TYPE] == LOG_MOD_CHANGE)
		{
			return e[EVENT_TARGET_ID].applyModChange(e);
		}
		
		this.player.react(e);
		this.events.addEvent(e);
		this.replay.logAction(e);
		
		return true;
	};
	
	this.regen = function(res)
	{
		var regen = res[MODE_ALL] + res[MODE_HP];
		if(regen == 0)
			return false;

		for(var i in this.map.objects)
			for(var j in this.map.objects[i])
				for(var k in this.map.objects[i][j])
					if(this.map.objects[i][j][k] != undefined)
					{
						if(this.map.objects[i][j][k].getType() == KEY_ENEMY)
							this.map.objects[i][j][k].regen(res);
					}
		return true;
	};
	
	this.ruinFun = function(type)
	{
		if (type == "a")
			for (var i = 0; i < 30; i++ )
			{
				World.wrapper.addAchievement(i);
				World.wrapper.save();
			}
			
		if (type == "m")
		{
			for(var x = 0; x < World.map.sizeX; x++)
				for(var y = 0; y < World.map.sizeY; y++)
				{
					var r = World.map.initFoV(x, y, 1, 1);
					World.player.explore(r);
				}
			
			World.player.level +=30;
			World.player.hp = World.player.getMaxHP();
		}
		
		this.draw();
	};
}