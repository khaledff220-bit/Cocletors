// الدوال العلمية
function calculateSquare() {
    const current = parseFloat(currentInput);
    if (!isNaN(current)) {
        currentInput = (current * current).toString();
        addToHistory(`sqr(${current}) = ${currentInput}`);
        updateDisplay();
    }
}

function calculateSquareRoot() {
    const current = parseFloat(currentInput);
    if (!isNaN(current) && current >= 0) {
        currentInput = Math.sqrt(current).toString();
        addToHistory(`√(${current}) = ${currentInput}`);
        updateDisplay();
    } else {
        currentInput = 'Error';
        updateDisplay();
    }
}

function calculatePower() {
    const current = parseFloat(currentInput);
    if (!isNaN(current)) {
        previousInput = currentInput;
        operation = '^';
        shouldResetScreen = true;
    }
}

function calculateSin() {
    const current = parseFloat(currentInput);
    if (!isNaN(current)) {
        // تحويل من درجات إلى راديان إذا needed
        currentInput = Math.sin(current * Math.PI / 180).toString();
        addToHistory(`sin(${current}) = ${currentInput}`);
        updateDisplay();
    }
}

function calculateCos() {
    const current = parseFloat(currentInput);
    if (!isNaN(current)) {
        currentInput = Math.cos(current * Math.PI / 180).toString();
        addToHistory(`cos(${current}) = ${currentInput}`);
        updateDisplay();
    }
}

function calculateTan() {
    const current = parseFloat(currentInput);
    if (!isNaN(current)) {
        currentInput = Math.tan(current * Math.PI / 180).toString();
        addToHistory(`tan(${current}) = ${currentInput}`);
        updateDisplay();
    }
}

function calculateLog() {
    const current = parseFloat(currentInput);
    if (!isNaN(current) && current > 0) {
        currentInput = Math.log10(current).toString();
        addToHistory(`log(${current}) = ${currentInput}`);
        updateDisplay();
    } else {
        currentInput = 'Error';
        updateDisplay();
    }
}

function calculateLn() {
    const current = parseFloat(currentInput);
    if (!isNaN(current) && current > 0) {
        currentInput = Math.log(current).toString();
        addToHistory(`ln(${current}) = ${currentInput}`);
        updateDisplay();
    } else {
        currentInput = 'Error';
        updateDisplay();
    }
}

// إضافة ثوابت رياضية
function addPi() {
    currentInput = Math.PI.toString();
    updateDisplay();
}

function addE() {
    currentInput = Math.E.toString();
    updateDisplay();
}

// دالة عامة للأسس
function handlePowerCalculation(base, exponent) {
    return Math.pow(base, exponent);
}
