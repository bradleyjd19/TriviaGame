// Hold all script until page loads
$(document).ready(function() {


  // Create global variables
  var correctGuesses = 0;
  var wrongGuesses = 0;

  
  var trivia1 = {
    question: "What is the first letter alphabetically?",
    answerArr: ["A", "B", "C", "D"]
    }

  var trivia2 = {
    question: "Which number comes first?",
    answerArr: ["1", "2", "3", "4"]
    }


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
    })
  }


  startMenu();



  function gameStart() {


  }

  // Display a question
    function callQuestion(trivia) {      
      var triviaQuestion = $("<span>");
      triviaQuestion.text(trivia.question);
      $("#triviaQuestion").append(triviaQuestion);
      for (var i = 0; i < trivia.answerArr.length; i++) {
        var answers = $("<ol>");
        answers.text(trivia.answerArr[i]);
        $("#answerBlock").append(answers);
      }
    }
    

    callQuestion(trivia1);



  // Display 4 answer choices
  // Display a timer
  // Allow only one choice to be made
  // If correct, play winning message/gif/image
  // If incorrect, show correct answer, play losing message/  gif/image
  // Increment correct/incorrect
  // Display next question
  // Once all questions have been displayed, show results
  // Display reset button to start game over



})