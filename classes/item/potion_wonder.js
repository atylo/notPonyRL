function TItemPotionWonder()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 18;
	this.can_be_used = true;
	this.achievement = REWARD_PRESCIENCE;
	
	this.levels      = [7];
	this.type        = ITEM_TYPE_MAGE;
	this.subtype     = ITEM_SUBTYPE_CONSUMABLE;
	this.max_count   = 1;
	

	this.getDescription = function()
	{
		return lang('items.' + this.id + '.description');
	};
	
	this.onUse = function()
	{
		World.player.removeEffect(EFFECT_MANA_DRAIN);
		World.raiseEvent(LOG_MOD_CHANGE, MOD_MP_BASE, World.player, 1, lang('items.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_MP_REGEN, World.player, 0.5, lang('items.' + this.id + '.title'));
		
		if(World.player._class == CLASS_ALCHEMIST)
			World.raiseEvent(LOG_MOD_CHANGE, MOD_MP_BASE, World.player, 1, lang('items.' + this.id + '.title'));		
						
		this.state = ITEM_STATE_DESTROYED;
		
		return true;
	};
}

addItem(new TItemPotionWonder(),ITEM_POTION_WONDER);