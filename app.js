const main = document.getElementById("main"),
  addUserBtn = document.getElementById("add-user"),
  doubleBtn = document.getElementById("double"),
  showMillionairesBtn = document.getElementById("show-millionaires"),
  sortBtn = document.getElementById("sort"),
  calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// double everyons money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// only show millionaires
function showMillionaires() {
  data = data.filter(person => person.money > 1000000);
  updateDOM();
}

// calculate collective wealth
function calculateWealth() {
  const totalWealth = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    totalWealth
  )}</strong></h3>`;
  main.appendChild(wealthElement);
}

// add new object to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// update DOM
function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach(item => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// format number as money
function formatMoney(number) {
  return "£" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

getRandomUser();
getRandomUser();
getRandomUser();

// event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
