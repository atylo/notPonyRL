/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCMimic()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = '$';
	this.color       = 'yellow';
	
		// level multipliers
	this.hp_mult     = 0.8;
	this.att_mult    = 1.2;
	
	this.lifesteal   = 2;

	this.abilities   = [];
	
	this.preInit = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, this, 2, lang('npc.' + this.id + '.title'));
	}
}

addNPC(new TNPCMimic(), NPC_MIMIC);