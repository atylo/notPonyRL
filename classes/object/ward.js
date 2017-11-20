function TObjectWard() 
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = '—';
	this.color        = 'gray';
	this.id           = OBJECT_WARD;
	this.isVertical   = false;
	this.isOn         = false;
	this.isPassable   = true;
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
		if (this.isOn)
		{
			if (World.player._class == CLASS_WIZARD)
				return this.draw() + lang('object.' + this.id + '.description.on.wizard');
			else
				return this.draw() + lang('object.' + this.id + '.description.on');
		}
		else
		{
			if (World.player._class == CLASS_WIZARD)
				return this.draw() + lang('object.' + this.id + '.description.off.wizard');
			else
				return this.draw() + lang('object.' + this.id + '.description.off');
		}
	};
	
	this.onMove = function()
	{
		var lang = this.getDescription();
		World.queue.add(lang);
		return true;	
	}
	
	this.onLook = function()
	{
		if (this.isOn)
		{
			if (World.player.hasAbility(TRAIT_CRYSTALS))
				World.queue.add(lang('object.' + this.id + '.action.activate.already'));
				
		}
		else
		{
			if (World.player.hasAbility(TRAIT_CRYSTALS))
			{	
				this.color = 'gold'
				this.isOn  = true;
				World.menu.need_draw = 1;
				World.player.removeAbility(TRAIT_CRYSTALS);
				
				if (World.player._class == CLASS_WIZARD)
					World.queue.add(lang('object.' + this.id + '.action.activate.wizard'));
				else
					World.queue.add(lang('object.' + this.id + '.action.activate'));
			
			}
		}
	}
	
	this.onNPCMove = function(o)
	{
		if (this.isOn  == true)
		{
			this.color = 'gray'
			this.isOn  = false;
			World.map.invalidate(this.x, this.y);
			World.menu.need_draw = 1;
			World.queue.draw();
			var damage = Math.round(World.map.objects[o.y][o.x][o.z].getMaxHP()/15) + 2;
			World.map.objects[o.y][o.x][o.z].hp -= damage;
			if (World.map.objects[o.y][o.x][o.z].hasAbility(TRAIT_CHAMPION))
				World.queue.add(lang('object.' + this.id + '.action.zap.boss'));
			else
				World.queue.add(lang('object.' + this.id + '.action.zap'));
		}
		return true;
	}
}

TConfig.objects[KEY_OBJECT][OBJECT_WARD] = new TObjectWard();
