const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bugSound = new Audio('./sound/bug_pull.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const gameWinSound = new Audio('./sound/game_win.mp3');

export function playCarrot() {
    playSound(carrotSound);
}
export function playAlert() {
    playSound(alertSound);
}
export function playBug() {
    playSound(bugSound);
}
export function playBackground() {
    playSound(bgSound);
}
export function stopBackground() {
    stopSound(bgSound);
}
export function playWin() {
    playSound(gameWinSound);
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}