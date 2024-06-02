let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', ()=>{

    setTimeout(()=>{

        logoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add('active');
            }, (idx + 1) * 400)
        });

        setTimeout(()=>{
            logoSpan.forEach((span, idx)=>{

                setTimeout(()=>{
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50)
            })
        },2000);

        setTimeout(()=>{
            intro.style.top = '-100vh';
        }, 2300)


    })
})

const quizData = [
    {
        question: "Show me a fantasy book from audrick and kenneth only",
        options: ["SELECT book_name FROM bookshelf WHERE author = 'audrick' AND author = 'kenneth'", "SELECT book_name FROM bookshelf WHERE author = 'audrick' OR author = 'kenneth'", "SELECT book_name FROM bookshelf WHERE author = 'audrick'", "SELECT book_name FROM bookshelf WHERE author = 'kenneth'"],
        correct: "SELECT book_name FROM bookshelf WHERE author = 'audrick' AND author = 'kenneth'"
    },
    {
        question: "List the book alphabetically",
        options: ["SELECT * FROM bookshelf ORDER BY book_name DESC", "SELECT * FROM bookshelf ORDER BY book_name ASC", "SELECT * FROM bookshelf", "SELECT * FROM bookshelf WHERE book_name = 'alphabetically"],
        correct: "SELECT * FROM bookshelf ORDER BY book_name ASC"
    },
    {
        question: "Count how many books BSL (Busur Setengah Lingkaran) published",
        options: ["SELECT COUNT(book_name) FROM bookshelf WHERE author = 'BSL'", "COUNT book_name FROM bookshelf WHERE author = 'Busur Setengah Lingkaran'", "COUNT book_name FROM bookshelf WHERE author = 'BSL'", "SELECT COUNT(book_name) FROM bookshelf WHERE author = 'Busur Setengah Lingkaran'"],
        correct: "SELECT COUNT(book_name) FROM bookshelf WHERE author = 'Busur Setengah Lingkaran'"
    },
    {
        question: "Order genres alphabetically",
        options: ["SELECT genre FROM bookshelf ORDER BY genre ASC", "SELECT genre FROM bookshelf ORDER BY genre DESC", "SELECT genre FROM bookshelf ORDER BY genre ALPHABETICALLY", "SELECT genre FROM bookshelf"],
        correct: "SELECT genre FROM bookshelf ORDER BY genre ASC"
    },
    {
      question: "Which book ends with an 'h'",
      options: ["SELECT book_name FROM bookshelf LIKE '%h%'", "SELECT book_name FROM bookshelf LIKE '%h'", "SELECT book_name FROM bookshelf LIKE '%h_'", "SELECT book_name FROM bookshelf LIKE '_h%'"],
      correct: "SELECT book_name FROM bookshelf LIKE 'h%'"
    },
    {
      question: "Show me books that were published by Busur Setengah Lingkaran with Kenneth as the author",
      options: ["SELECT book_name FROM bookshelf WHERE publisher = 'BSL', author = 'keneth';", "SELECT book_name FROM bookshelf WHERE publisher = 'PSL', author = 'kenneth';", "SELECT book_name FROM bookshelf WHERE publisher = 'BSL', author = 'kenneth';", "SELECT book_name FROM bookshelf WHERE publisher = 'BSL', author = 'knth';"],
      correct: "SELECT book_name FROM bookshelf WHERE publisher = 'BSL', author = 'keneth';"
    },
    {
      question: "Which column has a Primary key?",
      options: ["Id", "book_name", "genre", "author", "publisher"],
      correct: "Id"
    },
    {
      question: "From the order_lists table, which column has an integer data type?",
      options: ["Book_id", "book_name", "genre", "author", "publisher"],
      correct: "Id"
    }

  ];

let currentQuestion = 0;
let score = 0;
let userAnswers = {}; // Stores user answers for each question

function loadQuiz() {
  const quizContainer = document.getElementById('quiz');
  quizContainer.innerHTML = ''; // Clear previous content

  // Check if there are more questions
  if (currentQuestion < quizData.length) {
    const currentQuizItem = quizData[currentQuestion];
    const questionHTML = `
      <div class="question">
        <h3>${currentQuizItem.question}</h3>
        <ul class="options">
          ${currentQuizItem.options.map((option, index) => `
            <li>
              <label>
                <input type="radio" name="question" value="${option}" ${userAnswers[currentQuestion] === option ? 'checked' : ''}>
                ${option}
              </label>
            </li>
          `).join('')}
        </ul>
        <button id="next-btn" disabled>Next</button>
        <button id="back-btn" ${currentQuestion === 0 ? 'disabled' : ''}>Back</button>
      </div>
    `;
    quizContainer.innerHTML = questionHTML;

    const nextButton = document.getElementById('next-btn');
    const backButton = document.getElementById('back-btn');
    const radioButtons = document.querySelectorAll('input[name="question"]');

    radioButtons.forEach(button => {
      button.addEventListener('change', () => {
        nextButton.disabled = false;
      });
    });

    nextButton.addEventListener('click', submitAnswer);
    backButton.addEventListener('click', () => {
      if (currentQuestion > 0) {
        currentQuestion--;
        loadQuiz();
      }
    });

    // Set the state of the "Next" button if an option was already selected
    const selectedOption = document.querySelector('input[name="question"]:checked');
    nextButton.disabled = !selectedOption;
  } else {
    showResults();
  }
}

function submitAnswer() {
  const selectedOption = document.querySelector('input[name="question"]:checked');

  if (selectedOption) {
    const answer = selectedOption.value;
    userAnswers[currentQuestion] = answer; // Save user answer

    if (answer === quizData[currentQuestion].correct) {
      score++;
    }

    currentQuestion++;
    loadQuiz();
  } else {
    alert('Please select an answer before proceeding.');
  }
}

function showResults() {
  const resultsContainer = document.getElementById('quiz');
  resultsContainer.innerHTML = `
    <h2>Results</h2>
    <p>Your score: ${score} out of ${quizData.length}</p>
    <button id="back-btn">Back</button>
    <div id="placeholder"></div>
  `;

  const backButton = document.getElementById('back-btn');
  backButton.addEventListener('click', () => {
    window.location.href = 'index.html'; // Change to the main menu page
  });
}

window.onload = loadQuiz;
