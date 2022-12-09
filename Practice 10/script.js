var btn1 = document.querySelector('.btn1');
var btn2 = document.querySelector('.btn2');
var btn3 = document.querySelector('.btn3');
var text = document.querySelector('.text');

function truncate(str, maxLength) {
    if (str.length > maxLength) {
        str = str.slice(0, maxLength - 3) + "...";
    }
    return str;
}

btn1.onclick = function() {
    text.innerHTML = "Некоторая строка. Довольно длинная строка.";
}

btn2.onclick = function() {
    text.innerHTML = truncate(text.innerHTML, 10);
}

btn3.onclick = function() {
    text.innerHTML = truncate(text.innerHTML, 20);
}

var capcha = document.querySelector('.capcha');
var btn4 = document.querySelector('.btn4');
var input_capcha = document.querySelector('.capcha-input');

function generateCapcha(number) {
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let str = "";
    for (var i = 0; i < number; i++) {
        str += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return str;
}

function generateNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber);
}

function isEmpty(obj) {
    if (obj.value === "") {
        return true;
    }
    return false;
}

var capchaText = generateCapcha(5);
capcha.innerHTML = capchaText;

btn4.onclick = function() {
    console.log(input_capcha.value);
    console.log(capchaText);
    if (isEmpty(input_capcha)) {
        alert("Вы ничего не ввели, введиде капчу!");
    } else if (input_capcha.value === capchaText) {
        alert("Поздравляю, вы успешно ввели капчу");
        document.querySelector('.submit-capha').disabled = false;
    } else {
        alert("Ошибка!");
        let n = generateNumber(21);
        let m = generateNumber(21);
        capcha.innerHTML = n + " + " + m;
        capchaText = String(Number(n + m));
    }
}

var btn5 = document.querySelector('.btn5');
var accumulatorText = document.querySelector('.accumulator-text');

function Accumulator(name, value) {
    this.name = name;
    this.value = value;

    this.readPromot = function() {
        let newValue = prompt("Введите целочисленное значение.");
        this.value = Number(this.value) + Number(newValue);
    }

    this.read = function(newValue) {
        this.value = Number(this.value) + Number(newValue);
    }
}

var accum = new Accumulator('accum', 0);
btn5.onclick = function() {
    accum.readPromot();
    accumulatorText.innerHTML = accum.value;
}

var cartBtn = document.querySelector('.img-button');
var cart = document.querySelector('.cart');
// cartBtn.onclick = function() {
//     if (cart.classList.contains('big-cart') || cart.classList.contains('small-cart')) {
//         cart.classList.toggle('big-cart');
//         cart.classList.toggle('small-cart');
//     }
// }

var cartList = []
var productButtons = document.querySelectorAll('.input-wrapper > button');
productButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        addItemToCart(btn.name);
    })
});

function addItemToCart(name) {
    let input = document.querySelector(`.${name}`);
    if (!input.value) {
        return;
    } else {
        updateCartData(input.className, input.value);
        updateCartView();
        input.value = '';
    }
}

function updateCartData(name, value) {
    for (var i = 0; i < cartList.length; i++) {
        if (cartList[i].name == name) {
            cartList[i].read(value);
            return;
        }
    }
    cartList.push(new Accumulator(name, value));
}

function updateCartView() {
    for (var i = 0; i < cartList.length; i++) {
        let product = document.querySelector('.product-' + `${cartList[i].name}`);
        console.log('product-' + `${cartList[i].name}`);
        if (product) {
            console.log(product);
            product.innerHTML = cartList[i].name + ': ' + cartList[i].value + ' шт.';
        } else {
            let div = document.createElement("div");
            div.innerHTML = cartList[i].name + ': ' + cartList[i].value + ' шт.';
            div.classList.add('product-' + `${cartList[i].name}`);
            cart.appendChild(div);
        }
    }
}
