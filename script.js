// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
const themeToggle = document.getElementById("theme-toggle");

// Anime quiz questions
const quizQuestions = [
  {
    question: "Who is the main protagonist in 'Naruto'?",
    answers: [
      { text: "Sasuke Uchiha", correct: false },
      { text: "Naruto Uzumaki", correct: true },
      { text: "Kakashi Hatake", correct: false },
      { text: "Itachi Uchiha", correct: false },
    ],
  },
  {
    question:
      "In 'Death Note', what is the name of the Shinigami who drops the notebook?",
    answers: [
      { text: "Rem", correct: false },
      { text: "Ryuk", correct: true },
      { text: "Light", correct: false },
      { text: "Misa", correct: false },
    ],
  },
  {
    question: "Which anime features a character named Monkey D. Luffy?",
    answers: [
      { text: "One Piece", correct: true },
      { text: "Bleach", correct: false },
      { text: "Fairy Tail", correct: false },
      { text: "Dragon Ball", correct: false },
    ],
  },
  {
    question:
      "What is the name of the giant humanoid creatures in 'Attack on Titan'?",
    answers: [
      { text: "Reapers", correct: false },
      { text: "Ghouls", correct: false },
      { text: "Titans", correct: true },
      { text: "Demons", correct: false },
    ],
  },
  {
    question: "Who is the 'Fullmetal Alchemist'?",
    answers: [
      { text: "Alphonse Elric", correct: false },
      { text: "Roy Mustang", correct: false },
      { text: "Edward Elric", correct: true },
      { text: "Winry Rockbell", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️ Bright Mode"
    : "🌙 Dark Mode";
});

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
  questionText.textContent = currentQuestion.question;
  progressBar.style.width =
    (currentQuestionIndex / quizQuestions.length) * 100 + "%";

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("answer-btn");
    button.textContent = answer.text;
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(e) {
  if (answersDisabled) return;

  answersDisabled = true;

  const selected = e.target;
  const isCorrect = selected.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((btn) => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    } else if (btn === selected) {
      btn.classList.add("incorrect");
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
  const percent = (score / quizQuestions.length) * 100;

  if (percent === 100) resultMessage.textContent = "You're an Anime Master!";
  else if (percent >= 80) resultMessage.textContent = "Great job, senpai!";
  else if (percent >= 60) resultMessage.textContent = "Not bad! Keep watching!";
  else resultMessage.textContent = "Time for an anime marathon!";
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
