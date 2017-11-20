/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCFlyingHoof()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'h';
	this.color       = 'brown';
	
			// level multipliers
	this.hp_mult     = 1.0;
	this.att_mult    = 0.9;

	this.abilities   = [TRAIT_BLOODLESS];
}

addNPC(new TNPCFlyingHoof(), NPC_FLYING_HOOF);