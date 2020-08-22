var timerEl = document.getElementById('time-left');
var startoBtn = document.getElementById('start-button');
var mainEl = document.getElementById('main');
var timeLeft = 60;
var message= "time is up";
let score = 0;
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement=document.getElementById('question-container')

const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


let shuffledQuestions, currentQuestionIndex
nextButton.addEventListener('click', ()=>{
    currentQuestionIndex++
    setNextQuestion()
})

function startGame(){
    score=0;
startButton.classList.add('hide')
shuffledQuestions = questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
questionContainerElement.classList.remove('hide')
setNextQuestion()
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionElement.innerText =question.question
    question.answers.forEach(answer =>{
        const button =document.createElement('button')
        button.innerText =answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })

}
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button =>{
        setStatusClass(button,button.dataset.correct)
    })
    
    if (shuffledQuestions.length>currentQuestionIndex+1){
        nextButton.classList.remove('hide')
    }else{
        startButton.innerText='Restart'
        startButton.classList.remove('hide')
    }
    if(selectedButton.dataset=correct){
        score++
    }
 
    document.getElementById('right-answers').innerHTML=score+"/"+"4";
    savescore();
    
}
function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')

    }else{
        element.classList.add('wrong')
       
    }
    savescore();
}
function clearStatusClass(element) {

}
const questions =[
    {
        question:'Which one is an insect?',
        answers:[
            {text:'spider', correct: false},
            {text:'pill bug', correct: false},
            {text:'ant', correct: true},
            {text:'centipede', correct: false},
        ]
    },
    {
        question:'what is covid-19?',
        answers:[
            {text:'virus', correct: true},
            {text:'bacteria', correct: false},
            {text:'nano bug', correct: false},
            {text:'political lie', correct: false},
        ]
    },
    {
        question:'Is lucky bamboo a bamboo',
        answers:[
            {text:'true', correct: false},
            {text:'false', correct: true},
        ]
    },
    {
        question:'Which plant lives in water?',
        answers:[
            {text:'cactus', correct: false},
            {text:'rose', correct: false},
            {text:'pine', correct: false},
            {text:'waterlily', correct: true},
        ]
    },
]





function countDown(){
    
    
  
    var timeInterval = setInterval(function(){

        if (timeLeft > 1) {
            timerEl.textContent = timeLeft;
            timeLeft--; 
            
         
        }else if (timeLeft ===1) {
            timerEl.textContent = timeLeft;
            timeLeft--;
           
        }else{
            timerEl.textContent = '';
            clearInterval(timeInterval);
            displayMessage();
           

        }
    }, 1000);
    



}

function displayMessage() {
    mainEl.textContent = message;
};
var savescore=function(){
    localStorage.setItem("score",JSON.stringify(score));
}

     //startoBtn.onclick = countDown;
     startButton.addEventListener('click', startGame)
     startButton.addEventListener('click', countDown)



