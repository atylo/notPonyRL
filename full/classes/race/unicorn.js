function TRaceUnicorn()
{
	this.id          = RACE_UNICORN;
	ExtClass.call(this, {AbstractRace: null});
	
	this.init = function(creature)
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, creature, 3, lang('race.' + RACE_UNICORN + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, creature, -0.25, lang('race.' + RACE_UNICORN + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, creature, 0.1, lang('race.' + RACE_UNICORN + '.title'));
	};
}

TConfig.objects[KEY_RACE][RACE_UNICORN] = new TRaceUnicorn();
addRace(RACE_UNICORN    , REWARD_POSTGRADUATE);