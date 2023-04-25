import { Player } from "./player.js";

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let player;

startGame();

function startGame() {
    init();
    animate();
}

function init() {
    const movementLimits = {
        minX: 0,
        maxX: canvas.width,
        minY: 0,
        maxY: canvas.height
    };
    player = new Player(canvas.width/2, canvas.height/2, context, movementLimits);
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
}
