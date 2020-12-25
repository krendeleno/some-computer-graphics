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
let alpha = 10;
let FPS = 60;


function drawEllipse(a,b) {
    ctx.save();
    // перенос системы координат в центр эллипса
    ctx.translate( 0 , b);
    ctx.scale(a / b, 1);
    ctx.arc(0, 0, b, 0, Math.PI * 2, true);
    ctx.restore();
}


function drawRope() {
    ctx.rect(0,0,2,30);
    ctx.stroke();
    ctx.closePath();
}

function drawSmallBlade() {
    ctx.save();
    // перенос системы координат в центр эллипса
    drawEllipse(2,8);
    ctx.restore();
}

//рисование лопасти
function drawBlade(i) {
    ctx.save();
    //палка лопасти
    ctx.beginPath();
    drawEllipse(10,40);
    // перенос системы координат к веревке
    ctx.translate( 0 , 70);
    ctx.rotate((-alpha - 30 * i)  * Math.PI / 180);
    console.log(- alpha);
    drawRope();
    //маленькая мельница
    ctx.beginPath();
    // перенос системы координат в конец веревки
    ctx.translate(0,30);

    ctx.rotate(alpha * Math.PI / 180);
    for (let i = 0; i < 12; i++) {
        ctx.rotate(30 * Math.PI / 180);
        drawSmallBlade();
    }

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

//перенос ск в центр
ctx.translate( W/2 , H/2);
//рисование кадра
function draw() {

    ctx.translate(-W/2 , -H/2);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate( W/2 , H/2);
    ctx.save();


    ctx.rotate(alpha * Math.PI / 180);
    for (let i = 1; i < 13; i++) {
        ctx.rotate(30 * Math.PI / 180);
        drawBlade(i);
    }
    ctx.restore();
}



function step(timeFromAnimationStart, timeFromLastFrame) {
    alpha = alpha + FPS * (timeFromLastFrame / 1000);
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
