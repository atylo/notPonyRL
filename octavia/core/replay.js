function TReplay()
{
	this.blocks = new Array();
	
	this.addValue = function(block, value)
	{
		if(this.blocks[block] == undefined)
			return false;
		if(!(this.blocks[block] instanceof Array))
			return false;
		
		this.blocks[block].push(value);
		return true;
	};
	
	this.clear = function()
	{
		this.blocks = new Array();
		this.blocks[REPLAY_VERSION] = [TConfig.version];
	};
	
	this.fromString = function(encryptedString)
	{	
		var a = CryptoJS.Rabbit.decrypt(encryptedString, TConfig.pwd);
		var stringData = JSON.parse(a.toString(CryptoJS.enc.Utf8));
		
		if(!(stringData instanceof Array))
		{
			notification(lang('storage.bad_string'));
			return false;
		}
		return stringData;
	};		
	
	this.getBlock = function(block)
	{
		return (this.blocks[block] == undefined)?false:this.blocks[block];
	};
	
	this.init = function(data)
	{
		this.blocks[REPLAY_TASK] = [World.seedRandom.getSeed(), World.seedRandom.getCurrentSeed(), data['r'], data['c'], World.fieldID, World.player._name, World.player.color, data['seed']];
		
		this.blocks[REPLAY_ACHIEVEMENTS] = World.wrapper.achievements;

		this.blocks[REPLAY_ACTIONS] = [];
	};
	
	this.loadReplay = function(type)
	{
		var replayArray = this.fromString(jQuery('#replay_load_code').val());
		
				// check version
		if (replayArray[REPLAY_VERSION][0] != TConfig.version)
			notification(lang('error.bad_version') + replayArray[0]);
		else if (replayArray != false)
		{
			jQuery('#replay_load_code').val("");
			this.blocks = replayArray;
				
				// Not a nice way of repeating the showChapter function
			jQuery(".chapter").hide();
			jQuery("#" + "gamePart").show();
			
			var data = new Array();
			data['s'] = this.blocks[REPLAY_TASK][0];
			data['x'] = this.blocks[REPLAY_TASK][1];
			data['r'] = this.blocks[REPLAY_TASK][2];
			data['c'] = this.blocks[REPLAY_TASK][3];
			data['f'] = this.blocks[REPLAY_TASK][4];
			data['n'] = this.blocks[REPLAY_TASK][5];
			data['o'] = this.blocks[REPLAY_TASK][6];
			data['seed'] = this.blocks[REPLAY_TASK][7];
			data['a'] = this.blocks[REPLAY_ACHIEVEMENTS];
			
			var str = "0/" + (this.blocks[REPLAY_ACTIONS].length);
			jQuery("#moves_counter").html(str);
			jQuery('#progress_bar').css('width', 0 + "%");
			
			if (type == STATE_REPLAY)
				World.changeGameState(STATE_REPLAY, data);
				
			if (type == STATE_GAME)
				World.changeGameState(STATE_GAME, data);
			
		return true;
		}
	};
	
	this.logAction = function(e)
	{
		if(World.state != STATE_GAME)
			return false;
		
		
			// tag passes the skill chosen.
		if (e[EVENT_TYPE] == LOG_CHOOSE_SKILL)
		{	
			this.addValue(REPLAY_ACTIONS, [e[EVENT_TYPE], e[EVENT_TAG]]);
		}
		
			//tag passes the y*100+x to places that player moved to OR used skill on
		if (e[EVENT_TYPE] == LOG_KEY_ACTION)
		{
			 this.addValue(REPLAY_ACTIONS, [e[EVENT_TYPE], e[EVENT_TAG]]);
		}	 
		
			 // Target LVL passes place in shop for the item
		if (e[EVENT_TYPE] == LOG_BUY || e[EVENT_TYPE] == LOG_USE || e[EVENT_TYPE] == LOG_SACRIFICE)
		{
			this.addValue(REPLAY_ACTIONS, [e[EVENT_TYPE], e[EVENT_TARGET_LVL]]);
		}
			
		return true;
	};
	
	this.toString = function()
	{	
		return str = CryptoJS.Rabbit.encrypt(JSON.stringify(this.blocks), TConfig.pwd).toString();
	};
	
	
	this.setBlock = function(block, value)
	{
		if(this.blocks[block] == undefined)
			return false;
		
		this.blocks[block] = value;
		return true;
	};
	

}