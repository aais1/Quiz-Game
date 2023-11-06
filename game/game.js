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

let count=0;


next.addEventListener("click",()=>{
    count++;
    fetchQuestions();
})


choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const selectedAnswer = choice.querySelector('span').innerHTML;
        if (selectedAnswer ===answer) {
            choice.classList.add('correct');
            count++;
            score.innerHTML=parseInt(score.innerHTML)+10;
            setTimeout(fetchQuestions,600)
            
        } else {
            choice.classList.add('wrong');
            count++;
            setTimeout(fetchQuestions,600)
            
        }
    });
});




window.addEventListener("DOMContentLoaded",()=>{
    fetchQuestions();
})


//fetching question
function fetchQuestions(){
    //removing previous answer feedback
    choices.forEach((choice)=>{
                 choice.classList.remove('correct','wrong');
             });
if(count>=10){
    window.location.href = "./end/end.html"
}
fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
    .then(resp => resp.json())
    .then((loadedQuestions) => {
        question.innerHTML = loadedQuestions.results[count].question;
        const correctAns = Math.floor(Math.random() * 4) + 1;
        console.log(correctAns);

        // Set the question and answer choices directly to HTML elements
        question.innerHTML = loadedQuestions.results[count].question;
        if (correctAns === 1) {
            answer=loadedQuestions.results[count].correct_answer;
            choice1.innerHTML = answer;
            choice2.innerHTML = loadedQuestions.results[count].incorrect_answers[0];
            choice3.innerHTML = loadedQuestions.results[count].incorrect_answers[1];
            choice4.innerHTML = loadedQuestions.results[count].incorrect_answers[2];
        } else if (correctAns === 2) {
            answer=loadedQuestions.results[count].correct_answer;
            choice1.innerHTML = loadedQuestions.results[count].incorrect_answers[0];
            choice2.innerHTML = answer;
            choice3.innerHTML = loadedQuestions.results[count].incorrect_answers[1];
            choice4.innerHTML = loadedQuestions.results[count].incorrect_answers[2];
        } else if (correctAns === 3) {
            answer=loadedQuestions.results[count].correct_answer;
            choice1.innerHTML = loadedQuestions.results[count].incorrect_answers[0];
            choice2.innerHTML = loadedQuestions.results[count].incorrect_answers[1];
            choice3.innerHTML = answer;
            choice4.innerHTML = loadedQuestions.results[count].incorrect_answers[2];
        } else {
            choice1.innerHTML = loadedQuestions.results[count].incorrect_answers[0];
            choice2.innerHTML = loadedQuestions.results[count].incorrect_answers[1];
            choice3.innerHTML = loadedQuestions.results[count].incorrect_answers[2];
            choice4.innerHTML = answer;
        }

        //updating question Number
        questionNo.innerHTML = (count < 9) ? '0' + (count + 1) : count + 1;
        loader.style.display='none';
        container.style.display='block';
    });
}



// function showQuestions(){
    //     
    //     if(count<=3){
    // question.innerHTML=questions[count].question;
    // choice1.innerHTML=questions[count].choice1;
    // choice2.innerHTML=questions[count].choice2;
    // choice3.innerHTML=questions[count].choice3;
    // choice4.innerHTML=questions[count].choice4;
    //     }
    //     else{
    //         alert("game ended")
    //         window.location.href="/index.html";
    //     }
    // }


    
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