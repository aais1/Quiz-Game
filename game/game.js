const question =document.getElementById('question');
const choice1 =document.querySelector('.choice-1');
const choice2 =document.querySelector('.choice-2');
const choice3 =document.querySelector('.choice-3');
const choice4 =document.querySelector('.choice-4');
const next =document.getElementById('next');
const hint =document.getElementById('hint');
const container=document.querySelector('.container');
const choices=document.querySelectorAll('.choice-container');
const score=document.querySelector('.score');
const questionNo =document.querySelector('.questionNo');
const loader =document.querySelector('.loader');
let answer;
//constants for API CALL
const MAX_QUESTIONS=10;
const DIFFICULTY='easy';

let loadedQuestions={};
let count=0;


next.addEventListener("click",()=>{
    count++;
    showQuestions();
})

//adding for each choice-container
choices.forEach((choice) => {
    //click event listener on choice
    choice.addEventListener("click", () => {
        const selectedAnswer = choice.querySelector('span').innerHTML;
        if (selectedAnswer ===answer) {
            choice.classList.add('correct');
            count++;
            score.innerHTML=parseInt(score.innerHTML)+10;
            setTimeout(showQuestions,250)
            
        } else {
            choice.classList.add('wrong');
            count++;
            setTimeout(showQuestions,250)
        }
    });
});


//displaying on page load
window.addEventListener("DOMContentLoaded",()=>{
    fetchQuestions();
})


//fetching question
function fetchQuestions(){

fetch(`https://opentdb.com/api.php?amount=${MAX_QUESTIONS}&category=9&difficulty=${DIFFICULTY}&type=multiple`)
    .then(resp => resp.json())
    .then((loadedQ) => {
        loadedQuestions=loadedQ;
        question.innerHTML = loadedQuestions.results[count].question;
        showQuestions(loadedQuestions);
    });
}
function showQuestions(loadedQuestionss=loadedQuestions){

    if(count>=MAX_QUESTIONS){
        window.location.href = "./end/end.html"
    }

    console.log(loadedQuestionss)
    
    const correctAns = Math.floor(Math.random() * 4) + 1;
    question.innerHTML = loadedQuestionss.results[count].question;
        if (correctAns === 1) {
            answer=loadedQuestionss.results[count].correct_answer;
            choice1.innerHTML = answer;
            choice2.innerHTML = loadedQuestionss.results[count].incorrect_answers[0];
            choice3.innerHTML = loadedQuestionss.results[count].incorrect_answers[1];
            choice4.innerHTML = loadedQuestionss.results[count].incorrect_answers[2];
        } else if (correctAns === 2) {
            answer=loadedQuestionss.results[count].correct_answer;
            choice1.innerHTML = loadedQuestionss.results[count].incorrect_answers[0];
            choice2.innerHTML = answer;
            choice3.innerHTML = loadedQuestionss.results[count].incorrect_answers[1];
            choice4.innerHTML = loadedQuestionss.results[count].incorrect_answers[2];
        } else if (correctAns === 3) {
            answer=loadedQuestions.results[count].correct_answer;
            choice1.innerHTML = loadedQuestionss.results[count].incorrect_answers[0];
            choice2.innerHTML = loadedQuestionss.results[count].incorrect_answers[1];
            choice3.innerHTML = answer;
            choice4.innerHTML = loadedQuestionss.results[count].incorrect_answers[2];
        } else {
            choice1.innerHTML = loadedQuestionss.results[count].incorrect_answers[0];
            choice2.innerHTML = loadedQuestionss.results[count].incorrect_answers[1];
            choice3.innerHTML = loadedQuestionss.results[count].incorrect_answers[2];
            choice4.innerHTML = answer;
        }
            //removing previous answer feedback
    choices.forEach((choice)=>{
        choice.classList.remove('correct','wrong');
    });

        //updating question Number
        questionNo.innerHTML = (count < 9) ? '0' + (count + 1) : count + 1;
        loader.style.display='none';
        container.style.display='block';
}

/*Functionalities yet to be implemented*/

// function createModal(){
//     const modal=document.createElement('div');
//     const hint=document.createElement('p');
//     hint.classList.add('hint');
//     hint.innerHTML=questions[count].hint;
//     modal.append(hint);
//     modal.classList.add('modal');
//     container.style.opacity='0.5';
//     document.body.appendChild(modal);
// }

// function removeModal(){
//     const modal =document.querySelector('.modal');
//     if(modal)
//     modal.remove();
//     container.style.opacity='1';
// }