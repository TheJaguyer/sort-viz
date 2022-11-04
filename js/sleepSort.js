function generateArray() {
  let array = [];
  for (let i = 0; i < 20; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
}

async function sleepSort(array, output) {
  for (let i = 0; i < array.length; i++) {
    setTimeout(function () {
      output.push(array[i]);
    }, array[i]);
  }
}

// Call the sorting function
let array = generateArray();
let output = [];

console.log(array);
sleepSort(array, output);
setTimeout(() => {
  console.log(output);
}, 1000);
