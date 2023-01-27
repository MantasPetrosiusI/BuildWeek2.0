const loginBtn = document.getElementById('login-btn');


loginBtn.addEventListener('click', function () {
    sessionStorage.setItem('username', document.getElementById('username').value)
})



