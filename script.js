document.addEventListener("DOMContentLoaded", function () {
    const brandImage = document.getElementById("brand-image");
    const brandHint = document.getElementById("brand-hint");
    const answerInput = document.getElementById("answer-input");
    const submitButton = document.getElementById("submit-answer");
    const resultText = document.getElementById("result");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const progressBar = document.getElementById("progress-bar");
    const restartButton = document.getElementById("restart-game");
    let score = 0;
    let timeLeft = 30;
    let timerInterval;

    const questionDataBase = [
        { image: "brand1.png", hint: "Popular fast food chain", answer: "McDonald's" },
        { image: "brand2.png", hint: "Tech giant known for iPhones", answer: "Apple" },
        { image: "brand3.png", hint: "E-commerce giant", answer: "Amazon" },
        { image: "brand4.png", hint: "Luxury car brand", answer: "Mercedes" },
        { image: "brand5.png", hint: "Social media platform", answer: "Facebook" }
    ];

    let currentQuestion;

    function getRandomQuestion() {
        return questionDataBase[Math.floor(Math.random() * questionDataBase.length)];
    }

    function loadNewQuestion() {
        currentQuestion = getRandomQuestion();
        brandImage.src = currentQuestion.image;
        brandHint.textContent = currentQuestion.hint;
        answerInput.value = "";
        resultText.textContent = "";
        startTimer();
    }

    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = 30;
        timerDisplay.textContent = `${timeLeft}s`;
        progressBar.style.width = "100%";

        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `${timeLeft}s`;
            progressBar.style.width = `${(timeLeft / 30) * 100}%`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                resultText.textContent = "Time's up! The correct answer was " + currentQuestion.answer;
                submitButton.disabled = true;
            }
        }, 1000);
    }

    submitButton.addEventListener("click", function () {
        const userAnswer = answerInput.value.trim().toLowerCase();
        if (userAnswer === currentQuestion.answer.toLowerCase()) {
            score++;
            resultText.textContent = "Correct!";
        } else {
            resultText.textContent = "Wrong! The correct answer was " + currentQuestion.answer;
        }
        scoreDisplay.textContent = `Score: ${score}`;
        clearInterval(timerInterval);
        setTimeout(loadNewQuestion, 2000);
    });

    restartButton.addEventListener("click", function () {
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        loadNewQuestion();
        submitButton.disabled = false;
    });

    loadNewQuestion();
});
