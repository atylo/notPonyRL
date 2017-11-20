function TItemScrollEmpower()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 20;	
	this.can_be_used = false;
	this.achievement = REWARD_DASH;
	
	this.levels      = [5,7];
	this.type        = ITEM_TYPE_FIGHTER;
	this.subtype     = ITEM_SUBTYPE_SKILL;
	
	this.onPurchuase = function()
	{
		World.player.addSkill(SKILL_EMPOWER);
	};
	
	this.onSacrifice = function()
	{
		World.player.removeSkill(SKILL_EMPOWER);
	};
}

addItem(new TItemScrollEmpower(),ITEM_SCROLL_EMPOWER);