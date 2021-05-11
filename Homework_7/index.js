//код из урока №4 (обьект товаров, корзина, подсчет корзины)
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

//массив корзина (изначально пустой)
const basket = [];

// //функция подсчета суммы товаров в корзине
// function countBasketPrice(basket) {
//   let total = 0;
//   for (let i = 0; i < basket.length; i++) {
//     total += products[basket[i].productId].getPrice() * basket[i].amount;
//   }
//   return total;
// }

// //показ корзины
// function basketShow() {
//   let basketBlock = document.querySelector(".basket");
//   basketBlock.style.display = "flex";
//   let basketClose = document.createElement("button");
//   basketClose.innerText = "Закрыть корзину";
//   basketClose.className = "basket_close";
//   if (basket.length) {
//     let amountSum = basket.reduce((acc, item) => {
//       return acc + item.amount;
//     }, 0);
//     basketBlock.innerText = `В корзине: ${amountSum} товаров на сумму ${countBasketPrice(
//       basket
//     )} рублей`;
//     productsInBasket(basketBlock);
//   } else {
//     basketBlock.innerText = `Корзина пуста`;
//   }
//   basketClose.setAttribute(
//     "onclick",
//     'document.querySelector(".basket").style.display = "none"'
//   );
//   basketBlock.appendChild(basketClose);
// }

//вывод каталога
var catalogOn = false;
function catalogShow(filterValue) {
  catalogOn = !catalogOn;
  let catalog = document.getElementById("catalog");
  if (catalogOn) {
    selectorAdd(filterValue);
    let catalogHeaderNames = [
      "category",
      "type",
      "brand",
      "model",
      "price",
      "В корзину",
    ];
    if (products) {
      for (let i = 0; i < catalogHeaderNames.length; i++) {
        let catalogHeader = document.createElement("div");
        catalogHeader.innerText = catalogHeaderNames[i];
        catalogHeader.className = "catalog_header";
        for (let key in products) {
          if (filter(key)) {
            continue;
          }
          if (
            products[key].hasOwnProperty(catalogHeaderNames[i]) &&
            catalogHeaderNames[i] !== "price"
          ) {
            let catalogItem = document.createElement("div");
            catalogItem.innerText = products[key][catalogHeaderNames[i]];
            catalogItem.className = "catalog_item";
            catalogHeader.appendChild(catalogItem);
          } else if (catalogHeaderNames[i] === "price") {
            let catalogItem = document.createElement("div");
            catalogItem.innerText = products[key].getPrice();
            catalogItem.className = "catalog_item";
            catalogHeader.appendChild(catalogItem);
            // добавляем кнопки покупки каждому товару
          } else if (catalogHeaderNames[i] === "В корзину") {
            addButtonBuy(catalogHeader, key);
          }
        }
        catalog.appendChild(catalogHeader);
        document.querySelector(".catalog_button").innerText = "Скрыть каталог";
      }
    }
  } else {
    catalog.innerHTML = "";
    document.querySelector(".catalog_button").innerText = "Показать каталог";
  }
}

// функция добавления кнопки покупки + обработчик нажатия кнопки
function addButtonBuy(catalogHeader, key) {
  let catalogItem = document.createElement("div");
  catalogItem.className = "catalog_item";
  let buttonBuy = document.createElement("button");
  buttonBuy.innerText = "Купить";
  buttonBuy.className = "button_buy";
  buttonBuy.addEventListener("click", () => {
    products[key].addToBasket(); //добавление товара в корзину
    catalogItem.innerHTML = "&#9989;";
  });
  catalogItem.appendChild(buttonBuy);
  catalogHeader.appendChild(catalogItem);
}

// //функция вывода товаров вкорзине
// function productsInBasket(basketBlock) {
//   let basketHeaderNames = [
//     "type",
//     "brand",
//     "model",
//     "price",
//     "amount",
//     "add",
//     "discount",
//     "total",
//     "remove",
//   ];
//   let basketItemContainer = document.createElement("div");
//   basketItemContainer.className = "basket_container";
//   for (let i = 0; i < basketHeaderNames.length; i++) {
//     let basketHeader = document.createElement("div");
//     basketHeader.innerText = basketHeaderNames[i];
//     basketHeader.className = "basket_header";

//     for (let item of basket) {
//       let basketItem = document.createElement("div");
//       basketItem.className = "catalog_item";

//       if (products[item.productId].hasOwnProperty(basketHeaderNames[i])) {
//         basketItem.innerText = products[item.productId][basketHeaderNames[i]];
//         basketHeader.appendChild(basketItem);
//       } else if (basketHeaderNames[i] === "amount") {
//         basketItem.innerText = item.amount;
//         basketHeader.appendChild(basketItem);

//         //вставляем кнопку "добавить" и "уменьшить"
//       } else if (basketHeaderNames[i] === "add") {
//         let buttonAdd = document.createElement("button");
//         let buttonDel = document.createElement("button");
//         buttonAdd.innerText = "➕";
//         buttonDel.innerText = "➖";
//         buttonAdd.className = "button_buy";
//         buttonDel.className = "button_buy";
//         addDellItem(buttonAdd, item);
//         addDellItem(buttonDel, item);
//         basketItem.appendChild(buttonAdd);
//         basketItem.appendChild(buttonDel);
//         basketHeader.appendChild(basketItem);
//       } else if (basketHeaderNames[i] === "total") {
//         basketItem.innerText =
//           item.amount * products[item.productId].getPrice();
//         basketHeader.appendChild(basketItem);
//       } else if (basketHeaderNames[i] === "remove") {
//         let buttonRemove = document.createElement("button");
//         buttonRemove.innerText = "❌";
//         buttonRemove.className = "button_buy";

//         //вешаем обработчик на кнопку
//         removeFromBasket(buttonRemove, item);

//         basketItem.appendChild(buttonRemove);
//         basketHeader.appendChild(basketItem);
//       }
//     }
//     basketItemContainer.appendChild(basketHeader);
//   }
//   basketBlock.appendChild(basketItemContainer);
// }

// //функция добавляет на кнопки события увеличение и уменьшения количества товара
// function addDellItem(button, item) {
//   if (button.innerText == "➕") {
//     button.addEventListener("click", () => {
//       products[item.productId].addToBasket();
//       basketShow(); // перерисовывание корзины
//     });
//   }
//   if (button.innerText == "➖") {
//     button.addEventListener("click", () => {
//       if (item.amount > 1) {
//         item.amount -= 1;
//         basketShow(); // перерисовывание корзины
//       }
//     });
//   }
// }

// //функция вешает обработчик который удаляет товар из корзины
// function removeFromBasket(buttonRemove, item) {
//   buttonRemove.addEventListener("click", () => {
//     let index = basket.indexOf(item);
//     basket.splice(index, 1);
//     basketShow(); // перерисовывание корзины
//   });
// }

//добавляем селектор к каталогу
function selectorAdd(filterValue) {
  let maxPrice = 0;
  Object.values(products).forEach((element) =>
    element.price > maxPrice ? (maxPrice = element.price) : 0
  );
  let selectorForm = document.createElement("form");
  selectorForm.setAttribute("oninput", "price.value=parseInt(vol.value)");
  selectorForm.innerHTML = `<label for="vol">Максимальная цена:</label>
  <input type="range" id="vol" name="vol" value="${filterValue??maxPrice}" min="0" max="${maxPrice}">${maxPrice}<br><br><output name="price" for="vol"></output>`;
  catalog.appendChild(selectorForm);
}

//функция-фильтр + обработчик на фильтр
function filter(key) {
  let filterPrice = document.getElementById('vol');
  filterPrice.onchange = function () {
    catalog.innerHTML = "";
    catalogOn = !catalogOn;
    catalogShow(filterPrice.value);
  }
  if (products[key].price > filterPrice.value) {
    return true;
  }
}

