console.log("page loaded");

// как нарисовать хоть что-нибудь
// без jquery
let canvas = document.getElementById('game');
// ctx - контекст для рисования, все действия только с ним
let ctx = canvas.getContext('2d'); //еще есть 'webgl'

// canvas - это прямоугольный холст из пикселей. Каждое действие перекрашивает
// пиксели. Невозможно отменить нарисованное, невозможно нарисовать в другом месте.

// https://developer.mozilla.org/ru/docs/Web/API/Canvas_API
gradient = ctx.createLinearGradient(0, 0, 640, 480);
gradient.addColorStop(0.2, "cyan");
gradient.addColorStop(0, "yellow");
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 640, 380);

ctx.fillStyle = "green";
ctx.fillRect(0, 380, 640, 100);

ctx.beginPath();
ctx.fillStyle = "grey";
ctx.arc(95,200,25,0,(Math.PI/180)*360,false);
ctx.arc(90,170,30,0,(Math.PI/180)*360,false);
ctx.arc(100,140,20,0,(Math.PI/180)*360,false);
ctx.fill();
ctx.closePath();
// параметры будущего рисования. Пока ничего не рисуется
 ctx.fillStyle = "brown"; // как в css
// эта функция уже делает рисование.
// координаты 10 по горизонтали (x), 10 по вертикали вниз.
// (0, 0) - координаты левого верхнего угла.
// 100 и 100 это высота и ширина
// ctx.fillRect(640/2 - 300/2, 200, 300, 300);
ctx.fillRect(70, 220, 50, 80);
ctx.strokeRect(70.5, 220.5, 50, 80);
/*
 рисование крыши
*/
 ctx.beginPath(); // начинаем задавать контур (пока не рисовать!)
 ctx.moveTo(50.5, 300.5); //двигаем карандашик для контура в точку
 ctx.lineTo(600.5, 80.5);
 ctx.lineTo(600.5, 300.5);
//
ctx.strokeStyle = 'black';
//  ctx.lineWidth = 4;
 ctx.stroke(); // нарисовать по контуру цветом strokeStyle
 ctx.fill(); // закрашивает. При необходимости контур закрывается - проводится линия в начало
 ctx.closePath(); // явная команда провести в контуре линию в начало
//
ctx.fillStyle = "beige";
ctx.fillRect(300, 200, 300, 300);
ctx.fillRect(50, 300, 250, 200);
ctx.strokeRect(300.5, 200.5, 300, 300);
ctx.strokeRect(50.5, 300.5, 250, 200);

ctx.fillStyle = "rgb(57, 156, 232)";
ctx.fillRect(80, 350, 190, 100);
ctx.strokeRect(80.5, 350.5, 190, 100);

ctx.fillRect(440, 350, 130, 100);
ctx.strokeRect(440.5, 350.5, 130, 100);

ctx.fillStyle = "maroon";
let x_position = 330;
ctx.fillRect(330, 350, 80, 150);
ctx.strokeRect(330.5, 350.5, 80, 150);
x_position ++;
ctx.fillStyle = "black";

ctx.beginPath();
ctx.arc(400,425,3,0,(Math.PI/180)*360,false);
ctx.fill();
ctx.closePath();

// ctx.beginPath();
// рисуем дальше
// https://developer.mozilla.org/ru/docs/Web/API/Canvas_API/Tutorial/%D0%A0%D0%B8%D1%81%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_%D1%84%D0%B8%D0%B3%D1%83%D1%80

// нарисуйте домик с трубой дымом
// * попробуйте безье
