buttonColors = ["red", "green", "yellow", "blue"];

gameOver = true;

function generateSequence(gameLevel, matchSequence) {
    $(".restart").hide();
    $(".btn").off("click");
    sequenceOfColors = [];
    clickNumber = 0;
    i = 0;
    showSequence = setInterval(() => {
        if (i != gameLevel) {
            randomNumber = Math.floor(Math.random() * 3) + 1;
            $(`#${buttonColors[randomNumber]}`).addClass("pressed-computer");
            colorSound = new Audio(`sounds/${buttonColors[randomNumber]}.mp3`);
            colorSound.play();
            setTimeout(() => {
                $(`#${buttonColors[randomNumber]}`).removeClass(
                    "pressed-computer"
                );
            }, 400);
            sequenceOfColors.push(buttonColors[randomNumber]);
        } else {
            clearInterval(showSequence);
            matchSequence();
        }
        i++;
    }, 800);
}

function matchSequence() {
    $(".btn").click(function () {
        btnColor = $(this).attr("id");
        $(this).addClass("pressed-player");
        if (gameOver == true) {
            colorSound = new Audio(`sounds/wrong.mp3`);
            colorSound.play();
        } else {
            colorSound = new Audio(`sounds/${btnColor}.mp3`);
            colorSound.play();
        }
        setTimeout(() => {
            $(this).removeClass("pressed-player");
        }, 200);
        if (sequenceOfColors[clickNumber] == btnColor && gameOver == false) {
            clickNumber++;
        } else {
            gameOver = true;
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 200);
            $("h1").text(`Game Over. Your Score:${gameLevel}`);
            $(".restart").show();
        }
        if (clickNumber == sequenceOfColors.length) {
            $("h1").text("Correct");
            $(".btn").off("click");
            setTimeout(() => {
                startGame();
            }, 1000);
        }
    });
}

function startGame() {
    if (gameOver == true) {
        gameLevel = 1;
        gameOver = false;
        $(".restart").show();
    } else {
        gameLevel++;
    }
    $("h1").text(`Level:${gameLevel}`);
    generateSequence(gameLevel, matchSequence);
}

function addSound() {}

$(document).keypress(() => {
    if (gameOver == true) startGame();
});
$(".restart").on("click", () => {
    if (gameOver == true) startGame();
});
