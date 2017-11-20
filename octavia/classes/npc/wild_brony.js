/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCWildBrony()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'B';
	this.color       = 'white';
	
			// level multipliers
	this.hp_mult     = 1.5;
	this.att_mult    = 1.0;

	this.abilities   = [TRAIT_CURSED];
}

addNPC(new TNPCWildBrony(), NPC_WILD_BRONY);
