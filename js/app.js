$(document).ready(function(){

    /*--- Display information modal box ---*/
    $(".what").click(function(){
        $(".overlay").fadeIn(1000);
    });

    /*--- Hide information modal box ---*/
    $('a.close').click(function(){
        $('.overlay').fadeOut(1000);
    });

    // Global variables
    var currentGuess;
    var previousGuess;
    var count;
    var generatedNumber;
    var feedback;
    var newDifference;
    var oldDifference;

    // Start the game when the document loads.
    newGame();

    // Function to reset the components of the game.
    function resetComponents () {
        // Variable that holds the current guess.
        currentGuess = "";
        previousGuess = "";
        feedback = "";

        // Reset the counter, empty the guess list, and reset the header.
        count = 0;
        $('span#count').text(count);
        $('h2#feedback').text('Make your Guess!');
        $('ul#guessList').empty();

        return;
    }

    // Function that sets the environment for a new game.
    function newGame() {

        resetComponents();

        // Get the number from the computer to start the game.
        generatedNumber = getRandomInt(1, 100);

        // Debugging statement.
        console.log("The actual number is: " + generatedNumber);

        // Run a function to start the game.
        playGame();
        return;
    }

    function playGame() {

        // Function to activate the New Game link.
        $('a.new').on('click', newGame);

        // Get the user's guess.
        $('form').submit(function(e) {
            e.preventDefault();

            // Get the guess and validate it.
            currentGuess = $('input#userGuess').val();

            // Debugging code
            console.log("The user guessed: " + currentGuess);

            // Reset the input box.
            $('input#userGuess').val('');



            // Debugging code.
            console.log("Current guess is: " + currentGuess);
            if (validateInput()) {
                // Increment the counter for the number of guesses
                count += 1;
                $('span#count').text(count);

                // Get the user's guess and add it to the list of guesses.
                $('ul#guessList').append('<li>' + currentGuess + '</li>');

                // Compare the current guess with the real number.
                feedback = compareValues();

               renderFeedback();

                // Copy the current guess to a variable to track it for later.
                previousGuess = currentGuess;
            }

            renderFeedback();

        });
        return;

    }

    // Function to render feedback
    function renderFeedback () {
        // Render the feedback to the page.
        $('h2#feedback').text(feedback);
        return;
    }

    // Function to validate the user input.
    function validateInput() {
        // If number, make sure it's an integer
        currentGuess = parseInt(currentGuess, 10);

        // Debugging code.
        console.log("Validate this: " + currentGuess);

        if (currentGuess >= 1 && currentGuess <= 100) {
            return true;
        } else if (currentGuess > 100 || currentGuess < 1) {
            feedback = "Must be between 1 and 100.";
            return false;
        } else {
            feedback = "Not a number. Try again.";
            return false;
        }
    }

    // Function that returns a random Integer.
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function that compares the guess with the actual number and
    // gives the appropriate feedback depending on the accuracy of the guess.
    function compareValues() {

        newDifference = Math.abs(currentGuess - generatedNumber);
        feedback = "";
        if (newDifference === 0) {
            feedback = "You've guessed it!";
        } else if (previousGuess) {
            oldDifference = Math.abs(previousGuess - generatedNumber);
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
