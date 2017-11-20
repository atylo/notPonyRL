function TItemGasMask()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 14;
	this.achievement = REWARD_HAT_AND_WHIP;
	
	this.levels      = [3,5,7];
	this.type        = ITEM_TYPE_COMMON;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	this.max_count   = 1;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, World.player, 1, lang('items.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, World.player, 1, lang('items.' + this.id + '.title'));
		World.player.abilities.push(TRAIT_BLOODLESS);
	};
	
	this.onSacrifice = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, World.player, -1, lang('items.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, World.player, -1, lang('items.' + this.id + '.title'));
		World.player.removeAbility(TRAIT_BLOODLESS);
	};
}

addItem(new TItemGasMask(), ITEM_GAS_MASK);