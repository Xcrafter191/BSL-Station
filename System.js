const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: "Mars"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
        correct: "Harper Lee"
    },
    {
        question: "What is the smallest prime number?",
        options: ["1", "2", "3", "5"],
        correct: "2"
    }
];

function loadQuiz() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = quizData.map((quizItem, index) => {
        return `
            <div class="question">
                <h3>${quizItem.question}</h3>
                <ul class="options">
                    ${quizItem.options.map(option => `
                        <li>
                            <label>
                                <input type="radio" name="question${index}" value="${option}">
                                ${option}
                            </label>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }).join('');
}

function submitQuiz() {
    let score = 0;
    quizData.forEach((quizItem, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === quizItem.correct) {
            score++;
        }
    });

    const resultContainer = document.getElementById('result');
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
}

window.onload = loadQuiz;
