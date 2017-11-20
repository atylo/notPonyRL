function TItemScrollForce()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 12;	
	this.can_be_used = false;
	this.achievement = REWARD_NIGHTMARE;
	
	this.levels      = [3, 5];
	this.type        = ITEM_TYPE_FIGHTER;
	this.subtype     = ITEM_SUBTYPE_SKILL;
	
	this.onPurchuase = function()
	{
		World.player.addSkill(SKILL_FORCE);
	};
	
	this.onSacrifice = function()
	{
		World.player.removeSkill(SKILL_FORCE);
	};
}

addItem(new TItemScrollForce(),ITEM_SCROLL_FORCE);