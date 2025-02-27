const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Node = require("../models/Node.js");
const Edge = require("../models/Edge.js");

// request all nodes data
router.get("/nodes", async (req, res) => {
    try {
        const nodes = await Node.find();
        res.json(nodes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// request single node by id
router.get("/nodes/:id", async (req, res) => {
    try {
        const node = await Node.findOne({ id: req.params.id });
        if (!node) {
            return res.status(404).json({ message: "Node not found" });
        }
        res.json(node);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// request all edges data
router.get("/edges", async (req, res) => {
    try {
        const edges = await Edge.find();
        res.json(edges);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;