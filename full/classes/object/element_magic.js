function TObjectElementMagic()
{
	ExtClass.call(this, {AbstractObject: null});

	this.show         = 'o';
	this.color        = 'purple';
	this.id           = OBJECT_ELEMENT_MAGIC;
	this.z            = 1;
	

	this.onLook = function()
	{
		World.queue.add(lang('object.' + OBJECT_ELEMENT_MAGIC + '.action.0'));
		World.raiseEvent(LOG_ACTIVATE, KEY_OBJECT, this.id, false, false);
		
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.player, 3, lang('object.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, World.player, 15, lang('object.' + this.id + '.title'));
		World.player.heal(200);
		World.map.removeObject(this);
		World.menu.need_draw = 1;
			
		return false;
	};
	
	this.onHover = function()
	{
		World.queue.draw();
		World.queue.add(this.getDescription());
		World.queue.draw();
		return true;
	};
	
	this.onMove = function()
	{
		World.queue.add(this.getDescription());
		return true;
	};
}

TConfig.objects[KEY_OBJECT][OBJECT_ELEMENT_MAGIC] = new TObjectElementMagic();