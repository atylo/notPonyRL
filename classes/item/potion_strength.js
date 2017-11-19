function TItemPotionStrength()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 15;
	this.can_be_used = true;
	this.achievement = REWARD_DESPERATION;
	
	this.levels      = [7];
	this.type        = ITEM_TYPE_FIGHTER;
	this.subtype     = ITEM_SUBTYPE_CONSUMABLE;
	this.max_count   = 1;
	

	this.getDescription = function()
	{
		return lang('items.' + this.id + '.description');
	};
	
	this.onUse = function()
	{
		if(World.player.weakness > 0)
			World.player.weakness--;		
		
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.player, 0.05, lang('items.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_BASE, World.player, 2, lang('items.' + this.id + '.title'));
		
		if(World.player._class == CLASS_ALCHEMIST)
			World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_BASE, World.player, 3, lang('items.' + this.id + '.title'));		
		
		this.state = ITEM_STATE_DESTROYED;
		
		return true;
	};
}

addItem(new TItemPotionStrength(),ITEM_POTION_STRENGTH);