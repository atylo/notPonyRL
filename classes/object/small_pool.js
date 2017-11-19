function TObjectSmallPool()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = '0';
	this.color        = 'lightblue';
	this.id           = OBJECT_SMALL_POOL;
	this.z            = 1;
	
	this.onLook = function()
	{
		if(World.player.hp == World.player.getMaxHP())
			World.queue.add(lang('object.' + this.id + '.action.0'));
		else
		{
			if (World.player._race == RACE_ZEBRA)
			{
				World.queue.add(lang('object.' + this.id + '.action.2'));
				World.player.restore(2);
			}
			else
				World.queue.add(lang('object.' + this.id + '.action.1'));
				
			World.raiseEvent(LOG_ACTIVATE, KEY_OBJECT, this.id, false, World.player.level);
			World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_BASE, World.player, World.player.level, lang('object.' + this.id + '.title'));
			World.player.hp++;
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

TConfig.objects[KEY_OBJECT][OBJECT_SMALL_POOL] = new TObjectSmallPool();

