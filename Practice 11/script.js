var imageCards = [];

function updateViewAfterFunction(blockName, functionMame) {
    imageCards = takeFrogArray('.' + blockName + '-wrapper > .img-wrapper > img');
    functionMame();
    drawArray('.' + blockName + '-wrapper > .img-wrapper', imageCards);
}

function takeFrogArray(name) {
    let startArray = document.querySelectorAll(name);
    array = [];
    for (var i = 0; i < startArray.length; i++) {
        array[i] = new ImageCard(startArray[i].id, startArray[i].src);
        startArray[i].remove();
    }
    return array;
}

function ImageCard(number, src) {
    return {
        number: number,
        src: src
    }
}

function compareTo(first, second) {
    if (first.number < second.number) return -1;
    if (first.number == second.number) return 0;
    if (first.number > second.number) return 1;
}

function drawArray(blockName, drawableArray) {
    let parentNode = document.querySelector(blockName);
    for (var i = 0; i < drawableArray.length; i++) {
        let img = document.createElement('img');
        img.src = drawableArray[i].src;
        img.id = drawableArray[i].number;
        parentNode.appendChild(img);
    }
}

function swapElements() {
    updateViewAfterFunction('arr', function() {
        [index1, index2] = prompt('Введите номера первого и второго заменяемых элементов через пробел.').split(' ');
        if (index1 < 0 || index1 > imageCards.length || index2 < 0 || index2 > imageCards.length) {
            alert('Неверное значение номера!');
        } else {
            [imageCards[index1], imageCards[index2]] = [imageCards[index2], imageCards[index1]];
        }
    });
}

function deleteFirst() {
    updateViewAfterFunction('arr', function() {
        imageCards.shift();
    });
}

function filter(array, a, b) {
    let newArray = [];
    for (var i = 0; i < array.length; i++) {
        if (Number(array[i].number) >= a && Number(array[i].number) <= b) {
            newArray.push(array[i]);
        }
    }
    return newArray;
}

function filterProcessing() {
    updateViewAfterFunction('filter', function() {
        [a, b] = prompt('Введите границы отрезка допустимых значний.').split(' ');
        imageCards = filter(imageCards, a, b);
    });
}

function incSort() {
    updateViewAfterFunction('sort', function() {
        imageCards.sort(compareTo)
    });
}

function decSort() {
    updateViewAfterFunction('sort', function() {
        imageCards.sort(compareTo);
        imageCards = imageCards.reverse();
    });
}

function delay() {
    document.querySelector('.notificationsWrapper').removeEventListener('click', delay);
    clearInterval(notificationsInterval);
    setTimeout(() => {
        notificationsInterval = setInterval(() => {
            let indicator = document.querySelector('.indicator_count');
            indicator.innerHTML = Number(indicator.innerHTML) + 1;
        }, 1000);
        let indicator = document.querySelector('.indicator_count');
        indicator.innerHTML = Number(indicator.innerHTML) + 1;
        document.querySelector('.notificationsWrapper').addEventListener('click', delay);
    }, 5000);
}

document.querySelector('.delete-first-btn').addEventListener('click', deleteFirst);
document.querySelector('.swap-btn').addEventListener('click', swapElements);

document.querySelector('.filter-btn').addEventListener('click', filterProcessing);

document.querySelector('.sort-inc-btn').addEventListener('click', incSort);
document.querySelector('.sort-dec-btn').addEventListener('click', decSort);

document.querySelector('.notificationsWrapper').addEventListener('click', delay);

let notificationsInterval = setInterval(() => {
    let indicator = document.querySelector('.indicator_count');
    indicator.innerHTML = Number(indicator.innerHTML) + 1;
}, 1000);
