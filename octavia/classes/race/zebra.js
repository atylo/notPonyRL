function TRaceZebra()
{
	this.id          = RACE_ZEBRA;
	ExtClass.call(this, {AbstractRace: null});
	
	this.init = function(creature)
	{
		creature._skills.push(SKILL_TALISMAN_SPIRITS);
		creature._skills.push(SKILL_TALISMAN_WARRIOR);
		creature._skills.push(SKILL_TALISMAN_ENDURANCE);
	};
}

TConfig.objects[KEY_RACE][RACE_ZEBRA] = new TRaceZebra();
addRace(RACE_ZEBRA      , REWARD_HOLY_ONE);

