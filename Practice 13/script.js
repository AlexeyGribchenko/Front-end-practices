// task 3
document.onselect = function(e) {
    e.preventDefault();
}


// task 1
document.getElementById('contents').addEventListener('click', function(e) {
    let link = e.target.closest('a');

    if (!link) return;
    if (!confirm("Вы действительно хотите перейти по ссылке?")) {
        e.preventDefault();
    }
})

// task 2
document.querySelector('.small-images').addEventListener('click', (e) => {
    if (e.target.tagName == "IMG") {
        let mainImg = document.querySelector('.main-image > img');
        let tmpSrc = e.target.src
        e.target.src = mainImg.src;
        mainImg.src = tmpSrc;
    }
})

// task 3
document.querySelector('.list-wrapper').addEventListener('click', (e) => {
    if (e.target.tagName == "IMG") {
        let selected = document.querySelectorAll('.selected');

        if (!e.ctrlKey) {
            selected.forEach(obj => {
                obj.classList.remove('selected');
                obj.classList.add('dark')
            });
        }

        e.target.classList.remove("dark");
        e.target.classList.add("selected");
    }
})

// tsak 4
let sliderLine = document.querySelector('.slider-line');
let sliderThumb = document.querySelector('.slider-button');

sliderThumb.onmousedown = function(e) {
    e.preventDefault();

    let shiftX = e.clientX - sliderThumb.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(e) {
        let newLeft = e.clientX - shiftX - sliderLine.getBoundingClientRect().left;

        if (newLeft < 0) {
            newLeft = 0;
        }
        let rightEdge = sliderLine.offsetWidth - sliderThumb.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        sliderThumb.style.left = newLeft + 'px';
    }

    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }
};

sliderThumb.ondragstart = function() {
    return false;
};

// task 5

var currentDroppable = null;
var stone = document.querySelector('.stone-wrapper');

stone.onmousedown = function(e) {
    e.preventDefault();

    let target = e.target;

    if (target.tagName != "IMG") return;

    let shiftX = e.clientX - target.getBoundingClientRect().left;
    let shiftY = e.clientY - target.getBoundingClientRect().top;

    target.hidden = true;
    let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
    target.hidden = false;

    currentDroppable = elemBelow.closest('.droppable');

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(e) {
        let newLeft = e.clientX - shiftX - target.parentNode.getBoundingClientRect().left;
        let newTop = e.clientY - shiftY - target.parentNode.getBoundingClientRect().top;

        target.style.zIndex = 1000;

        target.style.top = newTop + 'px';
        target.style.left = newLeft + 'px';

        target.hidden = true;
        let elementsBelow = document.elementsFromPoint(e.clientX, e.clientY);
        let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        target.hidden = false;

        let droppableBelow = elemBelow.closest('.droppable');

        if (currentDroppable != droppableBelow) {
            if (currentDroppable) {
                leaveDroppable(target);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) {
                enterDroppable(target);
            }
        }
    }

    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }
};


function enterDroppable(target) {
    updateFrogAmount(true, target);
}

function leaveDroppable(target) {
    updateFrogAmount(false, target);
}

function updateFrogAmount(isIncrease, target) {
    let span = document.querySelector('.number-of-frogs');
    let number = Number(span.innerHTML.split(' ')[0]);

    if (isIncrease) {
        number += Number(target.dataset.amount);
    } else {
        number -= Number(target.dataset.amount);
    }
    span.innerHTML = `${number} шт.`;
}

// task 6

var frog = document.querySelector('.jumping-frog > img');
var startPosFrog1;

frog.onclick = () => {

    startPosFrog1 = frog.style.left;
    startPosFrog1 = Number(startPosFrog1.slice(0, startPosFrog1.length - 2));

    animate({
        timing: timing,
        draw: draw,
        duration: 1000
    });

    function timing(time) {
        return time;
    }

    function draw(progress) {
        frog.style.left = startPosFrog1 + progress * 400 + 'px';
        let time = 1000 * progress;
        frog.style.bottom = (0.001 * (-time * time) + time) + 'px';
        frog.style.transform = `rotate(${360 * progress}deg)`;
    }
}

var caterpillar = document.querySelector('.caterpillar > img');
var caterpillarStartPos;

caterpillar.onclick = () => {

    caterpillarStartPos = caterpillar.style.left;
    caterpillarStartPos = Number(caterpillarStartPos.slice(0, caterpillarStartPos.length - 2));

    animate({
        timing: timing,
        draw: draw,
        duration: 1500
    });

    function timing(time) {
        return time;
    }

    function draw(progress) {
        if (progress <= 0.5) {
            caterpillar.style.width = 200 + progress * 200 * 2 + 'px';
        } else {
            caterpillar.style.width = 200 * 2 - (progress - 0.5) * 200 * 2 + 'px';
            caterpillar.style.left = caterpillarStartPos + (progress - 0.5) * 200 * 2 + 'px';
        }
    }
}


function animate({timing, draw, duration}) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {

        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

function returnElem(elem) {
    elem.style.left = 0 + 'px';
    elem.style.bottom = 0 + 'px';
}

document.querySelector('.return-btn-frog').onclick = function() {
    returnElem(frog);
}

document.querySelector('.return-btn-caterpillar').onclick = function() {
    returnElem(caterpillar);
}

var clicks = 0;
document.querySelector('.animations-wrapper').onclick = function() {
    clicks++;
    if (clicks == 20) {
        frog.style.width = '500px';
        frog.style.height = '500px';
    }
    if (clicks == 40) {
        alert('Ура победа! Все практики сданы!');
    }
}
