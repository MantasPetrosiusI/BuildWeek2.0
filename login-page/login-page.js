const loginBtn = document.getElementById('login-btn');


loginBtn.addEventListener('click', function () {

    document.cookie = `username=${document.getElementById('username').value}`
})


