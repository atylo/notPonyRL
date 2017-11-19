function TObjectDoor()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = '—';
	this.color        = 'gray';
	this.id           = OBJECT_DOOR;
	this.isVertical   = false;
	this.isOpen       = false;
	this.isPassable   = false;
	this.z            = 1;

	this.init = function(isVertical)
	{
		if (isVertical)
		{
			this.isVertical = true;
			this.show       = '|';
			World.map.invalidate(this.x, this.y);
		}
	};
	
	this.getDescription = function()
	{
		if (this.isOpen)
			return lang('object.' + this.id + '.description.1');
		else
			return lang('object.' + this.id + '.description.0');
	};
	
	this.onMove = function()
	{
		if (this.isOpen)
			return true;
		
		if (World.player._class == CLASS_ROGUE)
		{
			if (World.player.level >=6)
			{
				this.color = 'green'
				this.isOpen = true;
				this.isPassable = true;
				World.menu.need_draw = 1;
				World.queue.add(lang('object.' + this.id + '.action.pick'));
				return false;
			}
			else
				World.queue.add(lang('object.' + this.id + '.action.pickFail'));
		}
		
		if (World.player.level >=9 || (World.player._race == RACE_DRAGON && World.player.level >=7))
		{
			this.color = 'green'
			this.isOpen = true;
			this.isPassable = true;
			World.menu.need_draw = 1;
			World.queue.add(lang('object.' + this.id + '.action.break'));
			return false;
		}
			
		if (World.player.hasAbility(TRAIT_KEYS))
		{
			World.player.removeAbility(TRAIT_KEYS);
			this.color = 'green'
			this.isOpen = true;
			this.isPassable = true;
			World.menu.need_draw = 1;
			World.queue.add(lang('object.' + this.id + '.action.open'));
			return false;
		}
		
		World.queue.add(lang('object.' + this.id + '.action.breakFail'));
		return false;
	};
	
	this.onNPCMove = function()
	{
		return this.isOpen;
	}
}

TConfig.objects[KEY_OBJECT][OBJECT_DOOR] = new TObjectDoor();
