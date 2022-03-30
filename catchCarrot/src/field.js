'use strict';

import * as sound from './sound.js';
const CARROT_SIZE = 80;

export default class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        /**
         * this 바인딩은 어떤 클래스안에 있는 함수를 다른 콜백으로 전달할 때
         * 그 함수가 포함되어져 있는 클래스의 정보가 사라짐
         * 
         * 클래스 정보가 사라지지 않고 유지할려면 arrowfunction을 사용하거나,
         * bind(); 함수를 사용해야함
         * 
         * 1. this.onClick = this.onClick.bind(this);
         * 2. this.field.addEventListener('click', (event) => this.onClick(event));
         * 3. this.field.addEventListener('click', this.onClick);
         *   onClick = (event) => {
         *         ...
         *   }
         */
        this.field.addEventListener('click', this.onClick);
    }
    /*
        함수 앞 _ 해주는 이유는 자바스크립트의 경우 private 해줄 수 없어
        _는 private 함수라는 것을 명시
    */
    init() {
        this.field.innerHTML = '';
        this._addItem('carrot', this.carrotCount, 'img/carrot.png');
        this._addItem('bug', this.bugCount, 'img/bug.png');
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;
    
        for(let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y  = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);

        }
    }

    onClick = (event) => {
        const target = event.target;
        if(target.matches('.carrot')) {
            // 당근!!
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick('carrot');
        } else if(target.matches('.bug')) {
            // 벌레!!
            this.onItemClick && this.onItemClick('bug');
        }
    }
}

// class와 상관없는 함수는 class 밖에다 선언
// 메모리에 안올라가기 때문에 더 효율적 (이런 함수들을 static 함수라고 부름)
function randomNumber(min, max) {
    return Math.random() * (max-min) + min
}