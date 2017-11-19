function TObjectSign()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = 'T';
	this.color        = 'brown';
	this.id           = OBJECT_SIGN;
	this.isPassable   = true;
	this.z            = 1;
	
			// multiple possible descriptions
			
	this.text         = '';
	this.description  = '';
	
	this.init = function(s)
	{
		var descr = [];
		descr.push(lang('object.' + this.id + '.description.0'));
		descr.push(lang('object.' + this.id + '.description.1'));
		descr.push(lang('object.' + this.id + '.description.2'));
		
		this.description = descr[World.seedRandom.mt_rand(0, descr.length - 1)]
		
		this.text = s;
	};
	
	this.onHover = function()
	{
				// standing on that object already?
		if(World.player.x == this.x && World.player.y == this.y)
			return false;
		
		World.queue.addAlert(lang('object.' + this.id + '.action.0', {'d': this.text, 'f': this.description}));
		World.queue.drawAlerts();
		return true;
	};
	
	this.onLook = function()
	{
		World.queue.add(lang('object.' + this.id + '.action.0', {'d': this.text, 'f': this.description}));
		return true;
	};
	
	this.onMove = function()
	{
		World.queue.add(lang('object.' + this.id + '.action.0', {'d': this.text, 'f': this.description}));
		return true;
	};
	
	this.onNPCMove = function(o)
	{		
		return true;
	};
}

TConfig.objects[KEY_OBJECT][OBJECT_SIGN] = new TObjectSign();