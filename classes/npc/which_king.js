/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCWhichKing()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'W';
	this.color       = 'gray';
		
			// level multipliers
	this.att_mult    = 0.7;
	
	this.preInit = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, this, 5, lang('npc.' + this.id + '.title'));
		World.raiseEvent(LOG_MOD_CHANGE, MOD_ARMOR, this, 3, lang('npc.' + this.id + '.title'));
	}
	
	this.mp_add      = 15;
	this.lifesteal   = 2;

	this.abilities   = [TRAIT_MAGICAL_ATTACK,  TRAIT_CASTER, TRAIT_FIRST_STRIKE];
	this.effects     = [EFFECT_DEATH_WARD];
	
	
	this.postHit = function()
	{
		if (!this.hasEffect(EFFECT_DEATH_WARD) && World.field.bossBlinked == false)
		{
			do
			{
				var coords = World.map.getFreeCell();
			}
			while (Math.abs(coords[0]-World.player.x) < World.map.sizeX/3 || Math.abs(coords[1]-World.player.y) < World.map.sizeY/3)
			
			this.move(coords[0], coords[1], lang('npc.' + this.id + '.blink'));
			this.heal(Math.floor(this.getMaxHP()/2));
			
			World.field.bossBlinked = true;
			World.field.bossX       = coords[0];
			World.field.bossY       = coords[1];

		}
		
		if(this.mp >= 5)
		{
			this.mp -= 5;
			var t = World.seedRandom.mt_rand(0,3);	
			var msg = lang('npc.' + this.id + '.fizzle');
			
			if(t == 0)
			{
				msg = msg + lang('npc.' + this.id + '.use_0');
				World.player.addEffect(EFFECT_CURSED);
			}
			if(t == 1)
			{
				msg = msg + lang('npc.' + this.id + '.use_1');
				World.player.addEffect(EFFECT_POISON);
			}
			if(t == 2)
			{
				msg = msg + lang('npc.' + this.id + '.use_2');
				this.addEffect(EFFECT_EMPOWER);
			}
			if(t == 3)
			{
				msg = msg + lang('npc.' + this.id + '.use_3');
				this.addEffect(EFFECT_STONESKIN);
			}
			
			return msg;
		}
		else
			return '';
	}
};


addNPC(new TNPCWhichKing(),NPC_WHICH_KING);
