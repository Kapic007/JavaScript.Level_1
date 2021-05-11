// задание №3
var a = Math.random() < 0.5 ? Math.random() * -1 : Math.random();
var b = Math.random() < 0.5 ? Math.random() * -1 : Math.random();

if (a >= 0 && b >= 0) {
  alert(`a - b = ${a - b}`);
} else if (a < 0 && b < 0) {
  alert(`a * b = ${a * b}`);
} else {
  alert(`a + b = ${a + b}`);
}

// задание №4
var a = Math.floor(Math.random() * 16);

switch (a) {
  case 0:
    console.log(0);
  case 1:
    console.log(1);
  case 2:
    console.log(2);
  case 3:
    console.log(3);
  case 4:
    console.log(4);
  case 5:
    console.log(5);
  case 6:
    console.log(6);
  case 7:
    console.log(7);
  case 8:
    console.log(8);
  case 9:
    console.log(9);
  case 10:
    console.log(10);
  case 11:
    console.log(11);
  case 12:
    console.log(12);
  case 13:
    console.log(13);
  case 14:
    console.log(14);
  case 15:
    console.log(15);
    break;
  default:
    break;
}

// задание №5
function addition(x, y) {
  return x + y;
}
function subtraction(x, y) {
  return x - y;
}
function multiplication(x, y) {
  return x * y;
}
function division(x, y) {
  return x / y;
}

// задание №6
function mathOperation(arg1, arg2, operation) {
  switch (operation) {
    case "addition":
      return addition(arg1, arg2);
    case "subtraction":
      return subtraction(arg1, arg2);
    case "multiplication":
      return multiplication(arg1, arg2);
    case "division":
      return division(arg1, arg2);
    default:
      break;
  }
}

// задание №8
function power(val, pow) {
  if (pow === 0) {
    return 1;
  } else if (pow < 0) {
    return 1 / (val * power(1 / val, pow + 1));
  } else if (pow % 2) {
    return val * power(val, pow - 1);
  } else {
    return power(val * val, pow / 2);
  }
}
