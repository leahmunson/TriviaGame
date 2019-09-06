$(document).ready(function() {

	// Item factory
	var createQuestion = function(question, a, b, c, d, answer, src, correct, wrong) {
	  
		var qThing   = {
		  Quest: question,
		  choiceA: a,
		  choiceB: b,
		  choiceC: c,
		  choiceD: d,
		  Ans: answer,
		  Image: src,
		  Correct: correct,
		  Wrong: wrong
		};
	  return qThing; 
	};

	// array of quiz items
	var qItems = [];

	// pushes quiz objects to the array
	qItems.push(createQuestion(
		"Slughorn teaches his students that Amortentia smells different to each person.  What food does Harry smell?", 
		"Pumpkin Juice", 
		"Mrs Weasley's fudge", 
		"Lemon Drops", 
		"Treacle Tart", 
		"D", 
		"https://media.giphy.com/media/608GatCqN3SLe/giphy.gif", 
		"Correct! Harry smells a Treacle Tart.", 
		"Nope! Harry smells a Treacle Tart."
	));

	qItems.push(createQuestion(
		"Which creatures pull the carriages that take students from the Hogwarts Express to the Castle?", 
		"Hippogriffs", 
		"Thestrals", 
		"Centaurs", 
		"Manticores", 
		"B", 
		"https://media.giphy.com/media/qLcTqBfTcNgK4/giphy.gif", 
		"Correct! Hogwarts has a loyal flock of Thestrals that pull the carriages.", 
		"Wrong! Hogwarts has a loyal flock of Thestrals that pull the carriages."
	));

	qItems.push(createQuestion(
		"Where is the Slytherin common room located?", 
		"Next to the Kitchens", 
		"In the West Tower", 
		"The Dungeons", 
		"Below the Great Wall", 
		"C", 
		"https://media.giphy.com/media/WIHz4mQCeDa80/giphy.gif", 
		"Correct! The Hogwarts dungeons hold the common area for all students of the Slytherin house.",
		"Wrong! The Hogwarts dungeons hold the common area for all students of the Slytherin house."
	));

	qItems.push(createQuestion(
		"Which Hogwarts professor was rumored to be a dueling champion in their youth?", 
		"Minerva McGonagall", 
		"Severus Snape", 
		"Filius Flitwick", 
		"Horace Slughorn", 
		"C", 
		"https://media.giphy.com/media/mz1kJeDVueKC4/giphy.gif", 
		"Correct!  Flitwick graduated from Hogwarts and proceeded to become a Master Duellist and a Duelling Champion!",
		"Wrong!  Flitwick graduated from Hogwarts and proceeded to become a Master Duellist and a Duelling Champion!"
	));

	qItems.push(createQuestion(
		"Who was the headmaster of Hogwarts when the Chamber of Secrets was opened for the first time?", 
		"Armando Dippet", 
		"Albus Dumbledore", 
		"Phineas Nigellus Black", 
		"Brutus Scrimgeour", 
		"A", 
		"https://media.giphy.com/media/AFZgmywhfOhiw/giphy.gif", 
		"Correct! It was during Dippet's tenure that the Chamber of Secrets was opened by Tom Riddle.", 
		"Wrong!  It was during Dippet's tenure that the Chamber of Secrets was opened by Tom Riddle."
	));

	qItems.push(createQuestion(
		"What is the name of the book Hermione supposes Voldemort used to learn about Horcruxes?", 
		"Magik Moste Evil", 
		"A Guide to Medieval Sorcery", 
		"Secrets of the Darkest Art", 
		"Most Potente Potions", 
		"C", 
		"https://media.giphy.com/media/hwTWG731ye8kU/giphy.gif", 
		"Correct!  The book is called Secrets of the Darkest Art.", 
		"Wrong!  The book is called Secrets of the Darkest Art."
	));

	qItems.push(createQuestion(
		"What is the name of the room Hary uses to teach Dumbledore's Army?", 
		"The 'Restricted' section of the library", 
		"The girls bathroom on the first floor", 
		"The Prefect's bathroom", 
		"The Room of Requirement", 
		"D", 
		"https://media.giphy.com/media/5DxQx6tKfgLq8/giphy.gif", 
		"Correct! The Room of Requirement is a magical room which can only be discovered by someone who is in need.", 
		"Wrong! The Room of Requirement is a magical room which Harry uses to teach Dumbledore's Army."
	));

	console.log(qItems);

	// ******* COUNTDOWN TIMER *******
	var timeRemaining = 30;

    var intervalId;

    var userGuess;

    var correctGuess = 0;

    var wrongGuess = 0;

    var unanswered = 0;

    var q = 0; // question indicator (array index)

    var x = qItems.length;

    $("#startButton").on("click", playGame); // initial start of game

    // ******* FUNCTIONS *******

    function run() {

      intervalId = setInterval(decrement, 1000); // runs the timer

    }

    function decrement() {

      timeRemaining--;  // decrease time by 1

      $("div.timer").html("<h2>Time Remaining: " + timeRemaining + " seconds</h2>"); // display current time on screen

      if (timeRemaining == 0) {  // if time runs out...

      	stop(); // stop the timer...

        q++; // increment indication to move to next question

        unanswered += 1; // increase count of unanswered by one
        console.log("unanswered: " + unanswered);
        
        $("div.trivia").css("display", "none"); // hide trivia screen...
        $("div.timeup").css("display", "block"); // display timeup screen

        populate(qItems[q]); // change the question
        setTimeout(changeScreen, 1000 * 5); // wait five seconds and then change back to the trivia screen

      }
    } // end decrement function

    function playGame () {

    	$("div.timer").css("display", "block"); // unhide the timer

    	populate(qItems[q]); // populate trivia questions
		console.log(qItems[q]);

		changeScreen(); // change to trivia display screen

    	if (q < x) {  // if there are more items...do this

    			$("button.tButton").on("click", function(){  // when an answer button is selected...

    				stop();  // stop the clock, clear the interval, reset timeRemaining back to 30 seconds

    				userGuess = $(this).val(); // user's click stores the value of the button "A" "B" "C" "D"

    				if (userGuess == qItems[q].Ans) {  // if the user's guess is the same as the answer...

    					correctGuess += 1;  // increase correct answers by one
    					console.log("correct: " + correctGuess);

    					answer(qItems[q].Correct); // display the answer screen for correct guesses

    					q++; // increment the indicator to move to the next question

    					if (q == x) {

							stop();

				    		results();

				    		setTimeout(showResults, 1000 * 5);

				    	}
    					
    					else {

	    					populate(qItems[q]); // fill the screen with the new question info

	    					setTimeout(changeScreen, 1000 * 5); // wait on the answer screen for 5 seconds before moving on
	    				}
    				}

    				else { // if the user guess is not the correct answer...

    					wrongGuess += 1; // increment the wrong guesses by one
    					console.log("wrong: " + wrongGuess);

    					answer(qItems[q].Wrong); // display the answer screen for wrong guesses

    					q++; // increment the indicator to move to the next question

    					if (q == x) {

							stop();

							results();

				    		setTimeout(showResults, 1000 * 5);
				    	}
    					
    					else {

	    					populate(qItems[q]); // fill the screen with the new question info

	    					setTimeout(changeScreen, 1000 * 5); // wait on the answer screen for 5 seconds before moving on
	    				}
	    			}

    			}); // end of trivia button onclick function
    		
    	} // end of main IF statement
    
    } // end of playGame function

    function answer(type) {

    	$("#answers").text(type); // displays the response for correct/incorrect to the screen
    	document.getElementById("answerImage").src= qItems[q].Image; // displays associated image to screen
    	$("div.trivia").css("display", "none"); // hides trivia screen
    	$("div.answer").css("display", "block"); // displays the answer screen
    } // end of answer function
    

    function stop() {

      clearInterval(intervalId); // clears interval that has been decreasing
      timeRemaining = 31; // resets time to 30
     
    } // end stop function
 
 	function populate(object) {

 		//clear buttons
 		$(".tButton").empty(); // clears the buttons

 		// populate trivia questions
		$("#questions").text(object.Quest);  // displays the question
		$("#button-1").append(object.choiceA); // displays the first choice
		$("#button-2").append(object.choiceB); // displays the second choice
		$("#button-3").append(object.choiceC); // displays the third choice
		$("#button-4").append(object.choiceD); // displays the  fourth choice
		
 	}

 	function changeScreen() {

 		$("div.trivia").css("display", "block"); // displays the trivia screen
    	$("div.answer").css("display", "none"); // hides the answer screen
    	$("div.start").css("display", "none"); // hides the start screen
    	$("div.timeup").css("display", "none"); // hides the timeup screen
    	$("div.results").css("display", "none"); // hides the results screen

    	run();
 	}

 	function showResults () {

 		$("div.answer").css("display", "none");
 		$("div.timer").css("display", "none");
		$("div.results").css("display", "block");

		resetAnswers();

		$("#restartButton").on("click", playGame);
 	}

 	function results() {

 		$("#correct").text(" Correct Answers: " + correctGuess);
 		$("#incorrect").text(" Incorrect Answers: " + wrongGuess);
 		$("#unanswered").text(" Unanswered: " + unanswered);
 	}

 	function resetAnswers() {

 		correctGuess = 0;
 		console.log("correct: " + correctGuess);

 		wrongGuess = 0;
 		console.log("wrong: " + wrongGuess);

 		unanswered = 0;
 		console.log("unanswered: " + unanswered);

 		console.log("last q value: " + q);

 		q = 0;

 		console.log("new q value: " + q);
 		console.log(qItems);
 	}


}); // END OF SCRIPT