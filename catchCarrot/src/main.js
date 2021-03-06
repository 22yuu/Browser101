'use strict';

import PopUp from "./popup.js";
import { GameBuilder } from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
    .withGameDuration(5)
    .withCarrotCount(5)
    .withBugCount(5)
    .build();

game.setGameStopListener(reason => {
    console.log(reason)
    let message;

    switch(reason) {
        case 'cancel':
            message = 'Replayβ'
            break;
        case 'win':
            message = 'YOU WONπ'
            break;
        case 'lose':
            message = 'YOU LOSTπ₯'
            break;
        default:
            throw new Error('not valid reason')

    }
    gameFinishBanner.showWithText(message);
})

gameFinishBanner.setClickListener(() => {
    game.start();
})


/*
    μ€λ μλ¦¬μ€ κ°μλ₯Ό λ³΄λ©΄μ showPopupWithText() ν¨μλ₯Ό νμ©νλ λΆλΆμμ λ§μ κ²μ λ°°μ λ€.
    μ²μμ textνλΌλ―Έν°λ₯Ό λκ²¨μ£Όλ©΄μ κ²μμ μ€μ§ν  λλ§ λ³΄μ¬μ£Όλ νμμ°½μΈλ°
    "κ΅³μ΄ ν΄λΉ νμ€νΈ λΆλΆμ λμ μΌλ‘ λ°κΏμ€μΌν  νμκ° μμκΉ?" νλλ°, 
    λμ€μ finishGame λΆλΆμ κ΅¬ννλ©΄μ κ²μ κ²°κ³Ό(WON / LOST)λ₯Ό μ¬μ©μμκ² λΏλ €μ€ λ
    μ΄λ°μμΌλ‘ ν¨μλ₯Ό μ¬μ¬μ©ν  μ μλ€λ κ²μ λ°°μ λ€. ν¨μ μ¬μ¬μ©μ λν΄μλ μκ³ λ μμ§λ§
    λ§μ μ€μ λ‘ νμ©ν λ €κ³ νλ©΄ μ λμ§ μλλ€. μ€λ κ°μλ₯Ό λ€μΌλ©΄μ λ€μ νλ² μ½λ©μ μ€ν¬μ΄λΌλ κ²μ
    λκΌλ€. κ³μν΄μ μ½λ©μ νλ©΄μ λμ μλ ¨λλ₯Ό μ¬λ¦¬μ!
*/