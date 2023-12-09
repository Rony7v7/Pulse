const btnAddTask = document.getElementById('btnAddTask');

btnAddTask.addEventListener('click', () => {
    // crear cuadro de dialogo para añadir tarea


    const dialog = document.createElement('dialog');

    dialog.setAttribute('id', 'dialogAddTask');
    dialog.setAttribute('class', 'dialog');
    dialog.innerHTML = `
    <form action="/" method="POST">

        <div class="task-form">

            <div class="">
                <input type="text" name="title" id="title" placeholder="Titulo" required>
                <input type="date" name="date" id="date" required>
                <input type="text" name="category" id="title" placeholder="Categoria" required>
            </div>

            <div class="task-content">
                <textarea name="description" id="description" cols="20" rows="3" placeholder="Descripcion"
                    required></textarea>
            </div>

            <div class="">
                <select name="priority" id="priority" required>
                    <option value="priority-1" class="priority-circle priority-1"></option>
                    <option value="priority-2" class="priority-circle priority-2"></option>
                    <option value="priority-3" class="priority-circle priority-3"></option>
                </select>
            </div>
        </div>

        <div class="dialog__footer">
            <button type="submit" class="dialog__btn dialog__btn--primary">Añadir</button>
            <button type="button" class="dialog__btn dialog__btn--secondary" id="dialogClose">Cancelar</button>
        </div>
    </form>
    `;
    document.body.appendChild(dialog);
    dialog.showModal();
    
    dialog.querySelector('#dialogClose').addEventListener('click', () => {
        dialog.close();
    });
});
