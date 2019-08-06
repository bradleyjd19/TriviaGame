// Hold all script until page loads
$(document).ready(function() {


  // Create global variables
  var correctGuesses = 0;
  var wrongGuesses = 0;
  var timerNum = 20;
  var intervalId;
  var currentQuestion = 0;


  // Question/Answer objects
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
      winImg: "https://media1.giphy.com/media/ODVyKJ8CWhrMs/200w.webp?cid=790b76115d491d8c345a38636b6cce8c&rid=200w.webp",
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


  // Create a start screen, hide elements that aren't used yet
  function startMenu() {
    $("#triviaQuestion").hide();
    $("#answerBlock").hide();
    $("#answerImg").hide();
    $("#resetBlock").hide();    
    startClick();
  }


  // Create a click event to begin the game, hide start screen elements, empty out previously used elements on a reset, begin audio
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


  // Run the start menu and click function
  startMenu();


  // Run the main function of the game
  function playGame() {
    callQuestion(trivQuest[currentQuestion]);
  }
  

  // Dynamically create elements for questions and answers, begin timer, run click event for choosing answer
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


  // Clear elements for next question, reset the timer, check to see if there are more questions (current question has been iterated, compare it to object length), if more - call the next question, if not - display user's score and "play again" button, on click - reset the game to start menu
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
      })
    }
  }


  // Hide elements not needed and show those needed on start screen, reset all user guesses and set current question back to 0, run start function
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


  // Removes and empties elements when needed 
  function clearScreen() {
    $("span").remove();
    $("#startButton").hide();
    $("#triviaQuestion").empty();
    $("#answerBlock").empty();
    $("#answerImg").empty();
    $("#timerBlock").empty();
  }


  // Define initial parameters for timer
  function startTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  }
  

  // Display timer and decrement, if decrements to 0, run timeout function
  function decrement() {
    timerNum--;
    $("#timerBlock").html("Time " + timerNum);
    if (timerNum === 0) {
      timeOut();
    }
  }


  // If timer runs out during question, wrong guesses +1, current question +1, display that time is up, display the correct answer, run next question after defined timeout
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
  

  // Stop the timer
  function stopTimer() {
    clearInterval(intervalId);
  }


  // Reset the timer
  function resetTimer() {
    timerNum = 20;
    startTimer();
  }

  
  // Create click function for selecting answers, based on click run correct or incorrect function, run next question function after defined timeout
  function choiceClick(trivia) {
    $("#answerBlock").unbind("click").on("click", ".choices", function(event) {
      event.stopPropagation();
      stopTimer();
      var rightChoice = trivia.answerArr[trivia.correctAnswer];
      if ($(this).text() !== rightChoice) {
        incorrect(trivia);
      }
      else {
        correct(trivia);
      }      
      setTimeout(nextQuestion, 1000 * 10);
    })
  }

  // Correct function, correct guesses +1, current question +1, display the correct answer and gif associated with correct answer
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


  // Incorrect function, wrong guesses +1, current question +1, display the correct answer and gif associated with wrong answer
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
  

});