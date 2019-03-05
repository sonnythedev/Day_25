////START OF OOP APPROACH

//This is the main app class
class HelicopterGame{
    constructor(canvasId,theTimerId,theScoreId){
        this.myCanvas=document.getElementById(canvasId);
        this.ctx=this.myCanvas.getContext('2d');
        this.myCanvas.width=window.innerWidth-50;
        this.myCanvas.height=window.innerHeight-50;

        this.theTimerId=theTimerId;
        this.theScoreId=theScoreId;
        
        //this.timerInterval=null;
        //this.gameInterval=null;
        
        this.heliImg=new Image();
        this.heliImg.src='helicopter.png';
        //ctx.globalCompositeOperation='destination-over';
    }

    initVars(){
        this.timerAndScore=null;
        this.gameFinished=false;
        this.fiveBarsArr=[];
        this.helX=0;
        this.helY=100;
        this.dx=2;
        this.dy=1;
        this.animFrame=null;
        document.getElementById('gameStatus').style.display='none';
     }

     startGameTimer(){
         //Initialize TimerAndScore class
         this.timerAndScore=new TimerAndScore(this.theTimerId,this.theScoreId);
         this.timerAndScore.startTheTimer();
     }

     animationSection(){
         //console.log(this.fiveBarsArr);
         this.fiveBarsArr=[];
         //This makes sure of right and left boundary(x)
         if(this.helX+this.heliImg.width>this.myCanvas.width ||this.helX<0){ //adding 
            this.helX=0;
        }
        //This makes sure of top and bottom boundary(y)
        if(this.helY+50>this.myCanvas.height || this.helY<0){
            this.helY=100;
        }
        this.helX+=this.dx; //this will move helicopter horizontally
        this.helY+=this.dy; //this will move helicopter vertically
        
        //Initialize theHelicopter
        //Clear the Canvas first
        this.ctx.clearRect(0,0,this.myCanvas.width,this.myCanvas.height); 
        let helicopterObj=new Helicopter(this.myCanvas,this.ctx,'helicopter.png',this.helX,this.helY);
        helicopterObj.drawMeOnCanvas();
        this.helicopterObj=helicopterObj;

        //Obstacles
        let obstacleObj=new Obstacle(this.ctx,this.myCanvas,this.fiveBarsArr,0,0);
        obstacleObj.drawMeOnCanvas();
        //Handle The collison
        this.animFrame=requestAnimationFrame(this.animationSection.bind(this));
        this.handleCollision();

     }

     startTheGame(){
        this.initVars();
        this.startGameTimer();
        this.animationSection();
        this.handleArrowKeys();
        this.showXYCoord();
     }

     handleArrowKeys(){
         ////LETS TRY TO MANIPULATE THE HELICOPTER'S PATH ACCORDING TO ARROW KEYS( -> <- etc,). SO WE NEED TO HANDLE KEYPRESS/KEYUP EVENT HANDLER.
        //console.log('window:',window);
        window.addEventListener('keydown',
        //function(event){
            (event)=>{
            switch(event.keyCode){
                case 38:
                //keyCode 38 is arrow up
                //y-=dy;
                console.log('arrow up');
                this.helY -=10;
                //heliCopterGame.helicopterObj.drawMeOnCanvas();
                cancelAnimationFrame(this.animFrame);
                this.animationSection();
                break;

                case 40:
                //keyCode 40 is arrow down
                console.log('arrow down');
                this.helY +=10;
                //this.helicopterObj.drawMeOnCanvas();
                cancelAnimationFrame(this.animFrame);
                this.animationSection();
                break;

                case 37:
                console.log('arrow left');
                this.helX -=10;
                //drawHelicopter();
                //this.helicopterObj.drawMeOnCanvas();
                cancelAnimationFrame(this.animFrame);
                this.animationSection();
                break;

                case 39:
                //keyCode 39 is arrow right
                console.log('arrow right');
                this.helX +=10;
                //drawHelicopter();
                //this.helicopterObj.drawMeOnCanvas();
                cancelAnimationFrame(this.animFrame);
                this.animationSection();
                break;

                default:
                break;
            }
        }
        );
     }
     
     handleCollision(){
        //this.fiveBarsArr
        //if(bar1Y<y || bar2Y<y || bar3Y<y || bar4Y<y || bar5Y<y){ //We have collison
         //Handle The collison
        //console.log(this.fiveBarsArr);
        for(let i=0; i<this.fiveBarsArr.length; i++){
            if(this.fiveBarsArr[i]<this.helY){ 
                console.log('COLLISON!');
                //If we have collison then just stop timer and score
                this.gameFinished=true;
                //console.log('timerInterval:',this.timerInterval);
                //console.log('timer interval on clear:',this.timerAndScore.timerInterval);
                clearInterval(this.timerAndScore.timerInterval);
                cancelAnimationFrame(this.animFrame);
                //clearInterval(this.gameInterval);
                document.getElementById('gameStatus').style.display='block';
             }
             else{
                 console.log('NO COLLISON!');
             }
        }
        
     }

     showXYCoord(){
        this.myCanvas.addEventListener('mousemove',
        //function(event){
           (event)=>{
            let x=event.clientX-myCanvas.offsetLeft;
            let y=event.clientY-myCanvas.offsetTop
            document.getElementById('xyPos').innerHTML='x: '+x+' | y: '+y;
           }
        );
    }
}

//This is Generic Shape class
class Shape{
    constructor(x,y,imgSrc){
        this.x=x;
        this.y=y;
        this.imgSrc=imgSrc;
        this.imgObj=new Image();
        this.imgObj.src=imgSrc;
    }
    drawMeOnCanvas(){
        console.log('Generic Implementation');
    }
 }
 
 class Helicopter extends Shape{
     constructor(myCanvas,ctx,imgSrc,x,y){
         super(x,y,imgSrc);
         this.ctx=ctx;
         this.myCanvas=myCanvas;
     }
     //main method that will draw the helicopter on canvas
     drawMeOnCanvas(){
         //console.log('Generic Implementation');
         this.ctx.beginPath();
         //This basically erases your canvas
         //this.ctx.clearRect(0,0,this.myCanvas.width,this.myCanvas.height); 
         //console.log(this.x,this.y);
         this.ctx.drawImage(this.imgObj,this.x,this.y,this.imgObj.width*.7,this.imgObj.height*.7);
         this.ctx.closePath();
     }
 }
 
 class Obstacle extends Shape{
     constructor(ctx,myCanvas,fiveBarsArr,x,y){
         super(x,y,'helicopter.png');
         this.ctx=ctx;
         this.myCanvas=myCanvas;
         this.fiveBarsArr=fiveBarsArr;
     }
 
     drawMeOnCanvas(){
         this.ctx.beginPath();
         let barX=0; //by let you can keep as private variables
         let minBarHeight=this.myCanvas.height*.3; //minimum bar height is one third of the canvas height
         let barWidth=50;
         let colorArr=['red','green','blue','yellow','black'];
         for(let i=0; i<5; i++){
             barX +=(this.myCanvas.width/5);
             let barHeight=minBarHeight+Math.round((this.myCanvas.height-minBarHeight)*Math.random()) - (this.imgObj.height)*3;
             //console.log('barX:',barX,'barY:',myCanvas.height,'barWidth:',barWidth,'barHeight:',barHeight);
             let barY=this.myCanvas.height-barHeight; 
             //let rColor=Math.round(Math.random()*255);
             //let gColor=Math.round(Math.random()*255);
             //let bColor=Math.round(Math.random()*255);
             console.log(colorArr[Math.round(Math.random()*4)]);
             //console.log(Math.round(Math.random()*4));
             this.ctx.fillStyle='red';
             //this.ctx.fillStyle=colorArr[Math.round(Math.random()*4)];
             this.ctx.rect(barX,barY,barWidth,barHeight);
             this.ctx.fill();
             //ctx.rect(x,y,width,height);
             this.fiveBarsArr.push(barY);
             
         }
         /*
         ctx.drawImage(mountainImg,0,myCanvas.height-mountainImg.height,myCanvas.width,myCanvas.height);
         */
         this.ctx.closePath();
     }
     
 }


//TimerAndScore class
class TimerAndScore{
    constructor(theTimerId,theScoreId){
       this.theTimerId=theTimerId;
       this.theScoreId=theScoreId;
       this.timerInterval=null;
       this.theScore=0;
       this.secs=0;
       this.mins=0;
       this.secsStr='';
       this.minsStr='';

       //this.startTheTimer.bind(this);
    }

    startTheTimer(){
        //Start the Timer Interval
        //console.log(this.theTimerId,this.theScoreId);
        this.timerInterval=setInterval(
       //function(){
        ()=>{
        this.secs++;
        //this.theScore+=10;
        this.theScore+=20;
        if(this.secs%60==0){
            this.secs=0;
            this.mins++;
        }
        this.secsStr=this.secs<10?'0'+this.secs:this.secs;
        this.minsStr=this.mins<10?'0'+this.mins:this.mins;
        //document.getElementById(this.theTimerId).innerHTML='Hello!';
        console.log(this.secsStr,this.minsStr,this.theScore);
        document.getElementById(this.theTimerId).innerHTML=`Time: ${this.minsStr} : ${this.secsStr}`;
        document.getElementById(this.theScoreId).innerHTML=`&nbsp;&nbsp;&nbsp; Score: ${this.theScore}`;
       },
       1000
    );
  }
}



let heliCopterGame=new HelicopterGame('myCanvas','theTimer','theScore');
heliCopterGame.startTheGame();

/***
 * Exercise:
 * 
 * Change the color of the 5 bars to 5 different random colors(instead of red)
 */








