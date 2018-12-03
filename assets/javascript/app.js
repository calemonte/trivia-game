// Global variables for storing counters and intervalId.
var wins = 0;
var losses = 0;
var unanswered = 0;
var count = 0;
var intervalId;
var timerRunning = false;
var buzzerHit = false;

// On click references
window.onload = function() {
    $("#start-button").on("click", trivia.start);
}

// Object containing array of questions, answers, image srcs, figure captions, and alt texts.
var trivia = {

    time: 30,
    result: false,

    questionList: [
        {
            id: 1,
            question: "What was Race Street formerly called?",
            options: [
                "Franklin Street", 
                "Mayberry Avenue", 
                "Crown Lane", 
                "Sassafras Street"
            ],
            answer: "Sassafras Street",
            answerText: "First known as Sassafras Street, Race Street got its current name in the late 19th Century after it became a popular street for horse racing.",
            img: "assets/images/racestreet.jpg",
            altText: "1887 Black and white photograph of two men seated on a horse-drawn carriage in Philadelphia.",
            imgCaption: "An 1887 street scene on Race Street, formerly known as Sassafras Street."
        },
        {
            id: 2,
            question: "Which Continental Congress passed the Declaration of Independence?",
            options: [
                "The Second Continental Congress", 
                "The First Continental Congress",
                "The Third Contintental Congress",
                "The Revolutionary Continental Congress"
            ],
            answer: "The Second Continental Congress",
            answerText: "The Second Continental Congress was a convention of delegates from the Thirteen Colonies that started meeting in the spring of 1775 in Philadelphia. It succeeded the First Contintental Congress and was responsible for signing the Declaration of Independence.",
            img: "assets/images/independence-hall.jpg",
            altText: "Color photograph of the Assembly Room in Independence Hall in Philadelphia.",
            imgCaption: "The Assembly Room in Independence Hall where the Second Continental Congress adopted the Declaration of Independence in 1776."
        },
        {
            id: 3,
            question: "What Fairmount field was destroyed by (and rebuilt after) Philly’s inaugural Made in America concert in 2012?",
            options: [
                "Paine's Park",
                "The Azalea Garden",
                "Van Colln Memorial Field",
                "Eakins Oval"
            ],
            answer: "Van Colln Memorial Field",
            answerText: "Von Colln Memorial Field, located at 22nd and the Parkway, was used extensively during the two-day concert in 2012 and was destroyed as a result. Made in America organizers were held responsible for repairing the damage caused.",
            img: "assets/images/van-colln.jpg",
            altText: "Muddied, grass-less field covered in equipment.",
            imgCaption: "Van Colln Memorial Field as it appeared after the 2012 Made in America Concert."
        }
    ],

    // Start game function
    start: function() {

        // Remove start text from DOM.
        $("#start").remove();

        trivia.displayQuestion();
    },

    // Display question function
    displayQuestion: function() {

        // Cache reference to current trivia question.
        var $current = trivia.questionList[count];

        // Start the timer.
        trivia.startTimer();

        // Set timeout for 30 seconds.
        var buzzer = setTimeout(function() {
            unanswered++;
            result = false;
            buzzerHit = true;
            trivia.stopTimer();
            trivia.revealAnswer();
        }, 30000);

        // Append question and option divs to DOM.
        $("#question-and-options").append("<div id='question' />",
        "<div id='options' />");

        // Display question and answer options.
        $("#question").append("<h3>" + $current.question + "</h3");

        // Append empty options <ul> to DOM.
        $("#options").append("<ul id='options-ul' />");

        // Append question options.
        $.each($current.options, function(i, option) {
            $("#options-ul").append("<li class='options-li hvr-fade'>" 
            + $current.options[i] + "</li>");
        }); 

        // Event handler for managing user selections.
        $(".options-li").on("click", function() {

            if ($(this).text() === $current.answer) {
                clearTimeout(buzzer);
                wins++;
                result = true;
                trivia.stopTimer();
                trivia.revealAnswer();
            } else {
                clearTimeout(buzzer);
                losses++;
                result = false;
                trivia.stopTimer();
                trivia.revealAnswer();
            }

        });
    
    },

    // Star timer function.
    startTimer: function() {
        if (!timerRunning) {
            intervalId = setInterval(trivia.count, 1000);
            timerRunning = true;
        }
    },

    // Stop timer function.
    stopTimer: function() {
        clearInterval(intervalId);
        timerRunning = false;
    },

    // Reset the timer to 30 seconds function.
    resetTimer: function() {
        trivia.time = 30;
        $("#timer > h2").text(trivia.time);
    },

    // Count function for decrementing and displaying the timer.
    count: function() {
        trivia.time--;
        $("#timer > h2").text(trivia.time);
        if (trivia.time <= 0) {
            trivia.stopTimer();
        }
    },

    // Reveal answer function
    revealAnswer: function() {

        // Cache reference to current trivia question.
        var $current = trivia.questionList[count];

        // Clear the options nodes.
        $("#options").remove();

        // Append <div> for answers text and photograph.
        $("#question-and-options").append("<div id='answer' />");

        // Append result stylings.
        if (result) {
            $("#answer").append("<span id='answer-outcome-correct'>Correct!</span>");
        } else if (!result && buzzerHit) {
            $("#answer").append("<span id='answer-outcome-incorrect'>Time's up!</span>");
        }
        else {
            $("#answer").append("<span id='answer-outcome-incorrect'>Incorrect!</span>");
        }

        // Append answer image.
        $("#answer").append("<figure id='answer-image-wrapper' />");
        $("#answer-image-wrapper").append(
            "<img src=" + $current.img + 
            " alt=" + $current.altText +
            " id='answer-image' />"
            );
        
        // Append answer image caption.
        $("#answer-image-wrapper").append("<figcaption id='answer-image-caption'>" + $current.imgCaption + "</figcaption>");

        // Append answer paragraph text.
        $("#answer").append("<p>" + $current.answerText + "</p>");

        // Next question or view results logic.
        if (count === trivia.questionList.length - 1) {
            // Append final score button.
            $("#answer").append("<button id='next-question-button' class='hvr-fade'>View Results</button>");

            // Fire final score function when called.
            $("#next-question-button").click(trivia.viewResults);
        } else {
            // Append next question button.
            $("#answer").append("<button id='next-question-button' class='hvr-fade'>Next Question</button>");

            // Fire next question function when called.
            $("#next-question-button").click(trivia.nextQuestion);
        }
    },

    // Next question function
    nextQuestion: function() {

        // Reset timer (as opposed to merely stopping it).
        trivia.resetTimer();

        // Reset answer result. 
        result = "";

        // Increment the current question counter.
        count++;

        // Reset the buzzer.
        buzzerHit = false;

        // Remove the previous question.
        $("#question").remove();

        // Remove the answer text.
        $("#answer").remove();

        // Display the next question.
        trivia.displayQuestion();

    },

    // View results function
    viewResults: function() {

        // Empty question and answer space.
        $("#question-and-options").empty().append("<div id='results' />");

        // Append results text and restart button.
        $("#results").append(
            "<h2>Your Score</h2>",
            "<h3>Correct Answers: " + wins + "</h3>",
            "<h3>Incorrect Answers: " + losses + "</h3>",
            "<h3>Unanswered: " + unanswered + "</h3>",
            "<button id='restart-button' class='hvr-fade'>Play Again</button>"
        );

        $("#restart-button").on("click", trivia.reset);
    },

    // Reset game function
    reset: function() {

        // Reset counters
        count = 0;
        wins = 0;
        losses = 0;
        unanswered = 0;

        // Reset the timer.
        trivia.resetTimer();

        // Append start prompts and restart button.
        $("#question-and-options").empty().append("<div id='start'>");
        $("#start").append(
            "<h3>Click the start button for your first question!</h3>",
            "<button id='start-button' class='hvr-fade'>Start</button>"
        );

        // Start the game if pressed.
        $("#start-button").on("click", trivia.start);

    }
};