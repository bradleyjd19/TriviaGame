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
      factoid: "The 11 seed has reached the Final Four three times, LSU in 1986, George Mason in 2006, and VCU in 2011."
    },

    trivia2 = {
      question: "Which school won the first NCAA tournament?",
      answerArr: ["North Carolina", "Oregon", "Princeton", "Ohio State"],
      correctAnswer: 1,
      winImg: "https://prohoopshistory.files.wordpress.com/2014/10/bob-davies-swinging-layup.gif",
      loseImg: "https://media.giphy.com/media/AjixnPlG9oqWY/giphy.gif",
      factoid: "Oregon defeated Ohio State 46-33 in the first NCAA tournament title game, held in 1939."
    },

    trivia3 = {
      question: "Which school has participated in the most NCAA tournaments?",
      answerArr: ["Kentucky", "North Carolina", "UCLA", "Kansas"],
      correctAnswer: 0,
      winImg: "https://media.giphy.com/media/1lBHM3zkIFTKSdHCHR/giphy.gif",
      loseImg: "https://media.giphy.com/media/vkrg8cmXK2QWQ/giphy.gif",
      factoid: "Kentucky has the most appearances with 58."
    },

    trivia4 = {
      question: "In 2013, which school became the only 15 seed to advance to the Sweet Sixteen?",
      answerArr: ["Norfolk State", "Middle Tenn State", "Lehigh", "Florida Gulf Coast"],
      correctAnswer: 3,
      winImg: "http://assets.sbnation.com/assets/2364375/FGCU_medium.gif",
      loseImg: "https://cdn-images-1.medium.com/max/1600/1*Gi5ch8v66o_0D792Gyl4yA.gif",
      factoid: "Florida Gulf Coast defeated Georgetown and San Diego State before losing to Florida."
    },

    trivia5 = {
      question: "In what year did the NCAA tournament expand from 64 to 68 teams?",
      answerArr: ["2010", "2011", "2012", "2013"],
      correctAnswer: 1,
      winImg: "https://nesncom.files.wordpress.com/2014/03/mercer-dance.gif?w=400&h=225&zoom=2",
      loseImg: "https://media.giphy.com/media/GpVCw4GOJuuL6/giphy.gif",
      factoid: "The NCAA Selection Committee introduced the Last Four in 2011."
    }

  ];

console.log(trivQuest[0].correctAnswer);
console.log(trivQuest.length);


  // Create a start screen
  function startMenu() {
    $("#triviaQuestion").hide();
    $("#answerBlock").hide();
    $("#answerImg").hide();
    var bgAudio = document.getElementById("bgAudio");
    bgAudio.play();
    bgAudio.volume = 0.1;
    startClick();
  }


  function startClick() {
    $("#startButton").on("click", function() {
      $("div").show();
      $("#header-container").remove();
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
      triviaQuestion.addClass("question");
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
      $("#triviaQuestion").empty();
      $("#answerBlock").empty();
      $("#answerImg").empty();
    }

  
  // Display a timer
  function startTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  }
  
  function decrement() {
    timerNum--;
    $("#timerBlock").html("Time " + timerNum);
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
    var funFact = trivia.factoid;
    $("#triviaQuestion").html("That is correct! " + funFact);
    $("#answerBlock").html("Correct Answer &nbsp&nbsp&nbsp&nbsp" + rightChoice);
    var imgDisplay = $("<img>");
    imgDisplay.attr("src", trivia.winImg);
    $("#answerImg").append(imgDisplay);
  }

  function incorrect(trivia) {
    wrongGuesses++;
    currentQuestion++;
    var rightChoice = trivia.answerArr[trivia.correctAnswer];
    var funFact = trivia.factoid;
    $("#triviaQuestion").html("Nice try! " + funFact);
    $("#answerBlock").html("Correct Answer &nbsp&nbsp&nbsp&nbsp" + rightChoice);
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