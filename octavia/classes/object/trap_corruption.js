function TObjectTrapCorruption()
{
	ExtClass.call(this, {AbstractTrap: null});

	this.color        = 'violet';
	this.id           = OBJECT_TRAP_CORRUPTION;
	this.z            = 1;
	
	this.onMove = function()
	{
		if(World.map.seen[this.y][this.x] == SEEN_VISITED && World.seedRandom.mt_rand(0,1) == 0)
		{
			World.queue.add(lang('object.' + this.id + '.action.0'));
			World.map.removeObject(this);			
			return true;
		}
		
		World.raiseEvent(LOG_ACTIVATE, KEY_OBJECT, this.id, false, 1);
		
		World.queue.add(lang('object.' + this.id + '.action.1'));
		World.player.addCorruption(1);
		World.menu.need_draw = 1;
		return true;
	};
	
	
	this.onNPCMove = function(o)
	{		
		if(World.map.seen[this.y][this.x] == SEEN_VISITED || World.map.seen[this.y][this.x] == SEEN_YES)
		{
			World.queue.add(lang('object.' + this.id + '.step', {n: o.getTitle()}));
			World.map.seen[this.y][this.x] = SEEN_VISITED;
			World.map.invalidate(this.x, this.y);
		}
		World.map.objects[o.y][o.x][o.z].addCorruption(1);
		return true;
	};		
}

TConfig.objects[KEY_OBJECT][OBJECT_TRAP_CORRUPTION] = new TObjectTrapCorruption();