function TItemScrollStoneskin()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 20;	
	this.can_be_used = false;
	this.achievement = REWARD_NONE;
	
	this.levels      = [3];
	this.type        = ITEM_TYPE_FIGHTER;
	this.subtype     = ITEM_SUBTYPE_SKILL;
	
	this.onPurchuase = function()
	{
		World.player.addSkill(SKILL_STONESKIN);
	};
	
	this.onSacrifice = function()
	{
		World.player.removeSkill(SKILL_STONESKIN);
	};
}

addItem(new TItemScrollStoneskin(),ITEM_SCROLL_STONESKIN);