console.log("page loaded");

//рандом
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// подключение графики
let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d'); //еще есть 'webgl'

function currentTime() {
    return new Date().getTime(); //getTime = кол-во мс с 1 января 1970
}

let animationStart = currentTime(); //время начала всей анимации
let lastFrameTime = currentTime(); //время рисования последнего кадра

const W = canvas.width;
const H = canvas.height;

//начальные данные
const EXP_XO = 0;
const EXP_Y0 = 0;
const SPRITE_W = 140;
const SPRITE_H = 140;
const SPRITES_COUNT = 8;
const FPS = 10;
let spriteSheet = new Image();
spriteSheet.src = "explosion.png";

balls = [];

//конструктор для типа данных шарик
function Ball(x, y, vx, vy, r, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.r = r;
    this.color = color;
    this.explosion = false;
    this.spriteIndex = 0;
    this.time = 0;
}

// получение координат клика и создание/удаление шарика
function getCursorPositionAndAdderDeleteBall(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    let deleting = false;
    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        if ((x - ball.x) * (x - ball.x) + (y - ball.y) * (y - ball.y)
            <= ball.r * ball.r) {
            ball.explosion = true;
            ball.time = currentTime();
            deleting = true;
        }
    }
    if (!deleting)
        balls.push(new Ball(x, y, getRandomInt(-200, 200), getRandomInt(-100, 100), getRandomInt(20, 30),
            "#" + randomColor));
}

canvas.addEventListener('mousedown', function (e) {
    getCursorPositionAndAdderDeleteBall(canvas, e);
});

//рисование кадра
function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        if (ball.explosion) {
            ctx.drawImage(
                spriteSheet,
                EXP_XO + ball.spriteIndex * SPRITE_W, EXP_Y0, // положение выреза на исходном изображении
                SPRITE_W, SPRITE_H, // высота и ширина выреза
                ball.x - SPRITE_W / 2, ball.y - SPRITE_H / 2, // где рисовать на canvas
                SPRITE_W * 0.05 * ball.r, SPRITE_H * 0.05 * ball.r// размер рисуемого изображения
            );
        } else {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.r, 0, (Math.PI / 180) * 360, false);
            ctx.fillStyle = ball.color;
            ctx.fill();
            ctx.closePath();
        }
    }
}

function step(timeFromAnimationStart, timeFromLastFrame) {
    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        if ((ball.y + ball.r) >= H || (ball.y - ball.r) <= 0)
            ball.vy = -ball.vy;
        if ((ball.x - ball.r) <= 0 || (ball.x + ball.r) >= W)
            ball.vx = -ball.vx

        if (ball.explosion) {
            ball.spriteIndex = Math.floor((currentTime() - ball.time) / (1000 / FPS)) % SPRITES_COUNT;
            
            if (ball.spriteIndex == 7)
                balls.splice(i, 1);
        } else {
            ball.x = ball.x + ball.vx * (timeFromLastFrame / 1000); // делим на 1000, переводим мс в сек
            ball.y = ball.y + ball.vy * (timeFromLastFrame / 1000);
        }
    }
}

function tick() {
    let now = currentTime();
    let timeFromAnimationStart = now - animationStart;
    let timeFromLastFrame = now - lastFrameTime;
    lastFrameTime = now;

    step(timeFromAnimationStart, timeFromLastFrame);
    draw();
    requestAnimationFrame(tick);
}

tick();
