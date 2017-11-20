/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCDummy()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'D';
	this.color       = 'red';
	
			// level multipliers
	this.hp_mult     = 1.2;
	this.att_mult    = 2.4;
	this.gold_mult   = 5;
	this.exp_mult    = 1.5;

	this.abilities   = [];
}

addNPC(new TNPCDummy(), NPC_DUMMY);