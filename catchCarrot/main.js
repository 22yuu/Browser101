const playBtn = document.querySelector('.btn__play');
const timerText = document.querySelector('.timer');

const gameTimer = time => {

    function showTime() {
        time--;
        if( time === 0) {
            alert('시간초과')
            clearInterval(timer);
        }
        timerText.textContent = time;
    }

    const timer = setInterval(showTime, 1000);
}

playBtn.addEventListener('click', () => {
    console.log('clicked')
    const time = 10;
    timerText.textContent = time;
    gameTimer(time);
    
});

// 랜덤값 생성
const gameBoard = document.querySelector('.section__board');

console.log(gameBoard.getBoundingClientRect())

const widthMax = 1920;
const widthMin = 80;

const heightMax = 1920;
const heightMin = 80;

const createBugs = () => {
    for(let i = 0; i < 9; i++) {
        let width = Math.random() * (widthMax - widthMin) + widthMin;
        let min = Math.random();
    }
}