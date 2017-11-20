/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCChangelingEnchanter()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'C';
	this.color       = 'purple';
	
			// level multipliers
	this.hp_mult     = 0.8;
	this.att_mult    = 1.15;
	this.mp_add      = 10;
	
	this.abilities   = [TRAIT_MAGICAL_ATTACK,  TRAIT_CASTER, TRAIT_COWARD, TRAIT_FIRST_STRIKE];
	
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
								var mob   = World.map.objects[y][x][z];
								var title = mob.getFormattedTitle();
								if(t == 1 && !mob.hasEffect(EFFECT_EMPOWER))
								{
									msg = lang('npc.' + this.id + '.use_1', {'t': title});
									World.map.objects[y][x][z].effects.push(EFFECT_EMPOWER);
									c   = true;
								}
								if(t == 2 && !mob.hasEffect(EFFECT_DEATH_WARD))
								{
									msg = lang('npc.' + this.id + '.use_2', {'t': title});
									World.map.objects[y][x][z].effects.push(EFFECT_DEATH_WARD);
									c   = true;
								}
								if(t == 0 && !mob.hasEffect(EFFECT_STONESKIN))
								{
									msg = lang('npc.' + this.id + '.use_3', {'t': title});
									World.map.objects[y][x][z].effects.push(EFFECT_STONESKIN);
									c   = true;
								}
								
								var c = true;
							}
			
			this.mp = 0;
			return msg;
		}
		else
			return '';
	};
}

addNPC(new TNPCChangelingEnchanter(), NPC_CHANGELING_ENCHANTER);