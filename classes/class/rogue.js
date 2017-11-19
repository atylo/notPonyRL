function TClassRogue()
{
	ExtClass.call(this, {AbstractClass: null});
	this.id = CLASS_ROGUE;
	
	this.customNames = function(names, _race)
	{
		if(_race == RACE_UNICORN && World.seedRandom.mt_rand(0,5) == 0)
			names.push([lang('player.' + CLASS_ROGUE + "." + RACE_UNICORN + '.0'),'white']);
		if(_race == RACE_UNICORN && World.seedRandom.mt_rand(0,5) == 0)
			names.push([lang('player.' + CLASS_ROGUE + "." + RACE_UNICORN + '.1'),'white']);
		if(_race == RACE_DRAGON && World.seedRandom.mt_rand(0,5) == 0)
			names.push([lang('player.' + CLASS_ROGUE + "." + RACE_DRAGON + '.0'),'white']);

		return names;
	};
	
	this.init = function(creature)
	{
		creature._skills.push(SKILL_WHINE);
		
		return true;
	};
	
	
	this.react = function(src, e)
	{
		if(e[EVENT_TYPE] == LOG_LVLUP && src.level > 2)
		{
			World.queue.add(lang('event.levelup.rogue'));
			src.gp = Math.floor(src.gp/2);
		}
		
		return true;
	};
}

TConfig.objects[KEY_CLASS][CLASS_ROGUE] = new TClassRogue();
addClass(CLASS_ROGUE     , REWARD_GEMHUNTER);

