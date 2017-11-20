function TObjectSwitch()
{
	ExtClass.call(this, {AbstractObject: null});

	this.id           = OBJECT_SWITCH;
	this.show         = '-';
	this.color        = 'green';
	this.isPassable   = true;
	this.z            = 1;
	
	this.init = function(context)
	{
		this.defaults     = 
		{
			isOn        : false,
			stucks      : false,
			resets      : false,
			switchNum   : 0,
			title       : World.queue.add(this.getTitle()),
			description : World.queue.add(this.getDescription()),
			textOn      : World.queue.add(lang('object.' + this.id + '.action.on')),
			textOff     : World.queue.add(lang('object.' + this.id + '.action.off')),
			textStuck   : World.queue.add(lang('object.' + this.id + '.action.stuck')),
			textReset   : World.queue.add(lang('object.' + this.id + '.action.reset')),
			showOn      : "+",
			showOff     : '-',
			colorOn     : 'lightgreen',
			colorOff    : 'green',
		}
	
		for (var key in this.defaults)
		{
			if (context.hasOwnProperty(key))
				this[key] = context[key];
			else
				this[key] = this.defaults[key];
		}
		
		this.color = this.colorOff;
		this.show = this.showOff;
	};

	this.onLook = function()
	{
		if (this.isOn)
			return this.turnOff();
		else
			return this.turnOn(); 
	};
	
	this.onHover = function()
	{
		World.queue.add(this.description)
		World.queue.draw();
		return true;
	};
	
	this.onMove = function()
	{
		World.queue.add(this.description);
		return true;
	};
	
	this.turnOff = function()
	{
		if (this.isOn)
		{
			if (this.stucks)
			{
				World.queue.add(this.textStuck);
				return false;
			}
			else
			{
				this.isOn = false;
				this.show = this.showOff;
				this.color = this.colorOff;
				World.map.invalidate(this.x, this.y);
				World.queue.add(this.textOff);
			}
			World.raiseEvent(LOG_ACTIVATE, KEY_OBJECT, this.id, this.isOn, this.switchNum);
			return true;
		}
		return false;
	}
	
	this.turnOn = function()
	{
		if (!this.isOn)
		{
			if (this.resets == false)
			{
				this.isOn = true;
				this.show = this.showOn;
				this.color = this.colorOn;
				World.map.invalidate(this.x, this.y);
				World.queue.add(this.textOn);
				World.raiseEvent(LOG_ACTIVATE, KEY_OBJECT, this.id, this.isOn, this.switchNum);
				return true;
			}	
			else
			{
				World.queue.add(this.textReset);
				World.raiseEvent(LOG_ACTIVATE, KEY_OBJECT, this.id, this.isOn, this.switchNum);
			}
			return false;
		}
	}
	
	this.onNPCMove = function(o)
	{		
		return true;
	};
	
}

TConfig.objects[KEY_OBJECT][OBJECT_SWITCH] = new TObjectSwitch();