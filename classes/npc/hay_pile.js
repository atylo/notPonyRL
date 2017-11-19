/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCHayPile()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = '#';
	this.color       = 'gold';
	
			// level multipliers
	this.hp_mult     = 0;
	this.hp_add      = 1;
	this.att_mult    = 0;
	this.att_add     = -3;
	this.gold_mult   = 0;
	
	this.abilities   = [TRAIT_BLOODLESS];
}

addNPC(new TNPCHayPile(), NPC_HAY_PILE);