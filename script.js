// Initial Data
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

// Events
document.querySelectorAll('.colorArea .color').forEach(item => { //Adiciona um evento para cada uma
    item.addEventListener('click', colorClickEvent); //o evento será em clique e ativa a função
});

screen.addEventListener('mousedown', mouseDownEvent ); //Mouse clicado
screen.addEventListener('mousemove', mouseMoveEvent ); //Mouse se movendo
screen.addEventListener('mouseup', mouseUpEvent ); //Mouse deixou de ser clicado
document.querySelector('.clear').addEventListener('click', clearScreen);

// Functions
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color'); //Pega o valor em data-color e passa para a var color
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    //O 'e' é quem você clicou
    e.target.classList.add('active');
}

function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}
function mouseMoveEvent(e) {
    if(canDraw) {
        draw(e.pageX, e.pageY);
    }
}
function mouseUpEvent() {
    canDraw = false;
}
function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    //desenhar
    
    ctx.beginPath();
    ctx.lineWidth = 5; //A linha tem 5px
    ctx.lineJoin = "round"; //Terá formato de bola
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}
function clearScreen() {
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
}