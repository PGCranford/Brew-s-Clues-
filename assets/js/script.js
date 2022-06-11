// Variables
const questionEl = document.getElementById('question');
const optionsEl = document.querySelector('.trivia-options');
const triviaScoreEl = document.getElementById('trivia-score');
const totalQuestionEl = document.getElementById('total-question');

let correctAnswer = "", triviaScore = askedCount = 0, totalQuestion = 10;

// Open Trivia DB API
const triviaAPI = 'https://opentdb.com/api.php?amount=1&difficulty=easy';

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
};
getQuestion();