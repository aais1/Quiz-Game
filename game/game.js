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
const questions=[
    {
        question:"Who is the father of Computer",
        choice1:"Quaid-e-Azam",
        choice2:"Alama Iqbal",
        choice3:"Jusitin Beiber",
        choice4:"Charles Babbage",
        answer:"D",
        hint:"IDK man GOOGLE it😁"
    },
    {
        question:"Who is the G.O.A.T of Football",
        choice1:"Lionel Messi",
        choice2:"Cristiano Ronaldo",
        choice3:"Atif Aslam",
        choice4:"Bakri",
        answer:"A",
        hint:"Me nhi btaounga 😎"
    },
    {
        question:"What is the best OS?",
        choice1:"MAC",
        choice2:"Windows",
        choice3:"Linux",
        choice4:"4th knsa h bhai",
        answer:"B",
        hint:"Bhai kuch ni ata tumhe 🤣"
    },
    {
        question:"Why are you GAY..!",
        choice1:"yhi",
        choice2:"tw",
        choice3:"qayamat",
        choice4:"hai",
        answer:"A",
        hint:"Mjy ata tw me idr hota kya 😒"
    }
];
let count=0;

console.log(questions[count].choice1);

next.addEventListener("click",()=>{
    count++;
    showQuestions();
})

hint.addEventListener("click",()=>{
    createModal();
    setTimeout(removeModal,2000);
})

function showQuestions(){
    choices.forEach((choice)=>{
        choice.classList.remove('correct','wrong');
    })
    if(count<=3){
question.innerHTML=questions[count].question;
choice1.innerHTML=questions[count].choice1;
choice2.innerHTML=questions[count].choice2;
choice3.innerHTML=questions[count].choice3;
choice4.innerHTML=questions[count].choice4;
    }
    else{
        alert("game ended")
        window.location.href="/index.html";
    }
}


choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const selectedAnswer = choice.querySelector('span').getAttribute('data-choice');
        if (selectedAnswer === questions[count].answer) {
            choice.classList.add('correct');
            count++;
            score.innerHTML=parseInt(score.innerHTML)+10;
            setTimeout(showQuestions,1000)
            
        } else {
            choice.classList.add('wrong');
            count++;
            setTimeout(showQuestions,1000)
            
        }
    });
});



function createModal(){
    const modal=document.createElement('div');
    const hint=document.createElement('p');
    hint.classList.add('hint');
    hint.innerHTML=questions[count].hint;
    modal.append(hint);
    modal.classList.add('modal');
    container.style.opacity='0.5';
    document.body.appendChild(modal);

}
function removeModal(){
    const modal =document.querySelector('.modal');
    if(modal)
    modal.remove();
    container.style.opacity='1';
}

window.addEventListener("DOMContentLoaded",()=>{
    showQuestions();
})