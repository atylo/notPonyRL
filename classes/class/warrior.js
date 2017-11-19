function TClassWarrior()
{
	ExtClass.call(this, {AbstractClass: null});
	this.id = CLASS_WARRIOR;
	
	this.customNames = function(names, _race)
	{
		if(_race == RACE_PEGASUS && World.seedRandom.mt_rand(0,5) == 0)
			names.push([lang('player.' + CLASS_WARRIOR + "." + RACE_PEGASUS + '.0'),'cyan']);
		if(_race == RACE_PEGASUS && World.seedRandom.mt_rand(0,5) == 0)
			names.push([lang('player.' + CLASS_WARRIOR + "." + RACE_PEGASUS + '.1'),'cyan']);
		if(_race == RACE_DRAGON && World.seedRandom.mt_rand(0,5) == 0)
			names.push([lang('player.' + CLASS_WARRIOR + "." + RACE_DRAGON + '.0'),'cyan']);
		if(_race == RACE_DRAGON && World.seedRandom.mt_rand(0,5) == 0)
			names.push([lang('player.' + CLASS_WARRIOR + "." + RACE_DRAGON + '.1'),'crimson']);

		return names;
	};
	
	this.init = function(creature)
	{
		
		return true;
	};
}

TConfig.objects[KEY_CLASS][CLASS_WARRIOR] = new TClassWarrior();
addClass(CLASS_WARRIOR   , REWARD_GAME);

