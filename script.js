'use strict'


// const { filter } = require("core-js/core/array");

// btnSetTask.addEventListener('click',function(){
    // console.log("Linked sucessfully")
// })

////////////////////////////////////////////////////////
//SETTING THE DOCUMENT ELEMENTS
let btnSetTask=document.querySelector('#Enter');
let timeLabel=document.querySelector('#date-time');
let enteredText=document.querySelector('#task-textbox');
let taskView=document.querySelector('.list-items');
let filterToDo=document.querySelector('#state');
///////////////////////////////////////////////////////
//GET THE TODOS FROM THE LOCAL STORAGE
document.addEventListener('DOMContentLoaded',toGetLocalToDos);
////////////////////////////////////
//FUNCTION FOR SETTING THE DATE AND TIME
let dateTime=function(){
    const date=new Date();
    let day=date.getDate();
    let month=date.getMonth();
    let year=date.getFullYear();
    let time=date.toLocaleTimeString('en-Us',{hour12:true});  
    let dateString=`${day}/${month}/${year}, ${time}`;
    return dateString;
}
let getTime=function(){
    timeLabel.textContent=dateTime();
}
setInterval(getTime,1000);
//////////////////////////////////////////////
//FUNCTION TO GET YOUR THE TASK ENTERED
function getTask(e){
    e.preventDefault();
    let listText=enteredText.value;
    if(!listText){
        alert('Please add the task in your list :(');
        return;
    }
    const todoDiv=document.createElement('div');
    todoDiv.classList.add('todo');
    const newListItem=document.createElement('li');
    newListItem.classList.add('todoStyle');
    newListItem.innerHTML=`<p>${listText}</p>`;
    todoDiv.appendChild(newListItem);
    savaDataToLocalStorage(listText);
    const todoDoneButton=document.createElement('button');
    todoDoneButton.classList.add('btn');
    todoDoneButton.classList.add('done');
    todoDoneButton.innerHTML='<img src="assets/done-icon.svg" alt="">';
    todoDiv.appendChild(todoDoneButton);
    const todoDeleteButton=document.createElement('button');
    todoDeleteButton.classList.add('btn');
    todoDeleteButton.classList.add('delete');
    todoDeleteButton.innerHTML='<img src="assets/deleteIcon.svg" alt="">';
    todoDiv.appendChild(todoDeleteButton);
    taskView.appendChild(todoDiv);
   enteredText.value='';  
}
btnSetTask.addEventListener('click',getTask);
///////////////////////////////////////////////////
//MARK THE TASK COMPLETED
function markTaskComplete(e){
    e.preventDefault();
    let clickedItem=e.target;
    if(clickedItem.parentElement.classList.contains('done')){
        let listBtn=clickedItem.parentElement;
        let listItem=listBtn.parentElement;
        listItem.classList.toggle('line-through');
    }
    if(clickedItem.parentElement.classList.contains('delete')){
        let listBtn=clickedItem.parentElement;
        let listItem=listBtn.parentElement;
        listItem.classList.add('delete-task');
        deleteFromLocalStorage(listItem);
        listItem.addEventListener('transitionend',function(){
            listItem.remove();
        })
    }
}
taskView.addEventListener('click',markTaskComplete);
//////////////////////////////////////////////////
//FILTER ALL TASKS
function filterToDOList(event){
    event.preventDefault();
let toDos=taskView.childNodes;
toDos.forEach((todo)=>{
switch(event.target.value){
    case 'all':
        todo.style.display='flex';
        break;
        case 'completed':
            if(todo.classList.contains('line-through')){
                todo.style.display='flex';
            }
            else{
                todo.style.display='none';
            }
            break;
            case 'incomplete':
                if(!todo.classList.contains('line-through')){
                    todo.style.display='flex';
                }
                else{
                    todo.style.display='none';
                }
                break;
}

})
}
filterToDo.addEventListener('click',filterToDOList);
////////////////////////////////////////////////
//SAVE DATA TO LOCAL STORAGE
function savaDataToLocalStorage(todos){
let todo;
if(localStorage.getItem('todos')===null){
    todo=[];
}else{
    todo=JSON.parse(localStorage.getItem('todos'));
}
todo.push(todos);
localStorage.setItem('todos',JSON.stringify(todo));
}
function toGetLocalToDos(){
    let todo;
if(localStorage.getItem('todos')===null){
    todo=[];
}else{
    todo=JSON.parse(localStorage.getItem('todos'));
}
todo.forEach((todo)=>{
    const todoDiv=document.createElement('div');
    todoDiv.classList.add('todo');
    const newListItem=document.createElement('li');
    newListItem.classList.add('todoStyle');
    newListItem.innerHTML=`<p>${todo}</p>`;
    todoDiv.appendChild(newListItem);
    const todoDoneButton=document.createElement('button');
    todoDoneButton.classList.add('btn');
    todoDoneButton.classList.add('done');
    todoDoneButton.innerHTML='<img src="assets/done-icon.svg" alt="">';
    todoDiv.appendChild(todoDoneButton);
    const todoDeleteButton=document.createElement('button');
    todoDeleteButton.classList.add('btn');
    todoDeleteButton.classList.add('delete');
    todoDeleteButton.innerHTML='<img src="assets/deleteIcon.svg" alt="">';
    todoDiv.appendChild(todoDeleteButton);
    taskView.appendChild(todoDiv);

})
}
////////////////////////////////////////////////////////
//DELETE DATA FROM LOCAL STORAGE
function deleteFromLocalStorage(todos){
    let todo;
    if(localStorage.getItem('todos')===null){
        todo=[];
    }else{
        todo=JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex=todos.children[0].innerText;
    todo.splice(todo.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todo));


}