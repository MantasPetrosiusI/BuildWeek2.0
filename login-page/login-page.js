const loginBtn = document.getElementById('login-btn');


loginBtn.addEventListener('click', function () {
    localStorage.setItem('username', document.getElementById('username').value)
})

//console.log(localStorage.getItem('username'))
