$(document).ready(function(){

    /*--- Display information modal box ---*/
    $(".what").click(function(){
        $(".overlay").fadeIn(1000);
    });

    /*--- Hide information modal box ---*/
    $('a.close').click(function(){
        $('.overlay').fadeOut(1000);
    });


    // Start the game when the document loads.
    newGame();

    // Function that sets the environment for a new game.
    function newGame() {

        // Variable that holds the current guess.
        var currentGuess = "";
        var previousGuess = "";

        // Reset the counter, empty the guess list, and reset the header.
        var guessCount = 0;
        $('span#count').text(guessCount);
        $('h2#feedback').text('Make your Guess!');
        $('ul#guessList').empty();

        // Get the number from the computer to start the game.
        var generatedNumber = getRandomInt(1, 100);
        console.log("The actual number is: " + generatedNumber);
        playGame(currentGuess, previousGuess, guessCount, generatedNumber);
        return;
    }

    function playGame(thisGuess, priorGuess, count, secretNumber) {

        // Function to activate the New Game link.
        $('a.new').on('click', newGame);

        // Get the user's guess.
        $('form').submit(function(e) {
            e.preventDefault();
            thisGuess = $('input#userGuess').val();
            console.log("The user guessed: " + thisGuess);
            $('input#userGuess').val('');
            count += 1;
            $('span#count').text(count);

            // Get the user's guess and add it to the list of guesses.
            $('ul#guessList').append('<li>' + thisGuess + '</li>');

            // Compare the current guess with the real number.
            var userFeedback = compareValues(thisGuess, priorGuess, secretNumber);

            // Render the feedback to the page.
            $('h2#feedback').text(userFeedback);

            // Copy the current guess to a variable to track it for later.
            priorGuess = thisGuess;
        });
        return;

    }

    // Function that returns a random Integer.
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function that compares the guess with the actual number and
    // gives the appropriate feedback depending on the accuracy of the guess.
    function compareValues(newGuess, oldGuess, actualNumber) {

        var newDifference = Math.abs(newGuess - actualNumber);
        var feedback = "";
        if (newDifference === 0) {
            feedback = "You've guessed it!";
        } else if (oldGuess) {
            var oldDifference = Math.abs(oldGuess - actualNumber);
            if (newDifference < oldDifference) {
                feedback = "Warmer";
            } else {
                feedback = "colder";
            }
        } else {
            if ( newDifference >= 50 ) {
                feedback = "Ice Cold!";
            } else if ( newDifference >= 30 ) {
                feedback = "Cold";
            } else if ( newDifference >= 20 ) {
                feedback = "Warm";
            } else if ( newDifference >= 10 ) {
                feedback = "Hot";
            } else if ( newDifference >= 1 ) {
                feedback = "Very Hot";
            }
        }
        return feedback;
    }

});
