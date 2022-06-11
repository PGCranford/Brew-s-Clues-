// Variables
const questionEl = document.getElementById('question');
const optionsEl = document.querySelector('.trivia-options');

// Open Trivia DB API
const triviaAPI = 'https://opentdb.com/api.php?amount=1&difficulty=easy';

// Get question from API
async function getQuestion() {
    const result = await fetch(triviaAPI);
    const data = await result.json();
    displayQuestion(data.results[0]);
};

let displayQuestion = (data) => {
    let correctAnswer = data.correct_answer;
    console.log(correctAnswer);
}
getQuestion();