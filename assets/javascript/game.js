/**Class that dictates the behavior of the Hangman game.**/
var gameManager = {
	wins: 0, //counter for player wins
	guesses: 10, //counter for guesses left 
	winFlag: false, //flag to check if the game has been won
	setFlag: false, //flag to check if the game has been set
	selection: "", //eventually chosen word
	words: ["Samus Aran", "Sonic the Hedgehog", "Mario", "Pikachu", 
			"Tracer", "Link", "Princess Zelda", "Luigi", 
			"Megaman", "Waluigi", "Cloud Strife", "Ryu",
			"Dante", "Bowser", "Solid Snake", "Kratos",
			"Glados", "Sephiroth", "Geralt of Rivia",
			"Nathan Drake", "Commander Shepard", "Lara Croft",
			"Ratchet", "Master Chief", "Marcus Fenix", "Sly Cooper"], //array of viable words
	word: [], //array of the chosen word
	displayed_word: [], //array of the displayed word with correctly hidden letters.
	letters_guessed: [], //array of the letters guessed.
	characters:  { 
			   "samus aran": "assets/images/samus.jpg",
			   "sonic the hedgehog": "assets/images/sonic.jpeg",
			   "mario": "assets/images/mario.jpeg",
			   "pikachu": "assets/images/pikachu.jpg",
			   "tracer":"assets/images/tracer.jpg",
			   "link": "assets/images/link.jpeg",
			   "princess zelda": "assets/images/zelda.png",
			   "luigi": "assets/images/luigi.jpeg",
			   "megaman": "assets/images/megaman.jpeg",
			   "waluigi": "assets/images/waluigi.jpg",
			   "cloud strife": "assets/images/cloud.png",
			   "ryu": "assets/images/ryu.png",
			   "dante": "assets/images/dante.jpg",
			   "bowser": "assets/images/bowser.jpeg",
			   "solid snake": "assets/images/snake.jpg",
			   "kratos": "assets/images/kratos.jpg",
			   "glados": "assets/images/glados.jpeg",
			   "sephiroth": "assets/images/sephiroth.jpeg",
			   "geralt of rivia": "assets/images/geralt.jpg",
			   "nathan drake": "assets/images/drake.jpg",
			   "commander shepard": "assets/images/shepard.jpg",
			   "lara croft": "assets/images/lara.jpeg",
			   "ratchet": "assets/images/ratchet.png",
			   "master chief": "assets/images/chief.jpeg",
			   "marcus fenix": "assets/images/marcus.png",
			   "sly cooper": "assets/images/sly.png"
			  }, //dictionary of character images
	main_song: "", //empty for song initializations
	win_song: "", //""
	lose_song: "", //""


	/*Method that sets the game up. This is called upon the player pressing 
	**space after page load. 
	*/
	setUp: function(){

		/*Checks if the board is set and if not, sets the game board. */
		if(this.setFlag == false){
			this.chooseWord();
			this.winFlag = false;

			document.getElementById("instructions").innerHTML = 
			"Press any letter key to play! Press SPACE or ESC to restart game!";

			var newDiv = document.createElement("div");
	        newDiv.id = "wins";
	        document.getElementById("game").appendChild(newDiv);

	        newDiv = document.createElement("div");
	        newDiv.id = "word";
	        document.getElementById("game").appendChild(newDiv);

	        newDiv = document.createElement("div");
	        newDiv.id = "guesses";
	        document.getElementById("game").appendChild(newDiv);

        	newDiv = document.createElement("div");
        	newDiv.id = "letters_guessed";
        	document.getElementById("game").appendChild(newDiv);

        	this.displayInfo();
        	this.setFlag = true;

    	}

    	console.log(this.word);


     


	},

	/*Method that handles when a player guesses.*/
	guess: function(letter){

		/*If the guess is wrong, take off a guess and check if they've lost.
		**If the guess if right, call correctGuess and check if they've won.
		*/
		if(this.word.indexOf(letter) == -1){
			if(this.letters_guessed.indexOf(" " + letter) == -1){
				this.letters_guessed.push(" " + letter);
			}
			this.guesses = this.guesses - 1;
			this.displayInfo();
			if(this.guesses == 0){
				this.lose();
			}
		}
		else if(this.word.indexOf(letter) != -1){
			this.correctGuess(letter);
			if(this.winFlag == true){
				this.victory();
			}
		}

	},

	/*Method to choose the word to use for the game. Chooses from list of words
	**at random and then create the two word arrays needed.
	*/
	chooseWord: function (){

		var choice = this.words[Math.floor(Math.random() * 25)];
		selection = choice.toLowerCase();
		choice = choice.split("");
		for(i = 0; i < choice.length; i++){
			this.word.push(choice[i].toLowerCase());
			if(choice[i] != " "){
				this.displayed_word.push("- ");
			}
			else if(choice[i] == " "){
				this.displayed_word.push("          ");
			}
		}

	},

	/*Method to display the game info.*/
	displayInfo: function(){

		document.getElementById("wins").innerHTML = "<p>Wins: " + this.wins + "</p>";
		document.getElementById("word").innerHTML = "<p>" + this.arrayToString(this.displayed_word) + "</p>";
		document.getElementById("guesses").innerHTML = "<p>Guesses Left: " + this.guesses + "</p>";
		document.getElementById("letters_guessed").innerHTML = "<p>Letters Guessed: " + this.arrayToString(this.letters_guessed) + "</p>";

	},

	/*Method to handle a correct guess. Changes the needed indexes in the arrays and displays info. */
	correctGuess: function(letter){
		if(this.word.lastIndexOf(letter) != this.word.indexOf(letter)){

		}

		for(i = 0; i < this.word.length; i++){
			if(this.word[i] == letter){
				this.displayed_word[i] = letter;
			}
		}

		if(this.displayed_word.indexOf("- ") == -1){
			this.winFlag = true;
			this.wins = this.wins + 1;
		}

		this.displayInfo();
		

	},

	/*Method to restart the game*/
	restart: function(){

		this.main_song.pause();
		this.main_song.play();
		this.displayed_word = [];
		this.word = [];
		this.letters_guessed = [];
		this.guesses = 10;

		this.chooseWord();
		if(this.winFlag == true){
			var remove = document.getElementById("character_image");
			remove.remove();
		}
		this.winFlag = false;
		this.displayInfo();
		document.getElementById("instructions").innerHTML = "Press any letter key to play! Press SPACE or ESC to restart game!";
		console.log(this.word);

	},

	/*Method to handle when the player loses*/
	lose: function(){

		this.main_song.pause();
		this.lose_song.play();
		document.getElementById("instructions").innerHTML = "YOU LOST! Press the space key to restart.";
		
	},

	/*Method to hanle when the player wins */
	victory: function(){

		this.main_song.pause();
		this.win_song.play();
		document.getElementById("instructions").innerHTML = "YOU WON! Press the space key to restart.";
		newDiv = document.createElement("div");
		newDiv.innerHTML = '<img src="' + this.characters[selection] + '"></img>'; 
		newDiv.id = "character_image";
		document.getElementById("instructions").appendChild(newDiv);
	},

	/*Helper method to convert arrays to strings */
	arrayToString: function(array){
		var string = "";
		for(i = 0; i < array.length; i++){
			string = string + array[i];
		}
		return string;
	},

	/*Method to set the sounds for the game */
	setSound: function(){

		this.main_song = new Howl({
        	src: ['assets/music/mario.mp3'],
        	autoplay: true,
        	loop: true,
        	volume: 0.5
      	});

		this.win_song = new Howl({
			src: ['assets/music/win.mp3'],
			autoplay: false,
			loop: false,
			volume: 0.5,
		});

		this.lose_song = new Howl({
			src: ['assets/music/lose.mp3'],
			autoplay: false,
			loop: false,
			volume: 0.5,
		});

    	this.main_song.play();
	}


}

/*Observer for keyboard events*/
document.onkeyup = function (event){

	if(event.keyCode == 32 && gameManager.setFlag == false){
		gameManager.setUp();
		gameManager.displayInfo();
		return;
	}
	else if (event.keyCode == 32 || event.keyCode == 27){
		gameManager.restart();
		return;
	}
	else if(gameManager.winFlag == false){
		var letter = String.fromCharCode(event.keyCode).toLowerCase();
		gameManager.guess(letter);
	}

}

/*Method to set up sound on page load*/
window.onload = function(){

	gameManager.setSound();
	
}