var wins = 0;
var losses = 0;
var unanswered = 0;
var count = 0;
var intervalId;
var timerRunning = false;
var buzzerHit = false;

// Load start button on load.
window.onload = function() {
    $("#start-button").on("click", trivia.start);
}

// Trivia object contains the entire trivia game.
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
                "The Third Continental Congress",
                "The Revolutionary Continental Congress"
            ],
            answer: "The Second Continental Congress",
            answerText: "The Second Continental Congress was a convention of delegates from the Thirteen Colonies that started meeting in the spring of 1775 in Philadelphia. It succeeded the First Continental Congress and was responsible for signing the Declaration of Independence.",
            img: "assets/images/independence-hall.jpg",
            altText: "Color photograph of the Assembly Room in Independence Hall in Philadelphia.",
            imgCaption: "The Assembly Room in Independence Hall where the Second Continental Congress adopted the Declaration of Independence in 1776."
        },
        {
            id: 3,
            question: "If you get off the Garden State Parkway at Exit 0, you’re going to...",
            options: [
                "Wildwood",
                "Avalon",
                "Sea Isle City",
                "Cape May"
            ],
            answer: "Cape May",
            answerText: "Cape May, located off Exit 0 of the New Jersey Garden State Parkway, has been a seaside getaway for Philadelphians for generations. It's the southernmost town in New Jersey.",
            img: "assets/images/cape-may.jpg",
            altText: "The Cape May shoreline as seen from a boat just off the coast.",
            imgCaption: "One of the country's oldest resort destinations, Cape May is known for its Victorian buildings."
        },
        {
            id: 4,
            question: "SEPTA has eight lettered bus routes. This isn't one of them.",
            options: [
                "M",
                "XH",
                "G",
                "R"
            ],
            answer: "M",
            answerText: "SEPTA’s R, XH and G routes take passengers between Northeast, Northwest, West, North and South Philly. But there is no M route.",
            img: "assets/images/xh-bus.jpg", 
            altText: "Photograph of a SEPTA Route XH bus driving down a Philadelphia street.",
            imgCaption: "SEPTA Route XH is the only lettered route with two letters."
        },
        {
            id: 5,
            question: "Which of the following is not needed to make a soft pretzel?",
            options: [
                "Yeast",
                "Sugar",
                "Lye",
                "Buckwheat"
            ],
            answer: "Buckwheat",
            answerText: "A quick dip in lye gives soft pretzels their traditional 'skin' and helps salt stick. Yeast and sugar are necessary to the process, but buckwheat isn’t.",
            img: "assets/images/pretzels.jpg",
            altText: "Traditional Philadelphia soft pretzels on a pizza peal.",
            imgCaption: "Philly soft pretzels date back to the 1800s, when the region’s German immigrants began recreating the bretzels of their homeland."
        },
        {
            id: 6,
            question: "What is the area along Sansom Street between Seventh and Eighth Streets and on Eighth Street between Chestnut and Walnut referred to as?",
            options: [
                "Queen Village",
                "Franklin's Way",
                "Jeweler's Row",
                "Eastern Liberties"
            ],
            answer: "Jeweler's Row",
            answerText: "Jeweler’s Row is the nation’s oldest diamond district. It’s tucked between Old City and Washington Square.",
            img: "assets/images/jewelers-row.jpg",
            altText: "Jeweler's Row in downtown Philadelphia on a sunny day.",
            imgCaption: "Jeweler's Row as it appeared in 2016."
        },
        {
            id: 7,
            question: "Who threw the final pitch of the 2008 World Series?",
            options: [
                "Brad Lidge",
                "Cole Hamels",
                "Chad Durbin",
                "Ryan Madson"
            ],
            answer: "Brad Lidge",
            answerText: "After throwing the final pitch in the 2008 World Series Brad “Lights Out” Lidge dropped to his knees, kicking off a celebration of epic proportions in Philadelphia.",
            img: "assets/images/lidge.jpeg",
            altText: "Brad Lidge celebrates throwing the winning pitch for the Philadelphia Phillies in the 2008 World Series.",
            imgCaption: "Brad Lidge celebrating the Phillies becoming World Champs."
        },
        {
            id: 8,
            question: "What day of the year does the annual Mummers Parade take place?",
            options: [
                "Christmas",
                "New Year's Day",
                "Thanksgiving",
                "Easter"
            ],
            answer: "New Year's Day",
            answerText: "What’s New Year’s Day without the Mummers? Bundle up and get to Broad Street early to watch the parade.",
            img: "assets/images/mummers.jpg",
            altText: "Festively dressed Mummers march down South Broad Street in Philadephia.",
            imgCaption: "The Mummers Parade is believed to be the oldest folk festival in the United States."
        },
        {
            id: 9,
            question: "This excitable Philadephian has appeared on The Simpsons, 30 Rock, and It's Always Sunny in Philadelphia.",
            options: [
                "Rocky Balboa",
                "Swoop",
                "Gritty",
                "The Philly Phanatic"
            ],
            answer: "The Philly Phanatic",
            answerText: "The green, loveable Philly Phanatic‘s many TV appearances include The Simpsons, 30 Rock and Always Sunny.",
            img: "assets/images/phanatic.jpg",
            altText: "The Philly Phanatic doing his thing.",
            imgCaption: "The best mascot in all of sports."
        },
        {
            id: 10,
            question: "How large is Philadelphia in square miles (est.)?",
            options: [
                "134.1",
                "915.8",
                "42.7",
                "256.1"
            ],
            answer: "134.1",
            answerText: "The city represents 134.1 square miles of Pennsylvania’s 44,742.7 square miles.",
            img: "assets/images/philly.jpg",
            altText: "Aerial view of Philadephia.",
            imgCaption: "Philly's skyline continues to grow!",
        },
    ],

    // Start game function.
    start: function() {

        // Remove start text from DOM.
        $("#start").remove();

        trivia.displayQuestion();
    },

    // Display question function.
    displayQuestion: function() {

        // Cache reference to current trivia question.
        var $current = trivia.questionList[count];

        // Start the timer.
        trivia.startTimer();

        // Set timeout for 30 seconds and handle logic if unanswered.
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

    // Start timer function.
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
            $("#next-question-button").on("click", trivia.viewResults);
        } else {
            // Append next question button.
            $("#answer").append("<button id='next-question-button' class='hvr-fade'>Next Question</button>");

            // Fire next question function when called.
            $("#next-question-button").on("click", trivia.nextQuestion);
        }
    },

    // Show the next question and reset the board.
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