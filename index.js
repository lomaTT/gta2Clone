import { Player } from "./player.js";
import {Projectile} from "./projectile.js";
import {Enemy} from "./enemy.js";
import {distanceBetweenTwoPoints} from "./utilities.js";

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let player;
let projectiles = [];
let enemies = [];
let particles = [];

startGame();

function startGame() {
    init();
    animate();
    spawnEnemies();
}

function init() {
    const movementLimits = {
        minX: 0,
        maxX: canvas.width,
        minY: 0,
        maxY: canvas.height
    };
    player = new Player(canvas.width/2, canvas.height/2, context, movementLimits);
    addEventListener("click", createProjectile);
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(particle => particle.alpha > 0);
    projectiles = projectiles.filter(projectileInsideWindow);
    enemies.forEach(enemy => checkHittingEnemy(enemy));
    enemies = enemies.filter(enemy => enemy.health > 0);
    // console.log(projectiles);

    particles.forEach(particle => particle.update());
    projectiles.forEach(projectile => projectile.update());
    player.update();

    enemies.forEach(enemy => enemy.update());
}

function spawnEnemies() {
    enemies.push(new Enemy(canvas.width, canvas.height, context, player));
}

function checkHittingEnemy(enemy) {
    projectiles.some((projectile, index) => {
        const distance = distanceBetweenTwoPoints(projectile.x, projectile.y, enemy.x, enemy.y);
        if (distance - enemy.radius - projectile.radius > 0) return false;

        removeProjectileByIndex(index);
        enemy.health--;
        if (enemy.health < 1) {
            enemy.createExplosion(particles);
        }

        return true;
    })
}

function removeProjectileByIndex(index) {
    projectiles.splice(index, 1);
}

function createProjectile(event) {
    projectiles.push(
        new Projectile(
            player.x,
            player.y,
            event.clientX,
            event.clientY,
            context
        )
    );
}

function projectileInsideWindow(projectile) {
    return projectile.x + projectile.radius > 0 && projectile.x - projectile.radius < canvas.width &&
        projectile.y + projectile.radius > 0 && projectile.y - projectile.radius < canvas.height;
}
