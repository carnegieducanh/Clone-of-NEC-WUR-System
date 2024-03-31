const listAccount = [
    {
        username: "LW2200033",
        password: "ilovepj",
    },
];
let isLogin = !!localStorage.getItem("token");

function checkLogin() {
    if (isLogin) {
        window.location.href = "index.html";
    }
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let checkAccount = listAccount.some(
        (value) => value.username === username && value.password === password
    );
    if (checkAccount) {
        localStorage.setItem("token", username);
        isLogin = true;
        checkLogin();
    } else {
        alert("Wrong username or password!");
    }
}
