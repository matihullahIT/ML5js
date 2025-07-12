document.addEventListener("DOMContentLoaded", () => {
  // all your code here
  
const data = [
  { "name": "Person1", "weight_in_kilos": 55, "height_in_cm": 160, "bmi": 21.48 },
  { "name": "Person2", "weight_in_kilos": 60, "height_in_cm": 160, "bmi": 23.44 },
  { "name": "Person3", "weight_in_kilos": 65, "height_in_cm": 160, "bmi": 25.39 },
  { "name": "Person4", "weight_in_kilos": 70, "height_in_cm": 160, "bmi": 27.34 },
  { "name": "Person5", "weight_in_kilos": 75, "height_in_cm": 170, "bmi": 25.95 },
  { "name": "Person6", "weight_in_kilos": 80, "height_in_cm": 170, "bmi": 27.68 },
  { "name": "Person7", "weight_in_kilos": 85, "height_in_cm": 170, "bmi": 29.41 },
  { "name": "Person8", "weight_in_kilos": 90, "height_in_cm": 170, "bmi": 31.14 },
  { "name": "Person9", "weight_in_kilos": 55, "height_in_cm": 175, "bmi": 17.96 },
  { "name": "Person10", "weight_in_kilos": 60, "height_in_cm": 175, "bmi": 19.59 },
  { "name": "Person11", "weight_in_kilos": 65, "height_in_cm": 175, "bmi": 21.22 },
  { "name": "Person12", "weight_in_kilos": 70, "height_in_cm": 175, "bmi": 22.86 },
  { "name": "Person13", "weight_in_kilos": 75, "height_in_cm": 175, "bmi": 24.49 },
  { "name": "Person14", "weight_in_kilos": 80, "height_in_cm": 175, "bmi": 26.12 },
  { "name": "Person15", "weight_in_kilos": 85, "height_in_cm": 175, "bmi": 27.76 },
  { "name": "Person16", "weight_in_kilos": 90, "height_in_cm": 175, "bmi": 29.39 },
  { "name": "Person17", "weight_in_kilos": 95, "height_in_cm": 175, "bmi": 31.02 },
  { "name": "Person18", "weight_in_kilos": 100, "height_in_cm": 175, "bmi": 32.65 },
  { "name": "Person19", "weight_in_kilos": 105, "height_in_cm": 175, "bmi": 34.29 },
  { "name": "Person20", "weight_in_kilos": 110, "height_in_cm": 175, "bmi": 35.92 },
  { "name": "Person20", "weight_in_kilos": 115, "height_in_cm": 175, "bmi": 35.92 }
];




/// Initialize backend to webgl
ml5.setBackend("webgl");

// Initialize the neural network
const brain = ml5.neuralNetwork({
  task: "regression",
  debug: true
});

// Add data to the neural network
data.forEach(item => {
  const input = {
    weight_in_kilos: item.weight_in_kilos,
    height_in_cm: item.height_in_cm
  };
  const output = {
    bmi: item.bmi
  };
  brain.addData(input, output);
});

// Normalize data 
brain.normalizeData();

// Disable submit button until training is done
const submitBtn = document.getElementById("submit");
if (submitBtn) {
  submitBtn.disabled = true;
}

// Train the model 
const trainingOptions = {
  epochs: 50,
  batchSize: 10
};

brain.train(trainingOptions, finishedTraining);

function finishedTraining() {
  console.log("Model is Trained");
  if (submitBtn) {
    submitBtn.disabled = false;
  }
}

function Predict(event) {
  event.preventDefault(); // stop form submission
  const weight = parseFloat(document.querySelector("#weight").value);
  const height = parseFloat(document.querySelector("#height").value);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    document.getElementById("results").innerHTML = "Please enter valid weight and height.";
    return;
  }

  const input = {
    weight_in_kilos: weight,
    height_in_cm: height*2.54
  };

  brain.predict(input, (results) => {
    if (results && results[0] && results[0].value !== undefined) {
      document.getElementById("results").innerHTML = results[0].value.toFixed(2);
    } else {
      document.getElementById("results").innerHTML = "Prediction error";
    }
  });
}

if (submitBtn) {
  submitBtn.addEventListener("click", Predict);
} else {
  console.warn('No element with id "submit" found in the document.');
}
});