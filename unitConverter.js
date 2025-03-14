const unitCategories = {
    length: {
        name: '长度',
        units: {
            mm: { name: '毫米', ratio: 0.001 },
            cm: { name: '厘米', ratio: 0.01 },
            m: { name: '米', ratio: 1 },
            km: { name: '千米', ratio: 1000 },
            inch: { name: '英寸', ratio: 0.0254 },
            ft: { name: '英尺', ratio: 0.3048 },
            yd: { name: '码', ratio: 0.9144 },
            mile: { name: '英里', ratio: 1609.344 }
        }
    },
    weight: {
        name: '重量',
        units: {
            mg: { name: '毫克', ratio: 0.001 },
            g: { name: '克', ratio: 1 },
            kg: { name: '千克', ratio: 1000 },
            t: { name: '吨', ratio: 1000000 },
            oz: { name: '盎司', ratio: 28.3495 },
            lb: { name: '磅', ratio: 453.592 }
        }
    },
    area: {
        name: '面积',
        units: {
            mm2: { name: '平方毫米', ratio: 0.000001 },
            cm2: { name: '平方厘米', ratio: 0.0001 },
            m2: { name: '平方米', ratio: 1 },
            km2: { name: '平方千米', ratio: 1000000 },
            ha: { name: '公顷', ratio: 10000 },
            acre: { name: '英亩', ratio: 4046.86 }
        }
    },
    volume: {
        name: '体积',
        units: {
            ml: { name: '毫升', ratio: 0.001 },
            l: { name: '升', ratio: 1 },
            m3: { name: '立方米', ratio: 1000 },
            gal: { name: '加仑', ratio: 3.78541 }
        }
    },
    temperature: {
        name: '温度',
        units: {
            c: { name: '摄氏度', convert: (value, to) => {
                if (to === 'f') return value * 9/5 + 32;
                if (to === 'k') return value + 273.15;
                return value;
            }},
            f: { name: '华氏度', convert: (value, to) => {
                if (to === 'c') return (value - 32) * 5/9;
                if (to === 'k') return (value - 32) * 5/9 + 273.15;
                return value;
            }},
            k: { name: '开尔文', convert: (value, to) => {
                if (to === 'c') return value - 273.15;
                if (to === 'f') return (value - 273.15) * 9/5 + 32;
                return value;
            }}
        }
    }
};

function convert(value, fromUnit, toUnit, category) {
    if (!value) return '';
    
    const units = unitCategories[category].units;
    if (category === 'temperature') {
        return units[fromUnit].convert(parseFloat(value), toUnit);
    } else {
        return (value * units[fromUnit].ratio / units[toUnit].ratio);
    }
}

function initUnitConverter() {
    const container = document.getElementById('unitConverter');
    const categorySelect = document.getElementById('unitCategory');
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    const fromValue = document.getElementById('fromValue');
    const toValue = document.getElementById('toValue');

    // 初始化分类选择
    categorySelect.innerHTML = Object.entries(unitCategories)
        .map(([key, category]) => `<option value="${key}">${category.name}</option>`)
        .join('');

    function updateUnitSelects(category) {
        const units = unitCategories[category].units;
        const unitOptions = Object.entries(units)
            .map(([key, unit]) => `<option value="${key}">${unit.name}</option>`)
            .join('');
        
        fromUnitSelect.innerHTML = unitOptions;
        toUnitSelect.innerHTML = unitOptions;
    }

    function handleConversion() {
        const result = convert(
            fromValue.value,
            fromUnitSelect.value,
            toUnitSelect.value,
            categorySelect.value
        );
        toValue.value = result ? result.toFixed(6) : '';
    }

    // 事件监听
    categorySelect.addEventListener('change', () => {
        updateUnitSelects(categorySelect.value);
        handleConversion();
    });

    fromUnitSelect.addEventListener('change', handleConversion);
    toUnitSelect.addEventListener('change', handleConversion);
    fromValue.addEventListener('input', handleConversion);

    // 初始化第一个分类的单位
    updateUnitSelects(categorySelect.value);
}

// 导出全局函数
window.initUnitConverter = initUnitConverter;
