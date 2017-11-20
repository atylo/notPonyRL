function TClassAlchemist()
{
	ExtClass.call(this, {AbstractClass: null});
	this.id = CLASS_ALCHEMIST;
	
	this.customNames = function(names, _race)
	{
		if(_race == RACE_PONY && World.seedRandom.mt_rand(0,5) == 0)
			names.push([lang('player.' + CLASS_ALCHEMIST + "." + RACE_PONY + '.0'),'brown']);
		if(_race == RACE_ZEBRA && World.seedRandom.mt_rand(0,5) == 0)
		{
			names.push([lang('player.' + CLASS_ALCHEMIST + "." + RACE_ZEBRA + '.0'),'white']);
			names.push([lang('player.' + CLASS_ALCHEMIST + "." + RACE_ZEBRA + '.1'),'white']);
		}
		
		return names;
	};
	
	this.refresh = function()
	{
		var item = jQuery.extend({}, true, TConfig.objects[KEY_ITEM][ITEM_CAULDRON]);
		item.level = 1;
		item.state = ITEM_STATE_BOUGHT;
		item.init();
		World.shop.items[0] = item;
		
		return true;
	};
}

TConfig.objects[KEY_CLASS][CLASS_ALCHEMIST] = new TClassAlchemist();
addClass(CLASS_ALCHEMIST , REWARD_LAST_PONY);

