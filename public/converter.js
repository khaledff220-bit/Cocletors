// محول الوحدات
let converterVisible = false;
let currentConverter = 'length';

function toggleConverter() {
    converterVisible = !converterVisible;
    const converterSection = document.getElementById('converter-section');
    
    if (converterVisible) {
        converterSection.style.display = 'block';
        renderConverterOptions();
    } else {
        converterSection.style.display = 'none';
    }
}

function changeConverterType(type) {
    currentConverter = type;
    renderConverterOptions();
}

function renderConverterOptions() {
    const converterOptions = document.getElementById('converter-options');
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');
    
    // مسح الخيارات الحالية
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    let units = [];
    
    switch(currentConverter) {
        case 'length':
            units = ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Mile', 'Yard', 'Foot', 'Inch'];
            break;
        case 'weight':
            units = ['Kilogram', 'Gram', 'Milligram', 'Pound', 'Ounce', 'Ton'];
            break;
        case 'temperature':
            units = ['Celsius', 'Fahrenheit', 'Kelvin'];
            break;
        case 'currency':
            units = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AED', 'SAR'];
            break;
    }
    
    // إضافة الخيارات للوحدات
    units.forEach(unit => {
        const fromOption = document.createElement('option');
        fromOption.value = unit;
        fromOption.textContent = unit;
        
        const toOption = document.createElement('option');
        toOption.value = unit;
        toOption.textContent = unit;
        
        fromUnit.appendChild(fromOption);
        toUnit.appendChild(toOption);
    });
    
    // تعيين قيمة افتراضية مختلفة للوحدة الثانية
    if (units.length > 1) {
        toUnit.selectedIndex = 1;
    }
}

function convertUnits() {
    const inputValue = parseFloat(document.getElementById('converter-input').value);
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    
    if (isNaN(inputValue)) {
        document.getElementById('converter-result').textContent = 'أدخل قيمة صحيحة';
        return;
    }
    
    let result;
    
    // التحويل بين الوحدات
    switch(currentConverter) {
        case 'length':
            result = convertLength(inputValue, fromUnit, toUnit);
            break;
        case 'weight':
            result = convertWeight(inputValue, fromUnit, toUnit);
            break;
        case 'temperature':
            result = convertTemperature(inputValue, fromUnit, toUnit);
            break;
        case 'currency':
            result = convertCurrency(inputValue, fromUnit, toUnit);
            break;
    }
    
    document.getElementById('converter-result').textContent = `${inputValue} ${fromUnit} = ${result} ${toUnit}`;
}

// دوال التحويل المختلفة
function convertLength(value, from, to) {
    // تحويل الجميع إلى متر أولاً
    const meters = {
        'Meter': value,
        'Kilometer': value * 1000,
        'Centimeter': value / 100,
        'Millimeter': value / 1000,
        'Mile': value * 1609.34,
        'Yard': value * 0.9144,
        'Foot': value * 0.3048,
        'Inch': value * 0.0254
    };
    
    const valueInMeters = meters[from];
    
    // التحويل من متر إلى الوحدة المستهدفة
    const conversions = {
        'Meter': valueInMeters,
        'Kilometer': valueInMeters / 1000,
        'Centimeter': valueInMeters * 100,
        'Millimeter': valueInMeters * 1000,
        'Mile': valueInMeters / 1609.34,
        'Yard': valueInMeters / 0.9144,
        'Foot': valueInMeters / 0.3048,
        'Inch': valueInMeters / 0.0254
    };
    
    return conversions[to].toFixed(6);
}

function convertWeight(value, from, to) {
    // تحويل الجميع إلى كيلوجرام أولاً
    const kilograms = {
        'Kilogram': value,
        'Gram': value / 1000,
        'Milligram': value / 1000000,
        'Pound': value * 0.453592,
        'Ounce': value * 0.0283495,
        'Ton': value * 1000
    };
    
    const valueInKilograms = kilograms[from];
    
    // التحويل من كيلوجرام إلى الوحدة المستهدفة
    const conversions = {
        'Kilogram': valueInKilograms,
        'Gram': valueInKilograms * 1000,
        'Milligram': valueInKilograms * 1000000,
        'Pound': valueInKilograms / 0.453592,
        'Ounce': valueInKilograms / 0.0283495,
        'Ton': valueInKilograms / 1000
    };
    
    return conversions[to].toFixed(6);
}

function convertTemperature(value, from, to) {
    // تحويل الجميع إلى سيليزيوس أولاً
    let celsius;
    
    switch(from) {
        case 'Celsius':
            celsius = value;
            break;
        case 'Fahrenheit':
            celsius = (value - 32) * 5/9;
            break;
        case 'Kelvin':
            celsius = value - 273.15;
            break;
    }
    
    // التحويل من سيليزيوس إلى الوحدة المستهدفة
    switch(to) {
        case 'Celsius':
            return celsius;
        case 'Fahrenheit':
            return (celsius * 9/5) + 32;
        case 'Kelvin':
            return celsius + 273.15;
    }
}

function convertCurrency(value, from, to) {
    // هذه قيم افتراضية، في التطبيق الحقيقي تحتاج إلى API لأسعار الصرف الحالية
    const rates = {
        'USD': 1,
        'EUR': 0.85,
        'GBP': 0.75,
        'JPY': 110.5,
        'CAD': 1.25,
        'AED': 3.67,
        'SAR': 3.75
    };
    
    // التحويل إلى USD أولاً ثم إلى العملة المستهدفة
    const valueInUSD = value / rates[from];
    return (valueInUSD * rates[to]).toFixed(4);
}
