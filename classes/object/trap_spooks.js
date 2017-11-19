function TObjectTrapSpooks()
{
	ExtClass.call(this, {AbstractTrap: null});

	this.color        = 'gray';
	this.id           = OBJECT_TRAP_SPOOKS;
	this.z            = 1;
	
	this.onMove = function()
	{
		if (World.map.seen[this.y][this.x] == SEEN_VISITED)
		{
			World.queue.add(lang('object.' + this.id + '.seen'));
			return true;
		}
				
		if (World.player.corruption < 0)
		{
			World.queue.add(lang('object.' + this.id + '.nofear'));
			return true;
		}
		
		if (World.player._religion == RELIGION_PINKIE)
		{
			World.queue.add(lang('object.' + this.id + '.pinkie'));
			return true;
		}
		
		if (World.player.hasEffect(EFFECT_SCARED))
		{
			World.queue.add(lang('object.' + this.id + '.spooked'));
			World.raiseEvent(LOG_ACTIVATE, KEY_OBJECT, this.id, false, false);
			World.player.addEffect(EFFECT_POISON);
			World.menu.need_draw = 1;
			return true;
		}
		
		
		World.queue.add(lang('object.' + this.id + '.step'));
		World.raiseEvent(LOG_ACTIVATE, KEY_OBJECT, this.id, false, false);
		
		World.player.addEffect(EFFECT_SCARED);
		World.menu.need_draw = 1;
		
		return true;
	};
	
	
	this.onNPCMove = function(o)
	{		
		if(World.map.seen[this.y][this.x] == SEEN_VISITED || World.map.seen[this.y][this.x] == SEEN_YES)
		{
			World.map.seen[this.y][this.x] = SEEN_VISITED;
			World.map.invalidate(this.x, this.y);
			
			if (o.hasAbility(TRAIT_BLOODLESS) || o.hasAbility(TRAIT_BERSERK))
				World.queue.add(lang('object.' + this.id + '.NPCTrapFails', {n: o.getTitle()}));
			else 
			{
				World.queue.add(lang('object.' + this.id + '.NPCTrapWorks', {n: o.getTitle()}));
				World.map.objects[o.y][o.x][o.z].addEffect(EFFECT_SCARED);
			}
		}
		return true;
	};		
}

TConfig.objects[KEY_OBJECT][OBJECT_TRAP_SPOOKS] = new TObjectTrapSpooks();