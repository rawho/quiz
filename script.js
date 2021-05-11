const form = document.querySelector('form');
const correctAnswers = ['A', 'A', 'A', 'B', 'C', 'B', 'D', 'A', 'A', 'A']
let score = 0;
let percentage = 0;
let correct = 0
let wrong = 0
let skipped = 0
const Questions = correctAnswers.length;
const result = document.querySelector('.score')
let correctDiv = []
let skippedDiv = []
let wrongDiv = []
let cards = document.querySelectorAll('.card')
cards = Array.from(cards)


form.addEventListener('submit', e => {
    e.preventDefault();

    document.querySelector('#submit').style.display = 'none'

    let submitedAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value, form.q5.value, form.q6.value, form.q7.value, form.q8.value, form.q9.value, form.q10.value]
    
    submitedAnswers.forEach((ans, index) => {
        if(ans === correctAnswers[index]){
            score++;
            percentage = (score / Questions) * 100;
            correct++
            correctDiv.push(index)
            
        } else if(ans === ''){
            skipped++
            skippedDiv.push(index)
        } else{
            wrongDiv.push(index)
        }

        
    })

    wrong = Questions - (correct + skipped)
    console.log(correctDiv, wrongDiv, skippedDiv)
    scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    const timerFun = (element, value, t) => {
        let update = 0;
        const timer = setInterval(() => {
            element.textContent = update
            if(update === value){
                clearInterval(timer)
            }
            update++;
        }, t);
    }

    result.style.display = 'flex';

    timerFun(document.querySelector('.score span'), percentage, 70)
    timerFun(document.querySelector('.correct h2'), correct, 200)
    timerFun(document.querySelector('.wrong h2'), wrong, 200)
    timerFun(document.querySelector('.skip h2'), skipped, 200)
    
    correctDiv.forEach(i => {
        cards[i].style.backgroundColor = 'rgb(66 119 35)'
        cards[i].style.color = '#fff'
    });

    wrongDiv.forEach(i => {
        cards[i].style.backgroundColor = '#e85d04'
        cards[i].style.color = '#fff'
    });
    skippedDiv.forEach(i => {
        cards[i].style.backgroundColor = '#ffea00'
        cards[i].style.color = '#121212'
    });


    skippedDiv.forEach(i => {
        let correctAns = cards[i].querySelector(`input[value="${correctAnswers[i]}"]`)
        correctAns.parentElement.style.color = 'green'

    })

    wrongDiv.forEach(i => {
        let correctAns = cards[i].querySelector(`input[value="${correctAnswers[i]}"]`)
        correctAns.parentElement.style.color = '#15ff15'

    })

    correctDiv.forEach(i => {
        let correctAns = cards[i].querySelector(`input[value="${correctAnswers[i]}"]`)
        correctAns.parentElement.style.color = '#1b2902'

    })


   
})


