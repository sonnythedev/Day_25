/*
    Difficulty: Easy    

    Create a linked list of lowercase English alphabet letters, along with a method that traverses all nodes and prints their letters on a single line separated by spaces.

    Samples:
    list.printNodes() == "a b c d e f g h i j k l m n o p q r s t u v w x y z";
*/

class LinkedList{
    constructor(){
        this.start=null;
    }

    printNodes(){
        let output='';
         while(this.start!=null){
             output +=this.start.value+' ';
             this.start=this.start.next;
         }
         return output;
    }
}

class Node{
    constructor(value,next=null){
        this.value=value;
        this.next=next;
    }
}

let linkedList=new LinkedList();
let prev=null;
for(let c of "abcdefghijklmnopqrstuvwxyz"){
     let node=new Node(c);
     if(prev){
        prev.next=node;
     }else{
         linkedList.start=node;
     }
     prev=node;
}

console.log(linkedList.printNodes());