// Global Elements
var slider = document.getElementById("myRange");
var amount = document.getElementById("sliderAmount");
var lowCost = document.getElementById("low");
var highCost = document.getElementById("high");

let lowCalc, higCalc, slideAmount = 0;

lowCost.innerHTML = parseInt((slider.value / 24) * 1.16); 
highCost.innerHTML = parseInt((slider.value / 24) * 1.4);
amount.innerHTML = slider.value;

// Update the current slider value
slider.oninput = function() {

  // Grab Slider's Value and Parse As Integer
  // - Lower Amount
  lowCalc = this.value;
  lowCalc = parseInt(lowCalc);

  // - Higher Amount
  highCalc = this.value;
  highCalc = parseInt(highCalc);

  // Slider Amount
  slideAmount = this.value;
  slideAmount = parseInt(slideAmount);


  // Calculate New Monthly Low/High Costs According To Slider Amount
  // - $1K to $3K based on 24 month terms. $4K and above based on 48 month terms.

  // $1K <--> $3K
  if (slideAmount <= 3000) {
    lowCost.innerHTML = parseInt((slideAmount / 24) * 1.16);
    highCost.innerHTML = parseInt((slideAmount / 24) * 1.4);

  // $4K+
  } else {
    lowCost.innerHTML = parseInt((slideAmount / 48) * 1.6);
    highCost.innerHTML = parseInt((slideAmount / 48) * 2.3);
  }

  amount.innerHTML = this.value;
}

const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
  });
  setBubble(range, bubble);
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = "$" + val;

  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}