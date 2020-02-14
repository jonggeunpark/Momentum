const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function paintToDo(text)
{
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.value = "●";
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    span.innerHTML = text;
    const newId = toDos.length+1;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj =  {
        text: text,
        id : newId
    };

    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event)
{
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function saveToDos()
{ 
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function loadToDos()
{
    const loadedToDos = localStorage.getItem(TODOS_LS);
    
    if(loadedToDos !== null)
    {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        })
    }
}

function deleteToDo(event)
{
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });

    toDos = cleanToDos;
    saveToDos();
}

function init()
{
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();