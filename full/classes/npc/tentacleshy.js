/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCTentacleshy()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'F';
	this.color       = 'purple';
	
			// level multipliers
	this.hp_mult     = 0.9;
	this.att_mult    = 0.8;
	this.corruption  = 2;

	this.abilities   = [TRAIT_FORESTER, TRAIT_COWARD];

	this.preInit = function()
	{
		var ab = [TRAIT_CURSED, TRAIT_BERSERK, TRAIT_FIRST_STRIKE];
		var a  = ab[World.seedRandom.mt_rand(0, ab.length - 1)];
		this.abilities.push(a);
	}
}

addNPC(new TNPCTentacleshy(), NPC_TENTACLESHY);