/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function AbstractGod()
{
	this.id          = 0;
	this.skills      = [];
	
	this.canConvert = function()
	{
		if(World.player.hasFlag(FLAG_RENOUNCE, this.id))
			return false;
		
		if(World.player._religion != RELIGION_NONE)
			return false;
		
		return true;
	};
	
	this.convert = function()
	{
		if(this.id == World.player._religion)
		{
			World.queue.add(lang('religion.convert.same'));
			return false;
		}
		
		if(World.player.hasFlag(FLAG_RENOUNCE, this.id))
		{
			World.queue.add(lang('religion.convert.renounced'));
			return false;
		}
		
		if(!this.canConvert())
		{
			World.queue.add(lang('religion.convert.fail'));
			return false;
		}

		World.player._religion = this.id;
		World.queue.add(lang('religion.convert.' + this.id));
		this.handlerConvert();
		World.menu.need_draw = 1;
		
		World.audio(AUDIO_SKILL, 'audio/event-convert.mp3', {});
		World.raiseEvent(LOG_WORSHIP, KEY_GOD, this.id, false, World.player.piety);
		
		return true;
	};
	
	this.customReact = function(e)
	{
		return false;
	};
	
	this.customRenounce = function()
	{
		return false;
	};
	
	this.getAbilities = function()
	{
		return '';
	};
	
	this.getDescription = function()
	{
		var data = {};
		
		data['t'] = this.getTitle();
		data['d'] = lang('religion.god.description.' + this.id);
		
		return lang('religion.description', data);
	};
	
	this.getPietyString = function()
	{
		var piety = Math.floor((World.player.piety + 20)/20);
		if(piety > 4)
			piety = 4;
		return lang('sacrifice.' + piety);
	};
	
	this.getPietyByItem = function(item, cost)
	{
		return Math.floor(cost/5 + 1);
	};
	
	this.getSkills = function()
	{
		var res = [];
		for(var i in this.skills)
		{
			var skill = TConfig.skills[this.skills[i]];
			if(skill.canUse())
				res.push(this.skills[i]);
		}
		
		return res;
	};

	this.getTitle = function()
	{
		return lang('religion.' + this.id + '.title');
	};
	
	this.handlerConvert = function()
	{
		return false;
	};
	
	this.react = function(e)
	{
		if(this.customReact(e))
			return true;
		
		if (e[EVENT_TYPE] == LOG_SACRIFICE)
		{
			World.player.receivePiety(this.getPietyByItem(false, e[EVENT_TAG]));
			return true;
		}
		
		return false;
	};
	
	this.renounce = function()
	{
		World.player._religion = RELIGION_NONE;
		World.player.piety    = 0;
		
		this.customRenounce();
		
		World.player.incFlag(FLAG_RENOUNCE, this.id)
		
		World.queue.add(lang('religion.renounce.' + this.id));
		
		World.raiseEvent(LOG_RENOUNCE, KEY_GOD, this.id, false, World.player.piety);
		World.menu.need_draw = 1;
		return false;
	};
}
