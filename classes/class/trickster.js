function TClassTrickster()
{
	ExtClass.call(this, {AbstractClass: null});
	this.id = CLASS_TRICKSTER;
	
	this.customNames = function(names, _race)
	{
		if(_race == RACE_PEGASUS && World.seedRandom.mt_rand(0,5) == 0)
			names.push([lang('player.' + CLASS_TRICKSTER + "." + RACE_PEGASUS + '.0'),'white']);
			
		return names;
	};
	
	this.init = function(creature)
	{
		
		return true;
	};
}

TConfig.objects[KEY_CLASS][CLASS_TRICKSTER] = new TClassTrickster();
addClass(CLASS_TRICKSTER , REWARD_NOT_A_BETA);

