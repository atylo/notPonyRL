function TRaceGryphon()
{
	this.id          = RACE_GRYPHON;
	ExtClass.call(this, {AbstractRace: null});
	
	this.init = function(creature)
	{

	};
}

TConfig.objects[KEY_RACE][RACE_GRYPHON] = new TRaceGryphon();
addRace(RACE_GRYPHON    , REWARD_NOT_A_BETA);


