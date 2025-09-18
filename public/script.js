let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetScreen = false;
let calculationHistory = [];

const display = document.getElementById('display');
const historyList = document.getElementById('history-list');

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    loadHistory();
    
    // تحميل وضع الألوان من التخزين المحلي
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});

function updateDisplay() {
    display.textContent = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        // منع إضافة أكثر من نقطة عشرية واحدة
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
    }
    updateDisplay();
}

function chooseOperation(op) {
    if (currentInput === '0') return;
    
    if (operation !== null) {
        calculate();
    }
    
    previousInput = currentInput;
    operation = op;
    shouldResetScreen = true;
}

function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                currentInput = 'Error';
                updateDisplay();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    
    // تقريب النتيجة لتجنب الأخطاء العشرية
    computation = Math.round(computation * 100000000) / 100000000;
    
    const calculationString = `${previousInput} ${operation} ${currentInput} = ${computation}`;
    addToHistory(calculationString);
    
    currentInput = computation.toString();
    operation = null;
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function addToHistory(calculation) {
    calculationHistory.unshift(calculation);
    if (calculationHistory.length > 10) {
        calculationHistory.pop();
    }
    saveHistory();
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyList.innerHTML = '';
    calculationHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

function saveHistory() {
    localStorage.setItem('calcHistory', JSON.stringify(calculationHistory));
}

function loadHistory() {
    const savedHistory = localStorage.getItem('calcHistory');
    if (savedHistory) {
        calculationHistory = JSON.parse(savedHistory);
        updateHistoryDisplay();
    }
}

function clearHistory() {
    calculationHistory = [];
    saveHistory();
    updateHistoryDisplay();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// دالة النسبة المئوية
function calculatePercentage() {
    const current = parseFloat(currentInput);
    if (!isNaN(current)) {
        currentInput = (current / 100).toString();
        updateDisplay();
    }
}

// دالة تغيير الإشارة
function toggleSign() {
    if (currentInput !== '0') {
        if (currentInput.startsWith('-')) {
            currentInput = currentInput.substring(1);
        } else {
            currentInput = '-' + currentInput;
        }
        updateDisplay();
    }
}
// تبديل بين وضع الآلة الحاسبة العادية والعلمية
function toggleCalculatorMode(mode) {
    const basicButtons = document.getElementById('basic-buttons');
    const scientificButtons = document.getElementById('scientific-buttons');
    
    if (mode === 'scientific') {
        basicButtons.style.display = 'none';
        scientificButtons.style.display = 'grid';
    } else {
        basicButtons.style.display = 'grid';
        scientificButtons.style.display = 'none';
    }
}
