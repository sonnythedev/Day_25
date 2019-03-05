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
         for(let i=0; i<5; i++){
             barX +=(this.myCanvas.width/5);
             let barHeight=minBarHeight+Math.round((this.myCanvas.height-minBarHeight)*Math.random()) - (this.imgObj.height)*3;
             //console.log('barX:',barX,'barY:',myCanvas.height,'barWidth:',barWidth,'barHeight:',barHeight);
             let barY=this.myCanvas.height-barHeight; 
             this.ctx.fillStyle='red';
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

 export {Shape, Helicopter, Obstacle}
