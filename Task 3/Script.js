const quizzes = {
  general: [
    {
      question: "Which is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: 2
    },
    {
      question: "Who wrote the Indian national anthem?",
      options: ["Mahatma Gandhi", "Rabindranath Tagore", "Subhash Chandra Bose", "Jawaharlal Nehru"],
      answer: 1
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "India", "Japan", "Korea"],
      answer: 2
    }
  ],
  science: [
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "NaCl", "O2"],
      answer: 0
    },
    {
      question: "What planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: 1
    },
    {
      question: "Which organ pumps blood through the body?",
      options: ["Lungs", "Liver", "Heart", "Brain"],
      answer: 2
    }
  ]
};

const topicOrder = ["general", "science"];
let currentTopicIndex = 0;
let selectedQuiz = [];
let current = 0;
let score = 0;
let totalScore = 0;
let totalQuestions = 0;
let userName = "";

const container = document.getElementById("quiz-container");

function askUserName() {
  container.innerHTML = `
    <h2>Welcome to QuizGlide</h2>
    <p>Enter your name to begin:</p>
    <input type="text" id="nameInput" placeholder="Your Name">
    <br>
    <button onclick="startQuizFlow()">Start Quiz</button>
  `;
}

function startQuizFlow() {
  const nameInput = document.getElementById("nameInput");
  const name = nameInput.value.trim();

  if (name === "") {
    alert("Please enter your name.");
    return;
  }

  userName = name;
  startAllQuizzes();
}

function startAllQuizzes() {
  currentTopicIndex = 0;
  totalScore = 0;
  totalQuestions = 0;
  loadQuizByTopic(topicOrder[currentTopicIndex]);
}

function loadQuizByTopic(topic) {
  selectedQuiz = quizzes[topic];
  current = 0;
  score = 0;

  container.innerHTML = `
    <h2 id="question">Loading...</h2>
    <div>
      <label class="option"><input type="radio" name="option" value="0"> <span id="opt0">Option A</span></label>
      <label class="option"><input type="radio" name="option" value="1"> <span id="opt1">Option B</span></label>
      <label class="option"><input type="radio" name="option" value="2"> <span id="opt2">Option C</span></label>
      <label class="option"><input type="radio" name="option" value="3"> <span id="opt3">Option D</span></label>
    </div>
    <button onclick="nextQuestion()">Next</button>
  `;
  loadQuestion();
}

function loadQuestion() {
  if (current < selectedQuiz.length) {
    const q = selectedQuiz[current];
    document.getElementById("question").textContent = q.question;
    document.getElementById("opt0").textContent = q.options[0];
    document.getElementById("opt1").textContent = q.options[1];
    document.getElementById("opt2").textContent = q.options[2];
    document.getElementById("opt3").textContent = q.options[3];
    document.getElementsByName("option").forEach(o => o.checked = false);
  } else {
    totalScore += score;
    totalQuestions += selectedQuiz.length;
    currentTopicIndex++;
    if (currentTopicIndex < topicOrder.length) {
      loadQuizByTopic(topicOrder[currentTopicIndex]);
    } else {
      showFinalResult();
    }
  }
}

function nextQuestion() {
  const options = document.getElementsByName("option");
  let selected = -1;
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      selected = parseInt(options[i].value);
    }
  }

  if (selected === -1) {
    alert("Please select an option!");
    return;
  }

  if (selected === selectedQuiz[current].answer) {
    score++;
  }

  current++;
  loadQuestion();
}

function showFinalResult() {
  container.innerHTML = `
    <h2>🎉 Quiz Completed!</h2>
    <p>Well done, <strong>${userName}</strong>!</p>
    <p>You scored ${totalScore} / ${totalQuestions}</p>
    <button onclick="askUserName()">Start New Quiz</button>
    <button onclick="viewResults()">View Previous Results</button>
    <div class="footer">Designed by You • Task 3</div>
  `;
}

function viewResults() {
  container.innerHTML = `
    <h2>📊 Previous Results</h2>
    <p><strong>${userName}</strong>, your last score was ${totalScore} out of ${totalQuestions}</p>
    <button onclick="askUserName()">Start New Quiz</button>
    <div class="footer">Designed by You • Task 3</div>
  `;
}

// Start the app
askUserName();
