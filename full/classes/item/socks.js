function TItemSocks()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 15;
	this.achievement = REWARD_DRAGON_OVERLORD;
	
	this.levels      = [3,5,7];
	this.type        = ITEM_TYPE_COMMON;
	this.subtype     = ITEM_SUBTYPE_BOOST;
	
	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, World.player, 1, lang('items.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_BASE, World.player, 4, lang('items.' + this.id + '.title'))
		World.player.hp     += 4;

		if(World.player.hp > World.player.getMaxHP())
			World.player.hp = World.player.getMaxHP();
			
		if (!World.player.hasEffect(EFFECT_DEATH_WARD))
			World.player.effects.push(EFFECT_DEATH_WARD);
	};
	
	this.onSacrifice = function()
	{
	
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, World.player, -1, lang('items.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_BASE, World.player, -4, lang('items.' + this.id + '.title'))
		World.player.hp     -= 4;
		
		if(World.player.hp < 1)
			World.player.hp = 1;
		
		if(World.player.hp > World.player.getMaxHP())
			World.player.hp = World.player.getMaxHP();
		
		if (World.player.hasEffect(EFFECT_DEATH_WARD))
			World.player.removeEffect(EFFECT_DEATH_WARD);
	};
}

addItem(new TItemSocks(),ITEM_SOCKS);

