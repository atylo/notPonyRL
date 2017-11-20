function TItemScrollBlink()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 12;	
	this.can_be_used = false;
	this.achievement = REWARD_SCOUT;
	
	this.levels      = [3];
	this.type        = ITEM_TYPE_MAGE;
	this.subtype     = ITEM_SUBTYPE_SKILL;
	
	this.onPurchuase = function()
	{
		World.player.addSkill(SKILL_BLINK);
	};
	
	this.onSacrifice = function()
	{
		World.player.removeSkill(SKILL_BLINK);
	};
}

addItem(new TItemScrollBlink(),ITEM_SCROLL_BLINK);