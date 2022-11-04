const ctx = document.getElementById('myChart').getContext('2d');

//Generate array with random numbers between 0 and 100
function generateArray() {
  let array = [];
  for (let i = 0; i < 20; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
}

let array = generateArray();
let colorsArray = generateColorsArray();
//Bubble sort
async function bubbleSortExample(array) {
  let count = 0;
  let sortedArray = [...array]; // copies the randomized array
  let temp; // sets a temporary hold of one value for swapping later
  for (let i = 0; i < sortedArray.length; i++) {
    for (let j = 0; j < sortedArray.length - 1; j++) {
      if (sortedArray[j] > sortedArray[j + 1]) {
        temp = sortedArray[j];
        sortedArray[j] = sortedArray[j + 1];
        sortedArray[j + 1] = temp;
        //console.log(sortedArray);
        //delay
        count++;
        await new Promise((resolve) => setTimeout(resolve, 500)).then(updateChart(sortedArray, `bubble sort, sort count is ${count}`));
      }
    }
  }
  return sortedArray;
}

async function cocktailSort(array) {
  let count = 0;
  let sortedArray = [...array]; // copies the randomized array
  let start = 0;
  let end = array.length - 1;
  let changed = true;

  while (changed) {
    for (let i = start; i <= end - 1; i++) {
      if (sortedArray[i] > sortedArray[i + 1]) {
        [sortedArray[i], sortedArray[i + 1]] = [sortedArray[i + 1], sortedArray[i]];
        changed = true;
        count++;
        await new Promise((resolve) => setTimeout(resolve, 150)).then(updateChart(sortedArray, `quick sort, sort count is ${count}`));
      }
    }
    if (!changed) {
      break;
    }
    changed = false;
    end--;

    for (let i = end; i >= start + 1; i--) {
      if (sortedArray[i] < sortedArray[i - 1]) {
        [sortedArray[i], sortedArray[i - 1]] = [sortedArray[i - 1], sortedArray[i]];
        changed = true;
        count++;
        await new Promise((resolve) => setTimeout(resolve, 150)).then(updateChart(sortedArray, `quick sort, sort count is ${count}`));
      }
    }
    start++;
  }

  return sortedArray;
}

// Call the sorting function
cocktailSort(array);

// Some magic for colors
var colors = generateColorsArray();

function updateChart(array, chartLabel) {
  let chartStatus = Chart.getChart('myChart'); // <canvas> id
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [...array],
      datasets: [
        {
          label: chartLabel,
          data: [...array],
          backgroundColor: generateColorsArrayUsingArrayValues(array),
          borderColor: generateColorsArrayUsingArrayValues(array),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      animation: {
        duration: 0,
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

function generateColorsArray() {
  let colors = [];
  for (let i = 0; i < 20; i++) {
    colors.push(`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`);
  }
  return colors;
}

function generateColorsArrayUsingArrayValues(array) {
  let colors = [];
  for (let i = 0; i < array.length; i++) {
    colors.push(generateColorBasedOnNumberValue(array[i]));
  }
  return colors;
}

function generateColorBasedOnNumberValue(number) {
  let colorVal = mapNumberToBetween0And255(number);
  let color = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;
  return color;
}
function mapNumberToBetween0And255(number) {
  let mappedNumber = Math.floor(number * 2.55);
  return mappedNumber;
}

function assignColorsToValues(array, colors) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push({ value: array[i], color: colors[i] });
  }
  return newArray;
}
