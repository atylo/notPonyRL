function TObjectTomes()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = '"';
	this.color        = 'brown';
	this.id           = OBJECT_TOMES;
	this.z            = 1;
	this.text         = "";
	
	this.init = function(s)
	{
		this.text = s;
	};
	
	this.onLook = function()
	{
		var xp = World.player.level + 2;
		var msg = '';

		if (this.text != "" && this.text !== undefined)
		{
			msg = (this.text);
		}
		else if (World.seedRandom.mt_rand(0,10) == 0)
		{
			var t = World.seedRandom.mt_rand(2,9);
			msg = lang('object.' + this.id + '.action.' + t);

		}
		else if(World.player._class == CLASS_WIZARD)
		{
			msg = lang('object.' + this.id + '.action.1');
			xp = Math.floor(xp*1.5);
		}
		else
			msg = lang('object.' + this.id + '.action.0');

		World.queue.add(msg);
		World.raiseEvent(LOG_ACTIVATE, KEY_OBJECT, this.id, false, xp);
			
		World.player.receiveExp(xp);
		World.map.removeObject(this);
			
		return false;
	};

	
	this.onMove = function()
	{
		World.queue.add(this.getDescription());
		return true;
	};
}

TConfig.objects[KEY_OBJECT][OBJECT_TOMES] = new TObjectTomes();