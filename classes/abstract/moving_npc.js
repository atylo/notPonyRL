/**
 * MovingNPC class
 * Represents an NPC that can move. Only NPC with this subclass can follow.
 *
 * @return
 */

function MovingNPC() {
	ExtClass.call(this, {AbstractNPC: null});

	this.timesWillFollow = 1000;
	this.followsRemaining = 0;
	this.followAggressive = false;
	this.turnFollowed = 0;

	this.randomTimer = 0;
	this.randomTarget = [];

	this.startFollowing = function()
	{
		if(this.timesWillFollow == undefined)
			this.timesWillFollow = 1;

		this.randomTimer = 0;
		this.followsRemaining = this.timesWillFollow;
		this.turnFollowed = World.turns;
		return true;
	}

	this.stopFollowing = function()
	{
		World.queue.add(lang('npc.' + this.id + '.stop'));
		return true;
	}

	this.follow = function (x, y)
	{
		if(isNaN(this.followsRemaining) || this.followsRemaining < 1)
			return false;

		this.followsRemaining--;
		if(this.followsRemaining < 1)
			this.stopFollowing();

		var dx = x - this.x;
		var dy = y - this.y;

		if(this.randomTimer > 0)
		{
			this.randomTimer--;
			dx = this.randomTarget[0] - this.x;
			dy = this.randomTarget[1] - this.y;
		}

		World.map.invalidate(this.x, this.y);

			// should we attack?
		if(Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
			if(this.followAggressive)
			{
				var saveSkill = World.player.active_skill;
				World.player.active_skill = SKILL_ATTACK;
				World.move(this.x, this.y, false);
				World.player.active_skill = saveSkill;
			}

			return true;
		}

		var movement = [];
		var lr = mt_rand(0,1)*2 - 1;

		if(dx == 0) {
			movement = [[0, sign(dy)], [lr, sign(dy)], [-1*lr, sign(dy)]];
		}
		else if(dy == 0) {
			movement = [[sign(dx), 0], [sign(dx), 1*lr], [sign(dx), -1*lr]];
		}
		else {
			movement = [[sign(dx), sign(dy)], [sign(dx), 0], [0, sign(dy)]];
			if(Math.abs(dx) > Math.abs(dy))
				movement.push([sign(dx), -1*sign(dy)]);
			else if(Math.abs(dx) > Math.abs(dy))
				movement.push([-1*sign(dx), sign(dy)]);
		}

		for(var i in movement)
		{
			var rx = this.x + movement[i][0];
			var ry = this.y + movement[i][1];

			if(this.move(rx, ry)) 
			{
				if (this.randomTimer == 0)
					World.queue.add(lang('npc.' + this.id + '.following'));
				else
					World.queue.add(lang('npc.' + this.id + '.confused'));
				return true;
			}
		}

			// can't move at all? Go wild!
		this.randomTimer = 3;
		this.randomTarget = [this.x + mt_rand(-1, 1)*30, this.y + mt_rand(-1, 1)*30];

		if(mt_rand(0,2) == 0) this.randomTarget[0] = [this.x - sign(dx)*30];
		else if(mt_rand(0,2) == 0) this.randomTarget[1] = [this.y - sign(dy)*30];


		return false;
	}
}
