
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var MAX_LEVEL = 5;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Add touch support for mobile devices
var touchStartTime = 0;
$(document).on("touchstart", function(e) {
  // Prevent multiple rapid touches from triggering multiple starts
  var currentTime = new Date().getTime();
  if (currentTime - touchStartTime < 500) {
    return;
  }
  touchStartTime = currentTime;
  
  // Only start game if it hasn't started and touch is not on a button
  if (!started && !$(e.target).hasClass("btn")) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Only check answer if game has started
  if (started) {
    checkAnswer(userClickedPattern.length-1);
  }
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        // Check if user has completed all 5 levels
        if (level === MAX_LEVEL) {
          setTimeout(function () {
            showCongratsPage();
          }, 1000);
        } else {
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();
    }

}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//1. Create a new function called startOver().
function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}

function showCongratsPage() {
  // Hide game container and show congratulations page
  $("#game-container").hide();
  $("#level-title").hide();
  $("#congrats-container").show();
}
