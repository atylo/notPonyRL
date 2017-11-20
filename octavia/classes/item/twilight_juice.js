function TItemTwilightJuice()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 6;
	this.can_be_used = true;
	this.achievement = REWARD_NONE;
	
	this.levels      = [3,5];
	this.type        = ITEM_TYPE_COMMON;
	this.subtype     = ITEM_SUBTYPE_CONSUMABLE;
	this.max_count   = 2;
	
	this.onUse = function()
	{
		World.player.receiveExp(5);
		World.player.removeEffect(EFFECT_MANA_DRAIN);
		
		World.queue.add(lang('items.' + this.id + '.use'));
		this.state = ITEM_STATE_DESTROYED;
		
		return true;
	};
}

addItem(new TItemTwilightJuice(),ITEM_POTION_EXP);

