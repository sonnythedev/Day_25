
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

export {TimerAndScore}
