function TRaceChangeling()
{
	this.id          = RACE_CHANGELING;
	ExtClass.call(this, {AbstractRace: null});
	
	this.init = function(creature)
	{

	};
}

TConfig.objects[KEY_RACE][RACE_CHANGELING] = new TRaceChangeling();
addRace(RACE_CHANGELING , REWARD_NOT_A_BETA);


