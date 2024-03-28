
let rrafshi = document.createElement("canvas");
rrafshi.width = 512;
rrafshi.height = 488;
rrafshi.style.marginTop = `50px`

document.body.appendChild(rrafshi);

let br = document.createElement(`br`);
document.body.appendChild(br);

let startOver = document.createElement(`button`);
startOver.innerText = `startOver`;
startOver.style.fontSize = `20px`
startOver.style.padding = `10px`
startOver.style.visibility = `hidden`
document.body.appendChild(startOver);

let points = 0;
let timeCounter = 20;
let winPt = 8
let gameOverMsg = false;

let ctx = rrafshi.getContext("2d");

let bgrRrafsh = new Image();

let bgReady = false;
bgrRrafsh.onload = function () {
    ctx.drawImage(bgrRrafsh, 0, 0);
    bgReady = true;
};
bgrRrafsh.src = "images/background.png";

let miuReady = false;
let miuImg = new Image();
miuImg.src = "images/mouse.png";


miuImg.onload = function () {

    miuReady = true;
}
let miu = {};
miu.x = 100;
miu.y = 100;
miu.width = 52;
miu.height = 54;

let macaReady = false;
let macaImg = new Image();
macaImg.src = "images/cat.png";


macaImg.onload = function () {
    macaReady = true;
}
let maca = {};
maca.x = 300;
maca.y = 300;
maca.width = 128;
maca.height = 128;

let macaSpeed = 10;

addEventListener("keydown", function (e) {
    console.log(e.key)
    if (e.key == "ArrowRight") {
        maca.x += macaSpeed;
    }
    if (e.key == "ArrowLeft") {
        maca.x -= macaSpeed;
    }
    if (e.key == "ArrowDown") {
        maca.y += macaSpeed;
    }
    if (e.key == "ArrowUp") {
        maca.y -= macaSpeed;
    }

}, false);


let render = function () {
    if (bgReady) { ctx.drawImage(bgrRrafsh, 0, 0); }
    if (miuReady) { ctx.drawImage(miuImg, miu.x, miu.y); }
    if (macaReady) { ctx.drawImage(macaImg, maca.x, maca.y) }
    if (gameOverMsg) {
        if (points >= winPt) {
            ctx.font = "24px serif";
            ctx.fillStyle = "white";
            ctx.fillText("YOU WON  ", 205, 35);
        }
    
        else {
            ctx.font = "24px serif";
            ctx.fillStyle = "red";
            ctx.fillText("YOU LOST  ", 205, 35);
        }
    }

    if (maca.x > 500) { maca.x = -50; }
    if (maca.x < -51) { maca.x = 480; }
    if (maca.y < -64) { maca.y = 454; }
    if (maca.y > 454) { maca.y = -63; }

    // Cat touched the mouse
    if (
        maca.x < (miu.x + miu.width - 20)
        && maca.y < (miu.y + miu.height - 20)
        && miu.x < (maca.x + maca.width - 20)
        && miu.y < (maca.y + maca.height - 20)
    ) {
        if(!gameOverMsg){points++;}
        reset();
    }

    ctx.font = "24px serif";
    ctx.fillStyle = "white";
    ctx.fillText("points : " + points, 40, 50);


    ctx.fillText("Timer : " + timeCounter, 400, 50);
}

let reset = function () {
    miu.x = Math.floor(Math.random() * 400) + 20;
    miu.y = Math.floor(Math.random() * 380) + 55;
}

let timer = function () {

    if (timeCounter == 0) {
       gameOverMsg = true
       startOver.style.visibility = `visible`
    }
    else {
        timeCounter--;
    }
}

startOver.addEventListener(`click`, function(){
    location.reload()
})

reset();
let drawCanvas = setInterval(render, 1);
let timerInteval = setInterval(timer, 1000);
