/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCMole()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'M';
	this.color       = 'brown';
	
			// level multipliers
	this.hp_mult     = 0.6;
	this.att_mult    = 1.4;

	this.abilities   = [TRAIT_BEAST];
	this.effects     = [EFFECT_DEATH_WARD];
}

addNPC(new TNPCMole(), NPC_MOLE);