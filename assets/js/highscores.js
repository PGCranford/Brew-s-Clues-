const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("High Score")) || [];

highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score is-section m-4">${highScores}</li>`;
}).join("");