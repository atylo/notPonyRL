function TItemPinkieStimulant()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 9;
	this.achievement = REWARD_ADVENTURE_BOOM;
	
	this.levels      = [3,5];
	this.type        = ITEM_TYPE_MAGE;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_REGEN, World.player, 0.2, lang("items." + this.id + ".title"));
	};
	
	this.onSacrifice = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_REGEN, World.player, -0.2, lang("items." + this.id + ".title"));
	};
}

addItem(new TItemPinkieStimulant(),ITEM_PINKIE_STIMULANT);

