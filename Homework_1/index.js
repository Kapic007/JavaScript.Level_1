var celsius = prompt('Задание №1. Введите температуру в градусах по Цельсию.');

while (isNaN(celsius) || celsius === '') {
  alert('Некорректный ввод. Введите температуру только цифрами.');
  celsius = prompt('Введите температуру в градусах по Цельсию.');
}
!celsius || alert(`${celsius} градусов по Цельсию равно ${(9 / 5) * +celsius + 32} градусов по Фаренгейту`);

let name = 'Василий';
let admin = name;
alert(`Задание №2. ${admin}`);

// // VS Code ругается на имя переменной 'name' (lib.dom.d.ts(19619, 5): The declaration was marked as deprecated here.). 
// // Для обхода можно использовать самоисполняющуюся функцию
//
// (function () {
//   let name = 'Василий';
//   let admin = name;
//   alert(admin);
// })()

