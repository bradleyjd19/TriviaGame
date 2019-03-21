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
      question: "What is the lowest seed to reach the Final Four?",
      answerArr: ["6", "8", "11", "13"],
      correctAnswer: 2,
      winImg: "https://media.giphy.com/media/4NpCE946C6MvvWMyD6/giphy.gif",
      loseImg: "https://media.giphy.com/media/ZFKHhEw2oCKhq/giphy.gif",
      factoid: "The #11 seed has reached the Final Four three times; LSU (1986), George Mason (2006), and VCU (2011)."
      },

    trivia2 = {
      question: "Which team won the first NCAA tournament?",
      answerArr: ["North Carolina", "Oregon", "Princeton", "Ohio State"],
      correctAnswer: 1,
      winImg: "https://media.giphy.com/media/1isLj38HKNnlSKC4Ym/giphy.gif",
      loseImg: "https://media.giphy.com/media/AjixnPlG9oqWY/giphy.gif",
      factoid: "Oregon defeated Ohio State 46-33 in the first NCAA tournament title game, held in 1939."
      }

  ];

console.log(trivQuest[0].correctAnswer);
console.log(trivQuest.length);


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

    function nextQuestion() {
      clearScreen();
      resetTimer();
      if (currentQuestion < trivQuest.length) {
        callQuestion(trivQuest[currentQuestion]);
      }
      else {
        stopTimer();
        $("#timerBlock").remove();
        console.log("show the results");
      }
    }

    function clearScreen() {
      $("span").remove();
      $("button").remove();
      $("div").empty();
    }


  
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
      setTimeout(nextQuestion, 1000 * 10);
    })
  }


  function correct(trivia) {
    correctGuesses++;
    currentQuestion++;
    var rightChoice = trivia.answerArr[trivia.correctAnswer];
    $("#triviaQuestion").html("That's correct! " + trivia.factoid);
    $("#answerBlock").html("Correct Answer: " + rightChoice);
    var imgDisplay = $("<img>");
    imgDisplay.attr("src", trivia.winImg);
    $("#answerImg").append(imgDisplay);
  }

  function incorrect(trivia) {
    wrongGuesses++;
    currentQuestion++;
    var rightChoice = trivia.answerArr[trivia.correctAnswer];
    $("#triviaQuestion").html("Nice try! " + trivia.factoid);
    $("#answerBlock").html("Correct Answer: " + rightChoice);
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