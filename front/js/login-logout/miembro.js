const formAgregarUsuario = document.getElementById('myForm');

formAgregarUsuario.addEventListener("submit", async function(event) {
    event.preventDefault(); // Evitar que se recargue la página al enviar el formulario

    // Obtener los valores del formulario
    const nombre_miembro = document.getElementById('nombre_miembro').value;
    const apellidos = document.getElementById('apellidos').value;
    const ci = document.getElementById('ci').value;

    
    console.log(nombre_miembro)
    console.log(apellidos)
    console.log(ci)


    try {
        // Enviar los datos al servidor para crear el nuevo usuario
        const response = await fetch('http://localhost:3009/ADB/create_miembro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre_miembro,
                apellidos,
                ci
            })
        });

        if (response.ok) {
            alert('Miembro creada correctamente');
        } else {
            const errorData = await response.json();
            alert(errorData.error || 'Error al crear miembro');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        alert('Error al enviar la solicitud');
    }
}); 

const categorias = document;

const paginaCategorias = categorias.querySelector('#miembro')

const Categorias = ({id_miembro, nombre_miembro, apellidos,ci, fecha_naci, estado}) => {
    // Convertir la fecha de registro a un formato de año-mes-día
    const formattedDate = new Date(fecha_naci).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });

    const buttonColor = estado === true ? 'green' : 'red';
    const buttontxt = estado === true ? 'SI' : 'NO';

    return `
        <tr id="categoria-row-${id_miembro}"> <!-- Agregar un ID único para la fila -->
            <td>${id_miembro}</td>
            <td>${nombre_miembro}</td>
            <td>${apellidos}</td>
            <td>${ci}</td>
            <td>${formattedDate}</td>
            <td>
            <div class="container-btn-state">
                <button class="btn-state" style="background-color: ${buttonColor}" >${buttontxt}</button>
            </div>
            </td>
            <td>
                <div class="button-eliminar-editar">
                    <button class="editar" onclick="editmiembro(${id_miembro})"><i class="fi fi-rr-pen-field"></i></button> <!-- Llamar a la función editCategoria -->
                    <button class="estado" onclick="changeState(${id_miembro}, ${estado})"><i class="fi fi-sr-cross-small"></i></button>
                </div>
            </td>
        </tr>
    `;
}

const editmiembro = (id_miembro) => {
    const row = document.getElementById(`categoria-row-${id_miembro}`);
    const cells = row.getElementsByTagName('td');

    for (let i = 1; i < cells.length - 1; i++) {
        const cell = cells[i];
        const oldValue = cell.innerText.trim();
        cell.innerHTML = `<input class="tab" type="text" value="${oldValue}" style="width: 60%; ">`;
    }

    const editButton = cells[cells.length - 1].getElementsByTagName('button')[0];
    editButton.innerHTML = '<i class="fi fi-rr-check"></i>';
    editButton.setAttribute('onclick', `saveChanges(${id_miembro})`);
}

// Función para guardar los cambios realizados en la fila
const saveChanges = async (id_miembro) => {
    const row = document.getElementById(`categoria-row-${id_miembro}`);
    const cells = row.getElementsByTagName('td');
    const newValues = [];

    for (let i = 1; i < cells.length - 1; i++) {
        const cell = cells[i];
        const newValue = cell.getElementsByTagName('input')[0].value;
        newValues.push(newValue);
    }

    console.log("newValues" , newValues);
    try {
        const response = await fetch(`http://localhost:3009/ADB/miembro/${id_miembro}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre_miembro: newValues[0],
                apellidos: newValues[1],
                ci: newValues[2], // Convertir a entero antes de enviar

            })

        });

        console.log("response> ",response);
        
        if (response.status !== 200) throw new Error('Error al actualizar el Miembro. Front');
        
        alert('Miembro actualizada correctamente');
        getAll();
    } catch (error) {
        alert('Error ' + error);
        
    }
}

const render = (array)=>{
    //const filteredUsers = array.filter(user => user.estado === 1); // Filtrar usuarios con state igual a 1
    const cardsHTML = array.map(item => Categorias(item)).join('');
    paginaCategorias.innerHTML = cardsHTML;
}

const getAll = async ()=>{
    try {
        const response = await fetch('http://localhost:3009/ADB/miembro')
        if (response.status !== 200) throw new Error('Error en la solicitud')
        const data = await response.json()
        render(data)
    } catch (error) {
        alert('Error ' + error)
    }
}

// CAmbiar state del usaurio (deshabilitacion logica)
const changeState = async (userId, currentState) => {
    try {
        let newState = 1;
        if (currentState == 1) {
            newState = 0;
        }
        const response = await fetch(`http://localhost:3009/ADB/miembro/${userId}/state`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ state: newState }) // Cambiar el estado a 0
        });
        if (response.status !== 200) throw new Error('Error al cambiar el estado de la miembro');
        // Actualizar la tabla después de cambiar el estado
        getAll();
    } catch (error) {
        alert('Error ' + error);
    }
}

getAll()
