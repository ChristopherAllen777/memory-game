// Memory Game
// © 2017 Chris Allen
// License -- Harris Media Roger Wicker For Senator
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on github [ChristopherAllen777]

(function(){ 
	
	var Memory = {
		// Setting up for gameplay
		init: function(cards){
			this.$game = $(".game");
			this.$start = $(".start");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.$startbutton = $(".startbutton");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.showStart();
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
			this.$startbutton.on("click", $.proxy(this.reset, this));
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
			this.hideStart();
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},



		// Attempting to build a start modal
		showStart: function(){
			this.$overlay.show();
			this.$start.fadeIn("slow");
		},

		hideStart: function(){
			this.$overlay.hide();
			this.$start.hide();
		},
		// Start



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
				<div class="back"><img src="assets/wickerlogo.png"\
				alt="Roger Wicker Logo" /></div></div>\
				</div>';
			});
			return frag;
		}
	};// var Memory = {} end tag

	var cards = [

		// Navy
		{
			name: "NAVY",
			img: "assets/navy.png",
			id: 1,
		},
		// Air Force
		{
			name: "AIR FORCE",
			img: "assets/airforce.png",
			id: 2
		},
		// Coast Guard
		{
			name: "COAST GUARD",
			img: "assets/coastguard.png",
			id: 3
		},
		// Army National Guard
		{
			name: "NATIONAL GUARD",
			img: "assets/nationalguard.png",
			id: 4
		}, 
		// Army
		{   
			name: "ARMY",
			img: "assets/army.png",
			id: 5
		},
		// Marines
		{
			name: "MARINES",
			img: "assets/marines.png",
			id: 6
		},
	];

	Memory.init(cards);
})();

