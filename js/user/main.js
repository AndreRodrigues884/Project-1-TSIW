document.getElementById('navbar-container').addEventListener('DOMContentLoaded', function () {
   
    let nameUser = localStorage.getItem('nameUser');
    let userRole = localStorage.getItem('userRole');
    let welcomeMessage = document.getElementById('welcomeMessage');
    
    if (welcomeMessage) {
        if (userRole === 'user') {
            welcomeMessage.textContent += nameUser + '!';
        } else {
            console.log('User não encontrado');
        }
    };

})


fetch('/components/user/navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
    });