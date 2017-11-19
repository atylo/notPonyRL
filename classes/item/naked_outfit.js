function TItemNakedOutfit()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 10;	
	this.achievement = REWARD_DASH;
	
	this.levels      = [3,5];
	this.type        = ITEM_TYPE_FIGHTER;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, World.player, -2, lang('items.' + this.id + '.title'));
		World.player.addBattleMode(BATTLE_NAKED);
		World.player.abilities.push(TRAIT_FIRST_STRIKE);
	};
	
	this.onSacrifice = function()
	{
		World.player.removeAbility(TRAIT_FIRST_STRIKE);
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, World.player, 2, lang('items.' + this.id + '.title'));
		World.player.removeBattleMode(BATTLE_NAKED);
	};
}

addItem(new TItemNakedOutfit(),ITEM_NAKED_OUTFIT);

