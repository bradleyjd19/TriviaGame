// Hold all script until page loads
$(document).ready(function() {


  // Create global variables
  var correctGuesses = 0;
  var wrongGuesses = 0;
  var timerNum = 30;
  var intervalId;
  var currentQuestion = 0;

  var trivQuest = [

    trivia1 = {
      question: "What is the first letter alphabetically?",
      answerArr: ["A", "B", "C", "D"],
      correctAnswer: 0,
      winImg: "https://media.giphy.com/media/tLQfm7dmGqxfa/giphy.gif",
      loseImg: "https://media.giphy.com/media/Ty9Sg8oHghPWg/giphy.gif"
      },

    trivia2 = {
      question: "Which number comes first?",
      answerArr: ["1", "2", "3", "4"],
      correctAnswer: 0,
      winImg: "https://media.giphy.com/media/tLQfm7dmGqxfa/giphy.gif",
      loseImg: "https://media.giphy.com/media/Ty9Sg8oHghPWg/giphy.gif"
      }

  ];

console.log(trivQuest[0].correctAnswer);


  // Create a start screen
  function startMenu() {
    $("div").hide();
    $("#buttonContainer").show();
    startClick();
  }


  function startClick() {
    $("#startButton").on("click", function() {
      $("div").show();
      $("#titleName").hide();
      $("#buttonContainer").hide();
      playGame();
    })
  }


  startMenu();

  function playGame() {
    callQuestion(trivQuest[currentQuestion]);
  }
  

  // Display a question
  // Display 4 answer choices
    function callQuestion(trivia) {
      var triviaQuestion = $("<span>");
      triviaQuestion.addClass("choices");
      triviaQuestion.text(trivia.question);
      $("#triviaQuestion").append(triviaQuestion);
      for (var i = 0; i < trivia.answerArr.length; i++) {  
        var answers = $("<button>");
        answers.addClass("choices");
        answers.text(trivia.answerArr[i]);
        $("#answerBlock").append(answers);
      }
      startTimer();
      choiceClick(trivia);
    }

    function clearScreen() {
      $("span").remove();
      $("button").remove();
      $("div").empty();
      resetTimer();
      // nextQuestion();
    }

    // function nextQuestion() {
    //   var trivia = "trivia" + (currentQuestion + 1);
    //   console.log(trivia);
    //   callQuestion(trivia);
    //   return currentQuestion;
    // }

    // nextQuestion();



  
  // Display a timer
  function startTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  }
  
  function decrement() {
    timerNum--;
    $("#timerBlock").html("Time: " + timerNum);
    if (timerNum === 0) {
      stopTimer();
    }
  }
  
  function stopTimer() {
    clearInterval(intervalId);
  }

  function resetTimer() {
    timerNum = 30;
    startTimer();
  }

  
  // Create a click event
  // Allow only one choice to be made
  function choiceClick(trivia) {
    $("#answerBlock").unbind("click").on("click", ".choices", function(event) {
      event.stopPropagation();
      stopTimer();
      var rightChoice = trivia.answerArr[trivia.correctAnswer];
      if ($(this).text() !== rightChoice) {
        incorrect(trivia);
        console.log("Incorrect");
        console.log(wrongGuesses);
      }
      else {
        correct(trivia);        
        console.log("Correct");
        console.log(correctGuesses);
      }      
      setTimeout(clearScreen, 1000 * 5);
    })
  }


  function correct(trivia) {
    correctGuesses++;    
    var rightChoice = trivia.answerArr[trivia.correctAnswer];
    $("#triviaQuestion").html("That's correct!");
    $("#answerBlock").html(rightChoice);
    var imgDisplay = $("<img>");
    imgDisplay.attr("src", trivia.winImg);
    $("#answerImg").append(imgDisplay);
  }

  function incorrect(trivia) {
    wrongGuesses++;
    var rightChoice = trivia.answerArr[trivia.correctAnswer];
    $("#triviaQuestion").html("Nice try, the correct answer is: ");
    $("#answerBlock").html(rightChoice);
    var imgDisplay = $("<img>");
    imgDisplay.attr("src", trivia.loseImg);
    $("#answerImg").append(imgDisplay);
  }
  


  



  

  // If correct, play winning message/gif/image
  // If incorrect, show correct answer, play losing message/gif/image
  // Increment correct/incorrect
  // Display next question
  // Once all questions have been displayed, show results
  // Display reset button to start game over



})