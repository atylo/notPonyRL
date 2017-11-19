/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCDiamondGuard()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'D';
	this.color       = 'green';
	
			// level multipliers
	this.hp_mult     = 1.1;
	this.att_mult    = 0.9;
	
	this.abilities   = [TRAIT_FIRST_STRIKE];
}

addNPC(new TNPCDiamondGuard(), NPC_DIAMOND_GUARD);