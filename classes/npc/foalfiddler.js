/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCFoalfiddler()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'B';
	this.color       = 'violet';
	
			// level multipliers
	this.hp_mult     = 1.2;
	this.att_mult    = 0.9;

	this.abilities   = [TRAIT_COWARD];
	
	this.getBattleMessage = function()
	{
		if(World.seedRandom.mt_rand(0,5) == 0)
			return lang('npc.' + this.id + '.combat.1');
		if(World.seedRandom.mt_rand(0,5) == 0)
			return lang('npc.' + this.id + '.combat.2');
		if(World.seedRandom.mt_rand(0,5) == 0)
			return lang('npc.' + this.id + '.combat.3');
		
		return lang('npc.' + this.id + '.combat');
	};
}

addNPC(new TNPCFoalfiddler(), NPC_FOALFIDDLER);