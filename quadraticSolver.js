function formatSquareRoot(value) {
    if (value === 0) return "0";
    if (value === 1) return "";
    if (value === -1) return "-";
    return value.toString();
}

function updateEquation() {
    const a = document.getElementById('coefA').value || '0';
    const b = document.getElementById('coefB').value || '0';
    const c = document.getElementById('coefC').value || '0';
    
    let equation = '';
    if (a !== '0' && a !== '') {
        equation += (a === '1' ? '' : a === '-1' ? '-' : a) + 'x²';
    }
    if (b !== '0' && b !== '') {
        if (equation !== '' && b > 0) equation += '+';
        equation += (b === '1' ? '' : b === '-1' ? '-' : b) + 'x';
    }
    if (c !== '0' && c !== '') {
        if (equation !== '' && c > 0) equation += '+';
        equation += c;
    }
    if (equation === '') equation = '0';
    
    equation += ' = 0';
    document.getElementById('currentEquation').textContent = equation;
}

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
        // 计算小数形式
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);

        // 构造根式形式
        const bTerm = -b / (2 * a);
        const sqrtTerm = Math.sqrt(discriminant) / (2 * Math.abs(a));
        const rootForm = formatRootForm(bTerm, sqrtTerm, discriminant);

        result = `两个不同实根：<br><br>
        根式形式：<br>
        x = ${rootForm}<br><br>
        小数形式：<br>
        x₁ = ${x1}<br>
        x₂ = ${x2}`;

    } else if (discriminant === 0) {
        const x = -b / (2 * a);
        result = `两个相等实根：<br>
        x = ${x}`;

    } else {
        const realPart = -b / (2 * a);
        const imagPart = Math.sqrt(-discriminant) / (2 * Math.abs(a));
        
        result = `两个共轭复根：<br><br>
        根式形式：<br>
        x = ${formatComplexForm(realPart, imagPart, -discriminant)}<br><br>
        小数形式：<br>
        x₁ = ${realPart} + ${imagPart}i<br>
        x₂ = ${realPart} - ${imagPart}i`;
    }

    solution.innerHTML = result;
}

function formatRootForm(bTerm, sqrtTerm, discriminant) {
    let result = '';
    
    // 处理第一项（-b/2a项）
    if (bTerm !== 0) {
        result += bTerm.toFixed(4);
    }
    
    // 处理根号项
    if (sqrtTerm !== 0) {
        // 如果第一项存在且为正数，加上加号
        if (result !== '' && !result.startsWith('-')) {
            result = '+' + result;
        }
        
        // 构造 ± 项
        if (sqrtTerm === 1) {
            result += ` ± √${discriminant}`;
        } else {
            result += ` ± ${sqrtTerm.toFixed(4)}√${discriminant}`;
        }
    }
    
    return result || '0';
}

function formatComplexForm(realPart, imagPart, absDiscriminant) {
    let result = '';
    
    // 处理实部
    if (realPart !== 0) {
        result += realPart.toFixed(4);
    }
    
    // 处理虚部（根号形式）
    if (imagPart !== 0) {
        if (result !== '' && imagPart > 0) {
            result += ' + ';
        } else if (result === '' && imagPart < 0) {
            result += '-';
        } else if (result !== '' && imagPart < 0) {
            result += ' - ';
        }
        
        const absImagPart = Math.abs(imagPart);
        if (absImagPart === 1) {
            result += `i√${absDiscriminant}`;
        } else {
            result += `${absImagPart.toFixed(4)}i√${absDiscriminant}`;
        }
    }
    
    return result || '0';
}

function formatRoot(commonPart, rootPart, discriminant) {
    let result = '';
    
    // 处理常数项
    if (commonPart !== 0) {
        result += commonPart.toFixed(4);
    }
    
    // 处理根号项
    if (rootPart > 0) {
        result += (result === '' ? '' : '+');
    } else if (rootPart < 0) {
        result += '-';
        rootPart = -rootPart;
    }
    
    if (rootPart !== 0) {
        if (Math.abs(rootPart) === 1) {
            result += `√${discriminant}`;
        } else {
            result += `${Math.abs(rootPart).toFixed(4)}√${discriminant}`;
        }
    }
    
    return result || '0';
}
