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
            message = 'Replay❓'
            break;
        case 'win':
            message = 'YOU WON👍'
            break;
        case 'lose':
            message = 'YOU LOST😥'
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
    오늘 엘리쌤 강의를 보면서 showPopupWithText() 함수를 활용하는 부분에서 많은 것을 배웠다.
    처음에 text파라미터를 넘겨주면서 게임을 중지할 때만 보여주는 팝업창인데
    "굳이 해당 텍스트 부분을 동적으로 바꿔줘야할 필요가 있을까?" 했는데, 
    나중에 finishGame 부분을 구현하면서 게임 결과(WON / LOST)를 사용자에게 뿌려줄 때
    이런식으로 함수를 재사용할 수 있다는 것을 배웠다. 함수 재사용에 대해서는 알고는 있지만
    막상 실제로 활용할려고하면 잘 되지 않는다. 오늘 강의를 들으면서 다시 한번 코딩은 스킬이라는 것을
    느꼈다. 계속해서 코딩을 하면서 나의 숙련도를 올리자!
*/