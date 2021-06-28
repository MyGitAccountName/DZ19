let a = 0;
let b = 0;
let i = 0;
let functionNumber = 0;
let result = '';

// Вывод на экран результата
function showResult(str) {
    document.getElementById('result').innerHTML = str;
    document.getElementById('result').style.display = 'block';
}

// Показать список заданий
function showTaskList() {
    document.getElementById('task').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    document.getElementById('taskList').style.display = 'block';
    for (i = 1; i < 3; i++) {
        document.querySelector("#task input:nth-of-type(" + i + ")").value = '';
    }
    document.querySelector("#task p:nth-of-type(1)").style.display = 'none';
    document.querySelector("#task p:nth-of-type(2)").style.display = 'none';
}

// Отображение полей ввода данных
function enterParameters(condition, ...texts) {
    document.getElementById('condition').innerText = condition;
    for (i = 0; i < texts.length; i++) {
        document.querySelector("#task h3:nth-of-type(" + (i + 1) + ")").innerHTML = texts[i];
        document.querySelector("#task h3:nth-of-type(" + (i + 1) + ")").style.display = 'block';
        document.querySelector("#task input:nth-of-type(" + (i + 1) + ")").style.display = 'block';
    }
    for (i = texts.length; i < 3; i++) {
        document.querySelector("#task h3:nth-of-type(" + (i + 1) + ")").style.display = 'none';
        document.querySelector("#task input:nth-of-type(" + (i + 1) + ")").style.display = 'none';
    }
    document.getElementById('task').style.display = 'block';
}

// Выбор заголовков для ввода данных
function setParameters(n) {
    functionNumber = n;
    document.getElementById("taskList").style.display = 'none';
    switch (n) {
        case 1: {
            enterParameters("Факториал заданного числа", "Число:");
            break;
        }
        case 2: {
            enterParameters("Числа из указанного диапазона", "Начало диапазона:", "Конец диапазона:");
            document.querySelector("#task p:nth-of-type(1)").style.display = 'block';
            document.querySelector("#task p:nth-of-type(2)").style.display = 'block';
            break;
        }
        case 3: {
            enterParameters("Вывод числа задом наперед", "Число:");
            break;
        }
        case 4: {
            enterParameters("Сумма цифр числа", "Число:");
            break;
        }
        case 5: {
            enterParameters("Вывод круглых скобок", "Количество пар:");
            break;
        }
    }
}

// Получение значения указанного параметра
function getParameter(i) {
    return document.querySelector("#task input:nth-of-type(" + (i) + ")").value;
}

// Проверка на пустоту хотя бы одного параметра
function isSomeEmpty(paramsNumber) {
    for (i = 1; i <= paramsNumber; i++)
        if (getParameter(i) === '') return true;
    return false;
}

// Проверка на тип данных для нескольких параметров
function isSomeNaN(...P) {
    for (i = 0; i < P.length; i++) {
        if (isNaN(P[i])) {
            return true;
        }
    }
    return false;
}

// Факториал заданного числа
function getFactorial(num) {
    return num === 1 ? 1 : num * getFactorial(--num);
}

function makeTask1(p1) {
    a = +p1;
    if (p1 === '' || isNaN(a)) {
        alert("Ошибка в исходных данных!");
        return '';
    } else if ((a % 1 !== 0) || (a < 1)) {
        alert("Факториал заданного числа не существует!");
        return '';
    } else return getFactorial(a);
}

// Числа из диапазона
function showNumbersInArea(begin, end) {
    return end === begin ? end : `${begin}, ${showNumbersInArea(++begin, end)} `;
}

function showNumbersInAreaReverse(begin, end) {
    return end === begin ? end : `${end}, ${showNumbersInAreaReverse(begin, --end)} `;
}

function makeTask2(p1, p2, p3) {
    a = +p1;
    b = +p2;
    if (isSomeEmpty(2) || isSomeNaN(a, b) || a > b) {
        alert("Ошибка в исходных данных!");
        return '';
    } else return (p3) ? showNumbersInArea(Math.ceil(a), Math.floor(b)) : showNumbersInAreaReverse(Math.ceil(a), Math.floor(b));
}


// Число задом наперед
function getNumberInReverse(num) {
    if (num === '') return '';
    else if (num[0] === '-') {
        return num[0] + num.slice(-1) + getNumberInReverse(num.slice(1, -1));
    } else {
        return num.slice(-1) + getNumberInReverse(num.slice(0, -1));
    }
}

function makeTask3(p1) {
    a = +p1;
    if (p1 === '' || isNaN(a)) {
        alert("Ошибка в исходных данных!");
        return '';
    } else return +(getNumberInReverse(p1));
}

// Сумма цифр числа
function getSum(num) {
    if (num === '' || num === '-') return 0;
    else if (num.slice(-1) === '.') return getSum(num.slice(0, -1));
    else return +(num.slice(-1)) + getSum(num.slice(0, -1));
}

function makeTask4(p1) {
    a = +p1;
    if (p1 === '' || isNaN(a)) {
        alert("Ошибка в исходных данных!");
        return '';
    } else return getSum(p1);
}

// Круглые скобки
function addDoubleBrackets(num) {
    return !num ? '' : '(' + addDoubleBrackets(num - 1) + ')';
}

function makeTask5(p1) {
    a = +p1;
    if (p1 === '' || isNaN(a) || (a % 1 !== 0) || a < 0) {
        alert("Ошибка в исходных данных!");
        return '';
    } else return addDoubleBrackets(a);
}

// Выполнение выбранного задания
function doChosen() {
    switch (functionNumber) {
        case 1: {
            result = makeTask1(getParameter(1));
            showResult(result);
            break;
        }
        case 2: {
            result = makeTask2(getParameter(1), getParameter(2), document.getElementById('r1').checked);
            showResult(result);
            break;
        }
        case 3: {
            result = makeTask3(getParameter(1));
            showResult(result);
            break;
        }
        case 4: {
            result = makeTask4(getParameter(1));
            showResult(result);
            break;
        }
        case 5: {
            result = makeTask5(getParameter(1));
            showResult(result);
            break;
        }
    }
}