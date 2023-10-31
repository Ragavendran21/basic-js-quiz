const questions = [
    {
        question:"Which is the largest animal in the world?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false}
        ]
    },{
        question:"Which is the smallest country in the world?",
        answers:[
            {text:"Vatican city",correct:true},
            {text:"Bhutan",correct:false},
            {text:"Nepal",correct:false},
            {text:"Sri Lanka",correct:false}
        ]
    },
    {
        question:"Which is the largest desert in the world?",
        answers:[
            {text:"Kalahari",correct:false},
            {text:"Gobi",correct:false},
            {text:"Sahara",correct:false},
            {text:"Antartica",correct:true}
        ]   
    },{
        question:"Which is the smallest continent in the world?",
        answers:[
            {text:"Asia",correct:false},
            {text:"Australia",correct:true},
            {text:"Europe",correct:false},
            {text:"Africa",correct:false}
        ]
    }
];
const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timer_div = document.getElementById('timer-div');
const timer_section = document.getElementById('timer_section')
let count = 15 ;
let currentquestionIndex = 0;
let score = 0;
function startQuiz(){
    
    currentquestionIndex =0;
    score =0;
    nextButton.innerHTML = 'Next';
    showQuestion();
    timer_div.appendChild(timer_section)
    count= 15;
}
function questionTimer(){
    setInterval(function(){
       
        document.getElementById('counter').innerHTML=count;
        count--;
        if (count < 0){
          handleNextButton();
          count = 15;
        }
      }, 1000);
}
function showQuestion(){
    resetState();
   
    let currentQuestion = questions[currentquestionIndex];
    let questionNo = currentquestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
            const btn = document.createElement("button");
            btn.innerHTML = answer.text;
            btn.classList.add('btn');
            answerButton.appendChild(btn);
            if(answer.correct){
                btn.dataset.correct = answer.correct;
            }
            btn.addEventListener("click",selectedAnswer)
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectedAnswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if(isCorrect){
        selectedbtn.classList.add("correct")
        score++;
    }else{
        selectedbtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nextButton.style.display = 'block'
}
function showScore(){
    resetState();
    questionElement.innerHTML =  `You have scored ${score} of ${questions.length}`
    nextButton.innerHTML = 'PLAY AGAIN';
    nextButton.style.display = 'block';
    document.getElementById('timer_section').remove();
}
function handleNextButton(){
    currentquestionIndex++;
    count = 15;
    if(currentquestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",() =>{
    if(currentquestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
        
    }
})
startQuiz();
questionTimer();