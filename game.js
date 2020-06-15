$("h1").click( () => {alert("Press \"Enter\" Key to start the game .");})

const tiles = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var count = 0;              // counter for number of inputs per level.
var success = true;
    
$(document).on("keypress", function (event) {
    $(".sub-heading").html("Press enter for next level.");
        if(event.key === "Enter") {
            nextSequence();
            started = true;
        }
})

$(".image").click(function() {
    userChoosenColour = $(this).attr("id");
    userClickedPattern.push(userChoosenColour);
    console.log("User Pattern :" + userClickedPattern);
    playSound($(this).attr("id"));
    animatePress(userChoosenColour);
    count+=1;
    if(count === level)
        checkAnswer();
})

function nextSequence(){
    userClickedPattern = [];
    level +=1;
    // console.log(level);
    $("h1").html("LEVEL "+level);
    var randomNum = Math.floor(Math.random()*4);
    var randomColour = tiles[randomNum];
    gamePattern.push(randomColour);
    console.log("Game Pattern : " + gamePattern);
    animatePress(randomColour);
    playSound(randomColour);
}

function playSound(colour){
    var audio = new Audio("./sounds/"+colour+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer() {
    count = 0;
    currentLevel = level;
    for(i=0; i<level; i++) {
        if (gamePattern[i] === userClickedPattern[i]) {
            continue;
        }
        else {
            success = false;
            // console.log("WRONG");
            gameOver();
            break;
        } 
    }
    if(success === true)
    setTimeout( function(){
        // console.log("SUCCESS");
        nextSequence(),4000
    });
    count = 0;
}

function gameOver(){
    $("h1").text("Game Over ..!");
    level=0;
    playSound("wrong");
    $(".sub-heading").html("Press enter to restart");
    started=false;
    success = false;
    gamePattern = [];
    userClickedPattern = [];
    
    $(".image").click(function() {
        playSound("wrong");
    });
}