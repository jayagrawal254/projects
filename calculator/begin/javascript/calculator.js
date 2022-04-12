// displaying value
let buffer = "0";
// 25 +  25 is stored
let runningtotal = 0;
// +
let previousoperator = null;

const screen = document.querySelector(".screen");

function flushoperation(intbuffer) {
    if (previousoperator === '+' ){
        runningtotal +=  intbuffer;
    }else if (previousoperator === '-'){
        runningtotal -= intbuffer;
    }else if (previousoperator === '&times;'){
        runningtotal *=  intbuffer;
    }else if (previousoperator === '&divide'){
        runningtotal /=  intbuffer;
    }
}

function handlemath(symbol) {
    if (buffer === "0"){
        return;
    }

    const intbuffer = parseInt(buffer);

    if (runningtotal === 0){
        runningtotal = intbuffer;
    }else {
        flushoperation(intbuffer);
    }

    previousoperator = symbol;

    buffer = "0";
}

function handlesymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = "0";
            runningtotal = 0;
            break;
        case '=':
            if (previousoperator === null) return;
            flushoperation(parseInt(buffer));
            previousoperator = null;
            buffer = runningtotal;
            runningtotal = 0;
            break;
        case '+':
        case '-':
        case '&times;':
        case '&divide':
            handlemath(symbol);
            break;
    }
}

function handlenumber(value) {
    if (buffer === "0"){
        buffer = value;
    }else {
        buffer += value;
    }

}

function buttonclick(value) {
    if (isNaN(value)){
        handlesymbol(value);
    }else{
        handlenumber(value);
    }
    screen.innerText = buffer;
}

const init = () => {
    document.querySelector(".calc-buttons")
        .addEventListener('click', function (event) {
        buttonclick(event.target.innerText);
    });
}
init();