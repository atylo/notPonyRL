/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCMummy()
{
	ExtClass.call(this, {AbstractNPC: null});

	this.show        = 'm';
	this.color       = '#CCCC00';
	
			// level multipliers
	this.hp_mult     = 1.4;
	this.att_mult    = 0.8;

	this.abilities   = [TRAIT_BERSERK, TRAIT_COWARD];
	
	this.preInit = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, this, 12, lang('npc.' + this.id + '.title'));
	}
}


addNPC(new TNPCMummy(), NPC_MUMMY);