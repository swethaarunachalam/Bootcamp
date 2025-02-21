
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

function createTodoItem(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => {
        todoList.removeChild(li);
    };

    
    li.appendChild(deleteBtn);

    
    li.onclick = () => {
        li.classList.toggle('completed');
    };

    return li;
}
addBtn.onclick = () => {
    const taskText = todoInput.value.trim();

    if (taskText !== "") {
        const newTodoItem = createTodoItem(taskText);
        todoList.appendChild(newTodoItem);
        todoInput.value = ""; 
    }
};


todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addBtn.click();
    }
});
