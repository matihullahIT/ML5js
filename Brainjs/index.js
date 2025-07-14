const brain = require("brain.js");
const fs = require("fs");

// Load JSON file
const rawData = fs.readFileSync("./dataset.json", "utf-8");
const data = JSON.parse(rawData);

// Determine max values for normalization
const maxSize = Math.max(...data.map(d => d.size));
const maxBedrooms = Math.max(...data.map(d => d.bedrooms));
const maxAge = Math.max(...data.map(d => d.age));
const maxPrice = Math.max(...data.map(d => d.price));

// Prepare training data
const trainingData = data.map(d => ({
  input: {
    size: d.size / maxSize,
    bedrooms: d.bedrooms / maxBedrooms,
    age: d.age / maxAge
  },
  output: {
    price: d.price / maxPrice
  }
}));

// Create and train network
const net = new brain.NeuralNetwork();
net.train(trainingData, {
  iterations: 2000,
  log: true
});

// Test prediction
const testInput = {
  size: 1500 / maxSize,
  bedrooms: 3 / maxBedrooms,
  age: 4 / maxAge
};
const prediction = net.run(testInput);

// Convert back to actual price
const predictedPrice = prediction.price * maxPrice;
console.log("Predicted price:", Math.round(predictedPrice));
