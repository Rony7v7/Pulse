const btnAddTask = document.getElementById('btnAddTask');
const btnCheckTask = document.getElementById('btnCheckTask');
const btnDeleteCompleteTasks = document.getElementById('btnDeleteCompleteTasks');
const contextmenu = document.querySelector('.cm-wrapper');
const deleteTask = document.getElementById('btnDeleteTask');

const tasks = document.querySelectorAll('.task');

btnAddTask.addEventListener('click', () => {
    const dialog = document.createElement('dialog');
    dialog.setAttribute('id', 'dialogAddTask');
    dialog.setAttribute('class', 'dialog');
    dialog.innerHTML = `
    <form action="/add-task" method="POST">
        <div class="task-form">
            <div class="task-form-col">
                <input type="text" name="title" id="title" placeholder="Titulo" required>
                <input type="date" name="dueDate" id="date" required>
                <input type="" name="category" id="category" placeholder="Categoria" autocomplete="off">
            </div>
            <div class="task-form-col">
                <textarea name="description" id="description" cols="20" rows="4" placeholder="Descripcion"
                    class="task-form-description" required></textarea>
            </div>
            <div class="task-form-col">
                <select name="priority" id="priority" class="task-form-priority" required>
                    <option value="priority-1" class="priority-1">1</option>
                    <option value="priority-2" class="priority-2">2</option>
                    <option value="priority-3" class="priority-3">3</option>
                </select>
            </div>
        </div>
        <div>
            <button type="submit" class="btn btn-secondary">Añadir</button>
            <button type="button" class="btn btn-secondary" id="dialogClose">Cancelar</button>
        </div>
    </form>
    `;
    document.body.appendChild(dialog);
    dialog.showModal();
    dialog.querySelector('#dialogClose').addEventListener('click', () => {
        dialog.close();
    });
});

btnCheckTask.addEventListener('click', () => {
    const checkboxesChecked = document.querySelectorAll('.task-checkbox:checked');
    if (checkboxesChecked.length === 0) {
        return;
    }
    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', '/complete-tasks');
    checkboxesChecked.forEach((checkbox) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', 'tasks[]');
        input.setAttribute('value', checkbox.id);
        form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
});


document.addEventListener('DOMContentLoaded', function() {

    tasks.forEach(task => {
        const checkbox = task.querySelector('.task-checkbox');
        task.classList.remove('selected');

        task.addEventListener('click', function(event) {
            if (event.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
            }
        });

        task.addEventListener('contextmenu', function(event) {
            event.preventDefault();

            const x = task.offsetLeft + task.offsetWidth;
            const y = event.clientY;

            contextmenu.style.top = `${y}px`;
            contextmenu.style.left = `${x}px`;

            contextmenu.style.display = 'block';
            contextmenu.style.visibility = 'visible';

            // Asignar nueva clase al task actual
            task.classList.add('selected');
        });

    });
});

deleteTask.addEventListener('click', () => {
    const taskId = document.querySelector('.selected').id;
    const form = document.createElement('form');

    form.setAttribute('method', 'POST');
    form.setAttribute('action', '/delete-task');
    
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', 'task');
    input.setAttribute('value', taskId);
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
});

btnDeleteCompleteTasks.addEventListener('click', () => {

    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', '/delete-complete-tasks');

    document.body.appendChild(form);
    form.submit();
});