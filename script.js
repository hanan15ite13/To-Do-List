'use strict'
// btnSetTask.addEventListener('click',function(){
    // console.log("Linked sucessfully")
// })

////////////////////////////////////////////////////////
//SETTING THE DOCUMENT ELEMENTS
let btnSetTask=document.querySelector('#Enter');
let timeLabel=document.querySelector('#date-time');
let enteredText=document.querySelector('#task-textbox');
let taskView=document.querySelector('.entered-task');
let btnDone;
////////////////////////////////////
//FUNCTION FOR SETTING THE DATE AND TIME
let dateTime=function(){
    const date=new Date();
    let day=date.getDay();
    let month=date.getMonth();
    let year=date.getFullYear();
    let time=date.toLocaleTimeString();  
    let dateString=`${day}/${month}/${year}, ${time}`;
    return dateString;
}
timeLabel.textContent=dateTime();
//////////////////////////////////////////////
//FUNCTION TO GET THE TASK ENTERED
let getTask=function(){
    let text=enteredText.value;
    let html=`<li class='todoStyle'><p>${text}</p>
    <button class="btn done"><img src="assets/done-icon.svg" alt=""></button>
    <button class="btn delete"><img src="assets/deleteIcon.svg" alt=""></button>
        
    </li>`
    taskView.insertAdjacentHTML('afterbegin',html);
    btnDone=document.querySelector('.done');
   enteredText.value='';
   btnDone.addEventListener('click',markTaskComplete);
}
btnSetTask.addEventListener('click',getTask);
////////////////////////////////////////////////////
//FUNCTION TO MARK AN TASK COMPLETED
let markTaskComplete=function(){
let markedText=document.querySelector('.todoStyle');
console.log(markedText);
markedText.classList.add('line-through');
}

