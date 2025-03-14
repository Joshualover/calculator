// 标准计算器的数字格式化
function formatStandardNumber(num) {
    if (isNaN(num)) return 'Error';
    
    // 处理整数和小数
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

// 标准计算器的基本运算
function standardCalculate() {
    try {
        let expression = current.value;
        // 去除数字中的千分位逗号
        expression = expression.replace(/,/g, '');
        // 替换显示符号为计算符号
        expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        
        let result = eval(expression);
        // 格式化结果
        const formattedResult = formatStandardNumber(result);
        
        // 更新历史记录
        history.value = `${expression} = ${formattedResult}\n${history.value}`;
        current.value = formattedResult;
        lastResult = result;
        
    } catch (error) {
        current.value = 'Error';
    }
}

// 输入数字时自动格式化显示
function addToStandardDisplay(value) {
    if (current.value === '0' && value !== '.') {
        current.value = value;
    } else {
        current.value += value;
    }
    
    // 如果不是运算符，则格式化数字
    if (!'+-×÷'.includes(value)) {
        const parts = current.value.split(/[\+\-×÷]/);
        const lastNumber = parts[parts.length - 1];
        if (lastNumber && value !== '.') {
            const formattedNumber = formatStandardNumber(parseFloat(lastNumber));
            current.value = parts.slice(0, -1).join('') + formattedNumber;
        }
    }
}
