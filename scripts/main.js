//declaration
let game ;
let ctx;//context of canvas
let Paddleheight = 70;
let Paddlewidth = 20;
let BallWidth = 20;
let speed = 3;
let ballSpeed = 3;
let angleDeg = 35;
let angle = (angleDeg*Math.PI)/180;




//================================================ classes ===============================================//
class Ball{
    positionX;
    radius;
    positionY;
    constructor(x,y,r){
        this.radius = r;
        this.positionX = x;
        this.positionY = y;
    }
    render=()=>{
        ctx.beginPath();
        ctx.arc(this.positionX,this.positionY,this.radius,0,2*Math.PI);
        ctx.fillStyle = 'pink';
        ctx.fill();
    }
}


class Paddle{
    positionX;
    height;
    width;
    positionY;
    constructor(x,y,h,w){
        this.height = h;
        this.width = w
        this.positionX = x;
        this.positionY = y;
    }
    render=()=>{
        ctx.fillStyle = "black";
        ctx.fillRect(this.positionX,this.positionY,this.height,this.width);
    }
}



//=====================================================//===================================================//





    let canvas  = document.getElementById("gameBoard");
    ctx = canvas.getContext("2d"); 


//responsive for mobile users
console.log(window.innerWidth);
    if(window.innerWidth<=500){
        canvas.height = 350;
        canvas.width = 600;
    }






//============================================== OBJECTS ===================================================//




let player1={
    X : 0,
    Y : canvas.height/2 - Paddleheight/2,
    dY : 0
}

let player2={
    X : canvas.width-Paddlewidth,
    Y : canvas.height/2 - Paddleheight/2,
    dY : 0
}


let ball = {
    X : canvas.width/2,
    Y : canvas.height/2,
    dX : 0,
    dY : 0
}

//==========================================================================================================//






function updatePlayerPosition(player) {

    if(player){

        player.Y += player.dY;
    
        // Boundary check
        if (player.Y < 0) {
            player.Y = 0;
        } else if (player.Y + Paddleheight > canvas.height) {
            player.Y = canvas.height - Paddleheight;
        }
    }
    
}

function updateBallPosition(ballobj){
    if(ballobj){
        ballobj.X += ballSpeed*Math.cos(angle);
        ballobj.Y += ballSpeed*Math.sin(angle);
    }

    // Boundary check
    if (ballobj.Y - BallWidth/2 < 0) {
        ballobj.Y = BallWidth/2;
        angle = -angle;
    } else if (ballobj.Y + BallWidth/2 > canvas.height) {
        ballobj.Y = canvas.height - BallWidth/2;
        angle = -angle;
    }

    if (ballobj.X-BallWidth/2 < Paddlewidth && ballobj.Y > player1.Y && ballobj.Y < (player1.Y+Paddleheight)) {
        ballobj.X = BallWidth/2 + Paddlewidth;
        angle = Math.PI - angle + ((Math.floor(Math.random()*20)-10)*Math.PI)/180;
       
    } else if (ballobj.X + BallWidth/2 > canvas.width - Paddlewidth  && ballobj.Y > player2.Y && ballobj.Y < (player2.Y+Paddleheight)) {
        ballobj.X = canvas.width - BallWidth/2 - Paddlewidth;
        angle = Math.PI - angle + ((Math.floor(Math.random()*20)-10)*Math.PI)/180;
    }


    if(ballobj.X < 0 || ballobj.X > canvas.width){
        setTimeout(()=>{
            endGame();
        })
    }
}



//============================================== ANIMATE ===================================================//
let lastFrame = 0;
const FPS = 60;
let FrameTime = 1000 / FPS;

animate(0);

function DrawPaddle(){
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    new Ball(ball.X,ball.Y,BallWidth/2).render();
    new Paddle(player1.X,player1.Y,Paddlewidth,Paddleheight).render();
    new Paddle(player2.X,player2.Y,Paddlewidth,Paddleheight).render();
}
function animate(timeStamp){
    let deltaTime = timeStamp - lastFrame;
    if(deltaTime > FrameTime){
        updatePlayerPosition(player1);
        updatePlayerPosition(player2);
        updateBallPosition(ball)
        DrawPaddle();
    }
    game = requestAnimationFrame(animate);
}
  

function endGame(){
    cancelAnimationFrame(game);
}
//============================================== Restart ===================================================//

function restartGame(){
    endGame();
    angle = 180+angle;
    ball.X = canvas.width/2;
    ball.Y = canvas.height/2;
    animate();
}

//============================================================================================================//

//============================================== Keyboard Controll ===================================================//
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'w':
                player1.dY = -speed;
                break;
            case 'ArrowUp':
                player2.dY = -speed;
                break;
            case 'ArrowDown':
                player2.dY = speed;
                break;
            case 's':
                player1.dY = speed;
                break;
        }
    });


    document.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'w':
            case 's':
                player1.dY = 0;
                break;

            case 'ArrowUp':
            case 'ArrowDown':
                player2.dY = 0;
                break;
        }
    });



