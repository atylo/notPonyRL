function TClassWizard()
{
	ExtClass.call(this, {AbstractClass: null});
	this.id = CLASS_WIZARD;
	
	this.customNames = function(names, _race)
	{
		if(_race == RACE_UNICORN && World.seedRandom.mt_rand(0,5) == 0)
			names.push([lang('player.' + CLASS_WIZARD + "." + RACE_UNICORN + '.0'),'violet']);
		if(_race == RACE_UNICORN && World.seedRandom.mt_rand(0,5) == 0)
			names.push([lang('player.' + CLASS_WIZARD + "." + RACE_UNICORN + '.1'),'violet']);
		if(_race == RACE_ALICORN && World.seedRandom.mt_rand(0,5) == 0)
			names.push([lang('player.' + CLASS_WIZARD + "." + RACE_ALICORN + '.0'),'pink']);

		return names;
	};
	
	this.init = function(creature)
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, creature, -0.1 , lang('class.' + CLASS_WIZARD + '.title'));
		creature._skills.push(SKILL_MISSILE);
		
		return true;
	};
}

TConfig.objects[KEY_CLASS][CLASS_WIZARD] = new TClassWizard();
addClass(CLASS_WIZARD    , REWARD_NONE);

