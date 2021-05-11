// задание №1
function numberToObject(n) {
  if (n < 0 || n > 999) {
    console.log("Число должно быть от 0 до 999");
    return {};
  } else if (isNaN(n)) {
    console.log("Нужно ввести число от 0 до 999");
    return {};
  }
  var obj = {};
  obj["единицы"] = n % 10;
  obj["десятки"] = Math.floor(n / 10) % 10;
  obj["сотни"] = Math.floor(n / 100);
  return obj;
}
console.log(numberToObject(245));

// задание №2 & задание №3
const products = {
  a12345678: {
    id: "a12345678",
    category: "computers",
    type: "monitor",
    brand: "Dell",
    model: "P2421D",
    color: "Black",
    price: 500,
    discount: 0,
    warehouse: 25,
    date_added: "2020-12-17T03:24:00",
  },
  b87654321: {
    id: "b87654321",
    category: "computers",
    type: "keyboard",
    brand: "A4tech",
    model: "KL-7MUU",
    color: "Black",
    price: 40,
    discount: 0,
    warehouse: 55,
    date_added: "2020-10-17T03:44:00",
  },
  c54321678: {
    id: "c54321678",
    category: "computers",
    type: "mouse",
    brand: "Logitech",
    model: "XL-750BK",
    color: "Black",
    price: 30,
    discount: 15,
    warehouse: 67,
    date_added: "2021-01-12T10:24:00",
  },
  q987612345: {
    id: "q987612345",
    category: "accessories",
    type: "ram",
    brand: "G.Skill",
    model: "Trident Z Neo",
    color: "RGB",
    price: 100,
    discount: 5,
    warehouse: 8,
    date_added: "2020-12-12T10:58:00",
  },
};

/*в каждый товар (объект товара) добавляю функцию подсчёта цены
и функцию добавления в корзину (с проверкой превышения наличия на складе) */
for (let key in products) {
  products[key].getPrice = function () {
    return this.discount ? this.price * (1 - this.discount / 100) : this.price;
  };
  products[key].addToBasket = function () {
    if (!basket.some((el) => el.productId == this.id)) {
      basket.push({
        productId: this.id,
        amount: 1,
      });
    } else {
      for (let obj of basket) {
        if (obj.productId == this.id) {
          obj.amount + 1 < this.warehouse
            ? (obj.amount += 1)
            : (obj.amount = this.warehouse);
        }
      }
    }
  };
}

const basket = [
  {
    productId: "a12345678",
    amount: 1,
  },
  {
    productId: "b87654321",
    amount: 1,
  },
  {
    productId: "c54321678",
    amount: 1,
  },
  {
    productId: "q987612345",
    amount: 2,
  },
];

function countBasketPrice(basket) {
  let total = 0;
  for (let i = 0; i < basket.length; i++) {
    total += products[basket[i].productId].getPrice() * basket[i].amount;
  }
  return total;
}
