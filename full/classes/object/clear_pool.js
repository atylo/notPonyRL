function TObjectClearPool()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = '0';
	this.color        = 'DeepSkyBlue';
	this.id           = OBJECT_CLEAR_POOL;
	this.z            = 1;
	
	this.onLook = function()
	{
		if(World.player.hp == World.player.getMaxHP())
			World.queue.add(lang('object.' + OBJECT_CLEAR_POOL + '.action.0'));
		else
		{
			if (World.player._race == RACE_ZEBRA)
			{
				World.queue.add(lang('object.' + this.id + '.action.2'));
				World.player.restore(2);
			}
			else
				World.queue.add(lang('object.' + this.id + '.action.1'));
				
			var str = (20 + World.player.level*2);
			
			World.raiseEvent(LOG_ACTIVATE, KEY_OBJECT, this.id, false, str);
			World.player.heal(str);
			World.map.removeObject(this);
			World.menu.need_draw = 1;
		}
			
		return false;
	};
	
	this.onMove = function()
	{
		World.queue.add(this.getDescription());
		return true;
	};
}

TConfig.objects[KEY_OBJECT][OBJECT_CLEAR_POOL] = new TObjectClearPool();