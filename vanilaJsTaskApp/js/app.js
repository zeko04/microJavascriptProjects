const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    tasklist.addEventListener('click', removerTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

function getTasks(){

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li'); 
        li.className = 'collection-item';

        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);

        tasklist.appendChild(li);
    })

}

function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    const li = document.createElement('li'); 
    li.className = 'collection-item';

    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    tasklist.appendChild(li);

    storeTaskelocal(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}

function storeTaskelocal(task){
    
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removerTask(e){
    if(e.target.parentElement.classList.contains('delete-item') ){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            removeTaskFromStorage(e.target.parentElement.parentElement);
        }      
    }
}

function removeTaskFromStorage(taskItem){
    console.log(taskItem);
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent == task){
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(){
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }

    clearTasksFromStorage();
}

function clearTasksFromStorage(){
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLocaleLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );

}