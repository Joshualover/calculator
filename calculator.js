let history = document.getElementById('history');
let current = document.getElementById('current');
let memory = 0;
let lastResult = '';

// 修改键盘支持，添加模式判断
document.addEventListener('keydown', function(event) {
    const currentMode = document.getElementById('calculatorMode').value;
    
    if (currentMode === 'scientific') {
        const key = event.key;
        if (/[0-9\+\-\*\/\.\(\)]/.test(key)) {
            event.preventDefault();
            addToDisplay(key);
        } else if (key === 'Enter') {
            event.preventDefault();
            calculateResult();
        } else if (key === 'Escape') {
            event.preventDefault();
            clearDisplay('all');
        } else if (key === 'Backspace') {
            event.preventDefault();
            backspace();
        }
    }
});

function addToDisplay(value) {
    current.value += value;
}

// 添加退格功能
function backspace() {
    current.value = current.value.slice(0, -1);
}

// 改进清除显示功能
function clearDisplay(type) {
    if (type === 'all') {
        history.value = '';
        current.value = '';
        lastResult = '';
    } else if (type === 'current') {
        current.value = '';
    }
}

// 改进计算结果功能
function calculateResult() {
    try {
        // 保存当前表达式到历史记录
        let expression = current.value;
        // 替换特殊字符以确保安全计算
        expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        
        let result = eval(expression);
        
        // 更新历史记录
        let newHistory = `${expression} = ${result}\n${history.value}`;
        history.value = newHistory;
        
        current.value = result;
        lastResult = result;
    } catch (error) {
        current.value = 'Error';
    }
}

// 修改/扩展数学计算功能
function calculate(type) {
    let value = parseFloat(current.value || lastResult || '0');
    let expression = '';
    let result;
    
    switch(type) {
        // 三角函数和反三角函数
        case 'sin': 
            expression = `sin(${value})`;
            result = Math.sin(value);
            break;
        case 'cos': 
            expression = `cos(${value})`;
            result = Math.cos(value);
            break;
        case 'tan': 
            expression = `tan(${value})`;
            result = Math.tan(value);
            break;
        case 'asin': 
            expression = `asin(${value})`;
            result = Math.asin(value);
            break;
        case 'acos': 
            expression = `acos(${value})`;
            result = Math.acos(value);
            break;
        case 'atan': 
            expression = `atan(${value})`;
            result = Math.atan(value);
            break;
            
        // 双曲函数
        case 'sinh': 
            expression = `sinh(${value})`;
            result = Math.sinh(value);
            break;
        case 'cosh': 
            expression = `cosh(${value})`;
            result = Math.cosh(value);
            break;
        case 'tanh': 
            expression = `tanh(${value})`;
            result = Math.tanh(value);
            break;
            
        // 根号和幂运算
        case 'sqrt': 
            expression = `√(${value})`;
            result = Math.sqrt(value);
            break;
        case 'cbrt':
            expression = `∛(${value})`;
            result = Math.cbrt(value);
            break;
        case 'pow2': 
            expression = `(${value})²`;
            result = Math.pow(value, 2);
            break;
        case 'pow3': 
            expression = `(${value})³`;
            result = Math.pow(value, 3);
            break;
        case 'pow10':
            expression = `10^${value}`;
            result = Math.pow(10, value);
            break;
            
        // 对数运算
        case 'log': 
            expression = `log₁₀(${value})`;
            result = Math.log10(value);
            break;
        case 'log2':
            expression = `log₂(${value})`;
            result = Math.log2(value);
            break;
        case 'ln': 
            expression = `ln(${value})`;
            result = Math.log(value);
            break;
            
        // 数值运算
        case 'abs':
            expression = `|${value}|`;
            result = Math.abs(value);
            break;
        case 'floor':
            expression = `⌊${value}⌋`;
            result = Math.floor(value);
            break;
        case 'ceil':
            expression = `⌈${value}⌉`;
            result = Math.ceil(value);
            break;
        case 'round':
            expression = `round(${value})`;
            result = Math.round(value);
            break;
            
        // 进制转换
        case 'deg':
            expression = `${value}° → rad`;
            result = value * Math.PI / 180;
            break;
        case 'rad':
            expression = `${value}rad → °`;
            result = value * 180 / Math.PI;
            break;
            
        // 其他函数
        case 'factorial': 
            expression = `${value}!`;
            result = factorial(value);
            break;
        case '1/x': 
            expression = `1/(${value})`;
            result = 1 / value;
            break;
        case 'exp': 
            expression = `e^${value}`;
            result = Math.exp(value);
            break;
        case 'pi': 
            result = Math.PI;
            current.value = result;
            return;
        case 'e': 
            result = Math.E;
            current.value = result;
            return;
    }

    if (!isNaN(result)) {
        // 更新历史记录
        let newHistory = `${expression} = ${result}\n${history.value}`;
        history.value = newHistory;
        
        // 更新当前值和最后结果
        current.value = result;
        lastResult = result;
    } else {
        current.value = 'Error';
    }
}

// 添加括号平衡检查
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

function toggleSign() {
    if (current.value !== '') {
        current.value = (-1 * parseFloat(current.value)).toString();
    }
}

// 改进百分比计算
function calculatePercent() {
    try {
        let value = eval(current.value);
        current.value = (value / 100).toString();
    } catch (error) {
        current.value = 'Error';
    }
}

function memoryOperation(operation) {
    switch(operation) {
        case 'MC': memory = 0; break;
        case 'MR': current.value = memory; break;
        case 'M+': memory += parseFloat(current.value || 0); break;
        case 'M-': memory -= parseFloat(current.value || 0); break;
    }
}

// 修改预设函数和系数配置
const functionTemplates = {
    'linear': {
        name: 'y = ax + b',
        func: (x, coeffs) => coeffs.a * x + coeffs.b,
        coefficients: {
            a: { default: 1, name: 'a', step: 0.1 },
            b: { default: 0, name: 'b', step: 0.1 }
        }
    },
    'quadratic': {
        name: 'y = ax² + bx + c',
        func: (x, coeffs) => coeffs.a * x * x + coeffs.b * x + coeffs.c,
        coefficients: {
            a: { default: 1, name: 'a', step: 0.1 },
            b: { default: 0, name: 'b', step: 0.1 },
            c: { default: 0, name: 'c', step: 0.1 }
        }
    },
    'cubic': {
        name: 'y = ax³ + bx² + cx + d',
        func: (x, coeffs) => coeffs.a * Math.pow(x, 3) + coeffs.b * x * x + coeffs.c * x + coeffs.d,
        coefficients: {
            a: { default: 1, name: 'a', step: 0.1 },
            b: { default: 0, name: 'b', step: 0.1 },
            c: { default: 0, name: 'c', step: 0.1 },
            d: { default: 0, name: 'd', step: 0.1 }
        }
    },
    'exponential': {
        name: 'y = a·eᵇˣ',
        func: (x, coeffs) => coeffs.a * Math.exp(coeffs.b * x),
        coefficients: {
            a: { default: 1, name: '系数', step: 0.1 },
            b: { default: 1, name: '指数', step: 0.1 }
        }
    },
    'logarithmic': {
        name: 'y = a·ln(bx)',
        func: (x, coeffs) => x > 0 ? coeffs.a * Math.log(coeffs.b * x) : NaN,
        coefficients: {
            a: { default: 1, name: '系数', step: 0.1 },
            b: { default: 1, name: '底数', step: 0.1 }
        }
    },
    'sine': {
        name: 'y = a·sin(bx + c)',
        func: (x, coeffs) => coeffs.a * Math.sin(coeffs.b * x + coeffs.c),
        coefficients: {
            a: { default: 1, name: '振幅', step: 0.1 },
            b: { default: 1, name: '周期', step: 0.1 },
            c: { default: 0, name: '相位', step: 0.1 }
        }
    },
    'cosine': {
        name: 'y = a·cos(bx + c)',
        func: (x, coeffs) => coeffs.a * Math.cos(coeffs.b * x + coeffs.c),
        coefficients: {
            a: { default: 1, name: '振幅', step: 0.1 },
            b: { default: 1, name: '周期', step: 0.1 },
            c: { default: 0, name: '相位', step: 0.1 }
        }
    },
    'tan': {
        name: 'y = a·tan(bx)',
        func: (x, coeffs) => coeffs.a * Math.tan(coeffs.b * x),
        coefficients: {
            a: { default: 1, name: '系数', step: 0.1 },
            b: { default: 1, name: '周期', step: 0.1 }
        }
    },
    'absolute': {
        name: 'y = |ax + b|',
        func: (x, coeffs) => Math.abs(coeffs.a * x + coeffs.b),
        coefficients: {
            a: { default: 1, name: 'a', step: 0.1 },
            b: { default: 0, name: 'b', step: 0.1 }
        }
    },
    'power': {
        name: 'y = x^n',
        func: (x, coeffs) => Math.pow(x, coeffs.n),
        coefficients: {
            n: { default: 2, name: '指数', step: 1 }
        }
    },
    'rational': {
        name: 'y = 1/(ax + b)',
        func: (x, coeffs) => 1 / (coeffs.a * x + coeffs.b),
        coefficients: {
            a: { default: 1, name: 'a', step: 0.1 },
            b: { default: 0, name: 'b', step: 0.1 }
        }
    },
    'circle': {
        name: 'x² + y² = r²',
        func: (x, coeffs) => {
            const r = coeffs.r;
            const y = Math.sqrt(r * r - x * x);
            return [-y, y]; // 返回两个y值表示上下半圆
        },
        coefficients: {
            r: { default: 2, name: '半径', step: 0.1 }
        }
    },
    'ellipse': {
        name: '(x/a)² + (y/b)² = 1',
        func: (x, coeffs) => {
            const a = coeffs.a;
            const b = coeffs.b;
            if (Math.abs(x) > a) return NaN;
            const y = b * Math.sqrt(1 - (x * x) / (a * a));
            return [-y, y]; // 返回两个y值表示上下半椭圆
        },
        coefficients: {
            a: { default: 3, name: 'a轴', step: 0.1 },
            b: { default: 2, name: 'b轴', step: 0.1 }
        }
    },
    'hyperbola_x': {
        name: '(x/a)² - (y/b)² = 1',
        func: (x, coeffs) => {
            const a = coeffs.a;
            const b = coeffs.b;
            if (Math.abs(x) < a) return NaN;
            const y = b * Math.sqrt((x * x) / (a * a) - 1);
            return [-y, y]; // 返回两个y值表示上下支
        },
        coefficients: {
            a: { default: 2, name: 'a轴', step: 0.1 },
            b: { default: 1, name: 'b轴', step: 0.1 }
        }
    },
    'hyperbola_y': {
        name: '(y/a)² - (x/b)² = 1',
        func: (x, coeffs) => {
            const a = coeffs.a;
            const b = coeffs.b;
            const y = a * Math.sqrt(1 + (x * x) / (b * b));
            return [-y, y]; // 返回两个y值表示左右支
        },
        coefficients: {
            a: { default: 2, name: 'a轴', step: 0.1 },
            b: { default: 1, name: 'b轴', step: 0.1 }
        }
    }
};

// 修改函数绘图初始化代码
function initFunctionPlotter() {
    const canvas = document.getElementById('functionCanvas');
    const ctx = canvas.getContext('2d');
    let activeFunctions = []; // 存储当前活动的函数列表
    const colors = ['#2196F3', '#4CAF50', '#F44336', '#FF9800', '#9C27B0']; // 预设颜色
    let zoomLevel = 1;
    const zoomFactors = [0.5, 0.75, 1, 1.5, 2, 3, 4];
    let currentZoomIndex = 2; // 默认为1倍

    function resizeCanvas() {
        const container = canvas.parentElement;
        const padding = 40; // 添加边距防止溢出
        canvas.width = container.clientWidth - padding * 2;
        canvas.height = 500;
        canvas.style.margin = `0 ${padding}px`; // 设置画布边距
        return { width: canvas.width, height: canvas.height };
    }
    
    function updateZoom(direction) {
        if (direction === 'in' && currentZoomIndex < zoomFactors.length - 1) {
            currentZoomIndex++;
        } else if (direction === 'out' && currentZoomIndex > 0) {
            currentZoomIndex--;
        }
        zoomLevel = zoomFactors[currentZoomIndex];
        document.getElementById('zoomLevel').textContent = `${zoomLevel}x`;
        updatePlot();
    }
    
    function drawGrid({ width, height }) {
        const xScale = 40 * zoomLevel;
        const yScale = 40 * zoomLevel;
        const xOrigin = Math.round(width / 2);
        const yOrigin = Math.round(height / 2);
        
        ctx.clearRect(0, 0, width, height);
        
        // 绘制网格
        ctx.strokeStyle = '#f0f0f0';
        ctx.lineWidth = 0.5;
        
        // 确保网格线从原点开始
        const startX = xOrigin % xScale;
        const startY = yOrigin % yScale;
        
        // 绘制垂直网格线
        for(let x = startX; x < width; x += xScale) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // 绘制水平网格线
        for(let y = startY; y < height; y += yScale) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // 绘制坐标轴
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, yOrigin);
        ctx.lineTo(width, yOrigin);
        ctx.moveTo(xOrigin, 0);
        ctx.lineTo(xOrigin, height);
        ctx.stroke();
        
        // 绘制刻度和标签
        ctx.font = '12px Arial';
        
        // x轴刻度
        const xStart = Math.ceil(-xOrigin / xScale);
        const xEnd = Math.floor((width - xOrigin) / xScale);
        for(let i = xStart; i <= xEnd; i++) {
            const x = xOrigin + i * xScale;
            if(i !== 0) {  // 跳过原点
                ctx.beginPath();
                ctx.moveTo(x, yOrigin - 4);
                ctx.lineTo(x, yOrigin + 4);
                ctx.stroke();
                
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(i.toString(), x, yOrigin + 8);
            }
        }
        
        // y轴刻度
        const yStart = Math.ceil(-yOrigin / yScale);
        const yEnd = Math.floor((height - yOrigin) / yScale);
        for(let i = yStart; i <= yEnd; i++) {
            const y = yOrigin + i * yScale;
            if(i !== 0) {  // 跳过原点
                ctx.beginPath();
                ctx.moveTo(xOrigin - 4, y);
                ctx.lineTo(xOrigin + 4, y);
                ctx.stroke();
                
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                ctx.fillText((-i).toString(), xOrigin - 8, y);
            }
        }
        
        // 标记原点
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        ctx.fillText('O', xOrigin - 4, yOrigin + 4);
        
        return { xScale, yScale, xOrigin, yOrigin };
    }

    function addFunction(funcType) {
        const template = functionTemplates[funcType];
        if (!template) return;

        const functionId = Date.now(); // 生成唯一ID
        const colorIndex = activeFunctions.length % colors.length;
        
        const newFunction = {
            id: functionId,
            type: funcType,
            coeffs: Object.fromEntries(
                Object.entries(template.coefficients)
                    .map(([key, config]) => [key, config.default])
            ),
            color: colors[colorIndex],
            expression: template.name // 添加表达式属性
        };
        
        activeFunctions.push(newFunction);
        updateFunctionsList();
        updatePlot();
    }

    function removeFunction(id) {
        activeFunctions = activeFunctions.filter(f => f.id !== id);
        updateFunctionsList();
        updatePlot();
    }

    // 添加防抖函数
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // 使用 requestAnimationFrame 进行性能优化
    let rafId = null;
    function throttleRAF(func) {
        return function(...args) {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                func.apply(this, args);
                rafId = null;
            });
        };
    }

    // 优化更新函数
    const debouncedUpdateList = debounce(updateFunctionsList, 100);
    const throttledUpdatePlot = throttleRAF(updatePlot);

    function updateFunctionCoeff(id, coeff, value) {
        const func = activeFunctions.find(f => f.id === id);
        if (func) {
            func.coeffs[coeff] = parseFloat(value) || functionTemplates[func.type].coefficients[coeff].default;
            
            // 更新表达式
            const template = functionTemplates[func.type];
            func.expression = template.name.replace(/[a-z]/g, (match) => {
                const coeff = func.coeffs[match];
                return coeff !== undefined ? coeff : match;
            });
            
            // 使用优化后的更新函数
            debouncedUpdateList();
            throttledUpdatePlot();
        }
    }

    function updateFunctionsList() {
        const container = document.getElementById('activeFunctionsList');
        if (!container) return;
        
        container.innerHTML = '';

        activeFunctions.forEach((func, index) => {
            const template = functionTemplates[func.type];
            const div = document.createElement('div');
            div.className = 'function-item';
            div.style.borderLeftColor = func.color;
            
            // 更新当前函数表达式显示
            const currentExpression = updateExpression(func, template);
            
            let coeffsHtml = Object.entries(func.coeffs)
                .map(([key, value]) => {
                    const config = template.coefficients[key];
                    return `
                        <label>
                            <span>${config.name}:</span>
                            <input type="number" 
                                   value="${value}"
                                   step="${config.step}"
                                   data-func-id="${func.id}"
                                   data-coeff="${key}">
                            <input type="range" 
                                   min="${-10}" 
                                   max="${10}" 
                                   step="${config.step}"
                                   value="${value}"
                                   data-func-id="${func.id}"
                                   data-coeff="${key}">
                        </label>
                    `;
                }).join('');

            div.innerHTML = `
                <div class="function-header">
                    <span class="function-name">${template.name}</span>
                    <button onclick="removePlotFunction(${func.id})" class="remove-btn">×</button>
                </div>
                <div class="function-expression" style="color: ${func.color}; margin: 5px 0;">
                    当前函数：${currentExpression}
                </div>
                <div class="function-coeffs">
                    ${coeffsHtml}
                </div>
            `;
            container.appendChild(div);
        });

        // 使用事件委托处理输入事件
        container.addEventListener('input', handleCoeffChange);
    }

    // 添加事件委托处理函数
    function handleCoeffChange(event) {
        const target = event.target;
        if (target.tagName === 'INPUT') {
            const funcId = parseInt(target.dataset.funcId);
            const coeff = target.dataset.coeff;
            const value = target.value;

            // 同步更新对应的 number 或 range 输入框
            const container = target.parentElement;
            const otherInput = target.type === 'number' ? 
                container.querySelector('input[type="range"]') : 
                container.querySelector('input[type="number"]');
            otherInput.value = value;

            // 更新函数系数
            updateFunctionCoeff(funcId, coeff, value);
        }
    }

    // 更新表达式的辅助函数
    function updateExpression(func, template) {
        return template.name.replace(/[a-z]/g, (match) => {
            const coeff = func.coeffs[match];
            return coeff !== undefined ? coeff : match;
        });
    }

    function updatePlot() {
        const dimensions = resizeCanvas();
        const grid = drawGrid(dimensions);

        activeFunctions.forEach(func => {
            const template = functionTemplates[func.type];
            ctx.strokeStyle = func.color;
            ctx.lineWidth = 2;

            // 特殊处理圆锥曲线函数
            if (['circle', 'ellipse', 'hyperbola_x', 'hyperbola_y'].includes(func.type)) {
                // 分别绘制上下两支
                [-1, 1].forEach(direction => {
                    ctx.beginPath();
                    let isFirstPoint = true;

                    for(let px = 0; px <= dimensions.width; px++) {
                        const x = (px - grid.xOrigin) / grid.xScale;
                        const yValues = template.func(x, func.coeffs);

                        if (Array.isArray(yValues)) {
                            const y = direction > 0 ? yValues[1] : yValues[0];
                            if (!isFinite(y) || isNaN(y)) {
                                isFirstPoint = true;
                                continue;
                            }

                            const py = grid.yOrigin - y * grid.yScale;
                            if (py < -1000 || py > dimensions.height + 1000) {
                                isFirstPoint = true;
                                continue;
                            }

                            if (isFirstPoint) {
                                ctx.moveTo(px, py);
                                isFirstPoint = false;
                            } else {
                                ctx.lineTo(px, py);
                            }
                        }
                    }
                    ctx.stroke();
                });
            } else {
                // 普通函数绘制逻辑
                ctx.beginPath();
                let isFirstPoint = true;
                const resolution = 2;

                for(let px = 0; px <= dimensions.width * resolution; px++) {
                    const x = ((px / resolution) - grid.xOrigin) / grid.xScale;
                    const y = template.func(x, func.coeffs);
                    const py = grid.yOrigin - y * grid.yScale;

                    if (!isFinite(y) || isNaN(y)) {
                        isFirstPoint = true;
                        continue;
                    }

                    if (py < -1000 || py > dimensions.height + 1000) {
                        isFirstPoint = true;
                        continue;
                    }

                    const prevX = ((px - 1) / resolution - grid.xOrigin) / grid.xScale;
                    const prevY = template.func(prevX, func.coeffs);
                    const deltaY = Math.abs(y - prevY);
                    if (!isFirstPoint && deltaY > 10) {
                        isFirstPoint = true;
                    }

                    if (isFirstPoint) {
                        ctx.moveTo(px / resolution, py);
                        isFirstPoint = false;
                    } else {
                        ctx.lineTo(px / resolution, py);
                    }
                }
                ctx.stroke();
            }
        });
    }

    // 初始化控制界面
    document.getElementById('addFunction').addEventListener('click', () => {
        const funcType = document.getElementById('functionSelect').value;
        addFunction(funcType);
    });

    // 添加全局函数用于从HTML调用
    window.updateFunctionCoeff = updateFunctionCoeff;
    window.removePlotFunction = removeFunction;
    window.zoomPlot = (direction) => updateZoom(direction);

    // 初始化绘图
    updatePlot();
    
    // 修改初始化界面
    const controls = document.createElement('div');
    controls.className = 'plot-controls';
    controls.innerHTML = `
        <div class="zoom-controls">
            <button onclick="zoomPlot('out')">-</button>
            <span id="zoomLevel" class="zoom-label">1x</span>
            <button onclick="zoomPlot('in')">+</button>
        </div>
    `;
    document.querySelector('.function-controls').insertBefore(
        controls,
        document.querySelector('.function-select')
    );
}

// 修改模式切换函数
function switchMode(mode) {
    const display = document.querySelector('.display');
    const buttons = document.querySelector('.buttons');
    const plotter = document.getElementById('functionPlotter');
    const quadratic = document.getElementById('quadraticSolver');
    const unitConverter = document.getElementById('unitConverter');
    const calculator = document.querySelector('.calculator');
    
    // 移除所有模式类
    calculator.classList.remove('scientific', 'plotter', 'standard');
    
    // 隐藏所有内容
    [display, buttons, plotter, quadratic, unitConverter].forEach(elem => {
        if (elem) elem.style.display = 'none';
    });
    
    // 根据选择显示对应内容
    switch(mode) {
        case 'standard':
            display.style.display = 'block';
            buttons.style.display = 'grid';
            calculator.classList.add('standard');
            setupStandardButtons();
            break;
        case 'scientific':
            display.style.display = 'block';
            buttons.style.display = 'grid';
            calculator.classList.add('scientific');
            setupScientificButtons();
            break;
        case 'quadratic':
            quadratic.style.display = 'block';
            break;
        case 'plotter':
            plotter.style.display = 'block';
            calculator.classList.add('plotter');
            initFunctionPlotter();
            break;
        case 'unit':
            unitConverter.style.display = 'block';
            initUnitConverter();
            break;
    }
}

function setupStandardButtons() {
    const buttons = document.querySelector('.buttons');
    buttons.innerHTML = `
        <!-- 数字和运算符按钮 -->
        <button onclick="clearDisplay('all')">C</button>
        <button onclick="clearDisplay('current')">CE</button>
        <button onclick="backspace()">⌫</button>
        <button onclick="calculate('percent')">%</button>
        
        <button onclick="memoryOperation('MC')">MC</button>
        <button onclick="memoryOperation('MR')">MR</button>
        <button onclick="memoryOperation('MS')">MS</button>
        <button onclick="addToDisplay('/')" class="operator">÷</button>
        
        <button onclick="addToDisplay('7')">7</button>
        <button onclick="addToDisplay('8')">8</button>
        <button onclick="addToDisplay('9')">9</button>
        <button onclick="addToDisplay('*')" class="operator">×</button>
        
        <button onclick="addToDisplay('4')">4</button>
        <button onclick="addToDisplay('5')">5</button>
        <button onclick="addToDisplay('6')">6</button>
        <button onclick="addToDisplay('-')" class="operator">−</button>
        
        <button onclick="addToDisplay('1')">1</button>
        <button onclick="addToDisplay('2')">2</button>
        <button onclick="addToDisplay('3')">3</button>
        <button onclick="addToDisplay('+')" class="operator">+</button>
        
        <button onclick="toggleSign()">±</button>
        <button onclick="addToDisplay('0')">0</button>
        <button onclick="addToDisplay('.')">.</button>
        <button onclick="calculateResult()" class="equal">=</button>
    `;
}

function setupScientificButtons() {
    const buttons = document.querySelector('.buttons');
    buttons.innerHTML = `
        <!-- 第一行：内存和清除功能 -->
        <button onclick="memoryOperation('MC')">MC</button>
        <button onclick="memoryOperation('MR')">MR</button>
        <button onclick="memoryOperation('MS')">MS</button>
        <button onclick="memoryOperation('M+')">M+</button>
        <button onclick="memoryOperation('M-')">M-</button>
        <button onclick="clearDisplay('all')" class="clear-btn">C</button>

        <!-- 第二行：角度和特殊函数 -->
        <button onclick="toggleAngleMode()" id="angleMode">DEG</button>
        <button onclick="calculate('pi')">π</button>
        <button onclick="calculate('e')">e</button>
        <button onclick="calculate('factorial')">n!</button>
        <button onclick="calculate('exp')">eˣ</button>
        <button onclick="clearDisplay('current')" class="clear-btn">CE</button>

        <!-- 第三行：三角函数和基本运算 -->
        <button onclick="calculate('sin')">sin</button>
        <button onclick="calculate('cos')">cos</button>
        <button onclick="calculate('tan')">tan</button>
        <button onclick="calculate('log')">log</button>
        <button onclick="calculate('ln')">ln</button>
        <button onclick="backspace()">⌫</button>

        <!-- 第四行：反三角函数和数字 -->
        <button onclick="calculate('asin')">sin⁻¹</button>
        <button onclick="calculate('acos')">cos⁻¹</button>
        <button onclick="calculate('atan')">tan⁻¹</button>
        <button onclick="addToDisplay('7')">7</button>
        <button onclick="addToDisplay('8')">8</button>
        <button onclick="addToDisplay('9')">9</button>

        <!-- 第五行：双曲函数和基本运算 -->
        <button onclick="calculate('sinh')">sinh</button>
        <button onclick="calculate('cosh')">cosh</button>
        <button onclick="calculate('tanh')">tanh</button>
        <button onclick="addToDisplay('4')">4</button>
        <button onclick="addToDisplay('5')">5</button>
        <button onclick="addToDisplay('6')">6</button>

        <!-- 第六行：幂和根函数 -->
        <button onclick="calculate('pow2')">x²</button>
        <button onclick="calculate('pow3')">x³</button>
        <button onclick="calculate('sqrt')">√x</button>
        <button onclick="addToDisplay('1')">1</button>
        <button onclick="addToDisplay('2')">2</button>
        <button onclick="addToDisplay('3')">3</button>

        <!-- 第七行：常用函数 -->
        <button onclick="calculate('1/x')">1/x</button>
        <button onclick="calculate('abs')">|x|</button>
        <button onclick="calculate('log2')">log₂</button>
        <button onclick="addToDisplay('0')">0</button>
        <button onclick="addToDisplay('.')">.</button>
        <button onclick="addToDisplay('+')" class="operator">+</button>

        <!-- 第八行：括号和等号 -->
        <button onclick="addToDisplay('(')">(</button>
        <button onclick="addToDisplay(')')">)</button>
        <button onclick="toggleSign()">±</button>
        <button onclick="calculate('percent')">%</button>
        <button onclick="addToDisplay('/')" class="operator">÷</button>
        <button onclick="calculateResult()" class="equal">=</button>
    `;
}

// 简化一元二次方程求解功能
function solveQuadratic() {
    const a = parseFloat(document.getElementById('coefA').value);
    const b = parseFloat(document.getElementById('coefB').value);
    const c = parseFloat(document.getElementById('coefC').value);
    const solution = document.getElementById('solution');

    if (!a) {
        solution.innerHTML = "a不能为0，请输入一个有效的二次项系数";
        return;
    }

    const discriminant = b * b - 4 * a * c;
    let result = '';

    if (discriminant > 0) {
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        result = `两个不同实根：<br>x₁ = ${x1.toFixed(4)}<br>x₂ = ${x2.toFixed(4)}`;
    } else if (discriminant === 0) {
        const x = -b / (2 * a);
        result = `两个相等实根：<br>x = ${x.toFixed(4)}`;
    } else {
        const realPart = -b / (2 * a);
        const imagPart = Math.sqrt(-discriminant) / (2 * a);
        result = `两个共轭复根：<br>x₁ = ${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i<br>x₂ = ${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`;
    }

    solution.innerHTML = result;
}

// 修改初始化部分
document.addEventListener('DOMContentLoaded', function() {
    const coefInputs = ['coefA', 'coefB', 'coefC'].map(id => document.getElementById(id));
    
    // 为方程系数输入框添加专门的键盘事件处理
    coefInputs.forEach((input, index) => {
        input.addEventListener('input', updateEquation);
        // 处理Enter键
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (index < 2) {
                    coefInputs[index + 1].focus();
                } else {
                    solveQuadratic();
                }
            }
        });
    });
    
    // 初始化函数绘图模式
    const plotter = document.createElement('div');
    plotter.id = 'functionPlotter';
    plotter.style.display = 'none';
    plotter.innerHTML = `
        <div class="function-controls">
            <div class="function-select">
                <select id="functionSelect">
                    ${Object.entries(functionTemplates)
                        .map(([key, template]) => 
                            `<option value="${key}">${template.name}</option>`
                        ).join('')}
                </select>
                <button id="addFunction">添加函数</button>
            </div>
            <div id="activeFunctionsList" class="active-functions"></div>
        </div>
        <div class="canvas-container">
            <canvas id="functionCanvas"></canvas>
            <div class="zoom-controls">
                <button onclick="zoomPlot('out')" title="缩小">−</button>
                <span id="zoomLevel" class="zoom-label">1x</span>
                <button onclick="zoomPlot('in')" title="放大">+</button>
            </div>
        </div>
    `;
    document.querySelector('.calculator').appendChild(plotter);

    // 添加模式选择器
    const modeSelector = document.createElement('div');
    modeSelector.className = 'mode-selector';
    modeSelector.innerHTML = `
        <select id="calculatorMode">
            <option value="standard">标准计算器</option>
            <option value="scientific">科学计算器</option>
            <option value="quadratic">一元二次方程</option>
            <option value="plotter">函数绘图</option>
            <option value="unit">单位换算</option>
        </select>
    `;
    
    // 插入到计算器顶部
    const calculator = document.querySelector('.calculator');
    calculator.insertBefore(modeSelector, calculator.firstChild);
    
    // 为选择器添加变化事件监听
    document.getElementById('calculatorMode').addEventListener('change', function(e) {
        switchMode(e.target.value);
    });

    // 确保所有模式相关的元素都已经存在
    if (!document.getElementById('quadraticSolver')) {
        const quadratic = document.createElement('div');
        quadratic.id = 'quadraticSolver';
        quadratic.style.display = 'none';
        quadratic.innerHTML = `
            <h4>一元二次方程求解</h4>
            <p>ax² + bx + c = 0</p>
            <div class="equation-input">
                <div class="coef-group">
                    <label>a: </label>
                    <input type="number" id="coefA" step="any" placeholder="a">
                </div>
                <div class="coef-group">
                    <label>b: </label>
                    <input type="number" id="coefB" step="any" placeholder="b">
                </div>
                <div class="coef-group">
                    <label>c: </label>
                    <input type="number" id="coefC" step="any" placeholder="c">
                </div>
                <button onclick="solveQuadratic()">求解</button>
            </div>
            <div id="solution"></div>
        `;
        calculator.appendChild(quadratic);
    }
    
    // 初始化为标准计算器模式
    switchMode('standard');

    // 更新科学计算器按钮HTML
    const scientificButtons = document.querySelector('.scientific-buttons');
    if (scientificButtons) {
        scientificButtons.innerHTML = `
            <button onclick="calculate('sin')" class="scientific-btn">sin</button>
            <button onclick="calculate('cos')" class="scientific-btn">cos</button>
            <button onclick="calculate('tan')" class="scientific-btn">tan</button>
            <button onclick="calculate('sinh')" class="scientific-btn">sinh</button>
            <button onclick="calculate('cosh')" class="scientific-btn">cosh</button>
            <button onclick="calculate('tanh')" class="scientific-btn">tanh</button>
            <button onclick="calculate('asin')" class="scientific-btn">asin</button>
            <button onclick="calculate('acos')" class="scientific-btn">acos</button>
            <button onclick="calculate('atan')" class="scientific-btn">atan</button>
            <button onclick="calculate('sqrt')" class="scientific-btn">√</button>
            <button onclick="calculate('cbrt')" class="scientific-btn">∛</button>
            <button onclick="calculate('pow2')" class="scientific-btn">x²</button>
            <button onclick="calculate('pow3')" class="scientific-btn">x³</button>
            <button onclick="calculate('pow10')" class="scientific-btn">10ˣ</button>
            <button onclick="calculate('log')" class="scientific-btn">log₁₀</button>
            <button onclick="calculate('log2')" class="scientific-btn">log₂</button>
            <button onclick="calculate('ln')" class="scientific-btn">ln</button>
            <button onclick="calculate('exp')" class="scientific-btn">eˣ</button>
            <button onclick="calculate('factorial')" class="scientific-btn">n!</button>
            <button onclick="calculate('1/x')" class="scientific-btn">1/x</button>
            <button onclick="calculate('abs')" class="scientific-btn">|x|</button>
            <button onclick="calculate('floor')" class="scientific-btn">⌊x⌋</button>
            <button onclick="calculate('ceil')" class="scientific-btn">⌈x⌉</button>
            <button onclick="calculate('round')" class="scientific-btn">round</button>
            <button onclick="calculate('deg')" class="scientific-btn">→rad</button>
            <button onclick="calculate('rad')" class="scientific-btn">→deg</button>
            <button onclick="calculate('pi')" class="scientific-btn">π</button>
            <button onclick="calculate('e')" class="scientific-btn">e</button>
            <button onclick="addToDisplay('(')" class="scientific-btn">(</button>
            <button onclick="addToDisplay(')')" class="scientific-btn">)</button>
        `;
    }
});