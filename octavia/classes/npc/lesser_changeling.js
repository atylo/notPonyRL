/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCChangelingLesser()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'c';
	this.color       = 'cyan';
	
			// level multipliers
	this.hp_mult     = 0.9;
	this.att_mult    = 0.85;

	this.abilities   = [TRAIT_BLINK];
}

addNPC(new TNPCChangelingLesser(), NPC_CHANGELING_LESSER);