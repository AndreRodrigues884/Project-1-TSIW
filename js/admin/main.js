let logoutButton = document.getElementById('logout')

function handleLogout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userRole');
    window.location.href = '/views/LoginView.html';
}

logoutButton.addEventListener('click', handleLogout);

const storedFormData = JSON.parse(localStorage.getItem('formData')) || [];

function displayUsers() {
    const userTable = document.getElementById('userTable');

    storedFormData.forEach((user, index) => {
        const row = userTable.insertRow(-1);

        // Coluna de ID
        const cellId = row.insertCell(0);
        cellId.textContent = index + 1;

        // Coluna de E-mail
        const cellEmail = row.insertCell(1);
        cellEmail.textContent = user.email;

        // Coluna de Detalhes
        const cellDetails = row.insertCell(2);
        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Detalhes';
        detailsButton.addEventListener('click', () => showDetails(index + 1));
        cellDetails.appendChild(detailsButton);

        // Coluna de Eliminar
        const cellDelete = row.insertCell(3);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => deleteUser(index + 1));
        cellDelete.appendChild(deleteButton);
    });
}

let modal = document.getElementById('userDetailsModal')
let closeModal = document.getElementById('closeModal');

function showDetails(userId) {
    const user = storedFormData[userId - 1];

    if (user) {
        document.getElementById('modalId').textContent = 'Detalhes do Usuário ' + userId;
        document.getElementById('modalUserName').textContent = 'Nome: ' + user.name;
        document.getElementById('modalUserEmail').textContent = 'Email: ' + user.email;
        document.getElementById('modalUserLocation').textContent = 'Localização: ' + user.location;
        document.getElementById('modalUserDob').textContent = 'Data De Nascimento: ' + user.dob;
        document.getElementById('modalUserSex').textContent = 'Gênero: ' + user.sex;
        modal.style.display = 'block';
    } else {
        console.log('Usuário não encontrado');
    }
 
}

function hideModal() {
    modal.style.display = 'none';
}

closeModal.addEventListener('click', hideModal);



function deleteUser(userId) {
    console.log(`Elimina ${userId}`);
    const storedFormData = JSON.parse(localStorage.getItem('formData')) || [];
    const updatedFormData = storedFormData.filter((_user, index) => index !== userId - 1);
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
    refreshTable();
}

function refreshTable() {
    const userTable = document.getElementById('userTable');
    while (userTable.rows.length > 1) {
        userTable.deleteRow(1);
    }
    displayUsers();
}

displayUsers();



//EDITAR INFO
/* const descriptionInput = document.getElementById('descriptionInput');
const saveDescriptionButton = document.getElementById('saveDescriptionButton');

const storedDescription = localStorage.getItem('description');
if (storedDescription) {
    descriptionInput.value = storedDescription;
}

saveDescriptionButton.addEventListener('click', function() {
    const newDescription = descriptionInput.value;
    localStorage.setItem('description', newDescription);
    alert('Description saved successfully!');
});
 */