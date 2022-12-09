// task 1
var links = document.querySelector('.link-wrapper');
for (let link of links.children) {
    console.log(link.href.indexOf("https://") != -1);
    if (link.href.indexOf("https://") != -1 ) {
        link.style.color = "darkgreen";
    }
}

// task 2
document.querySelector('.create-list-btn').onclick = function() {
    let ul = document.createElement('ul');
    let liValue = prompt('Введите содержимое пункта.');

    if (!liValue) return;

    document.querySelector('.list-wrapper').append(ul);

    while (liValue) {
        let li = document.createElement('li');
        li.textContent = liValue;
        ul.append(li)
        liValue = prompt('Введите содержимое пункта.');
    }
}

// task 3 and task 5
function showNotification(e, options) {
    // task 5 start
    if (e.target.className == 'notification' || e.target.className == 'close-notification-btn') {
        return;
    }
    // task 5 end
    let div = document.createElement('div');
    div.className = 'notification';
    document.querySelector('.notifications-wrapper').append(div);
    if (options) {
        div.textContent = options;
    }

    // task 5 start
    let btn = document.createElement('button');
    btn.innerHTML = 'X';
    btn.className = 'close-notification-btn';
    div.append(btn);
    // task 5 end

    setTimeout(function() {
        div.remove();
    }, 2500);
}

// task 4
var divMiddle = document.querySelector('.middle-element-wrapper');
let img = divMiddle.firstElementChild;

function changeSize(node, size) {
    node.style.width = Number(size[0]) + 'px';
    node.style.height = Number(size[1]) + 'px';
}

function centerImage(img) {
    img.style.left = (img.parentElement.clientWidth / 2 - img.clientWidth / 2) + 'px';
    img.style.top = (img.parentElement.clientHeight / 2 - img.clientHeight / 2) + 'px';
}

function centerBlock(div) {
    div.style.left = (div.parentElement.clientWidth / 2 - div.clientWidth / 2) + 'px';
}

document.querySelector('.change-img-size-btn').onclick = function() {
    size = prompt('Введите высоту и ширину картинки.').split(' ');
    changeSize(img, size);
    centerImage(img);
};

document.querySelector('.change-block-size-btn').onclick = function() {
    size = prompt('Введите высоту и ширину поля.').split(' ');
    changeSize(divMiddle, size);
    centerImage(img);
    centerBlock(divMiddle);
};

window.onresize = function() {
    centerImage(img);
    centerBlock(divMiddle);
};

img.style.position = 'absolute';
changeSize(img, [100, 100]);
centerImage(img);

window.onclick = function(e) {
    if (!e.target.closest('.img-block-wrapper')) {
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var x = Math.floor(e.clientX - rect.left);
    var y = Math.floor(e.clientY - rect.top);
    showNotification(e, x + ' ' + y);
};

// task 5

var selectedBlock = document.querySelector('.notifications-wrapper');
selectedBlock.onclick = function(e) {
    let notification = e.target.closest('.close-notification-btn');

    if (!notification) return;
    if (!selectedBlock.contains(notification)) return;

    e.srcElement.parentElement.remove();

};
