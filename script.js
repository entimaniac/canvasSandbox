let mouseX = "unknown";
let mouseY = "unknown";
let canvas = document.getElementById('canvas');
let context;
context = canvas.getContext('2d');

let isDrawing = false;
let x = 0;
let y = 0;
let strokeSize = 1;

document.getElementById('strokeSizeInput').onchange = function() {
    console.log(this.value);
    strokeSize = this.value;
};
canvas.addEventListener('mousedown', e => {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
});

canvas.addEventListener('mousemove', e => {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    document.getElementById("xCoordinate").textContent = mouseX.toString();
    document.getElementById("yCoordinate").textContent = mouseY.toString();

    if (isDrawing === true) {
        drawLine(context, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }
});

window.addEventListener('mouseup', e => {
    if (isDrawing === true) {
        drawLine(context, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
    }
});

function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineWidth = strokeSize;
    context.stroke();
    context.closePath();
}

function draw() {

    actuallyDraw(context);
    drawGrid(context);
}

function getHorizontalLines(width, height) {
    let lines = [];

    let increment = height / 10;
    let y = increment;
    for (let i = 0; i < 9; i++) {
        let line = {start: {x: 0, y: y}, end: {x: width, y: y}}
        lines.push(line)
        y += increment;
    }
    return lines
}

function getVerticalLines(width, height) {
    let lines = [];

    let increment = height / 10;
    let x = increment;
    for (let i = 0; i < 9; i++) {
        let line = {start: {x: x, y: 0}, end: {x: x, y: height}}
        lines.push(line)
        x += increment;
    }
    return lines
}


function actuallyDraw(ctx) {
    ctx.beginPath();
    ctx.moveTo(125, 125);
    ctx.lineTo(125, 45);
    ctx.lineTo(45, 125);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(300, 10);
    ctx.closePath();
    ctx.stroke();
}

function drawGrid(ctx) {
    const {width, height} = ctx.canvas.getBoundingClientRect();

    let horizontalLines = getHorizontalLines(width, height);
    let verticalLines = getVerticalLines(width, height);
    for (let line of horizontalLines) {
        ctx.beginPath();
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
        ctx.closePath();
        ctx.stroke();
    }
    for (let line of verticalLines) {
        ctx.beginPath();
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
        ctx.closePath();
        ctx.stroke();
    }
}