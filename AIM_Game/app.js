const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const board = document.querySelector('#board')
let time = 0
let remainTime = document.querySelector('#time')
let score = 0

startBtn.addEventListener('click', (e) => {
    e.preventDefault()
    screens[0].classList.add('up')

})

timeList.addEventListener('click', e => {
    if(e.target.classList.contains('time-btn')) {
        time = +e.target.getAttribute('data-time')
        startGame()
    }
})

board.addEventListener('click', e=> {
    if(e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createCircle()
    screens[1].classList.add('up')
    setTime(time)
}

function decreaseTime() {
    if (time === 0){
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    remainTime.textContent = `00:${value}`
}

function finishGame() {
    board.innerHTML = `<h1>Результат: <span class='primary'>${score}</span></h1>`
    remainTime.parentNode.remove()
    board.addEventListener('click', newGame)
}

function newGame () {
    screens.forEach(item => {
        item.classList.remove('up')
    })
}

function createCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width,height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const  y = getRandomNumber(0, height - size)
    const  r = getRandomNumber(0, 255)
    const  g = getRandomNumber(0, 255)
    const  b = getRandomNumber(0, 255)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = `linear-gradient(90deg, rgb(${r},${g},${b}) 0%, rgb(${r},${g},${b}) 47%, rgb(${r},${g},${b}) 100%`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}