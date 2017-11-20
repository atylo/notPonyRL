/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCParasprite()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'o';
	this.color       = 'DarkCyan';
	
			// level multipliers
	this.hp_mult     = 1.0;
	this.att_mult    = 1.0;

	this.abilities   = [TRAIT_BEAST, TRAIT_SPAWNS];
}

addNPC(new TNPCParasprite(), NPC_PARASPRITE);