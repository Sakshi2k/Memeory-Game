$("h1").click( () => {alert("Press \"Enter\" Key to start the game .");})

const tiles = ["red", "blue", "green", "yellow"];
var gamePattern = [];
userClickedPattern = [];
var started = false;
var level = 0;

    
$(document).on("keypress", function (event) {
        if(!started){
        // $("h1").after("Press enter for next level.").css("color","white");
        userClickedPattern = [];
        if(event.key == "Enter") {
            nextSequence();
            started = true;
        }
    }
    })


$(".image").click(function() {
    userChoosenColour = $(this).attr("id");
    userClickedPattern.push(userChoosenColour);
    console.log(userClickedPattern);
    playSound($(this).attr("id"));
    animatePress(userChoosenColour);
})

function nextSequence(){
    level +=1;
    $("h1").html("LEVEL "+level);
    
    var randomNum = Math.floor(Math.random()*4);
    var randomColour = tiles[randomNum];
    gamePattern.push(randomColour);
    console.log("Pattern : "+gamePattern);
    $("#" + randomColour).fadeOut(100).fadeIn(100);
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