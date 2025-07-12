const brain = require("brain.js");
const net = new brain.NeuralNetwork();
const fs = require("fs");
const Data = fs.readFileSync("./tm-my-image-model/salaries.csv", "utf8");

function FetchData() {
  console.log(Data);
}
FetchData();
