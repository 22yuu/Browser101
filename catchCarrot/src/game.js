import * as sound from './sound.js';
import Field from "./field.js";

// Builder Pattern
export class GameBuilder {
    withGameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    withCarrotCount(num) {
        this.carrotcount = num;
        return this;
    }

    withBugCount(num) {
        this.bugCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration,
            this.carrotcount,
            this.bugCount
        )
    }
}

class Game {
    constructor(carrotCount, gameDuration, bugCount) {

        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector('.game__button');
        this.gameBtn.addEventListener('click', () => {
            if(this.started) {
                this.stop();
            } else {
                this.start();
            }
        })

        
        this.carrotCount = carrotCount;
        this.gameDuration = gameDuration;
        this.bugCount = bugCount;

        this.gameField = new Field(this.carrotCount, this.bugCount);
        this.gameField.setClickListener(this.onItemClick);

        this.started = false;
        this.score = 0;
        this.timer = undefined;
    
    }

    onItemClick = (item) => {
        if(!this.started) return;
    
        if(item === 'carrot') {
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.carrotCount) {
                this.finish(true);
            }
        } else if (item === 'bug') {
            this.finish(false);
        }
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;

    }
    start() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
    }
    
    stop() {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.playAlert();
        sound.stopBackground();
        this.onGameStop && this.onGameStop('cancel');
    }
    
    finish(result) {
        this.started = false;
        this.hideGameButton();
        if(result) {
            // win
            sound.playWin();
        } else {
            // lose
            sound.playBug();
        }
        this.stopGameTimer();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(result? 'win' : 'lose');
    }
    
    showStopButton() {
        const icon = this.gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }
    
    hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
    }
    
    showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    
    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
    
        this.timer = setInterval(() => {
            if(remainingTimeSec <= 0) {
                // alert('시간 초과');
                clearInterval(this.timer);
                this.finish(this.carrotCount === this.score);
                return;
            } 
            this.updateTimerText(--remainingTimeSec);
        }, 1000)
    }
    
    stopGameTimer() {
        clearInterval(this.timer);
    }
    
    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerText = `${minutes}:${seconds}`;
    }
    
    initGame() {
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        // 벌레와 당근을 생성한뒤 field에 추가해줌
        this.gameField.init();
    }

    updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
    }
}