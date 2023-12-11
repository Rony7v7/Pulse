const btnAddTask = document.getElementById('btnAddTask');

btnAddTask.addEventListener('click', () => {
    // crear cuadro de dialogo para añadir tarea


    const dialog = document.createElement('dialog');

    dialog.setAttribute('id', 'dialogAddTask');
    dialog.setAttribute('class', 'dialog');
    dialog.innerHTML = `
    <form action="/" method="POST">

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
