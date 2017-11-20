function TNPCAnimatedArmour()
{
	ExtClass.call(this, {MovingNPC: null});

	this.show        = 'A';
	this.color       = 'LightSteelBlue';
	this.timesWillFollow  = 3;
	this.followsRemaining = 0;
			// level multipliers
	this.att_mult    = 0.9;
	this.corruption  = -3;


	this.abilities   = [TRAIT_SLOW, TRAIT_BLOODLESS, TRAIT_FOLLOWING];
	
	this.preInit = function()
	{	
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, this, 4, lang('npc.' + this.id + '.title'));
	}
}

addNPC(new TNPCAnimatedArmour(), NPC_ANIMATED_ARMOUR);