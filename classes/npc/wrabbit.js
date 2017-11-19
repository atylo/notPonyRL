/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCWRabbit()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'r';
	this.color       = 'green';
	
			// level multipliers
	this.hp_mult     = 1.2;
	this.att_mult    = 1.0;

	this.abilities   = [TRAIT_SLOW, TRAIT_COWARD, TRAIT_BEAST];
}

addNPC(new TNPCWRabbit(), NPC_WRABBIT);