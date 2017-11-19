/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCMagicVortex()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'v';
	this.color       = 'yellow';
	
			// level multipliers
	this.hp_mult     = 1.0;
	this.att_mult    = 1.0;

	this.abilities   = [TRAIT_MAGICAL_ATTACK, TRAIT_BLOODLESS];
}

addNPC(new TNPCMagicVortex(), NPC_VORTEX);