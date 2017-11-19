function TItemNet()
{
	ExtClass.call(this, {AbstractItem: null});
	this.cost        = 35;
	this.achievement = REWARD_HUNTMASTER;
	
	this.levels      = [3,5];
	this.type        = ITEM_TYPE_FIGHTER;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.onPurchuase = function()
	{
		World.player.abilities.push(TRAIT_WEAKEN);
		World.player.addBattleMode(BATTLE_NET);
	};
	
	this.onSacrifice = function()
	{
		World.player.removeAbility(TRAIT_WEAKEN);
		World.player.removeBattleMode(BATTLE_NET);
	};	
}

addItem(new TItemNet(), ITEM_NET);

