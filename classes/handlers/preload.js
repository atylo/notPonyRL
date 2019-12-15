	function THandlerPreload()
	{
		this.isActive  = false;

		this.messages = [];
		this.queue    = [];

		this.loaders  = [];

		this.toLoad    = 0;
		this.preloaded = 0;
		this.counter   = 0;

		this.ambient   = false;

		this.checkLoad = function()
		{
			this.counter++;

			if(this.preloaded < this.toLoad && this.counter < 100)
			{
				var self = this;
				setTimeout(function(){ self.checkLoad(); }, 50);
			}
			else
			{
				this.preloaded = this.toLoad;
				jQuery(TConfig.preloadID + " .message").html('LOADED');
				World.wrapper.load();
				World.changeGameState(STATE_MENU,{});
			}

			this.draw();
		}

		this.draw = function()
		{
			jQuery(TConfig.preloadID + " .text").html(this.preloaded + " of " + this.toLoad);
			jQuery(TConfig.preloadID + " .substr").css('width', (100 - Math.floor(this.preloaded/this.toLoad*100)) + '%');
			if(mt_rand(0, 30) == 0)
				this.randomMessage();
		};

		this.preloadItem = function(name, type, options)
		{
			if (!soundsOn)
			{
				this.preloaded++;
				return true;
			}

			var self = this;
			var key = type + '/' + name;

			options.urls = [key];
			options.autoplay = false;
			options.buffer = true;
			options.onload = (function() { self.preloaded++; self.draw(); });

			World.howl[key] = new Howl(options);
		};

		this.startObserving = function(data)
		{
			this.isActive = true;
			
			jQuery(TConfig.preloadID).show();

			this.messages.push('Grooming Rarity...');
			this.messages.push('Growing sprites...');
			this.messages.push('Looking for seaponies...');
			this.messages.push('Wrapping up spring...');
			this.messages.push('Making Twilight smile...');
			this.messages.push('Feeding Celestia...');
			this.messages.push('Feeding Molestia...');
			this.messages.push('Facehoofing...');
			this.messages.push('Stealing a bananana...');
			this.messages.push('Rendering Fluttershy...');
			this.messages.push('Making plotarmor...');
			this.messages.push('Running from Pinkie...');
			this.messages.push('Hugging Twilight...');
			this.messages.push('Raising the barn...');
			this.messages.push('Racing Rainbow Dash...');
			this.messages.push('Teaching Starlight...');
			this.messages.push('Making friends...');
			this.messages.push('Measuring horn length...');

					// audio
			this.queue.push(['ambient-game.mp3', 'audio', {loop: true, volume: 0.05}]);
			this.queue.push(['ambient-everfree.mp3', 'audio', {loop: true, volume: 0.05}]);
			this.queue.push(['ambient-menu.mp3', 'audio', {loop: true, volume: 0.05}]);
			this.queue.push(['ambient-splash-bad.mp3', 'audio', {loop: true, volume: 0.05}]);
			this.queue.push(['ambient-splash-good.mp3', 'audio', {loop: true, volume: 0.05}]);
			this.queue.push(['ambient-splash-ok.mp3', 'audio', {loop: true, volume: 0.05}]);
			this.queue.push(['event-confront.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['event-convert.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['event-death.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['event-kill.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['event-object-book.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['event-object-coin-1.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['event-object-coin-2.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['event-object-gem.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['event-object-ice.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['event-object-pool.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['event-object-portal.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['event-object-trap.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['skill-attack.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['skill-hit.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['skill-pray.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['skill-spell-2.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['skill-spell-3.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['skill-spell-enchant.mp3', 'audio', {loop: false, volume: 0.1}]);
			this.queue.push(['skill-spell.mp3', 'audio', {loop: false, volume: 0.1}]);

			this.toLoad    = this.queue.length;
			this.preloaded = 0;
			this.counter   = 0;

			this.randomMessage();
			for(var i in this.queue)
			{
				this.preloadItem(this.queue[i][0], this.queue[i][1], this.queue[i][2]);
			};

			this.checkLoad();
		};

		this.randomMessage = function()
		{
			shuffle(this.messages);
			jQuery(TConfig.preloadID + " .message").html(this.messages[0]);
		};

		this.stopObserving = function(data)
		{
			this.loaders = [];
			jQuery(TConfig.preloadID).hide();
			this.isActive = false;
		};		
	};

	TConfig.handlers[STATE_PRELOAD] = new THandlerPreload();
