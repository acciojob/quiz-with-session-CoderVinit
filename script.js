//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score")

const userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear previous content

  questions.forEach((question, i) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    // Display question text
    const questionText = document.createElement("p");
    questionText.textContent = `${i + 1}. ${question.question}`;
    questionDiv.appendChild(questionText);

    // Display choices as radio buttons
    question.choices.forEach(choice => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Restore selected choice from session storage
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // Save answer on selection
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const choiceLabel = document.createElement("label");
      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(choice));

      questionDiv.appendChild(choiceLabel);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });

  // Display last saved score
  const lastScore = localStorage.getItem("score");
  if (lastScore !== null) {
    scoreDisplay.textContent = `Your last score: ${lastScore} out of ${questions.length}`;
  }
}

function calculateScore() {
  let score = 0;
  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });

  // Store final score in local storage
  localStorage.setItem("score", score);
  scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}`;
}

// Load quiz questions on page load
document.addEventListener("DOMContentLoaded", renderQuestions);

// Submit button event listener
submitButton.addEventListener("click", calculateScore);
	
renderQuestions();
