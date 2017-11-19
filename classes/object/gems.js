function TObjectGems()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = '*';
	this.color        = 'grey';
	this.id           = OBJECT_GEMS;
	this.z            = 1;
	
	this.onLook = function()
	{
		if(World.player.getAttack() < 50)
			World.queue.add(lang('object.' + OBJECT_GEMS + '.action.0'));
		else
		{
			var gp = World.seedRandom.mt_rand(3, 6);
			var c  = World.seedRandom.mt_rand(1,3);
			
			World.queue.add(lang('object.' + OBJECT_GEMS + '.action.' + c, {'gp': gp}));
			World.raiseEvent(LOG_ACTIVATE, KEY_OBJECT, this.id, false, gp);
			
			World.map.removeObject(this);
			World.player.receiveGold(gp);
		}
			
		return false;
	};

	
	this.onMove = function()
	{
		World.queue.add(this.getDescription());
		return true;
	};
}

TConfig.objects[KEY_OBJECT][OBJECT_GEMS] = new TObjectGems();