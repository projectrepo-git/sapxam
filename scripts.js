const questions = [{
    question: "Is SAP an ERP system?",
    options: ["NO", "YES"],
    answer: 1
},
{
    question: "What is the T-code for creating a Purchase?",
    options: ["FB55", "FB60", "FB50", "FB89"],
    answer: 2
},
{
    question: "Does SAP MM handle inventory management?",
    options: ["YES", "NO"],
    answer: 0
},
{
    question: "What is the T-code for creating a G/L posting?",
    options: ["OB53", "FB50", "F-02", "F-03"],
    answer: 2
},
{
    question: "Is SAP HANA a cloud-only solution?",
    options: ["YES", "NO"],
    answer: 1
},
{
    question: "What is the T-code for creating a Purchase Return?",
    options: ["ME21N", "FB65", "F-02", "MIGO"],
    answer: 3
},
{
    question: "Does SAP allow real-time data processing with S/4HANA?",
    options: ["YES", "NO"],
    answer: 0
},
{
    question: "What is the T-code for creating a Tax Procedure?",
    options: ["OBAS", "OBQ3", "OB32", "OBQ8"],
    answer: 1
},
{
    question: "What is the T-code for creating a Condition Type?",
    options: ["OBCN", "OBYZ", "OB32", "OB89"],
    answer: 1
},
{
    question: "Is ABAP used for frontend development in SAP?",
    options: ["YES", "NO"],
    answer: 1
}
    // You can continue adding up to 30+ from the PDF
];
questions.push({
    question: "What is the T-code for creating a tax code?",
    options: ["OBBO", "OB40", "FTXP", "FXTP"],
    answer: 2
}, {
    question: "Can you delete a document that is already posted?",
    options: ["YES", "NO"],
    answer: 1
}, {
    question: "Can you create a purchase order without a purchase requisition?",
    options: ["YES", "NO"],
    answer: 0
}, {
    question: "Is a company code mandatory for financial accounting in SAP?",
    options: ["YES", "NO"],
    answer: 0
}, {
    question: "Can you reverse a posted document in SAP FICO?",
    options: ["YES", "NO"],
    answer: 0
}, {
    question: "What is ERP?",
    options: [
        "Enterprise Resource Planning",
        "End Resource Planning",
        "Electronic Resource Program",
        "Environment Resource Plan"
    ],
    answer: 0
}, {
    question: "What is the T-code for creating a Purchase Order?",
    options: ["ME21N", "FB60", "F-02", "MIGO"],
    answer: 0
}, {
    question: "Which module handles customer billing?",
    options: ["MM", "FICO", "SD", "PP"],
    answer: 2
}, {
    question: "Which of the following is a valid movement type for goods receipt?",
    options: ["201", "101", "301", "122"],
    answer: 1
}, {
    question: "Which table contains general ledger master data?",
    options: ["BKPF", "BSEG", "SKA1", "MARA"],
    answer: 2
}, {
    question: "What is a cost center in SAP used for?",
    options: [
        "Vendor payments",
        "Material stock",
        "Internal cost tracking",
        "Purchase orders"
    ],
    answer: 2
}, {
    question: "What does ME51N stand for?",
    options: [
        "Create Purchase Order",
        "Create Material",
        "Create Purchase Requisition",
        "Display Material"
    ],
    answer: 2
}, {
    question: "In SAP SD, which document initiates a sale?",
    options: ["Delivery", "Billing", "Inquiry", "Sales Order"],
    answer: 3
}, {
    question: "What is the purpose of a posting key in SAP?",
    options: [
        "Assign pricing",
        "Define transaction type and debit/credit",
        "Assign cost center",
        "Manage vendors"
    ],
    answer: 1
}, {
    question: "Which module is used for production planning?",
    options: ["SD", "MM", "PP", "CO"],
    answer: 2
}, {
    question: "Which of these is an in-memory database?",
    options: ["MySQL", "SAP HANA", "Oracle", "PostgreSQL"],
    answer: 1
}, {
    question: "What is a sales area in SAP SD?",
    options: [
        "Plant + Storage Location",
        "Sales Org + Distribution Channel + Division",
        "Vendor + Purchasing Org",
        "Company + Division"
    ],
    answer: 1
}, {
    question: "Which component in SAP manages material storage?",
    options: ["SAP HANA", "SAP FI", "SAP WM", "SAP PP"],
    answer: 2
}, {
    question: "Which document is created after a goods receipt?",
    options: ["Sales Order", "Invoice", "Material Document", "Vendor Master"],
    answer: 2
}, {
    question: "What is the use of SE11 in SAP ABAP?",
    options: [
        "Program execution",
        "Data Dictionary maintenance",
        "Report viewing",
        "Screen creation"
    ],
    answer: 1
});


// Check authentication
if (!sessionStorage.getItem('isAuthenticated')) {
    window.location.href = 'login.html';
}


let currentIndex = 0;
let answers = new Array(questions.length).fill(undefined);
const questionTitle = document.getElementById("question-title");
const quizOptions = document.getElementById("quiz-options");
const nextBtn = document.getElementById("next-btn");
const verifyBtn = document.querySelector(".verify-btn");
const submitBtn = document.querySelector(".submit-btn");

function showResults(score, totalQuestions, unansweredCount) {
    // Hide quiz container
    document.getElementById('quiz-container').style.display = 'none';

    // Show results container
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.style.display = 'block';

    // Display results
    document.getElementById('result-details').innerHTML = `
        <p><strong>Your Final Score:</strong> ${score}/${totalQuestions}</p>
        <p><strong>Unanswered Questions:</strong> ${unansweredCount} (-1 each)</p>
    `;

    // Set up retake quiz button
    document.getElementById('retake-quiz').addEventListener('click', () => {
        location.reload();
    });
}

// Initialize the quiz
function initQuiz() {
    // Load first question immediately
    loadQuestion(currentIndex);

    // Set up event listeners
    nextBtn.addEventListener("click", nextQuestion);
    verifyBtn.addEventListener("click", verifyAnswers);
    submitBtn.addEventListener("click", submitQuiz);

    // Start timer
    const timeInSeconds = 60 * 60;
    const display = document.getElementById("timer");
    startTimer(timeInSeconds, display);
}

function loadQuestion(index) {
    currentIndex = index;
    const q = questions[index];

    // Update question display
    questionTitle.textContent = `${index + 1}. ${q.question}`;
    quizOptions.innerHTML = q.options.map((opt, i) => `
        <label>
            <input type="radio" name="option" value="${i}" 
                   ${answers[index] === i ? 'checked' : ''} 
                   onchange="selectAnswer(${i})">
            ${opt}
        </label>
    `).join('');

    // Update navigation buttons
    nextBtn.textContent = index === questions.length - 1 ? "Exam Completed.. Submit your Answers" : "Next";

    // Update question list highlights
    updateQuestionList();
}

function updateQuestionList() {
    const questionList = document.getElementById("question-list");
    questionList.innerHTML = questions.map((_, i) => {
        const classes = [
            "question-item",
            i === currentIndex ? "current" : "",
            answers[i] !== undefined ? "answered" : "unanswered"
        ].filter(Boolean).join(' ');

        return `<div class="${classes}" onclick="jumpToQuestion(${i})">${i + 1}</div>`;
    }).join('');
}

function jumpToQuestion(index) {
    currentIndex = index;
    loadQuestion(index);
}

function selectAnswer(optionIndex) {
    answers[currentIndex] = optionIndex;
    updateQuestionList();
}

function nextQuestion() {
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        loadQuestion(currentIndex);
    } else {
        verifyAnswers();
    }
}

function verifyAnswers() {
    const unanswered = answers.filter(a => a === undefined).length;
    const verificationResult = document.getElementById("verification-result");

    if (unanswered > 0) {
        verificationResult.innerHTML = `
            <div class="alert alert-warning">
                You have ${unanswered} unanswered questions.
                <br>Please review them before submitting.
            </div>
        `;
        submitBtn.style.display = "none";

        // Scroll to first unanswered question
        const firstUnanswered = answers.findIndex(a => a === undefined);
        if (firstUnanswered >= 0) {
            jumpToQuestion(firstUnanswered);
        }
    } else {
        verificationResult.innerHTML = `
            <div class="alert alert-success">
                All questions answered! You can now submit your quiz.
            </div>
        `;
        submitBtn.style.display = "block";
    }
}

function submitQuiz() {
    let score = 0;
    const totalQuestions = questions.length;
    let unansweredCount = 0;

    questions.forEach((q, i) => {
        if (answers[i] === undefined) {
            score--;
            unansweredCount++;
        } else if (answers[i] === q.answer) {
            score++;
        }
    });

    showResults(score, totalQuestions, unansweredCount);
}

function startTimer(duration, display) {
    let timer = duration,
        minutes, seconds;
    const interval = setInterval(() => {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (--timer < 0) {
            clearInterval(interval);
            submitQuiz();
        }
    }, 1000);
}

// Initialize the quiz when the page loads
window.addEventListener("DOMContentLoaded", initQuiz);