/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCDuster()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'd';
	this.color       = 'white';
	
			// level multipliers
	this.hp_mult     = 0.8;
	this.att_mult    = 1.1;

	this.abilities   = [TRAIT_WEAKEN, TRAIT_BLOODLESS];
}

addNPC(new TNPCDuster(), NPC_DUSTER);