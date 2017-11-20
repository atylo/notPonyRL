function TItemPotionEndurance()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 14;
	this.can_be_used = true;
	this.achievement = REWARD_LEGACY;
	
	this.levels      = [7];
	this.type        = ITEM_TYPE_COMMON;
	this.subtype     = ITEM_SUBTYPE_CONSUMABLE;
	this.max_count   = 1;
	

	this.getDescription = function()
	{
		return lang('items.' + this.id + '.description');
	};
	
	this.onUse = function()
	{
		World.player.removeEffect(EFFECT_POISON);

		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, World.player, 0.05, lang('items.' + this.id + '.title'));		
		if(World.player._class == CLASS_ALCHEMIST) {
			World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, World.player, 0.025, lang('items.' + this.id + '.title'));
			World.player.heal(5);
		}

		World.player.heal(5);
		this.state = ITEM_STATE_DESTROYED;
		
		return true;
	};
}

addItem(new TItemPotionEndurance(),ITEM_POTION_ENDURANCE);