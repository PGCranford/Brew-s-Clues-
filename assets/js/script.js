// Open Trivia DB API
const triviaAPI = 'https://opentdb.com/api.php?amount=1&difficulty=easy';

// Get question from API
async function getQuestion() {
    const result = await fetch(triviaAPI);
    const data = await result.json();
    console.log(data);
};

getQuestion();