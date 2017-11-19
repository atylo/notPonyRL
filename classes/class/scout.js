function TClassScout()
{
	ExtClass.call(this, {AbstractClass: null});
	this.id = CLASS_SCOUT;
	
	this.customNames = function(names, _race)
	{
		return names;
	};
	
	this.getAbilities = function()
	{
		var str = '';
		
		var s1  = World.player.hasFlag(FLAG_SPECIAL, TRAIT_FLANKING);
		if(s1 > 0)
			str = str + showAbility(TRAIT_FLANKING, s1*5, 2);
		
		var s2  = World.player.hasFlag(FLAG_SPECIAL, TRAIT_CAMOUFLAGE);
		if(s2 > 0)
			str = str + showAbility(TRAIT_CAMOUFLAGE, s2*2, 2);
		
		return str;
	};
		
	this.init = function(creature)
	{		
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, World.player, -2, lang('class.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, World.player, -2, lang('class.' + this.id + '.title'));
		
		return true;
	};
	
	this.react = function(src, e)
	{
		if(e[EVENT_TYPE] == LOG_EXPLORE)
		{
			if(e[EVENT_TAG][MODE_ALL] > 0)
			{
				var s1 = World.player.hasFlag(FLAG_SPECIAL, TRAIT_CAMOUFLAGE);
				if(s1 < 8)
				{
					s1 += e[EVENT_TAG][MODE_ALL];
					World.player.setFlag(FLAG_SPECIAL, TRAIT_CAMOUFLAGE, min(s1, 8));
					World.menu.need_draw = 1;
				}
			}
			
			if(e[EVENT_TAG][KEY_OBJECT] > 0)
			{
				var s2 = World.player.hasFlag(FLAG_SPECIAL, TRAIT_FLANKING) + 1;
				World.player.setFlag(FLAG_SPECIAL, TRAIT_FLANKING, s2);
				World.menu.need_draw = 1;
			}
		}
		
		if(e[EVENT_TYPE] == LOG_CAST && e[EVENT_TAG] == SKILL_ATTACK)
		{
			World.player.setFlag(FLAG_SPECIAL, TRAIT_CAMOUFLAGE, 0);
			World.player.setFlag(FLAG_SPECIAL, TRAIT_FLANKING, 0);
			World.menu.need_draw = 1;
		}
	}	
			
	this.refresh = function()
	{
		for(var y in World.map.objects)
			for(var x in World.map.objects[y])
				for(var z in World.map.objects[y][x])
					if(World.map.objects[y][x][z].getType() == KEY_OBJECT && !World.map.objects[y][x][z].isInvisible())
						World.map.seen[y][x] = SEEN_FOG;
		
		return true;
	};
}

TConfig.objects[KEY_CLASS][CLASS_SCOUT] = new TClassScout();
addClass(CLASS_SCOUT     , REWARD_ADVENTURE_BOOM);

