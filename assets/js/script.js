const questionEl = document.getElementById('question');
const optionsEl = document.querySelector('.trivia-options');
const triviaCategoryEl = document.querySelector(".trivia-category");
const confirmAnswerBtn = document.getElementById('confirm-answer');
const playAgainBtn = document.getElementById('play-again');
const resultsEl = document.getElementById('results');
const confirmScoreEl = document.getElementById('confirm-score');
const totalQuestionEl = document.getElementById('total-question');

let correctAnswer = "", confirmScore = questionCount = 0, totalQuestion = 5;

// Open Trivia DB API
const triviaAPI = 'https://opentdb.com/api.php?amount=1&difficulty=easy';


// Get question from API
async function getQuestion() {
  const result = await fetch(triviaAPI);
  const data = await result.json();
  resultsEl.innerHTML = '';
  displayQuestion(data.results[0]);
};


// Event listeners
let eventListeners = () => {
  confirmAnswerBtn.addEventListener('click', confirmAnswer);
  playAgainBtn.addEventListener('click', playAgain);
}

document.addEventListener('DOMContentLoaded', () => {
  getQuestion();
  eventListeners();
  totalQuestionEl.textContent = totalQuestion;
  confirmScoreEl.textContent = confirmScore;
});

// Display question and answer options
let displayQuestion = (data) => {
  confirmAnswerBtn.disabled = false;
  correctAnswer = data.correct_answer;
  let incorrectAnswer = data.incorrect_answers;
  let answerOptions = incorrectAnswer;
  answerOptions.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);

  triviaCategoryEl.innerHTML = `<span class="category is-size-6 is-italic has-text-weight-medium m-4">${data.category}</span>`;
  questionEl.innerHTML = `<span class="has-text-weight-semi-bold is-size-3 m-4 has-text-centered">${data.question}</span>`;
  optionsEl.innerHTML = `${answerOptions.map((option, index) => `<li class="m-2 button is-link is-outlined is-active is-responsive is-rounded"> ${index + 1}. <span>${option}</span> </li>`).join('')}`;

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
  console.log(correctAnswer);
}


// Confirm answer
let confirmAnswer = () => {
  confirmAnswerBtn.disabled = true;
  if (optionsEl.querySelector('.selected')) {
    let selectedAnswer = optionsEl.querySelector('.selected span').textContent;

    if (selectedAnswer == HTMLDecode(correctAnswer)) {
      confirmScore++;
      resultsEl.innerHTML = `<p class="columns is-centered is-size-4 has-text-success has-text-weight-bold"><i class="fas fa-check"></i>Correct Answer!</p>`;
    } else {
      resultsEl.innerHTML = `<p class="columns is-centered has-text-danger-dark has-text-weight-bold"><i class="fas fa-times"></i>Incorrect Answer!</p><b class="columns is-centered">Correct: Answer: ${correctAnswer}`;
    }
    checkQuestionCount();
  } else {
    resultsEl.innerHTML = `<p><i class="fas fa-question"><i/>Please select an option!</p>`;
    confirmAnswerBtn.disabled = false;
  }
};

// to convert html entities into normal text of correct answer if there is any
let HTMLDecode = (textString) => {
  let doc = new DOMParser().parseFromString(textString, "text/html");
  return doc.documentElement.textContent;
}

// Store and retrieve data from localStorage
function storeScore(obj) {
  let getConfirmScore = JSON.parse(localStorage.getItem("High Score")) || [];

  getConfirmScore.push(obj);
  localStorage.setItem("High Score", JSON.stringify(getConfirmScore));
}

let checkQuestionCount = () => {
  questionCount++;
  questionLimit();
  if (questionCount == totalQuestion) {
    setTimeout(function () {
      console.log("");
    }, 5000);


    resultsEl.innerHTML += `<p class="is-centered columns">Your score is ${confirmScore}!</p>`;
    playAgainBtn.style.display = "block";
    confirmAnswerBtn.style.display = "none";
  } else {
    setTimeout(function () {
      getQuestion();
    }, 1000);
  }
}

let questionLimit = () => {
  totalQuestionEl.textContent = totalQuestion;
  confirmScoreEl.textContent = confirmScore;
}

let playAgain = () => {
  confirmScore = questionCount = 0;
  playAgainBtn.style.display = "none";
  confirmAnswerBtn.style.display = "block";
  confirmAnswerBtn.disabled = false;
  questionLimit();
  getQuestion();
}

// Brewery Api Code
var brewOne = document.querySelector(".resultOne");
var brewTwo = document.querySelector(".resultTwo");
var brewThree = document.querySelector(".resultThree");

var userError = document.querySelector(".falseCity");

var cityEl = document.querySelector("#addressInput");
var errorEl = document.querySelector(".warning");


// working function 
function getApi() {
  let city = cityEl.value

  if (city === "" || undefined) {

    userError.textContent = "Please Enter a Valid City";
    setTimeout(() => {
      userError.textContent = "";
    }, "3000")
  }

  else {

    let requestURL = ('https://api.openbrewerydb.org/breweries?by_city=' + city + '&per_page=3')

    fetch(requestURL)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        console.log(data)

        for (let i = 0; i < data.length; i++) {
          brewOne.innerHTML = data[0].name + "<br/>" + data[0].phone + "<br/>" + data[0].street
          brewTwo.innerHTML = data[1].name + "<br/>" + data[1].phone + "<br/>" + data[1].street
          brewThree.innerHTML = data[2].name + "<br/>" + data[2].phone + "<br/>" + data[2].street


        }
      })
  }
}