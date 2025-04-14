const express = require('express');
const router = express.Router();
const prisma = require('../db');

// Retorna todas as conversas
router.get('/', async (req, res) => {
try {
    const registro = await prisma.registro.findMany({
    orderBy: {
        dataHora: 'desc',
    },
    });
    res.json(registro);
} catch (error) {
    console.error('Erro ao buscar conversas:', error);
    res.status(500).json({ error: 'Erro ao buscar conversas' });
}
});

module.exports = router;