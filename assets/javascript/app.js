/**Class that defines a trivia questions**/
var question = class question{

	constructor(question, answers, correct){

		this.question = question;
		this.answers = answers;
		this.correct = correct;

	}

	get question(){

		return this._question;

	}

	get answers(){

		return this._answers;

	}

	get correct(){

		return this._correct;

	}

	set question(question_to_set){

		this._question = question_to_set;

	}

	set answers(answers_to_set){

		this._answers = answers_to_set;

	}

	set correct(correct_to_set){

		this._correct = correct_to_set;

	}
}



/**Class that defines the application**/
var app = {

	questions: [],
	current_question: "",
	time_limit: 10,
	question_amount: 10,
	correct_count: 0,
	incorrect_count: 0,
	answered: [],
	main_song: "",
	win_song: "",
	lose_song: "",

	/**Sets up the application**/
	setUp: function(){

		var first_question = new question('Who Killed Archduke Franz Ferdinand, sparking the First World War?', 
										 ['Gavrillo Princep', 'Lee Harvey Oswald', 'Che Guevara', 'Vladimir Lenin'],
										'Gavrillo Princep');

		var second_question = new question('Which of these actors/actresses have appeared as different superheroes from both Marvel and DC?',
										  ['Gal Gadot', 'Robert Downey Jr.', 'Scarlett Johansson', 'Ryan Reynolds'],
										  'Ryan Reynolds');

		var third_question = new question('Who performs the song "Losing my Edge"?',
										 ['Arcade Fire', 'Radiohead', 'LCD Soundsystem', 'Animal Collective'],
										 'LCD Soundsystem');
		var fourth_question = new question('From Software, the creators of Dark Souls, are known for creating which mech-based video game series?',
										  ['Armored Core', 'MechWarrior', 'MechAssault', 'Gundam Versus'],
										  'Armored Core');
		var fifth_question = new question('Which of these are Emperors of Rome were one of the Antonine Emperors of Ancient Rome?',
										  ['Marcus Aurelius', 'Nero', 'Augustus', 'Diocletian'],
										  'Marcus Aurelius');
		var sixth_question = new question('Who wrote the book The Dharma Bums?',
										  ['Alec Ginsberg', 'Jack Kerouac', 'Hunter S. Thompson', 'Kurt Vonnegut'],
										  'Jack Kerouac');
		var seventh_question = new question('This great mathematician and computing scientist has a test that examines artificial intelligence named after him. Who is he?',
											['Albert Einstein', 'Max Planck', 'Alan Turing', 'Ada Lovelace'],
											'Alan Turing');
		var eighth_question = new question('Which studio developed the Halo and Destiny video game franchises?',
										  ['Naughty Dog', 'Bungie', 'Activision', 'Microsoft'],
										  'Bungie');
		var nineth_question = new question('Who won the scoring trophy for the 2016-2017 English Premier League Championship?',
										   ['Romelu Lukaku', 'Alexis Sánchez', 'Diego Costa', 'Harry Kane'],
										   'Harry Kane');
		var tenth_question = new question('Which club team does Christian Pulisic, the 18 year old American wonderkid, play for at the moment?',
											['Manchester United', 'Real Madrid', 'Borussia Dortmund', 'Liverpool F.C.'],
											'Borussia Dortmund');

		this.questions.push(first_question);
		this.questions.push(second_question);
		this.questions.push(third_question);
		this.questions.push(fourth_question);
		this.questions.push(fifth_question);
		this.questions.push(sixth_question);
		this.questions.push(seventh_question);
		this.questions.push(eighth_question);
		this.questions.push(nineth_question);
		this.questions.push(tenth_question);

		$('#time-view').hide();
		$('#end-view').hide();
		$('#correct-view').hide();
		$('#incorrect-view').hide();
		$('#start-view').html('<h3>Click here to start</h3>');

		this.main_song = new Audio('assets/music/mario.mp3');
		this.win_song = new Audio('assets/music/win.mp3');
		this.lose_song = new Audio('assets/music/lose.mp3');

	},

	/**Displays the current question**/
	displayQuestion: function(random_number){


		this.current_question = this.questions[random_number];
		this.answered.push(this.current_question);

		$('#correct-view').html('<h3>You have: ' + this.correct_count + ' correct answers.</h3>');
		$('#incorrect-view').html('<h3>You have: ' + this.incorrect_count + ' incorrect answers.</h3>');

		$('#question').html('<h2>' + this.current_question.question + '</h2>');

		$('#answer-one').html('<h1>'+ this.current_question.answers[0] + '</h1>');
		$('#answer-one').attr("data-name", this.current_question.answers[0]);

		$('#answer-two').html('<h1>'+ this.current_question.answers[1] + '</h1>');
		$('#answer-two').attr("data-name", this.current_question.answers[1]);
		$('#answer-three').html('<h1>'+ this.current_question.answers[2] + '</h1>');
		$('#answer-three').attr("data-name", this.current_question.answers[2]);

		$('#answer-four').html('<h1>'+ this.current_question.answers[3] + '</h1>');
		$('#answer-four').attr("data-name", this.current_question.answers[3]);

	},

	/**Checks the given answer**/
	checkAnswer: function(answer){

		if(this.current_question.correct == answer){

			this.correct_count++;
			console.log(this.correct_count);

		}
		else{

			this.incorrect_count++;
			console.log(this.incorrect_count);

		}
	},

	/**Runs a round of the game. Contains a timer that updates every second for ten seconds.**/
	run: function(){

		this.displayQuestion(Math.floor(Math.random()*this.questions.length));

		var timer = 10

		window.setInterval(function(){

			$('#time-view').html('<h3>Time left: ' + timer + '</h3>');

			if(timer == 1){
				timer = 10;
				app.incorrect_count++;
				app.removeQuestion(app.current_question);
				window.setTimeout(function(){
					app.displayQuestion(Math.floor(Math.random()*app.questions.length));
				}, 1000);
				return;
			}

			timer = timer - 1;


		}, 1000)

	},

	/**Removes a question**/
	removeQuestion: function(question){

		var index = this.questions.indexOf(question);
		this.questions.splice(index, 1);

	},

	/** Ends the application **/
	end: function(){

		$('#question-view').hide();
		$('#correct-view').hide();
		$('#incorrect-view').hide();
		$('#end-view').show();
		$('#end-view').html('<h2>You got: ' + this.correct_count + ' correct answers</h2>' +
							'<h2>You gave: ' + this.incorrect_count + ' wrong answers</h2>' +
							'<h2 id="restart">Thank you for playing!</h2>');
		if(this.correct_count >= 5){
			this.win_song.play();
		}
		else{
			this.lose_song.play();
		}
	}

}


$(document).ready(function(){

	app.setUp();

	$('#start-view').on("click", function(){

		$('#start-view').hide();
		$('#time-view').show();
		$('#correct-view').show();
		$('#incorrect-view').show();
		app.run();

	});

	$('#answer-one').on("click", function(){

		app.checkAnswer($('#answer-one').attr("data-name"));
		app.removeQuestion(app.current_question);
		if(app.questions.length == 0){
			app.end();
		}
		else{
			app.run();
		}

	});

	$('#answer-two').on("click", function(){

		app.checkAnswer($('#answer-two').attr("data-name"));
		app.removeQuestion(app.current_question);
		if(app.questions.length == 0){
			app.end();
		}
		else{
			app.run();
		}
	});

	$('#answer-three').on("click", function(){

		app.checkAnswer($('#answer-three').attr("data-name"));
		app.removeQuestion(app.current_question);
		if(app.questions.length == 0){
			app.end();
		}
		else{
			app.run();
		}

	});

	$('#answer-four').on("click", function(){

		app.checkAnswer($('#answer-four').attr("data-name"));
		app.removeQuestion(app.current_question);
		if(app.questions.length == 0){
			app.end();
		}
		else{
			app.run();
		}

	});

});