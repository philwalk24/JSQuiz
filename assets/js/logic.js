var q = 0;
var timer;
var time = questions.length * 15;

// getting each element in the index.html
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('timeleft');
var choices = document.getElementById('choices');
var submit = document.getElementById('submit');
var start= document.getElementById('start-screen');
var initials = document.getElementById('initials');
var feedback = document.getElementById('feedback');
var yes = new Audio('assets/sfx/correct.wav');
var no = new Audio('assets/sfx/incorrect.wav');
function quizStart() {
    // hide the start screen when quiz starts
    var sScreen = document.getElementById('start-screen');
    sScreen.setAttribute('class', 'hide');

    questionsEl.removeAttribute('class');

    // start the timer and show it in the element
    timer = setInterval(clock, 1000);

    timerEl.textContent = time;
    // this launches the first quesiton
    nextQuestion();

}

function nextQuestion(){
    // get current question
    var thisQ = questions[q];

    // show the question title
    var title = document.getElementById('q-title');
    title.textContent = thisQ.title;

    choices.innerHTML = '';
    // loop through each of the possible answers
    // and add them to the page as buttons
    for (var x = 0; x < thisQ.choices.length; x++) {
        // create new button for each choice
        var choice = thisQ.choices[x];
        var choiceNode = document.createElement('button');
        // so we can select this in the quesitonSelect() function
        choiceNode.setAttribute('class', 'choice');

        // set value to the text
        choiceNode.setAttribute('value', choice);
        
        choiceNode.textContent = x + ': ' + choice;
    
        // add each button to the list of options
        choices.appendChild(choiceNode);
      }
}
// this function determines what answer was selected
function questionSelect(event){
    // the event is when the user clicks on the page
    var select = event.target;

    // wont count as an answer if they dont click the button
    if(!select.matches('.choice')) {
        return;
    }
    // user clicks the wrong answer
    if(select.value !== questions[q].answer) {
        // subtract score
        time = time - 15;

        // ends quiz
        if(time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
    no.play();
    // tell them theyre wrong
    feedback.textContent = 'INCORRECT!';
    }else {
        // tell them theyre right
        yes.play();
        feedback.textContent = 'CORRECT!';
    }

    feedback.setAttribute('class', 'feedback');

    // this makes the correct/incorrect show up for only 1/2 second
    setTimeout(function (){
        feedback.setAttribute('class', 'feedback hide');
    }, 1000);

    q++;
    // end quiz if times up or questions are answered
    if(time <= 0 || q === questions.length){
        endQuiz();
        // go to next quesiton
    }else {
        nextQuestion();
    }
    
}

// handles the part after the quiz
function endQuiz(){
    clearInterval(timer);
    // end screen is no longer hidden
    var finalScreen = document.getElementById('the-end');
    finalScreen.removeAttribute('class');
    // get final score
    var scoreFinal = document.getElementById('final-score');

    scoreFinal.textContent = time;
    // hide the quesitons
    questionsEl.setAttribute('class', 'hide');
}
function clock(){
    // timer that goes down 1 second at a time
    time = time - 1;
    timerEl.textContent = time;

    if(time <= 0){
        endQuiz();
    }
}

function highScore() {
    // get players initials
    var name = initials.value.trim();
    // get scores from local storage or create empty array if none exist
    var scores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    // object for handling name and score
    var yourScore = {
        score: time,
        name: name
    };
    // put score into array
    scores.push(yourScore);
    // save score array into local storage
    window.localStorage.setItem('highscores', JSON.stringify(scores));
    // relocate to scores page
    window.location.href = 'highscores.html';
}
// check if the submit button was clicked
function nameEnter(event){
    if(event.key === "Enter"){
        highScore();
    }
}
// event handlers that activate when user clicks certain buttons/choices
submit.onclick = highScore;
start.onclick = quizStart;
choices.onclick = questionSelect;
initials.onkeyup = nameEnter;