'use strict';

export default class PopUp {
    constructor() {
        this.popup = document.querySelector('.pop-up');
        this.popupText = document.querySelector('.pop-up__message');
        this.popupRefresh = document.querySelector('.pop-up__refresh');
        this.popupRefresh.addEventListener('click', () => {
            console.log('clicked refresh');
            this.onClick && this.onClick();
            this.hide();
        })
    }
    
    setClickListener(onClick) {
        this.onClick = onClick;
    }

    hide() {
        this.popup.classList.add('pop-up--hide');
        console.log('hide!')
    }

    showWithText(text) {
        this.popupText.innerText = text;
        this.popup.classList.remove('pop-up--hide');
    }
    
}