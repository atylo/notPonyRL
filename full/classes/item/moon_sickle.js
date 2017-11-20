function TItemMoonSickle()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 20;
	this.achievement = REWARD_LAST_PONY;

	this.levels      = [3,5,7];
	this.type        = ITEM_TYPE_FIGHTER;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.player, 0.2, lang('items.' + this.id + '.title'));
		World.player.addBattleMode(BATTLE_SICKLE);
	};
	
	this.onSacrifice = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.player, -0.2, lang('items.' + this.id + '.title'));
		World.player.removeBattleMode(BATTLE_SICKLE);
	};
}

addItem(new TItemMoonSickle(), ITEM_MOON_SICKLE);

