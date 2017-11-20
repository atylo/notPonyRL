function TItemRainbowRod()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 15;
	this.achievement = REWARD_POSTGRADUATE;
	
	this.levels      = [3,5,7];
	this.type        = ITEM_TYPE_MAGE;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.onPurchuase = function()
	{
		if(World.player.hasAbility(TRAIT_MAGICAL_ATTACK))
			World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.player, 0.1, lang('items.' + this.id + '.title'));
		
		World.player.abilities.push(TRAIT_MAGICAL_ATTACK);
		World.player.addBattleMode(BATTLE_RAINBOW);
	};
	
	this.onSacrifice = function()
	{
		World.player.removeAbility(TRAIT_MAGICAL_ATTACK);
		World.player.removeBattleMode(BATTLE_RAINBOW);
	};
}

addItem(new TItemRainbowRod(),ITEM_RAINBOW_ROD);

