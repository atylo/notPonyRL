function TItemScrollHeal()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 30;	
	this.can_be_used = false;
	this.achievement = REWARD_NONE;
	
	this.levels      = [3,5,7];
	this.type        = ITEM_TYPE_MAGE;
	this.subtype     = ITEM_SUBTYPE_SKILL;
	
	this.onPurchuase = function()
	{
		World.player.addSkill(SKILL_HEAL);
	};
	
	this.onSacrifice = function()
	{
		World.player.removeSkill(SKILL_HEAL);
	};
}

addItem(new TItemScrollHeal(),ITEM_SCROLL_HEAL);