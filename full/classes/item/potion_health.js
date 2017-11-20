function TItemPotionHealth()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 6;
	this.can_be_used = true;
	this.achievement = REWARD_NONE;
	
	this.levels      = [1,3,5,7,9];
	this.type        = ITEM_TYPE_COMMON;
	this.subtype     = ITEM_SUBTYPE_CONSUMABLE;
	this.max_count   = 4;

	this.getDescription = function()
	{
		return lang('items.' + this.id + '.description', {'s': this.getStrength()});
	};
	
	this.getStrength = function()
	{
		var s = 5*World.player.level;
		
		if(World.player._class == CLASS_HEALER)
			s += World.player.level;
		
		return s;
	};
	
	this.onUse = function()
	{
		if(!World.player.heal(this.getStrength(), lang('items.' + this.id + '.use')))
			return false;

		World.player.removeEffect(EFFECT_POISON);
		this.state = ITEM_STATE_DESTROYED;
		
		return true;
	};
}

addItem(new TItemPotionHealth(),ITEM_POTION_HEALTH);