const mongoose = require("mongoose");

const EdgeSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    source: { type: String, required: true },
    target: { type: String, required: true }
});

module.exports = mongoose.model("Edge", EdgeSchema);