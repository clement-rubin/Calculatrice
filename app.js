const express = require('express');
const path = require('path');
const app = express();

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Route par défaut pour servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'calculator.html'));
});

// Route pour les calculs
app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;
    let result;

    switch(operation) {
        case '+':
            result = parseFloat(num1) + parseFloat(num2);
            break;
        case '-':
            result = parseFloat(num1) - parseFloat(num2);
            break;
        case '*':
            result = parseFloat(num1) * parseFloat(num2);
            break;
        case '/':
            if (parseFloat(num2) === 0) {
                return res.status(400).json({ error: 'Cannot divide by zero' });
            }
            result = parseFloat(num1) / parseFloat(num2);
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation' });
    }

    res.json({ result: result });
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
