// задание №1
/*вывод простых чисел от 0 до 100 слишком просто,
так что написал функцию в которой можно задать любой диапазон поиска (естественно с использованием while)*/

function prime(start, end) {
  var arrPrime = [];
  var i = 3;
  start <= 1 ? (start = 2) : start;
  while (start <= end) {
    if (start === 2) {
      arrPrime.push(start);
      start++;
      continue;
    } else if (start % 2 === 0) {
      start++;
      continue;
    }
    while (i <= Math.sqrt(start)) {
      if (start % i === 0) {
        break;
      }
      i += 2;
    }
    if (i > Math.sqrt(start)) arrPrime.push(start);
    start++;
    i = 3;
  }
  console.log(arrPrime.join(","));
  console.log(`Всего -- ${arrPrime.length} простых чисел`);
}
prime(0, 10000000);

// задание №3
// произвольный "массив-корзина"
var basket = [
  ["monitor", "dell", 500],
  ["keyboard", "a4tech", 40],
  ["mouse", "logitech", 30],
  ["ram", "gskill", 100],
  ["ram", "gskill", 100],
  ["webcam", "logitech", 80],
  ["processor", "amd3900x", 1000],
  ["hdd", "wd2000", 120],
];

//функция которая может принимать "произвольный массив-корзину" заранее определенной структуры
function countBasketPrice(bask = basket) {
  let total = 0;
  for (let i = 0; i < bask.length; i++) {
    total += bask[i][2];
  }
  return total;
}
console.log(countBasketPrice());

// задание №4
for (let i = 0; i < 10; console.log(i), i++) {}

// задание 5
for (let i = "x"; i.length <= 20; i = i + "x") {
  console.log(i);
}
