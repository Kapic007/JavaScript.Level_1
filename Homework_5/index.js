// задание 1, 2, 3
function chessBoard() {
  let board = document.querySelector(".board");
  let cell;
  let colorToggle = true;
  let coordsLetters, letter;
  let coordsNumbers, number;
  const figure = {
    0: [
      "images/rook_black.svg",
      "images/knight_black.svg",
      "images/bishop_black.svg",
      "images/queen_black.svg",
      "images/king_black.svg",
      "images/bishop_black.svg",
      "images/knight_right_black.svg",
      "images/rook_black.svg",
    ],
    1: [
      "images/pawn_black.svg",
      "images/pawn_black.svg",
      "images/pawn_black.svg",
      "images/pawn_black.svg",
      "images/pawn_black.svg",
      "images/pawn_black.svg",
      "images/pawn_black.svg",
      "images/pawn_black.svg",
    ],
    6: [
      "images/pawn.svg",
      "images/pawn.svg",
      "images/pawn.svg",
      "images/pawn.svg",
      "images/pawn.svg",
      "images/pawn.svg",
      "images/pawn.svg",
      "images/pawn.svg",
    ],
    7: [
      "images/rook.svg",
      "images/knight.svg",
      "images/bishop.svg",
      "images/queen.svg",
      "images/king.svg",
      "images/bishop.svg",
      "images/knight_right.svg",
      "images/rook.svg",
    ],
  };

  for (let i = 0; i < 8; i++) {
    colorToggle = !colorToggle;
    for (let j = 0; j < 8; j++) {
      cell = document.createElement("div");
      cell.className = colorToggle ? "cell black" : "cell white";
      if (figure[i]) {
        cell.style.backgroundImage = `url(${figure[i][j]})`;
      }
      colorToggle = !colorToggle;
      board.appendChild(cell);
    }
  }
  for (let i = 0; i < 2; i++) {
    coordsLetters = document.createElement("div");
    coordsNumbers = document.createElement("div");
    coordsLetters.className = "coords_letters";
    coordsLetters.style.top = i
      ? `calc(100% - ${getComputedStyle(board).padding})`
      : 0;
    coordsNumbers.className = "coords_numbers";
    coordsNumbers.style.left = i
      ? `calc(100% - ${getComputedStyle(board).padding})`
      : 0;
    for (let j = 0; j < 8; j++) {
      letter = document.createElement("div");
      number = document.createElement("div");
      letter.innerText = String.fromCharCode(65 + j);
      letter.className = "letter";
      number.innerText = j + 1;
      number.className = "number";
      coordsLetters.appendChild(letter);
      coordsNumbers.appendChild(number);
    }
    board.appendChild(coordsLetters);
    board.appendChild(coordsNumbers);
  }
}
window.onload = chessBoard();

//код из прошлого урока (для задание №4)
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

//задание №4
function basketShow() {
  let basketBlock = document.querySelector(".basket");
  basketBlock.style.display = "flex";
  let basketClose = document.createElement("button");
  basketClose.innerText = "Закрыть корзину";
  basketClose.className = "basket_close";
  if (basket.length) {
    basketBlock.innerText = `В корзине: ${
      basket.length
    } товаров на сумму ${countBasketPrice(basket)} рублей`;
  } else {
    basketBlock.innerText = `Корзина пуста`;
  }
  basketClose.setAttribute(
    "onclick",
    'document.querySelector(".basket").style.display = "none"'
  );
  basketBlock.appendChild(basketClose);
}

//задание №5
var catalogOn = false;
function catalogShow() {
  catalogOn = !catalogOn;
  let catalog = document.getElementById("catalog");
  if (catalogOn) {
    let catalogHeaderNames = ["category", "type", "brand", "model", "price"];
    if (products) {
      for (let i = 0; i < catalogHeaderNames.length; i++) {
        let catalogHeader = document.createElement("div");
        catalogHeader.innerText = catalogHeaderNames[i];
        catalogHeader.className = "catalog_header";
        for (let key in products) {
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
