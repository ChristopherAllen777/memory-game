// Memory Game
// © 2017 Chris Allen
// License -- Harris Media Roger Wicker
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on github [ChristopherAllen777] and linkedin

(function(){
	
	var Memory = {
		// Setting up for gameplay
		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},
		// function for shuffling cards
		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.binding();
			this.paused = false;
     		this.guess = null;
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 1100);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},


		// Correct build function()
		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /> '+ v.name +'</div>\
				<div class="back"><img src="js/wickerlogo.png"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};// var Memory = {} end tag

	var cards = [

		// Air Force
		{
			name: "“It is clear that our current fleet of 275 ships is insufficient to address the security challenges we face today.”",
			img: "assets/navy.png",
			id: 1,
		},
		// Navy
		{
			name: "”Now more than ever, a strong Navy and Marine Corps are central to our nation’s ability to deter adversaries, assure allies, and defend our national interests.”",
			img: "assets/airforce.png",
			id: 2
		},
		// Coast Guard
		{
			name: "”The Coast Guard is charged with protecting America’s coastline, waterways, and ports, as well as executing security operations around the world.”",
			img: "assets/coastguard.png",
			id: 3
		},
		// Navy
		{
			name: "”We need a bigger and more capable Navy. Ships and aircraft should be better connected across platforms and warfighting domains.”",
			img: "assets/specialforces.png",
			id: 4
		}, 
		// Army
		{   
			name: "”Keeping our military prepared to fight and win – on and under the sea, on land, and in the air, not to mention in cyberspace and outer space.”",
			img: "assets/army.png",
			id: 5
		},
		// Marines
		{
			name: "”Keeping our military prepared to fight and win – on and under the sea, on land, and in the air, not to mention in cyberspace and outer space.”",
			img: "assets/marines.png",
			id: 6
		},
	];
    
	Memory.init(cards);


})();