const btnAddTask = document.getElementById('btnAddTask');
const btnCheckTask = document.getElementById('btnCheckTask');
const btnDeleteCompleteTasks = document.getElementById('btnDeleteCompleteTasks');
const contextmenu = document.querySelector('.cm-wrapper');
const btnDeleteTask = document.getElementById('btnDeleteTask');
const btnEditTask = document.getElementById('btnEditTask');

const tasks = document.querySelectorAll('.task');
let currentTaskId = null;

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

    const tasks = Array.from(checkboxesChecked).map(checkbox => checkbox.id);
    fetch('/complete-tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tasks })
    }).then((res) => {
        if (res.ok) {
            window.location.reload();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {

    tasks.forEach(task => {
        const checkbox = task.querySelector('.task-checkbox');

        task.addEventListener('click', function (event) {
            if (event.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
            }
        });

        task.addEventListener('contextmenu', function (event) {
            event.preventDefault();

            const x = task.offsetLeft + task.offsetWidth;
            const y = event.clientY;

            contextmenu.style.top = `${y}px`;
            contextmenu.style.left = `${x}px`;

            contextmenu.style.display = 'block';
            contextmenu.style.visibility = 'visible';

            // si la tarea esta completada (no tiene checkbox), inhabilitar el boton de editar
            if (!checkbox) {
                btnEditTask.classList.add('disabled');
            } else {
                btnEditTask.classList.remove('disabled');
            }

            // Asignar nueva clase al task actual
            currentTaskId = task.id;
        });

    });
});

document.addEventListener('click', function (event) {
    contextmenu.style.display = 'none';
    contextmenu.style.visibility = 'hidden';
});

btnDeleteTask.addEventListener('click', () => {
    fetch(`/delete-task?id=${currentTaskId}`, {
        method: 'DELETE'
    }).then((res) => {
        if (res.ok) {
            window.location.reload();
        }
    });
});

btnDeleteCompleteTasks.addEventListener('click', () => {
    fetch('/delete-complete-tasks', {
        method: 'DELETE'
    }).then((res) => {
        if (res.ok) {
            window.location.reload();
        }
    });
});

btnEditTask.addEventListener('click', () => {

    fetch(`/get-task?id=${currentTaskId}`)
    .then((res) => res.json())
    .then((task) => {
        const dialog = document.createElement('dialog');
        dialog.setAttribute('id', 'dialogEditTask');
        dialog.setAttribute('class', 'dialog');
        dialog.innerHTML = `
        <form action="/edit-task" method="POST">
            <div class="task-form">
                <div class="task-form-col">
                    <input type="text" name="title" id="title" placeholder="Titulo" required value="${task.title}">
                    <input type="date" name="dueDate" id="date" required value="${task.dueDate}">
                    <input type="" name="category" id="category" placeholder="Categoria" autocomplete="off" value="${task.category}">
                </div>
                <div class="task-form-col">
                    <textarea name="description" id="description" cols="20" rows="4" placeholder="Descripcion"
                        class="task-form-description" required>${task.description}</textarea>
                </div>
                <div class="task-form-col">
                    <select name="priority" id="priority" class="task-form-priority" required>
                        <option value="priority-1" class="priority-1" ${task.priority === 'priority-1' ? 'selected' : ''}>1</option>
                        <option value="priority-2" class="priority-2" ${task.priority === 'priority-2' ? 'selected' : ''}>2</option>
                        <option value="priority-3" class="priority-3" ${task.priority === 'priority-3' ? 'selected' : ''}>3</option>
                    </select>
                </div>
            </div>
            <div>
                <input type="hidden" name="id" value="${task.id}">
                <button type="submit" class="btn btn-secondary">Editar</button>
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
});