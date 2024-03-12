/* LOGIN */

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isAdmin(email, password)) {
        window.location.href = './admin/index.html';
    } else {
        checkUserLogin(email, password);
    }

});

function checkUserLogin(email, password) {
    const storedFormData = JSON.parse(localStorage.getItem('formData')) || [];
    const user = storedFormData.find(user => user.email === email);

    if (user && user.password === password) {
        localStorage.setItem('nameUser', user.name);
        localStorage.setItem('userRole', 'user');
        window.location.href = './user/index.html';
    } else if (user) {
        console.log('Incorrect password. Please try again.');
        loginClearForm();
    } else {
        console.log('Email not found. Please register.');
        loginClearForm();
    }

}

function isAdmin(email, password) {
    const adminCredentials = {
        email: 'admin@gmail.com',
        password: 'admin12345'
    };

    if (email === adminCredentials.email && password === adminCredentials.password) {
        localStorage.setItem('userRole', 'admin');
        return true;
    }

    return false;
}


function loginClearForm() {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}