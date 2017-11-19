function TObjectTrapPit()
{
	ExtClass.call(this, {AbstractTrap: null});

	this.color        = 'brown';
	this.id           = OBJECT_TRAP_PIT;
	this.z            = 1;
	
	this.onMove = function()
	{
		if(World.map.seen[this.y][this.x] == SEEN_VISITED && World.seedRandom.mt_rand(0,1) == 0)
		{
			World.queue.add(lang('object.' + this.id + '.action.0'));
			return true;
		}
				
		if(World.player._race == RACE_PEGASUS || World.player._race == RACE_ALICORN || World.player._race == RACE_DRAGON)
			if(World.seedRandom.mt_rand(0,2) == 0)
			{
				World.queue.add(lang('object.' + this.id + '.action.1'));
				return true;
			}
		
		var dmg = World.seedRandom.mt_rand(3, Math.floor(World.player.level*1.5) + 3);
		
		World.queue.add(lang('object.' + this.id + '.action.2'));
		World.raiseEvent(LOG_ACTIVATE, KEY_OBJECT, this.id, false, dmg);
		
		World.player.hp -= dmg;
		World.menu.need_draw = 1;
		
		if(World.player.hp <= 0)
		{
			World.queue.add(lang('object.' + this.id + '.action.3'));
			World.raiseEvent(LOG_DEATH, KEY_OBJECT, this.id, false, false);
			World.player.die();
		}
		
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
		
		World.map.objects[o.y][o.x][o.z].hp -= 2 + Math.floor(o.level*2);
		if(World.map.objects[o.y][o.x][o.z].hp < 1)
			World.wrapper.addAchievementProgress(REWARD_HUNTMASTER, 0.2);
		
		return true;
	};		
}

TConfig.objects[KEY_OBJECT][OBJECT_TRAP_PIT] = new TObjectTrapPit();