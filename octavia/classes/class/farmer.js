function TClassFarmer()
{
	ExtClass.call(this, {AbstractClass: null});
	this.id = CLASS_FARMER;
	
	this.customNames = function(names, _race)
	{
		if(_race == RACE_PONY && World.seedRandom.mt_rand(0,5) == 0)
			names.push([lang('player.' + CLASS_FARMER + "." + RACE_PONY + '.0'),'orange']);

		return names;
	};
	
	this.init = function(creature)
	{
		return true;
	};
}

TConfig.objects[KEY_CLASS][CLASS_FARMER] = new TClassFarmer();
addClass(CLASS_FARMER    , REWARD_NOT_A_BETA);
