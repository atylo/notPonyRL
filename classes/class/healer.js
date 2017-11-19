function TClassHealer()
{
	ExtClass.call(this, {AbstractClass: null});
	this.id = CLASS_HEALER;
	
	this.customNames = function(names, _race)
	{
		if(_race == RACE_PEGASUS && World.seedRandom.mt_rand(0,5) == 0)
			names.push([lang('player.' + CLASS_HEALER + "." + _race + '.0'),'yellow']);
		if(_race == RACE_ALICORN && World.seedRandom.mt_rand(0,5) == 0)
			names.push([lang('player.' + CLASS_HEALER + "." + _race + '.0'),'navy']);

		return names;
	};
	
	this.init = function(creature)
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, creature, -0.2, lang('class.' + this.id + '.title'));
		creature.abilities.push(TRAIT_REGENERATE);
		creature.effects.push(EFFECT_DEATH_WARD);	
		
		return true;
	};
	
	this.react = function(src, e)
	{			
		if(e[EVENT_TYPE] == LOG_LVLUP && (src.level  == 4 || src.level == 8 || src.level == 12) && !src.hasEffect(EFFECT_DEATH_WARD))
			src.effects.push(EFFECT_DEATH_WARD);
	
		return true;
	};
}

TConfig.objects[KEY_CLASS][CLASS_HEALER] = new TClassHealer();
addClass(CLASS_HEALER    , REWARD_GAME);

