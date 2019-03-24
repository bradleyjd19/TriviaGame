// Hold all script until page loads
$(document).ready(function() {


  // Create global variables
  var correctGuesses = 0;
  var wrongGuesses = 0;
  var timerNum = 20;
  var intervalId;
  var currentQuestion = 0;

  var trivQuest = [

    trivia1 = {
      question: "What is the lowest seed to reach the Final Four?",
      answerArr: ["6 Seed", "8 Seed", "11 Seed", "13 Seed"],
      correctAnswer: 2,
      winImg: "https://media.giphy.com/media/4NpCE946C6MvvWMyD6/giphy.gif",
      loseImg: "https://media.giphy.com/media/ZFKHhEw2oCKhq/giphy.gif",
      factoid: "The 11 seed has reached the Final Four four times, most recently Loyola-Chicago in 2018."
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
      winImg: "http://assets.sbnation.com/assets/2364493/lolathoyas.gif",
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
    },

    trivia6 = {
      question: "Which conference has the most titles all-time?",
      answerArr: ["ACC", "BIG 12", "PAC 12", "SEC"],
      correctAnswer: 2,
      winImg: "https://media.giphy.com/media/1gUovfcKYOr4QCCPS8/giphy.gif",
      loseImg: "http://www.slate.com/content/dam/slate/articles/sports/sports_nut/2015/04/Kentucky-Notre.gif",
      factoid: "With 15 titles, the PAC 12 has one more than the ACC."
    },

    trivia7 = {
      question: "What are the odds of filling out a perfect bracket?",
      answerArr: ["1 in 9 million", "1 in 9 billion", "1 in 9 trillion", "1 in 9 quintillion"],
      correctAnswer: 3,
      winImg: "https://media0.giphy.com/media/PS12LxWj5nDd6/giphy.gif",
      loseImg: "https://media.giphy.com/media/yZS5YT7zuMffKoiTHos/giphy.gif",
      factoid: "You have better odds to hit a hole-in-one and win the lottery in the same day."
    },

    trivia8 = {
      question: "Which city has hosted the most Final Fours?",
      answerArr: ["Kansas City", "Indianapolis", "Atlanta", "Chicago"],
      correctAnswer: 0,
      winImg: "https://media.giphy.com/media/l0Ex4QcCSbOi8UAow/giphy.gif",
      loseImg: "https://media.giphy.com/media/12uLAQEd26iNuE/giphy.gif",
      factoid: "Kansas City has hosted 10 Final Fours, the most recent in 1988."
    },

    trivia9 = {
      question: "Which team made their very first NCAA tournament appearance in 2017?",
      answerArr: ["Nevada", "UC Santa Cruz", "Vermont", "Northwestern"],
      correctAnswer: 3,
      winImg: "https://media.giphy.com/media/l0Iy59GA3gtCEgBkk/giphy.gif",
      loseImg: "https://media.giphy.com/media/l4pTfSeH65zpQW7yo/giphy.gif",
      factoid: "Northwestern had not made the tournament since its inception in 1939."
    },

    trivia10 = {
      question: "Of the top 8 seeds, which one has never won an NCAA title?",
      answerArr: ["5 Seed", "6 Seed", "7 Seed", "8 Seed"],
      correctAnswer: 0,
      winImg: "https://media.giphy.com/media/3o84UgM3fK1uqI26mA/giphy.gif",
      loseImg: "https://media.giphy.com/media/63LR25l9lvEUa5FhFI/giphy.gif",
      factoid: "With the exception of the 5, each of the top 8 seeds have produced an eventual winner."
    }

  ];


  // Create a start screen
  function startMenu() {
    $("#triviaQuestion").hide();
    $("#answerBlock").hide();
    $("#answerImg").hide();
    $("#resetBlock").hide();    
    startClick();
  }


  function startClick() {
    $("#startButton").on("click", function() {
      $("div").show();
      $("#header-container").hide();
      $("#titleName").hide();
      $("#buttonContainer").hide();
      $("#answerBlock").empty();
      $("#timerBlock").empty();
      $("#triviaQuestion").empty();
      var bgAudio = document.getElementById("bgAudio");
      bgAudio.play();
      bgAudio.volume = 0.1;
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
        clearScreen();
        $("#timerBlock").html("You got " + correctGuesses + " out of " + trivQuest.length + "!");
        var resetButton = $("<button>");
        resetButton.text("Play Again!");
        resetButton.attr("id", "resetButton");
        $("#resetBlock").append(resetButton);
        $("#resetButton").on("click", function() {
          resetGame();
          console.log(this);
        })
      }
    }

    function resetGame() {
      $("#timerBlock").hide();
      $("#resetButton").remove();
      $("#header-container").show();
      $("#titleName").show();
      $("#buttonContainer").show();
      $("#startButton").show();
      correctGuesses = 0;
      wrongGuesses = 0;
      currentQuestion = 0;
      startMenu();
    }

    function clearScreen() {
      $("span").remove();
      $("#startButton").hide();
      $("#triviaQuestion").empty();
      $("#answerBlock").empty();
      $("#answerImg").empty();
      $("#timerBlock").empty();
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
      timeOut();
    }
  }

  function timeOut () {
    var answer = trivQuest[currentQuestion].answerArr[trivQuest[currentQuestion].correctAnswer];
    stopTimer();
    clearScreen();
    $("#answerBlock").html("Time has run out!");
    $("#timerBlock").html("The correct answer is " + answer);
    wrongGuesses++;
    currentQuestion++;
    setTimeout(nextQuestion, 1000 * 5)
  }
  
  function stopTimer() {
    clearInterval(intervalId);
  }

  function resetTimer() {
    timerNum = 20;
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