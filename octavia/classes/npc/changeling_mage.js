/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCChangelingMage()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'C';
	this.color       = 'RoyalBlue';
		
			// level multipliers
	this.hp_mult     = 1.6;
	this.att_mult    = 0.5;
	this.mp_add      = 10;

	this.abilities   = [TRAIT_MAGICAL_ATTACK,  TRAIT_CASTER];
	
	this.preInit = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, this, 6, lang('npc.' + this.id + '.title'));
	}
	
	this.postHit = function()
	{
		if(this.mp > 6)
		{
			var t = World.seedRandom.mt_rand(0,2);
			var c = false;
			
			var msg = lang('npc.' + this.id + '.fizzle');
			
			for(var y in World.map.objects)
				for(var x in World.map.objects[y])
					for(var z in World.map.objects[y][x])
						if(World.map.seen[y][x] == SEEN_YES || World.map.seen[y][x] == SEEN_VISITED)
							if(World.map.objects[y][x][z].getType() == KEY_ENEMY && World.seedRandom.mt_rand(0, 3) == 0 && !c)
							{
								var title = World.map.objects[y][x][z].getFormattedTitle();
								if(t == 1)
								{
									msg = lang('npc.' + this.id + '.use_1', {'t': title});
									World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, World.map.objects[y][x][z], (2 + this.mp)/100, lang('npc.' + this.id + '.title'));
								}
								if(t == 2)
								{
									msg = lang('npc.' + this.id + '.use_2', {'t': title});
									World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, World.map.objects[y][x][z], (2 + this.mp)/100, lang('npc.' + this.id + '.title'));
								}
								if(t == 0)
								{
									msg = lang('npc.' + this.id + '.use_3', {'t': title});
									World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_BASE, World.map.objects[y][x][z], Math.floor((5 + this.mp)*(0.5 + Math.sqrt(this.level))), lang('npc.' + this.id + '.title'));
								}
							
								c = true;
							}
			
			this.mp = 0;
			return msg;
		}
		else
			return '';
	};
}

addNPC(new TNPCChangelingMage(),NPC_CHANGELING_MAGE);

