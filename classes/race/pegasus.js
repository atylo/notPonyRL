function TRacePegasus()
{
	this.id          = RACE_PEGASUS;
	ExtClass.call(this, {AbstractRace: null});
	
	this.init = function(creature)
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, creature, -2, lang('race.' + RACE_PEGASUS + '.title'));
		creature.sight     = 2;
	};
}

TConfig.objects[KEY_RACE][RACE_PEGASUS] = new TRacePegasus();
addRace(RACE_PEGASUS    , REWARD_GAME);


