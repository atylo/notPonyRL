function TSeedRandom()
{
	this.seed      = false;
	this.startSeed = false;

	this.getSeed = function()
	{
		if (typeof(this.startSeed) == 'undefined')
			return false;

		return this.startSeed;
	};
	
	this.getCurrentSeed = function()
	{
		if (typeof(this.seed) == 'undefined')
			return false;

		return this.seed;
	};
	

	this.initRandSeed = function()
	{
		this.seed = Math.floor(Math.random() * 100000) + 1;
		this.startSeed = this.seed;
		
		return true;
	};


	this.initSeed = function(i)
	{
		if (typeof(i) == 'undefined' || i < 1)
			this.initRandSeed();
		else
			this.seed = i;

		this.startSeed = this.seed;

		return true;
	};

	this.mt_rand = function(min, max)
	{
		return Math.floor(this.rand()*(max - min + 1)) + min;
	};

	this.rand = function()
	{
		if (this.seed < 1 || typeof(this.seed)==='undefined')
			return Math.random();

		else
		{ 
			var x = Math.sin(this.seed++) * 10000;
			x -= Math.floor(x); 
			return x;
		}
	};
}