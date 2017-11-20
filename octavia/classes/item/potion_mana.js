function TItemPotionMana()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 8;
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
		var s = Math.floor(World.player.getMaxMP()*0.3 + 1);
		
		return s;
	};
	
	this.onUse = function()
	{
				// already have max mana?
		if(!World.player.restore(this.getStrength()))
			return false;
		
		World.player.removeEffect(EFFECT_MANA_DRAIN);
		
		this.state = ITEM_STATE_DESTROYED;
		return true;
	};
}

addItem(new TItemPotionMana(),ITEM_POTION_MANA);

