function TGodFluttershy()
{
	ExtClass.call(this, {AbstractGod: null});
	
	this.color       = 'yellow';
	this.skills      = [SKILL_FLUTTERSHY_REMEDY, SKILL_FLUTTERSHY_FORTITUDE, SKILL_FLUTTERSHY_PEACE];
	this.achievement = REWARD_HOLY_ONE;
	
	/*
		Following: +2.5 piety per beast visible on map, heals completely
Likes:
 - Healing yourself with potion/spell (+3)
 - Smiting lesser beings (+2)
 - Killing blodless monsters (+2)
Dislikes:
 - Attacking beasts (-3)
 - Attacking stronger creatures (-1)
 - Lifesteal (-5)
Renounce:
 - Exhaustion, all beasts double their attack
Abilities:
 - restores up to half of health (3 + 4 repeatable)
 - drains all mana, giving an equal amount of health and max health (5, repeatable)
 - all beasts gain `peaceful` (10)
	*/
   
	this.customReact = function(e)
	{		
		
			// Heal??
		if(e[EVENT_TYPE] == LOG_KILL && e[EVENT_TARGET_LVL] < e[EVENT_LEVEL])
			World.player.receivePiety(2);
		if(e[EVENT_TYPE] == LOG_KILL && TConfig.objects[KEY_ENEMY][e[EVENT_TARGET_ID]].hasAbility(TRAIT_BLOODLESS))
			World.player.receivePiety(2);
					// Health spell
		if(e[EVENT_TYPE] == LOG_CAST && e[EVENT_TAG] == SKILL_HEAL)
			World.player.receivePiety(3);
					// Heal potion
		if(e[EVENT_TYPE] == LOG_USE && e[EVENT_TAG] == ITEM_POTION_HEALTH)
			World.player.receivePiety(3);

		if(e[EVENT_TYPE] == LOG_CAST && e[EVENT_TAG] == SKILL_ATTACK)
		{
			if(World.player.lifesteal > 0)
				World.player.receivePiety(-5);
			if(e[EVENT_TARGET_LVL] > World.player.level)
				World.player.receivePiety(-1);
			if(e[EVENT_TARGET_ID].hasAbility(TRAIT_BEAST))
				World.player.receivePiety(-3);
		}
	};
	
	this.customRenounce = function()
	{
		World.player.lifesteal = 0;
		World.player.hp        = 1;
		World.player.addEffect(EFFECT_POISON);
		
		for(var y in World.map.objects)
			for(var x in World.map.objects[y])
				for(var z in World.map.objects[y][x])
					if(World.map.objects[y][x][z].getType() == KEY_ENEMY && World.map.objects[y][x][z].hasAbility(TRAIT_BEAST))
						World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.map.objects[y][x][z],1, lang('religion.' + this.id + '.title'));

		return true;
	};
	
	this.handlerConvert = function()
	{
		var beasts = 0;
		for(var y in World.map.objects)
			for(var x in World.map.objects[y])
				for(var z in World.map.objects[y][x])
					if(World.map.seen[y][x] == SEEN_YES || World.map.seen[y][x] == SEEN_VISITED)
						if(World.map.objects[y][x][z].getType() == KEY_ENEMY && World.map.objects[y][x][z].hasAbility(TRAIT_BEAST))
							beasts++;

		World.player.receivePiety(Math.floor(beasts*2.5));
		World.player.hp = World.player.getMaxHP();
		
		return true;
	};				
}

addGod(new TGodFluttershy(), RELIGION_FLUTTERSHY);