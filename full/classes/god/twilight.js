function TGodTwilight()
{
	ExtClass.call(this, {AbstractGod: null});
	this.color = 'purple';
	this.skills        = [SKILL_TWILIGHT_AFFINITY, SKILL_TWILIGHT_RECHARGE, SKILL_TWILIGHT_MINDLINK, SKILL_TWILIGHT_LEAK, SKILL_TWILIGHT_BASICS];
	
	
	/*
Following: +1 piety per monster with level higher than yours visible, +2 piety per skill known.
Likes:
 - Casting spells (+1)
 - Using libraries (+3)
 - Leveling up (+2)
Dislikes:
 - Attacking (-1)
Renounce: 
 - Mana burn, -10% physical defence.
Abilities:
 - +1 to max mana (5+1 repeatable)
 - Restores all mana (5)
 - +5 xp (-)
 - All monsters get -5% magic resist up to -30% (5 + 5, repeatable)
 - Learn Magic Missile (5)
	*/
	
	
	this.customReact = function(e)
	{		
		if(e[EVENT_TYPE] == LOG_CAST && e[EVENT_TAG] != SKILL_ATTACK && e[EVENT_TAG] < 100)
			World.player.receivePiety(1);
			
		if(e[EVENT_TYPE] == LOG_ACTIVATE && e[EVENT_TARGET_ID] == OBJECT_TOMES)
			World.player.receivePiety(3);
			
		if(e[EVENT_TYPE] == LOG_LVLUP)
			World.player.receivePiety(2);
		
		if(e[EVENT_TYPE] == LOG_CAST && e[EVENT_TAG] == SKILL_ATTACK)
			World.player.receivePiety(-1);
	};
	
	this.customRenounce = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, World.player, -2, lang('religion.' + this.id + '.title'));
		World.player.exp      -= (World.player.level + 1)*2;
		if(World.player.exp < 0)
			World.player.exp = 0;
		World.player.addEffect(EFFECT_MANA_DRAIN);
	};
	
	this.handlerConvert = function()
	{
		var higherMobsSeen = 0;
		
		for(var y in World.map.objects)
			for(var x in World.map.objects[y])
				for(var z in World.map.objects[y][x])
					if(World.map.seen[y][x] == SEEN_YES || World.map.seen[y][x] == SEEN_VISITED)
						if(World.map.objects[y][x][z].getType() == KEY_ENEMY)
							{
								var mob   = World.map.objects[y][x][z];
								if (mob.level > World.player.level)
									higherMobsSeen++;
							}
		
		World.player.receivePiety(higherMobsSeen + (World.player._skills.length - 1)*2);
		
		if (World.player.hasSkill(SKILL_MISSILE)) 
		{
			World.player.incFlag(FLAG_SKILL, SKILL_TWILIGHT_BASICS);
			World.menu.need_draw = 1;
			World.menu.draw();
			World.queue.draw();
		}
		
		return true;
	};
}

addGod(new TGodTwilight(), RELIGION_TWILIGHT);