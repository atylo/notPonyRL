function TItemScrollWhine()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 25;	
	this.can_be_used = false;
	this.achievement = REWARD_VOGUE_ROGUE;
	
	this.levels      = [5,7];
	this.type        = ITEM_TYPE_FIGHTER;;
	this.subtype     = ITEM_SUBTYPE_SKILL;
	
	this.onPurchuase = function()
	{
		World.player.addSkill(SKILL_WHINE);
	};
	
	this.onSacrifice = function()
	{
		World.player.removeSkill(SKILL_WHINE);
	};
}

addItem(new TItemScrollWhine(),ITEM_SCROLL_WHINE);