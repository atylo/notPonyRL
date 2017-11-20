function TRacePony()
{
	this.id          = RACE_PONY;
	ExtClass.call(this, {AbstractRace: null});
	
	this.init = function(creature)
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, creature, 3, lang('race.' + RACE_PONY + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_MP_BASE, creature, -3, lang('race.' + RACE_PONY + '.title'));
	};
}

TConfig.objects[KEY_RACE][RACE_PONY] = new TRacePony();
addRace(RACE_PONY       , REWARD_NONE);	
