fetch('/components/admin/navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
    });

function displayUsers() {
    const userTable = document.getElementById('userTable');
    const storedFormData = JSON.parse(localStorage.getItem('formData')) || [];

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

function showDetails(userId) {
    alert(`Detalhes do usuário com ID ${userId}`);
}

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