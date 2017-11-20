/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCHydra()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'H';
	this.color       = 'green';
	
			// level multipliers
	this.hp_mult     = 1.2;
	this.att_mult    = 1.2;

	this.abilities   = [TRAIT_REGENERATE, TRAIT_POISON];
}

addNPC(new TNPCHydra(), NPC_HYDRA);