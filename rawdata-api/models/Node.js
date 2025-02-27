const mongoose = require("mongoose");

const NodeSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    data: { type: Object, default:{} }
});

module.exports = mongoose.model("Node", NodeSchema);