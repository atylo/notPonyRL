/**
 * AbstractNPC class
 * Represents an abstract object on the map.
 * Every map object is an instance of such an object, and this is important!
 * 
 * @return
 */

function TNPCShadow()
{
	ExtClass.call(this, {MovingNPC: null});

	this.show             = 'S';
	this.color            = 'CornflowerBlue';
	this.followAggressive = true;
	this.timesWillFollow  = 10;

			// level multipliers
	this.hp_mult     = 1.2;
	this.att_mult    = 0.7;


	this.abilities   = [TRAIT_SCARY, TRAIT_MAGICAL_ATTACK, TRAIT_BLOODLESS, TRAIT_FOLLOWING];

	this.draw = function(seen)
	{
		if(seen == SEEN_NO)
			return '';
	
		if(seen == SEEN_FOG)
		{
			if(this.hasAbility(TRAIT_CHAMPION))
				return '<span class="foggy">@</span>';
			else
				return '<span class="foggy">!</span>';
		}

		var color = (this.followsRemaining > 0)?"red":"CornflowerBlue";
		if(this.randomTimer > 0)
			color = "yellow";

		return '<div xyz="' + this.x + ',' + this.y + '" class="npc t" style="color:' + color + '">' + this.show + '<div class="' + TConfig.npcLevelClass + '">' + this.level + '</div></div>';
	};

	this.preInit = function()
	{
		World.raiseEvent(LOG_MOD_CHANGE, MOD_RESIST, this, -4, lang('npc.' + this.id + '.title'));
	}
}

addNPC(new TNPCShadow(), NPC_SHADOW);