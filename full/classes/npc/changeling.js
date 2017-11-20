/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCChangeling()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'C';
	this.color       = 'cyan';
	
			// level multipliers
	this.hp_mult     = 0.9;
	this.att_mult    = 0.9;

	this.abilities   = [TRAIT_SLOW];
	
	this.preInit = function()
	{
	//	if(this.abilities.length != 0)
	//		return false;
		
		var s = World.seedRandom.mt_rand(-20,20)/100;
		World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, this, -s, lang('npc.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, this, s, lang('npc.' + this.id + '.title'));
		
		var ab = [TRAIT_COWARD, TRAIT_CURSED, TRAIT_REGENERATE, TRAIT_MAGICAL_ATTACK, TRAIT_MANA_DRAIN, TRAIT_BERSERK, TRAIT_FIRST_STRIKE];
		
		for(var i = 0; i < 2; i++)
		{
			var a = ab[World.seedRandom.mt_rand(0, ab.length - 1)];

			if(a == TRAIT_FIRST_STRIKE && this.hasAbility(TRAIT_SLOW))
			{
				this.removeAbility(TRAIT_SLOW);
				i--;
				continue;
			}

			if(this.hasAbility(a))
			{
				World.raiseEvent(LOG_MOD_CHANGE, MOD_HP_MULT, this, 0.1, lang('npc.' + this.id + '.title'));
				World.raiseEvent(LOG_MOD_CHANGE, MOD_ATTACK_MULT, this, 0.1, lang('npc.' + this.id + '.title'));
			}
			else
				this.abilities.push(a);
		}
	}
}

addNPC(new TNPCChangeling(), NPC_CHANGELING);