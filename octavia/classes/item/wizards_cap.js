function TItemWizardsCap()
{
	ExtClass.call(this, {AbstractItem: null});
	
	this.cost        = 14;
	this.can_be_used = false;
	this.achievement = REWARD_NONE;
	
	this.levels      = [3,5];
	this.type        = ITEM_TYPE_MAGE;
	this.subtype     = ITEM_SUBTYPE_BOOST;

	this.onPurchuase = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_MP_MULT, World.player, 0.4, lang('items.' + this.id + '.title'));
	};
	
	this.onSacrifice = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_MP_MULT, World.player, -0.4, lang('items.' + this.id + '.title'));
		if(World.player.mp > World.player.getMaxMP())
			World.player.mp = World.player.getMaxMP();
	};
}

addItem(new TItemWizardsCap(),ITEM_WIZARDS_CAP);