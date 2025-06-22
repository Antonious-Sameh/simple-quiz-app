const questions = [
    {
        question : "What is the capital of France?",
        answers: [
            {text: "Paris" , correct:true},
            {text: "London" , correct:false},
            {text: "Rome" , correct:false},
            {text: "Madrid" , correct:false},
        ]
    },
    {
        question : "Which planet is known as the Red Planet?",
        answers: [
            {text: "Venus" , correct:false},
            {text: "Mars" , correct:true},
            {text: "Jupiter" , correct:false},
            {text: "Saturn" , correct:false},
        ]
    },
    {
        question : "What is the largest ocean on Earth?",
        answers: [
            {text: "Atlantic Ocean" , correct:false},
            {text: "Indian Ocean" , correct:false},
            {text: "Arctic Ocean" , correct:false},
            {text: "Pacific Ocean" , correct:true},
        ]
    },
    {
        question : "What is the boiling point of water at sea level?",
        answers: [
            {text: "90°C" , correct:false},
            {text: "100°C" , correct:true},
            {text: "110°C" , correct:false},
            {text: "120°C" , correct:false},
        ]
    },
    {
        question : "Which gas do plants use for photosynthesis?",
        answers: [
            {text: "Oxygen" , correct:false},
            {text: "Carbon Dioxide" , correct:true},
            {text: "Nitrogen" , correct:false},
            {text: "Hydrogen" , correct:false},
        ]
    },
    {
        question : "Which country is famous for sushi?",
        answers: [
            {text: "China" , correct:false},
            {text: "Japan " , correct:true},
            {text: "Thailand" , correct:false},
            {text: "Korea" , correct:false},
        ]
    },
    {
        question : "How many continents are there in the world?",
        answers: [
            {text: "5" , correct:false},
            {text: "6" , correct:false},
            {text: "7" , correct:true},
            {text: "8" , correct:false},
        ]
    },
    {
        question : "Who developed the theory of relativity?",
        answers: [
            {text: "Isaac Newton" , correct:false},
            {text: "Albert Einstein" , correct:true},
            {text: "Galileo Galilei" , correct:false},
            {text: "Nikola Tesla" , correct:false},
        ]
    },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answres_buttons");
const nextButton = document.getElementById("next_btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+currentQuestion.question;

    currentQuestion.answers.forEach(answers =>{
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
    
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",() =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
