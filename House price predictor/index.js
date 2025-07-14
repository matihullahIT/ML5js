const brain = require("brain.js");
const fs = require("fs");

// Load and parse JSON
const rawData = fs.readFileSync("./dataset.json", "utf-8");
const data = JSON.parse(rawData);

// Determine max values
const maxSize = Math.max(...data.input_dataset.map(d => d.size));
const maxBedrooms = Math.max(...data.input_dataset.map(d => d.bedrooms));
const maxAge = Math.max(...data.input_dataset.map(d => d.age));
const maxPrice = Math.max(...data.input_dataset.map(d => d.price));

// Prepare training data
const trainingData = data.input_dataset.map(d => ({
  input: {
    size: d.size / maxSize,
    bedrooms: d.bedrooms / maxBedrooms,
    age: d.age / maxAge
  },
  output: {
    price: d.price / maxPrice
  }
}));

// Training options
const trainingOptions = {
  iterations: 200,
  errorThresh: 0.0001,
  log: true,
  logPeriod: 10,
  learningRate: 0.3
};

// Train the model
function trainNetwork(trainingData, trainingOptions) {
  const net = new brain.NeuralNetwork({gpu: false });
  net.train(trainingData, trainingOptions);
  return net; // return the trained model
}

// Train and get net
const net = trainNetwork(trainingData, trainingOptions);

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

// Save the model
function saveModel(net) {
  const modelJSON = net.toJSON();
  fs.writeFileSync("training_model.json", JSON.stringify(modelJSON, null, 2));
  console.log("Model saved.");
}
saveModel(net);
