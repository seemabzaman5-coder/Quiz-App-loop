//DOM
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-button");
const questionText = document.getElementById("question-text");
const answersContainers = document.getElementById("answers-containers");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Which of the following best describes iteration?",
    answers: [
      {
        text: "It is proess of writing code repeatedly until it works correctly.",
        correct: false,
      },
      {
        text: "Its is process of sending signals between components to establish a connection.",
        correct: false,
      },
      {
        text: "It is process of repeating a set of instructions multiple times.",
        correct: true,
      },
      {
        text: "It is tecnique for storing data in consecutive memory locations.",
        correct: false,
      },
    ],
  },
  {
    question: "What statement can be used to break out of a loop completely?",
    answers: [
      { text: "The continue statement.", correct: false },
      { text: "The break statement.", correct: true },
      { text: "The label statement.", correct: false },
      { text: "The skip statement.", correct: false },
    ],
  },
  {
    question: "Which is the best loop for iterating objects?",
    answers: [
      { text: "for...of loop.", correct: false },
      { text: "for ....in loop.", correct: true },
      { text: "for loop.", correct: false },
      { text: "do .... while loop.", correct: false },
    ],
  },
  {
    question: "for(let i = 2; i < 10; i+=2) {console.log(i)}",
    answers: [
      { text: "10", correct: false },
      { text: "9", correct: false },
      { text: "4", correct: true },
      { text: "5", correct: false },
    ],
  },
  {
    question: "Which of the following best defines an infinite loop?",
    answers: [
      {
        text: "A loop that runs untill the condition becomes false.",
        correct: false,
      },
      {
        text: "A loop whose termination condition is never met or is absent.",
        correct: true,
      },
      {
        text: "A loop that automatically stops after a fixed number of iteration.",
        correct: false,
      },
      { text: "A loop that runs once and then is terminated.", correct: false },
    ],
  },
  {
    question:
      "Which of the following will loop over the values of an iterable objest?",
    answers: [
      { text: "do...while loop.", correct: false },
      { text: "for ... of loop.", correct: true },
      { text: "for ...in loop.", correct: false },
      { text: "for loop.", correct: false },
    ],
  },
  {
    question: "What is the correct order of for loop declaration?",
    answers: [
      {
        text: "for(initialization; increment/decrement; condition){statment}.",
        correct: false,
      },
      {
        text: "for(initialization; condition; increment/decrement){statment}.",
        correct: true,
      },
      {
        text: "for( condition; increment/decrement; initialization;){statment}.",
        correct: false,
      },
      {
        text: "for(increment/decrement; initialization; condition;){statment}.",
        correct: false,
      },
    ],
  },
  {
    question:
      "Which of the following is not a type of loop supported in javaScript?",
    answers: [
      { text: "if .... else loop.", correct: true },
      { text: "while loop.", correct: false },
      { text: "for loop.", correct: false },
      { text: "for ..... in loop.", correct: false },
    ],
  },
  {
    question: "Which of the following is iterable object?",
    answers: [
      { text: "Undefined.", correct: false },
      { text: "Boolean.", correct: false },
      { text: "String.", correct: true },
      { text: "Number.", correct: false },
    ],
  },
  {
    question: "Which technique is used for iteration in programming?",
    answers: [
      { text: "Conditionals.", correct: false },
      { text: "Looping.", correct: true },
      { text: "Recursion.", correct: false },
      { text: "Compilation.", correct: false },
    ],
  },
];
// Quiz State of Var
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//Event listerner
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}
function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;

  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;
  answersContainers.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainers.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainers.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}
function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  console.log(finalScoreSpan);

  const percentage = (score / quizQuestions.length) * 100;
  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Good job! You're a star!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve";
  } else {
    resultMessage.textContent = "keep studing! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
