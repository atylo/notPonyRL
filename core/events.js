function TEventCollection()
{
	/*
	Event data keys
		EVENT_TYPE         = 0;
		EVENT_TIME         = 1;
		EVENT_TARGET_TYPE  = 2;  //Use object type keys like KEY_ENEMY or objects themselves
		EVENT_TARGET_ID    = 3;  //Use specific object keys like NPC_CHANGELING 
		EVENT_TARGET_LVL   = 4;
		EVENT_TAG          = 5;
		EVENT_LEVEL        = 6;  // Player level at the moment of the event
	*/
	   
	/*
		// log events		// Description			Power
LOG_KILL         = 1;	// Mob killed			level difference
LOG_DEATH        = 2;	// Player dead			player level
LOG_CONFRONT     = 3;	// Boss confront		player level
LOG_END          = 4;	// Game ended			player level
LOG_LVLUP        = 5;	// Level up				player level
LOG_EXPLORE      = 6;	// Explore map			squares explored
LOG_CAST         = 7;	// Some skill			-
LOG_BUY          = 8   // Buy item
LOG_USE          = 9;	// Use item			-
LOG_SACRIFICE    = 10; // Sacrifice an item	item cost
LOG_ACTIVATE     = 11; // Some map object		-
LOG_STATE        = 12; // Got buff/debuff		Buff/debuff strength.
LOG_WORSHIP      = 13; // Started to worship god
LOG_RENOUNCE     = 14; // Was punished by the god
LOG_INVOKE       = 15; // Invoked a god's power
LOG_KEY_ACTION   = 16; //Player pressed key to  or mouse
	*/	   
   
	this.events     = [];
	this.eventTypes = [];
	
	this.addEvent = function(e)
	{
		if(e[EVENT_TYPE] == LOG_EXPLORE)
			return false;
		
		this.events.push(e);
		if(this.eventTypes[e[EVENT_TYPE]] == undefined)
			this.eventTypes[e[EVENT_TYPE]] = 0;
		
		this.eventTypes[e[EVENT_TYPE]]++;
		
		return true;
	};
	
	this.clear = function()
	{
		this.events     = [];
		this.eventTypes = [];
	};
	
	this.eventToLog = function(e)
	{
		var data = {};
		
		if(!this.shouldLog(e))
			return false;
		
		data.dt  = e[EVENT_TIME];
		data.tag = e[EVENT_TAG];
		data.lvl = e[EVENT_TARGET_LVL];
		data.n   = this.getTargetName(e);
		data.pl  = World.player.getTitle();
		
		return lang('log.event_' + e[EVENT_TYPE], data);
	};
	
	this.getTargetName = function(e)
	{
		if(e[EVENT_TYPE] == LOG_STATE)
			return lang('abilities.onhit.' + e[EVENT_TARGET_ID]);
		if(e[EVENT_TYPE] == LOG_CAST || e[EVENT_TYPE] == LOG_INVOKE)
			return TConfig.skills[e[EVENT_TAG]].getTitle();
		
		var o = this.getTarget(e);
		if(!o)
			return '';
		
		return o.getTitle();
	};
	
	this.getTarget = function(e)
	{
		if(e[EVENT_TARGET_TYPE] == undefined || e[EVENT_TARGET_ID] == undefined)
			return false;
		
		var type = e[EVENT_TARGET_TYPE];
			
		if(type == KEY_ENEMY || type == KEY_ITEM || type == KEY_OBJECT || type == KEY_TERRAIN || type == KEY_FIELD || type == KEY_GOD)
			return TConfig.objects[type][e[EVENT_TARGET_ID]];
			
		
		
		return false;
	};	
	
	this.hasEvent = function(t)
	{
		return (this.eventTypes[t] != undefined && this.eventTypes[t] > 0);
	};
	
	this.init = function() 
	{
		this.clear();
		return true;
	};	
	
	this.log = function()
	{
		var str = '';
		for(i in this.events)
		{
			var e = this.eventToLog(this.events[i]);
			if(e)
				str = str + e + lang('br');
		}
		
		return str;
	}
	
	this.shouldLog = function(e)
	{
		var type = e[EVENT_TYPE];
		
		if( 
			type == LOG_ACTIVATE ||
			type == LOG_BUY || 		
			(type == LOG_CAST && e[EVENT_TAG] != SKILL_ATTACK) ||
			type == LOG_CONFRONT ||  
			type == LOG_DEATH || 
			type == LOG_INVOKE || 
			type == LOG_KILL || 
			type == LOG_LVLUP || 
			type == LOG_RENOUNCE ||
			type == LOG_SACRIFICE ||
			type == LOG_STATE ||
			type == LOG_USE ||
			type == LOG_WORSHIP ||
			0
		)
			return true;
		
		if(
			World.wrapper.getOption(OPTION_EXT_LOGS) &&
			(
				type == LOG_CAST ||
				type == LOG_EXPLORE
			)
		)
			return true;
		
		return false;
	};
}