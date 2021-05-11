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


// Function to animate the score
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

// function to show the correct 
const updateCorrectAnswer = (div, color) => {
    div.forEach(i => {
        let correctAns = cards[i].querySelector(`input[value="${correctAnswers[i]}"]`)
        correctAns.parentElement.style.color = color

    })
}

// Function to update the color an the basis of answers
const updateColor = (div, backgroundColor, color) => {
    div.forEach(i => {
        cards[i].style.backgroundColor = backgroundColor
        cards[i].style.color = color
    });
}


// Adding a submit event listener to the form
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
    
    // Scrolling to the top to show the results
    scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    result.style.display = 'flex';

    // calling timerFun
    timerFun(document.querySelector('.score span'), percentage, 70)
    timerFun(document.querySelector('.correct h2'), correct, 200)
    timerFun(document.querySelector('.wrong h2'), wrong, 200)
    timerFun(document.querySelector('.skip h2'), skipped, 200)
    
    // calling updateColor
    updateColor(correctDiv, 'rgb(66 119 35)', '#fff')
    updateColor(wrongDiv, '#e85d04', '#fff')
    updateColor(skippedDiv, '#ffea00', '#121212')

    // calling updateCorrectAnswers
    updateCorrectAnswer(skippedDiv, "green")
    updateCorrectAnswer(wrongDiv, "#15ff15")
    updateCorrectAnswer(correctDiv, "#1b2902")

})



