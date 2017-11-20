function TItemScrollStare()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 25;	
	this.can_be_used = false;
	this.achievement = REWARD_HIVE;
	
	this.levels      = [7,9];
	this.type        = ITEM_TYPE_MAGE;
	this.subtype     = ITEM_SUBTYPE_SKILL;
	
	this.onPurchuase = function()
	{
		World.player.addSkill(SKILL_STARE);
	};
	
	this.onSacrifice = function()
	{
		World.player.removeSkill(SKILL_STARE);
	};
}

addLang(new TItemScrollStare(),ITEM_SCROLL_STARE);