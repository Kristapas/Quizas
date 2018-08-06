document.addEventListener("DOMContentLoaded", function (event) {
  startButton.addEventListener('click', function (event) {
    console.log("what")
    buildQuiz()
  })
})



// function startQuiz() {
//   showslide(newQuestions);
// }
// const newQuestions = [];

function buildQuiz() {
  // document.addEventListener("start", function (startQuiz) {
  //code to be run after DOM is ready
  // document.getElementById("start", function (buildQuiz) {
  // vieta kur bus saugoma html isvestis(quizas)
  const output = [];

  // Kiekvienam klausimui
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // vieta kur bus liakomi variantai
    const answers = [];

    // kiekvienam klausimui variantai
    for (text in currentQuestion.answers) {
      // buttonas radio tipo
      answers.push(
        `<label>

               <input type="radio" name="question${questionNumber}" value="${
            currentQuestion.answers[text]
          }" >

                ${currentQuestion.answers[text]}
             </label>`
      );
    }

    answers.shuffle = function () {
      const input = this;

      for (var i = input.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
      }
      return input;
    };

    const tempArray = answers;
    answers.shuffle();

    // console.log(tempArray);

    // pridedu klausimus ir variantus i html isvesti
    output.push(
      `<div class="slide">
             <div class="question"> ${currentQuestion.question} </div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
    );
  });

  quizContainer.innerHTML = output.join("");
}

function showResults() {
  // surenku variantu containeri is mano quizo
  const answerContainers = quizContainer.querySelectorAll(".answers");

  // sektti naudotojo atsakymams
  let numCorrect = 0;

  // kiekvienam klausimui
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // ieskomas pasirinktas variantas
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // jeigu atsakymas teisingas
    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;

      // nuspalvinam zaliai jei teisingai
      answerContainers[questionNumber].style.color = "green";
    } else {
      // jei ne nuspalvinam raudonai
      answerContainers[questionNumber].style.color = "red";
    }
  });

  // rodytis po submito is kiek klausimu teisingai atsakei out of
  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}
// funkcija 10 klausimu
// const maxQuestions = 10;

// function showMax(maxQuestions) {
//   for (var i = 0; i < maxQuestion; i++) {
//     if (i === 10) {}
//   }
// }
// slidams funkcija
function showSlide(n) {
  slides[currentSlide].classList.remove("active-slide");
  slides[n].classList.add("active-slide");
  currentSlide = n;

  if (currentSlide === 0) {
    previousButton.style.display = "none";
  } else {
    previousButton.style.display = "inline-block";
  }

  if (currentSlide === slides.length - 1) {
    nextButton.style.display = "none";
    submitButton.style.display = "inline-block";
    restartButton.style.display = "inline-block";
    inputName.style.display = "inline-block";
  } else {
    nextButton.style.display = "inline-block";
    restartButton.style.display = "none";
    submitButton.style.display = "none";
    inputName.style.display = "none";
  }
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

const restartQuiz = () => {
  window.location.reload();
};

const startButton = document.getElementById("start");
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const restartButton = document.getElementById("restart");
const inputName = document.getElementById("input");

buildQuiz();

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(0);

startButton.addEventListener("click", buildQuiz);
submitButton.addEventListener("click", showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
restartButton.addEventListener("click", restartQuiz);