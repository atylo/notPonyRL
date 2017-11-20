function TItemMuffin()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 5;	
	this.can_be_used = true;
	this.achievement = REWARD_TUTORIAL;
	
	this.levels      = [5,7,9];
	this.type        = ITEM_TYPE_COMMON;
	this.subtype     = ITEM_SUBTYPE_CONSUMABLE;
	this.max_count   = 2;
	
	this.onUse = function()
	{
		World.player.restore(1);
		World.player.heal(1);
		
		World.player.removeEffect(EFFECT_MANA_DRAIN);		
		World.player.removeEffect(EFFECT_CURSED);		
		World.player.removeEffect(EFFECT_POISON);	
		World.player.removeEffect(EFFECT_SCARED);	
		
		if(World.player.weakness > 0)
			World.player.weakness--;
		
		World.queue.add(lang('items.' + this.id + '.use'));
		
		this.state = ITEM_STATE_DESTROYED;
		
		return true;
	};
}

addItem(new TItemMuffin(),ITEM_MUFFIN);
