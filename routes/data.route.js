const express = require('express');
const DataRouter = express.Router();
const { DataModel } = require('../models/data.model');

// GET all transactions for a user
DataRouter.get('/data', async (req, res) => {
  try {
    const transactions = await DataModel.find({ user: req.params.userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new transaction for a user
DataRouter.post('/post', async (req, res) => {
  try {
    const transaction = new DataModel(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {DataRouter};
