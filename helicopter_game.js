let myCanvas=document.getElementById('myCanvas');
let ctx=myCanvas.getContext('2d');
myCanvas.width=window.innerWidth-50;
myCanvas.height=window.innerHeight-50;

let gameFinished=false;
let timerInterval=null;
let gameInterval=null;

//ctx.globalCompositeOperation='destination-over';

let bar1Y=null;
let bar2Y=null;
let bar3Y=null;
let bar4Y=null;
let bar5Y=null;

//let helicopterImg=document.getElementById('imgHelicopter');
//console.log(helicopterImg);

let helipcopterImg=new Image();
helipcopterImg.src='helicopter.png';
//helipcopterImg.src='helicopter.gif';
//helipcopterImg.height=helipcopterImg.height*.3;

function drawObstacles(){
    //Draw Obstacles method will basically draw obstacles on screen
    //Lets draw 5 random height bars on the screen
    ctx.beginPath();
    let barX=0;
    let minBarHeight=myCanvas.height*.3; //minimum bar height is one third of the canvas height
    let barWidth=50;
    for(let i=0; i<5; i++){
        barX +=(myCanvas.width/5);
        let barHeight=minBarHeight+Math.round((myCanvas.height-minBarHeight)*Math.random()) - (helipcopterImg.height)*3;
        console.log('barX:',barX,'barY:',myCanvas.height,'barWidth:',barWidth,'barHeight:',barHeight);
        let barY=myCanvas.height-barHeight; 
        ctx.fillStyle='red';
        ctx.rect(barX,barY,barWidth,barHeight);
        ctx.fill();
        //ctx.rect(x,y,width,height);
        
        switch(i){
            case 0:
               bar1Y=barY;
             break;

             case 1:
               bar2Y=barY;
             break;

             case 2:
               bar3Y=barY;
             break;

             case 3:
               bar4Y=barY;
             break;

             case 4:
               bar5Y=barY;
             break;

             default:
               break;
            
        }
    }
    /*
    ctx.drawImage(mountainImg,0,myCanvas.height-mountainImg.height,myCanvas.width,myCanvas.height);
    */
    ctx.closePath();
}

//We have to wait till the image loads
helipcopterImg.onload=function(){
    ctx.beginPath();
    ctx.drawImage(helipcopterImg,50,50);
    ctx.closePath();
}

 let x=0;
 let y=100;
 let dx=30;
 let dy=30;

 function drawHelicopter(){
    ctx.beginPath();
    //This makes sure of right and left boundary(x)
    if(x+helipcopterImg.width>myCanvas.width ||x<0){ //adding 
        //dx=-dx;
        //y +=dy;
        x=0;
    }
    //This makes sure of top and bottom boundary(y)
    if(y+50>myCanvas.height ||y<0){
        //console.log('hit top bottom boundary!');
        //console.log(x,y);
        //dy=-dy;
        //y +=dy;
        y=100;

    }
    

    ctx.clearRect(0,0,myCanvas.width,myCanvas.height); //This basically erases your canvas
    //ctx.drawImage(helipcopterImg,x,y);
    ctx.drawImage(helipcopterImg,x,y,helipcopterImg.width*.7,helipcopterImg.height*.7);
    ctx.closePath();
    drawObstacles();

    //We can add logic for COLLISION below
    console.log(bar1Y,bar2Y,bar3Y,bar4Y,bar5Y);
    //y is the Y coordinate of the Helicopter
    if(bar1Y<y || bar2Y<y || bar3Y<y || bar4Y<y || bar5Y<y){ //We have collison
       console.log('COLLISON!');
       //If we have collison then just stop timer and score
       gameFinished=true;
       clearInterval(timerInterval);
       clearInterval(gameInterval);
       document.getElementById('gameStatus').style.display='block';
    }
    else{
        console.log('NO COLLISON!');
    }
}

////LETS TRY TO MANIPULATE THE HELICOPTER'S PATH ACCORDING TO ARROW KEYS( -> <- etc,). SO WE NEED TO HANDLE KEYPRESS/KEYUP EVENT HANDLER.
window.addEventListener('keydown',
   function(event){
       console.log(event);

       switch(event.keyCode){
           case 38:
             //keyCode 38 is arrow up
             y-=dy;
             drawHelicopter();
           break;

           case 40:
             //keyCode 40 is arrow down
             y+=dy;
             drawHelicopter();
           break;

           case 37:
             //keyCode 37 is arrow left
             x-=dx;
             drawHelicopter();
           break;

           case 39:
             //keyCode 39 is arrow right
             x+=dx;
             drawHelicopter();
           break;

           default:
            break;
       }

       
   }
);

myCanvas.addEventListener('mousemove',
   function(event){
       //console.log(event.clientX);
       //console.log(event.clientY);
       let x=event.clientX-myCanvas.offsetLeft;
       let y=event.clientY-myCanvas.offsetTop
       document.getElementById('xyPos').innerHTML='x: '+x+' | y: '+y;
   }
);

/*
  let d1=Date();
  d1.getMinutes();
  d1.getSeconds();
  d1.getMillisecods();
*/

//let timerStarted=false;

function startTheGame(){
    //Reset the variables
    let theScore=0;
    let secs=0;
    let mins=0;
    let secsStr='',minsStr='';
    x=0;
    y=100;
    document.getElementById('gameStatus').style.display='none';

    //Start the Timer Interval
    timerInterval=setInterval(
        function(){
         secs++;
         theScore+=10;
         if(secs%60==0){
             secs=0;
             mins++;
         }
         secs<10?secsStr='0'+secs:secsStr=secs;
         mins<10?minsStr='0'+mins:minsStr=mins;
         
         //timerStarted=true;
         document.getElementById('theTimer').innerHTML=`Time: ${minsStr} : ${secsStr}`;
         document.getElementById('theScore').innerHTML=`&nbsp;&nbsp;&nbsp;Score: ${theScore}`;
        },
        1000
     );
     
     //Start The Game Interval
     gameInterval=setInterval(
        function(){
           x+=dx; //this will move helicopter horizontally
           y+=dy; //this will move helicopter vertically
           drawHelicopter();
        },
        300);

}

////This is called when the Page loads
startTheGame();
