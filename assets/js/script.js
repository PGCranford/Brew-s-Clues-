const questionEl = document.getElementById('question');
const optionsEl = document.querySelector('.trivia-options');
const confirmAnswerBtn = document.getElementById('confirm-answer');
const playAgainBtn = document.getElementById('play-again');
const resultsEl = document.getElementById('results');
const confirmScoreEl = document.getElementById('confirm-score');
const totalQuestionEl = document.getElementById('total-question');

var nameOne = document.querySelector(".r1Name")
var phoneOne = document.querySelector(".r1Phone")
var addressOne = document.querySelector(".r1Address")
var nameTwo = document.querySelector(".r2Name")
var phoneTwo = document.querySelector(".r2Phone")
var addressTwo = document.querySelector(".r2Address")
var nameThree = document.querySelector(".r3Name")
var phoneThree = document.querySelector(".r3Phone")
var addressThree = document.querySelector(".r3Address")
var brewOne = document.querySelector(".resultOne")
var brewTwo = document.querySelector(".resultTwo")
var brewThree = document.querySelector(".resultThree")



var userError = document.querySelector(".falseCity")


let correctAnswer = "", confirmScore = questionCount = 0, totalQuestion = 10;

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
    console.log(correctAnswer);
}


// Confirm answer
let confirmAnswer = () => {
    confirmAnswerBtn.disabled = true;
    if (optionsEl.querySelector('.selected')) {
        let selectedAnswer = optionsEl.querySelector('.selected span').textContent;

        if (selectedAnswer == HTMLDecode(correctAnswer)) {
            confirmScore++;
            resultsEl.innerHTML = `<p><i class="fas fa-check"></i>Correct Answer!</p>`;
        } else {
            resultsEl.innerHTML = `<p><i class="fas fa-times"></i>Incorrect Answer!</p><b>Correct: Answer: </b>${correctAnswer}`;
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

let checkQuestionCount = () => {
    questionCount++;
    questionLimit();
    if (questionCount == totalQuestion) {
        setTimeout(function () {
            console.log("");
        }, 5000);


        resultsEl.innerHTML += `<p>Your score is ${confirmScore}.</p>`;
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

        // setInterval(function ()p = "")


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
                    brewOne.innerHTML = data[0].name + data[0].phone + data[0].street
                    brewTwo.innerHTML = data[1].name + data[1].phone + data[1].street
                    brewThree.innerHTML = data[2].name + data[2].phone + data[2].street


                }


                // var firstName = data[0].name;
                // var firstPhone = data[0].phone;
                // var firstAddress = data[0].street;

                // nameOne.innerHTML = firstName;
                // phoneOne.innerHTML = firstPhone;
                // addressOne.innerHTML = firstAddress;

                // var secondName = data[1].name;
                // var secondPhone = data[1].phone;
                // var secondAddress = data[1].street;

                // nameTwo.innerHTML = secondName;
                // phoneTwo.innerHTML = secondPhone;
                // addressTwo.innerHTML = secondAddress;

                // var thirdName = data[2].name;
                // var thirdPhone = data[2].phone;
                // var thirdAddress = data[2].street;

                // nameThree.innerHTML = thirdName;
                // phoneThree.innerHTML = thirdPhone;
                // addressThree.innerHTML = thirdAddress;
            })
    }
    // else {
    //     var p = document.createElement("p");
    //     p.textContent = "Please Enter a Valid City";
    //     errorEl.appendChild(p);
    // }



}