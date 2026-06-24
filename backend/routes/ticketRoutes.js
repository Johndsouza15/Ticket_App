const express = require('express');
const Ticket = require('../models/Tickets');   // Import from models folder

const router = express.Router();

// Create Ticket
router.post('/', async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).json(ticket);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Ticket
router.put('/:id', async (req, res) => {
    try {
        const updated = await Ticket.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!updated) return res.status(404).json({ error: "Ticket not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Ticket
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Ticket.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Ticket not found" });
        res.json({ message: 'Ticket Deleted Successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;