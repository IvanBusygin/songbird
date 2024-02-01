function randomArray(quantity, first, last) {
  const array = [];
  const randomArr = [];
  for (let i = first; i <= last; i++) {
    array.push(i);
  }
  for (let count = 1; count <= quantity; count++) {
    const rand = Math.floor(Math.random() * array.length);
    randomArr.push(array.splice(rand, 1)[0]);
  }
  return randomArr;
}

function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

export { randomArray, randomInteger };
