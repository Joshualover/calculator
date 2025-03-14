function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function throttleRAF(func) {
    let rafId = null;
    return function(...args) {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            func.apply(this, args);
            rafId = null;
        });
    };
}

function checkBrackets(expr) {
    let stack = [];
    for(let char of expr) {
        if(char === '(') {
            stack.push(char);
        } else if(char === ')') {
            if(stack.length === 0) return false;
            stack.pop();
        }
    }
    return stack.length === 0;
}

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0) return 1;
    let result = 1;
    for(let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}
