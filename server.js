const express = require('express');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 3000;

// Configurar la base de datos SQLite con Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

// Definir el modelo Ticket
const Ticket = sequelize.define('Ticket', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Sincronizar el modelo con la base de datos
sequelize.sync();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.get('/tickets', async (req, res) => {
    const tickets = await Ticket.findAll();
    res.json(tickets);
});

app.post('/tickets', async (req, res) => {
    const { title, description, priority } = req.body;
    try {
        const newTicket = await Ticket.create({ title, description, priority });
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
