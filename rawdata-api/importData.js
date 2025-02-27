const fs = require('fs');
const mongoose = require('mongoose');
const Node = require('./models/Node');
const Edge = require('./models/Edge');

// connect to mongodb
mongoose.connect('mongodb+srv://admin:1234@cluster0.24sj5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connection Successfully'))
  .catch((err) => console.error('Connection Failed', err));

// read file rawdata.json
fs.readFile('./data/rawdata.json', 'utf8', async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const jsonData = JSON.parse(data);

  // insert jsonData in MongoDB
  try {
    // insert nodes
    for (let node of jsonData.nodes) {
      const newNode = new Node({
        id: node.id,
        type: node.type,
        data: node.data
      });
      await newNode.save();
    }

    // insert edges
    for (let edge of jsonData.edges) {
      const newEdge = new Edge({
        id: edge.id,
        source: edge.source,
        target: edge.target
      });
      await newEdge.save();
    }

    console.log('Insert node and edge data successfully');
    mongoose.connection.close(); // disconnect to mongodb
  } catch (err) {
    console.error(err);
  }
});
