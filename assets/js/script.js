//When clicking on start button it will load the question and hide the card and start button
$(".purple-button").on("click", function(){
    
    //It removes homepage from view
    $(".card").hide();
    console.log("user has clicked on start button");
    
    //It grabs the first question
    $(".Highscores").html("View Highscores");
    $(".timer").show();
    $(".timer").html("Time: 75");
    $(".highscoreReport").hide();
    $(".last-page").hide();
    $(".question-display").show();
    $("#button-display").show;
    quizQuestion.run();
    quizQuestion.questionNumber = 0;
    quizQuestion.correctAnswers = 0;
    quizQuestion.incorrectAnswers = 0;
    quizQuestion.getQuestion();
    document.getElementById('user-input').value = "";
})

//When clicking on reset button it resets the game
$(".btn-secondary").on("click", function(){
    console.log("user has clicked restart button");
    $(".Highscores").html("View Highscores");
    $(".timer").show();
    $(".timer").html("Time: 75");
    $(".highscoreReport").hide();
    $(".last-page").hide();
    $(".question-display").show();
    $("#button-display").show;
    quizQuestion.run();
    quizQuestion.questionNumber = 0;
    quizQuestion.correctAnswers = 0;
    quizQuestion.incorrectAnswers = 0;
    quizQuestion.getQuestion();
})

// When clicking on send initials it show the high score page
$("#send-initials").on("click", function(){
    console.log("User has clicked on submit initials for high scores");
    $("highscoreReport").show();
    quizQuestion.highscoreReport();
})

// When clicking on clear it reset high scores, hide question and high score page, and shows quiz's instructions.
$("#clear").on("click", function(){
    console.log("User has clicked on reset high scores");
    localStorage.clear();
    $("#highscoreArray").hide();
})

$("#return").on("click", function(){
    console.log("User has clicked to go back from high scores");
    clearInterval(quizQuestion.countDownTimer);
    $(".Highscores").show();
    $(".timer").show();
    $(".timer").html("Time: 75");
    $(".card").show();
    $("question-display").hide();
    $("#button-display").hide();
    $(".highscoreReport").hide();
    $("#highscoreArray").empty();
})

// It replace high score
$(".Highscores").on("click", function (){
    console.log("User has clicked on highscore");
    quizQuestion.counter = 0;
    quizQuestion.highscoreReport();
})

// When clicking on answer buttons
$("#button-display").on("click", ".answerButton", function (e){
    var selectedAnswer = $(e.target).attr("data-name");
    console.log(e);
    console.log(e.target);
    console.log(e.target.data);
    console.log($(e.target).attr("data-name"));
    quizQuestion.checkAnswer(selectedAnswer);
})

// Global variables
var counter = 0;
var hrLine = document.createElement("hr");
var Highscores = 0;
var quizQuestion = {
    currentQuestion: "",
    correctAnswers: 0,
    incorrectAnswers: 0,
    counter: 0,
    countDownTimer: null,
    questionNumber: 0,
    questions: [
        {
            questionText: "Which type of orientes programming Javascript language is?",
            questionAnswer: ["Object-oriented", "Object-Based", "Assembly-language","High-level"],
            answer: "Object-Based"
        },
        {
            questionText: "Which one of the following is also known as a Conditional Expression?",
            questionAnswer: ["Alternative to if-else","Switch statement", "If-then-else statement", "Immediate if"],
            answer: "Immediate if"
        },
        {
            questionText: "In Javascript, what is a block of statement?",
            questionAnswer: ["Conditional block", "Block that combines a number of statements into a single compound statement", "Both conditional block and a single statement", "Block that contains a single statement"],
            answer: "Block that combine a number of statements into a signle compound statement"
        },
        {
            questionText: "When interpreter encounters and empty statements, what will it do?",
            questionAnswer: ["Shows a warning", "Prompts to complete the statement", "Throws an error", "Ignores the statements"],
            answer: "Ignores the statements"
        },
        {
            questionText: "The function and var are known as?",
            questionAnswer: ["Keywords", "Data types", "Declaration statements", "Prototypes"],
            answer: "Declaration statements"
        },
    ],

    // Run function to initiate count down

    run: function (){
        clearInterval(this.countDownTimer);
        this.countDownTimer = setInterval(this.decrement, 1000);
        quizQuestion.counter = 75;
    },

    // Function to decrease time according to response and timeout

    decrement: function () {
        quizQuestion.counter--;
        $(".Timer").html("Time: " + quizQuestion.counter);
        if (quizQuestion.counter <= 0) {
            $("#timeout")[0].play();
            quizQuestion.counter = 0;
            clearInterval(quizQuestion.countDownTimer);
            quizQuestion.lastPage();
            $(".question-display").hide();
            $("#button-display").hide();
        }
    },

    // Obtain question from the array

    getQuestion: function (){
        $(".question-display").empty();
        $(".response").empty();
        $(".ready").empty();
        $(".question-display").html("<p>" + this.questions[this.questionNumber].questionText + "</p>");
        this.buttonGenerator();
    },

    // Generates button for each response option
 
    buttonGenerator: function(){
        $("#button-display").empty();
        for (var i = 0; i < this.questions [this.questionNumber].questionAnswer.length; i++){
            $("#button-display").append("<li>");
            var a = $("<button>");
            a.addClass("answerButton");
            a.attr("data-name", this.questions[this.questionNumber].questionAnswer[i]);
            a.text(this.questions[this.questionNumber].questionAnswer[i]);
            $("#button-display").append(a);
            $("#button-display").append("</li>");
        };
    },

    // Verifies the answer and clasifies it as correct, incorrect or undefined when time is over.

    checkAnswer: function (selectedAnswer){
        console.log(this.questions[this.questionNumber]);
        
        if (selectedAnswer === this.questions[this.questionNumber].answer){
            console.log("correct");
            $("#correct")[0].play();
            this.correctAnswers++;
            console.log(this.correctAnswers);
            $(".response").html("<hr id='correct'/>Correct!");
            this.questionNumber++;
        }
        else {
            ("#incorrect")[0].play;
            this.incorrectAnswers++;
            console.log(this.incorrectAnswers);
            quizQuestion.counter = quizQuestion.counter - 10;
            $(".response").html("<hr id='incorrect'/>Incorrect!");
            this.questionNumber++;
        }
        this.resultsPage();
    },

    //Turn to results page
    resultsPage: function (){
        setTimeout(function(){
            if (quizQuestion.questionNumber < quizQuestion.questions.length) {
                quizQuestion.getQuestion();
            } else {
                quizQuestion.lastPage();
            }
        }, 1000
        )
    },

    // View the highscore
    viewHighestScores: function () {
        $(".Highscores").html("Highscores: " + highscore);
    },

    lastPage: function () {
        $(".question-display").empty();
        $("#button-display").empty();
        $(".response").empty();
        $(".timer").hide();
        $("last-page").show();
        $("#message").html("<h2>You are done</h2><p>Your results are:</p>");
        $("#score").html("Your final score is: " + quizQuestion.counter);
        //$("#totalcorrect").html("Correct Answers: " + this.correctAnswers);
        //$("#totalincorrect").html("Incorrect Answers: " + this.incorrectAnswers);
        clearInterval(quizQuestion.countDownTimer);
    },

    highscoreReport: function (){
        clearInterval(quizQuestion.countDownTimer);
        $(".highscoreReport").show();
        $("#highscoreArray").show();
        $(".Highscores").hide();
        $(".timer").hide();
        $(".timer").html("Time: 75");
        $(".card").hide();
        $(".last-page").hide();
        $(".question-display").hide();
        $("#button-display").hide();
        console.log("Highscore page completed");

        var boxValue = document.getElementById('user-input').value.toUpperCase().substring(0, 4);
        if (boxValue == false){
            console.log("no value entered for initials: " + boxValue);
            boxValue = "***";
        };
        
        const finalscore = {
            score:quizQuestion.counter,
            initials: boxValue
        }

        console.log(finalscore);
        const HighscoreArray = JSON.parse(localStorage.getItem("highscoreArray")) || [];
        console.log(HighscoreArray);

        HighscoreArray.push(finalscore);
        console.log(highScoreArray);

        highScoreArray.sort((a,b) => b.score - a.score);
        console.log(highScoreArray);

        HighscoreArray.splice(5);

        localStorage.setItem('highscoreArray', JSON.stringify(HighscoreArray));
        console.log(highScoreArray);
        
        const highestscorelist = document.getElementById("#HighscoreArray");
        const Highscores = JSON.parse(localStorage.getItem("highscoreArray")) || [];
            highScoreArray.map(finalscore => {
                if(finalscore.score !=0){
                    console.log(finalscore.initials + " ---- " + finalscore.score);
                    $("#highscoreArray").append('<li>' + finalscore.initials + " ---- " + finalscore.score + '</li>');
                }
            });

    }
}
