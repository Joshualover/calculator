function addToDisplay(value) {
    current.value += value;
}

function backspace() {
    current.value = current.value.slice(0, -1);
}

function clearDisplay(type) {
    if (type === 'all') {
        history.value = '';
        current.value = '';
        lastResult = '';
    } else if (type === 'current') {
        current.value = '';
    }
}

function calculateResult() {
    try {
        let expression = current.value;
        expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(expression);
        let newHistory = `${expression} = ${result}\n${history.value}`;
        history.value = newHistory;
        current.value = result;
        lastResult = result;
    } catch (error) {
        current.value = 'Error';
    }
}

function memoryOperation(operation) {
    switch(operation) {
        case 'MC': memory = 0; break;
        case 'MR': current.value = memory; break;
        case 'MS': memory = parseFloat(current.value || 0); break;
        case 'M+': memory += parseFloat(current.value || 0); break;
        case 'M-': memory -= parseFloat(current.value || 0); break;
    }
}
