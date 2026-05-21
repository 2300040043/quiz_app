const quizData = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Transfer Main Language", "Hyperlink and Text Management Language"],
        correct: 0
    },
    {
        question: "Which language is primarily used for adding styling to a webpage?",
        options: ["Python", "HTML", "CSS", "SQL"],
        correct: 2
    },
    {
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["variable myNum;", "let myNum;", "v myNum;", "int myNum;"],
        correct: 1
    },
    {
        question: "Which HTML tag is used to link an external JavaScript file?",
        options: ["<script>", "<javascript>", "<js>", "<link>"],
        correct: 0
    },
    {
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
        correct: 2
    },
    {
        question: "Which Python data type is mutable?",
        options: ["List", "Tuple", "String", "Integer"],
        correct: 0
    },
    {
        question: "How do you start a standard 'for' loop in Python?",
        options: ["for i in range(x):", "for(i=0; i<x; i++)", "for i to x:", "each i in x:"],
        correct: 0
    },
    {
        question: "Which of the following is NOT a backend framework?",
        options: ["Flask", "Django", "Angular", "FastAPI"],
        correct: 2
    },
    {
        question: "What is the correct syntax to output text in Python?",
        options: ["console.log('Hello')", "print('Hello')", "echo 'Hello'", "System.out.println('Hello')"],
        correct: 1
    },
    {
        question: "Which HTML element is used to define the most important heading?",
        options: ["<head>", "<heading>", "<h6_important>", "<h1>"],
        correct: 3
    },
    {
        question: "What does SQL stand for?",
        options: ["Structured Query Language", "Strong Question Language", "Structured Question Layout", "Sequential Query Language"],
        correct: 0
    },
    {
        question: "Which array method removes the last element from an array in JavaScript?",
        options: ["shift()", "pop()", "push()", "splice()"],
        correct: 1
    },
    {
        question: "In Python, what keyword is used to define a function?",
        options: ["function", "def", "func", "define"],
        correct: 1
    },
    {
        question: "Which symbol is used for comments in CSS?",
        options: ["// comment", "# comment", "/* comment */", "<!-- comment -->"],
        correct: 2
    },
    {
        question: "Which data structure stores data in key-value pairs in Python?",
        options: ["List", "Set", "Tuple", "Dictionary"],
        correct: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = null;

// Global Quiz Timer Setup (60 seconds for the entire quiz)
let timerInterval = null;
let timeLeft = 90; 

const questionEl = document.getElementById('question');
const optionButtons = document.querySelectorAll('.option-btn');
const progressEl = document.getElementById('progress');
const nextButton = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz');
const timeCounterEl = document.getElementById('time-counter');

// Starts a single global countdown loop when the quiz boots up
function startGlobalTimer() {
    timeCounterEl.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timeCounterEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz("Time's Up! ⏰");
        }
    }, 1000);
}

function loadQuestion() {
    selectedOptionIndex = null;
    nextButton.disabled = true;
    
    const currentQuizItem = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuizItem.question;
    progressEl.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    
    optionButtons.forEach((button, index) => {
        button.textContent = currentQuizItem.options[index];
        button.classList.remove('selected');
    });
}

function selectAnswer(index) {
    selectedOptionIndex = index;
    optionButtons.forEach((button, idx) => {
        button.classList.toggle('selected', idx === index);
    });
    nextButton.disabled = false;
}

function loadNextQuestion() {
    if (selectedOptionIndex === quizData[currentQuestionIndex].correct) {
        score++;
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        clearInterval(timerInterval); // Stop the clock if they finish early
        endQuiz("Quiz Finished! 🎉");
    }
}

// Reusable screen rendering function for when the quiz ends
function endQuiz(titleText) {
    quizContainer.innerHTML = `
        <div style="text-align:center;">
            <h3 style="font-size: 1.6rem; margin-bottom: 15px;">${titleText}</h3>
            <p style="margin-bottom: 20px; color: #334155;">You answered <strong>${score}</strong> out of ${quizData.length} correctly.</p>
            <button onclick="location.reload()" style="background:#0284c7; color:white; border:none; padding:10px 20px; border-radius:6px; cursor:pointer; font-weight:600;">Restart Quiz</button>
        </div>`;
}

// Initial initialization statement execution context
startGlobalTimer();
loadQuestion();