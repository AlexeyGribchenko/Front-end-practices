var button1 = document.querySelector('.logginLink1');
var button2 = document.querySelector('.logginLink2');
var button3 = document.querySelector('.logginLink3');
var likeButton = document.querySelector('.likeButton');

function checkRegistration() {
    let res = prompt("Желаете пройти регистрацию на сайте?");
    if (res === "Да") {
        return true;
    } else {
        return false;
    }
}

function relocateUser(page) {
    window.location.replace(page);
}

function handleLogginLink() {
    if (checkRegistration()) {
        alert("Круто!");
        relocateUser("index4.html");
    }
    else {
        alert("Попробуй еще раз");
    }
}

button1.onclick = handleLogginLink;
button2.onclick = handleLogginLink;

button3.onclick = function() {
    let res = prompt("Введите логин");

    if (res === null || res === "") {
        alert("Отмена");
        return;
    }

    if (res === "Админ") {

        let password = prompt("Введите пароль");

        if (password === null) {
            alert("Отмена");
            return;
        }

        if (password === "Я главный") {
            alert("Здравствуйте");
            return;
        }

        alert("Неверный пароль");
        return;
    }
    alert("Я вас не знаю!");
}

var isAllowedToSpawnHearts = false;
var isAllowedToDisable = false;

function mouseHandler() {
    if (isAllowedToSpawnHearts) {
        let xPos = window.event.clientX;
        let yPos = window.event.clientY;
        let div = document.createElement('div');
        div.style.backgroundImage = "url(img/icons/red_like.png)";
        div.style.backgroundSize = "40px";
        div.style.position = "fixed";
        div.style.width = "40px";
        div.style.height = "40px";
        div.style.top = yPos + "px";
        div.style.left = xPos + "px";
        div.className = "heartElement";
        document.body.append(div);
    }
}

function disableClickHandler() {
    if (isAllowedToDisable) {
        isAllowedToSpawnHearts = false;
        console.log("spawn false");
    }
    if (isAllowedToSpawnHearts) {
        isAllowedToDisable = true;
        console.log("disable true");
    }
}

document.body.addEventListener("click", disableClickHandler);
document.body.addEventListener("mousemove", mouseHandler);


likeButton.onclick = function() {

    let content = document.querySelector('.likeButton-content');

    if (likeButton.style.backgroundColor === "green") {
        isAllowedToSpawnHearts = true;
        isAllowedToDisable = false;
        likeButton.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
        likeButton.style.backgroundImage = "url(img/icons/red_like.png)";
        content.innerHTML = Number(content.innerHTML) + 1;
    } else {
        likeButton.style.backgroundColor = "green";
        likeButton.style.backgroundImage = "url(img/icons/black_like.png)";
        content.innerHTML = Number(content.innerHTML) - 1;
    }
}
