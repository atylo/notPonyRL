function TItemScrollShield()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 25;	
	this.can_be_used = false;
	this.achievement = REWARD_ALMOST_CELLY;
	
	this.levels      = [5,7,9];
	this.type        = ITEM_TYPE_FIGHTER;
	this.subtype     = ITEM_SUBTYPE_SKILL;
	
	this.onPurchuase = function()
	{
		World.player.addSkill(SKILL_SHIELD);
	};
	
	this.onSacrifice = function()
	{
		World.player.removeSkill(SKILL_SHIELD);
	};
}

addItem(new TItemScrollShield(),ITEM_SCROLL_SHIELD);