const btnAddTask = document.getElementById('btnAddTask');
const btnCheckTask = document.getElementById('btnCheckTask');

btnAddTask.addEventListener('click', () => {
    // crear cuadro de dialogo para añadir tarea
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
    // Obtener todos los elementos con la clase 'task'
    const tasks = document.querySelectorAll('.task');

    // Iterar sobre cada tarea
    tasks.forEach(task => {
        // Obtener la casilla de verificación y el contenedor
        const checkbox = task.querySelector('.task-checkbox');
        const container = task;

        // Agregar un listener al contenedor
        container.addEventListener('click', function(event) {
            // Verificar si el clic fue en el contenedor y no en la casilla de verificación
            if (event.target !== checkbox) {
                // Cambiar el estado de la casilla de verificación
                checkbox.checked = !checkbox.checked;
            }
        });
    });
});