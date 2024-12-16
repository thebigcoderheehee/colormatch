const Colors = {
    Red: "#FF0000",
    Blue: "#0000FF",
    Green: "#008000",
    Yellow: "#FFFF00",
    Orange: "#FFA500",
    Purple: "#800080",
    Pink: "#FFC0CB",
    Brown: "#A52A2A"
};

const ColorDisplay = document.getElementById("color-display");
const ButtonContainer = document.querySelector(".buttons");
const ScoreDisplay = document.getElementById("score");
const TimeLeftDisplay = document.getElementById("time-left");
const GameOver = document.getElementById("game-over");
const RestartButton = document.getElementById("restart-btn");
const EndSound = document.getElementById("end-sound")

let Score = 0;
let TimeLeft = 30;
let Timer;

function GenerateGame() {
    ButtonContainer.innerHTML = ""; // Clear previous buttons
    const correctColor = Object.keys(Colors)[Math.floor(Math.random() * Object.keys(Colors).length)];
    ColorDisplay.textContent = correctColor.toUpperCase();

    const shuffledColors = ShuffleArray(Object.keys(Colors));
    shuffledColors.forEach(color => {
        const button = document.createElement("button");
        button.classList.add("color-button");
        button.style.backgroundColor = Colors[color];
        button.onclick = () => CheckAnswer(color, correctColor);
        ButtonContainer.appendChild(button);
    });
}

function ShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function CheckAnswer(SelectedColor, CorrectColor) {
    if (SelectedColor === CorrectColor) {
        Score++;
    } else {
        Score = Math.max(0, Score - 1);
    }
    ScoreDisplay.textContent = `Your Score Is: ${Score}`;
    GenerateGame();
}

function StartTimer() {
    Timer = setInterval(() => {
        TimeLeft--;
        TimeLeftDisplay.textContent = `${TimeLeft} Seconds`;
        if (TimeLeft <= 0) {
            clearInterval(Timer);
            EndGame();
        }
    }, 1000);
}

function EndGame() {
    GameOver.style.display = "block";
    ButtonContainer.innerHTML = "";
    ColorDisplay.textContent = "Game Over!!!";
    RestartButton.style.display = "inline-block";
    EndSound.play()
}

function ResetGame() {
    Score = 0;
    TimeLeft = 30;
    ScoreDisplay.textContent = `Your Score Is: ${Score}`;
    // TimeLeftDisplay.textContent = `${TimeLeft} Seconds`;
    GameOver.style.display = "none";
    RestartButton.style.display = "none";
    GenerateGame();
    StartTimer();
}

function InitiateGame() {
    Score = 0;
    TimeLeft = 30;
    ScoreDisplay.textContent = `Your Score Is: ${Score}`;
    TimeLeftDisplay.textContent = `${TimeLeft} Seconds`;
    GameOver.style.display = "none";
    RestartButton.style.display = "none";
    GenerateGame();
    StartTimer();
}

InitiateGame();