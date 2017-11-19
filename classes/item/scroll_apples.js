function TItemScrollApplekinesis()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 18;	
	this.can_be_used = false;
	this.achievement = REWARD_NONE;
	
	this.levels      = [3,5];
	this.type        = ITEM_TYPE_MAGE;
	this.subtype     = ITEM_SUBTYPE_SKILL;
	
	this.onPurchuase = function()
	{
		World.player.addSkill(SKILL_APPLEKINESIS);
	};
	
	this.onSacrifice = function()
	{
		World.player.removeSkill(SKILL_APPLEKINESIS);
	};
}

addItem(new TItemScrollApplekinesis(),ITEM_SCROLL_APPLEKINESIS);