function showScores(){
    // get scores from local storage or just return empty array
    var scores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    // sort in descending order
    scores.sort(function(a, b){return b.score-a.score});
    // loop through scores and add them to the <ol>
    for(var x = 0; x < scores.length; x++){
        var listEl = document.createElement('li');
        // display name and score
        listEl.textContent = scores[x].name + ": " +scores[x].score;
        // append scores to the list as children
        var scoreList = document.getElementById('scorez');
        scoreList.appendChild(listEl);
    }
}

function deleteScores(){
    // delete all scores when user hits the delete button
    window.localStorage.removeItem('highscores');
    // reload page afterwards
    window.location.reload;

}
// event listener for a deletion
document.getElementById('clear').onclick = deleteScores;

showScores();