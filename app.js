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

// add new object to data arr
function addData(obj) {
  data.push(obj);
}

getRandomUser();
getRandomUser();
getRandomUser();
