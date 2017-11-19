/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCFillyfooler()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'B';
	this.color       = 'gray';
	
			// level multipliers
	this.hp_mult     = 0.9;
	this.att_mult    = 1.0;

	this.abilities   = [TRAIT_MANA_DRAIN];
}

addNPC(new TNPCFillyfooler(), NPC_FILLYFOOLER);