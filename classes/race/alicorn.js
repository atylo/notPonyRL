function TRaceAlicorn()
{
	this.id          = RACE_ALICORN;
	ExtClass.call(this, {AbstractRace: null});
	
	this.init = function(creature)
	{
		creature._skills.push(SKILL_FORCE);
		creature._skills.push(SKILL_FORCE_WAVE);
	};
}

TConfig.objects[KEY_RACE][RACE_ALICORN] = new TRaceAlicorn();
addRace(RACE_ALICORN    , REWARD_ALMOST_CELLY);


