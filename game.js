buttonColors = ["red", "green", "yellow", "blue"];

gameOver = true;

function generateSequence(gameLevel, matchSequence) {
    $(".btn").off("click");
    sequenceOfColors = [];
    clickNumber = 0;
    i = 0;
    showSequence = setInterval(() => {
        if (i != gameLevel) {
            randomNumber = Math.floor(Math.random() * 3) + 1;
            $(`#${buttonColors[randomNumber]}`).addClass("pressed-computer");
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
    }, 600);
}

function matchSequence() {
    $(".btn").click(function () {
        btnColor = $(this).attr("id");
        $(this).addClass("pressed-player");
        setTimeout(() => {
            $(this).removeClass("pressed-player");
        }, 200);
        if (sequenceOfColors[clickNumber] == btnColor) {
            clickNumber++;
        } else {
            gameOver = true;
            $("h1").text("Game Over.Press a key to play again.");
        }
        if (clickNumber == sequenceOfColors.length) {
            startGame();
        }
    });
}

function startGame() {
    if (gameOver == true) {
        gameLevel = 1;
        gameOver = false;
    } else {
        gameLevel++;
    }
    $("h1").text(`Level:${gameLevel}`);
    generateSequence(gameLevel, matchSequence);
    // matchSequence();
}

$(document).keypress(() => {
    if (gameOver == true) startGame();
});
