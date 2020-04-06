var gamePattern = [];
var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var level=0;
var started=false;

$(document).keypress(
  function ()
  {
    if(!started)
    {
      nextSequence();
      started=true;
    }
  });

function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(name)
{
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");

  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}
$("div.btn").click(function ()
{
  var userChosenColour = $(this).attr("id");//select id from the selected one
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});



// ===========================================================================================================================================

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
    {
        console.log("sucess");
        if(userClickedPattern.length==gamePattern.length)
        {
          setTimeout(nextSequence(), 1000);
        }

    }
    else
    {
      console.log("wrong");
      var audi = new Audio("sounds/wrong.mp3");
      audi.play();
      $("h1").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }

  }
  // =======================================================================================================================================
function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}
