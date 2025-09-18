const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});
// تقديم ملفات SEO
app.get('/robots.txt', (req, res) => {
    res.sendFile(__dirname + '/public/robots.txt');
});

app.get('/sitemap.xml', (req, res) => {
    res.sendFile(__dirname + '/public/sitemap.xml');
});

// إضافة Structured Data لتحسين SEO
app.use((req, res, next) => {
    res.locals.structuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "CalcMaster Pro - Smart Calculator",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Android, iOS, Web",
        "description": "آلة حاسبة ذكية متطورة مع واجهة حديثة، أدوات رياضية متقدمة، وحل معادلات مع تاريخ حسابات وميزات تحويل الوحدات.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };
    next();
});
app.listen(port, () => {
    console.log(`CalcMaster Pro running on http://localhost:${port}`);
});
