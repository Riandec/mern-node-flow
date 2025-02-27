const mongoose = require("mongoose");

const GraphSchema = new mongoose.Schema({
    nodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Node" }],
    edges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Edge" }]
});

module.exports = mongoose.model("Graph", GraphSchema);