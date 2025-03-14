// 角度模式（默认为角度制）
let isRadianMode = false;

// 角度模式切换
function toggleAngleMode() {
    isRadianMode = !isRadianMode;
    const angleModeBtn = document.getElementById('angleMode');
    angleModeBtn.textContent = isRadianMode ? 'RAD' : 'DEG';
    angleModeBtn.classList.toggle('active', isRadianMode);
}

// 科学计算功能
function calculate(type) {
    let value = parseFloat(current.value || lastResult || '0');
    
    // 角度转弧度（如果需要）
    if (!isRadianMode && ['sin', 'cos', 'tan', 'sinh', 'cosh', 'tanh'].includes(type)) {
        value = value * Math.PI / 180;
    }

    let expression = '';
    let result;
    
    switch(type) {
        // 三角函数
        case 'sin': result = Math.sin(value); expression = `sin(${current.value})`; break;
        case 'cos': result = Math.cos(value); expression = `cos(${current.value})`; break;
        case 'tan': result = Math.tan(value); expression = `tan(${current.value})`; break;
        case 'asin': result = Math.asin(value); expression = `asin(${current.value})`; break;
        case 'acos': result = Math.acos(value); expression = `acos(${current.value})`; break;
        case 'atan': result = Math.atan(value); expression = `atan(${current.value})`; break;

        // 双曲函数
        case 'sinh': result = Math.sinh(value); expression = `sinh(${current.value})`; break;
        case 'cosh': result = Math.cosh(value); expression = `cosh(${current.value})`; break;
        case 'tanh': result = Math.tanh(value); expression = `tanh(${current.value})`; break;

        // 指数和对数
        case 'exp': result = Math.exp(value); expression = `e^(${current.value})`; break;
        case 'ln': result = Math.log(value); expression = `ln(${current.value})`; break;
        case 'log': result = Math.log10(value); expression = `log(${current.value})`; break;
        case 'log2': result = Math.log2(value); expression = `log₂(${current.value})`; break;
        case 'pow2': result = Math.pow(value, 2); expression = `(${current.value})²`; break;
        case 'pow3': result = Math.pow(value, 3); expression = `(${current.value})³`; break;
        case 'pow10': result = Math.pow(10, value); expression = `10^(${current.value})`; break;

        // 根式运算
        case 'sqrt': result = Math.sqrt(value); expression = `√(${current.value})`; break;
        case 'cbrt': result = Math.cbrt(value); expression = `∛(${current.value})`; break;

        // 其他数学函数
        case 'abs': result = Math.abs(value); expression = `|${current.value}|`; break;
        case 'floor': result = Math.floor(value); expression = `⌊${current.value}⌋`; break;
        case 'ceil': result = Math.ceil(value); expression = `⌈${current.value}⌉`; break;
        case 'round': result = Math.round(value); expression = `round(${current.value})`; break;
        case 'factorial': result = factorial(value); expression = `${current.value}!`; break;
        case '1/x': result = 1 / value; expression = `1/(${current.value})`; break;
        case 'percent': result = value / 100; expression = `${current.value}%`; break;

        // 常数
        case 'pi': result = Math.PI; expression = 'π'; break;
        case 'e': result = Math.E; expression = 'e'; break;

        // 角度弧度转换
        case 'deg': 
            result = value * 180 / Math.PI; 
            expression = `${current.value}rad → ${result}°`; 
            break;
        case 'rad': 
            result = value * Math.PI / 180; 
            expression = `${current.value}° → ${result}rad`; 
            break;
    }

    // 更新显示
    if (!isNaN(result) && result !== undefined) {
        history.value = `${expression} = ${result}\n${history.value}`;
        current.value = result;
        lastResult = result;
    } else {
        current.value = 'Error';
    }
}

// 辅助函数
function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

function deg2rad(deg) {
    return deg * Math.PI / 180;
}

function rad2deg(rad) {
    return rad * 180 / Math.PI;
}
