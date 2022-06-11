// Variables
const questionEl = document.getElementById('question');
const optionsEl = document.querySelector('.trivia-options');
const triviaScoreEl = document.getElementById('trivia-score');
const totalQuestionEl = document.getElementById('total-question');
const confirmAnswerBtn = document.getElementById('confirm-answer');
const playAgainBtn = document.getElementById('play-again');
const correctAnswerEl = document.getElementById('correct-answer');

let correctAnswer = "", triviaScore = askedCount = 0, totalQuestion = 10;

// Open Trivia DB API
const triviaAPI = 'https://opentdb.com/api.php?amount=1&difficulty=easy';

// Event listeners
let eventListeners = () => {
    confirmAnswerBtn.addEventListener('click', confirmAnswer);
    playAgainBtn.addEventListener('click', playAgain);
}

document.addEventListener('click', () => {
    getQuestion();
    totalQuestionEl.textContent = totalQuestion;
    correctAnswerEl.textContent = triviaScore;
});

// Get question from API
async function getQuestion() {
    const result = await fetch(triviaAPI);
    const data = await result.json();
    displayQuestion(data.results[0]);
};

// Display question and answer options
let displayQuestion = (data) => {
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let answerOptions = incorrectAnswer;
    answerOptions.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);

    questionEl.innerHTML = `${data.question} <br> <span class="category">${data.category} </span>`;
    optionsEl.innerHTML = `
        ${answerOptions.map((option, index) => `
            <li> ${index + 1}. <span>${option}</span> </li>
        `).join('')}
    `;

    chooseAnswer();
};

// options selection
let chooseAnswer = () => {
    optionsEl.querySelectorAll('li').forEach(function (option) {
        option.addEventListener('click', function () {
            if (optionsEl.querySelector('.selected')) {
                const activeOption = optionsEl.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

// Confirm answer
let confirmAnswer = () => {
    confirmAnswerBtn.disabled = true;
    if (optionsEl.querySelector('.selected')) {
        let selectedAnswer = optionsEl.querySelector('.selected span').textContent;
        console.log(selectedAnswer);
    };
};