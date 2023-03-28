const store = document.querySelector(".store");
const addUSerBtn = document.getElementById("add-user");
const totalPrice = document.getElementById("total-price");

// create content
const info = {
  titles: [
    "Kurapika's Memories",
    "The Day of Departure",
    "A Struggle in the Mist",
    "Resolution",
    "End Game",
    "Family Matters",
    "Nen Sense",
    "Nen Combatant",
    "The Island",
    "Shadow Beasts",
    "Fakes, Swindles, and the Old Switcheroo",
    "Next Stop: Meteor City—The Junkyard of the World ",
    "September 4th",
    "September 10th",
    "The Secret of Greed Island",
    "Progress",
    "Face-Off",
    "Three-Way Struggle",
    "Chance Encounter",
    "NGL",
    "Weakness",
    "Reunion",
    "8: Part 1",
    "6: Part 1",
    "1: Part 4",
    "Charge",
    "We Meet Again",
    "Name",
    "Regeneration",
    "Memory",
    "Answer",
    "Joining the Fray",
    "Total Defeat",
    "Threats",
    "Battle to the Death",
    "Ship of Fools",
    "Balance",
    "Escape",
  ],
  prices: [
    5, 7, 7, 8, 8, 8, 8, 10, 10, 10, 12, 8, 12, 11, 10, 8, 8, 8, 8, 9, 9, 9, 9,
    10, 12, 12, 12, 11, 11, 12, 13, 13, 14, 14, 15, 20, 15, 15,
  ],
};
//////////////////// create dummy ids
class StringIdGenerator {
  constructor(chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    this._chars = chars;
    this._nextId = [0];
  }

  next() {
    const r = [];
    for (const char of this._nextId) {
      r.unshift(this._chars[char]);
    }
    this._increment();
    return r.join("");
  }

  _increment() {
    for (let i = 0; i < this._nextId.length; i++) {
      const val = ++this._nextId[i];
      if (val >= this._chars.length) {
        this._nextId[i] = 0;
      } else {
        return;
      }
    }
    this._nextId.push(0);
  }

  *[Symbol.iterator]() {
    while (true) {
      yield this.next();
    }
  }
}

let dummyIds = new StringIdGenerator();
for (let i = 0; i <= 37; i++) {
  const elemnt = document.createElement("div");
  elemnt.setAttribute("data-id", `${dummyIds.next()}`);
  elemnt.classList.add("book");
  elemnt.innerHTML = `
          <h2 class="sub-title">${info.titles[i]}</h2>
          <div class="book-pic">
            <img src="img/books/${i}.jpg" alt="" />
          </div>
          <p class="price" data-price="${info.prices[i]}">${info.prices[i]}$</p>
          <input type="number" placeholder="Amount" id="amount" />
          <button class="btn buy" >Buy</button>
        `;
  store.appendChild(elemnt);
}
// add user

addUSerBtn.addEventListener("click", (e) => {
  const name = document.querySelector(".name-input"),
    phone = document.querySelector(".phone-input");
  if (name.value.trim() != "" && phone.value.trim() != "") {
    document.querySelector(".outaku-name").textContent = name.value;
    document.querySelector(".outaku-phone").textContent = phone.value;
    document.querySelector(".store-aside ul").style.display = "none";
  }
});

// set total price
let cost = 0;

function addToChart(bookId, img, price, amount, title) {
  let temp = document.querySelector(".card-items");
  temp = temp.querySelector(`[data-id=${bookId}]`);
  console.log(temp);
  if (temp == null) {
    const product = document.createElement("div");
    product.dataset.id = bookId;
    product.classList.add("book");
    product.classList.add("sold-book");
    product.innerHTML = `
    <p class="sub-title">${title}</p>
            <div class="book-body">
              <div class="img">
                <img src="${img}" alt="" />
              </div>
              <div class="info">
                <div class="flex">
                  <p ">Amount :</p>
                  <p class="buyed">${+amount}</p>
                </div>
                <div class="flex">
                  <p>Price :</p>
                  <p>$${price}</p>
                </div>
              </div>
            </di`;

    document.querySelector(".card-items").appendChild(product);
  } else {
    temp.querySelector(".buyed").textContent =
      +amount + +temp.querySelector(".buyed").textContent;
  }
}
function addBook() {
  let price = this.closest(".book");
  let title = price.querySelector(".sub-title").textContent;
  price = price.querySelector(".price").dataset.price;
  let amount = this.closest(".book").querySelector("#amount");
  if (+amount.value > 0) {
    cost += +amount.value * +price;

    totalPrice.textContent = `Total Price : $${cost}`;
    addToChart(
      this.closest(".book").dataset.id,
      this.closest(".book").querySelector("img").src,
      price,
      amount.value,
      title
    );
    amount.value = "";
  }
}

const arrBtns = document.querySelectorAll(".buy");
arrBtns.forEach(function (btn) {
  btn.addEventListener("click", addBook);
});
