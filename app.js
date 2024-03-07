const totalIncom = document.querySelector(".total-income");
const totalExpence = document.querySelector(".total-expence");
const amountElement = document.getElementById("amount");
const resultBalance = document.getElementById("result-balance");
const nameInput = document.getElementById("name");
const selectOption = document.getElementById("entry-type");
const addBtn = document.getElementById("add-btn");

let numberTotalExpence = Number(totalExpence.innerHTML);
let numberTotalIncome = Number(totalExpence.innerHTML);
let lists = [];

const addItem = (e) => {
  let amountNumber = parseInt(amountElement.value);

  if (amountNumber < 0) {
    alert("enter positive number");
    nameInput.value = "";
    amountElement.value = "";
    return;
  }

  let value = selectOption.value;
  let text = selectOption.options[selectOption.selectedIndex].text;

  let inputVal = nameInput.value;
  let list;

  if (inputVal.trim() !== "") {
    if (amountElement.value === "") {
      alert("please enter a value");
      return;
    }
    list = {
      id: Date.now(),
      name: inputVal,
      amount: amountNumber,
      selected: text,
    };
  }

  lists.push(list);
  nameInput.value = "";
  amountElement.value = "";

  renderBalance(lists);
  renderItem();
};

addBtn.addEventListener("click", (e) => {
  addItem();
});

const renderItem = () => {
  const listContinaer = document.querySelector(".list-container");
  listContinaer.innerHTML = "";

  lists.forEach((item) => {
    const trContainer = document.createElement("div");
    trContainer.classList.add("list");

    const thName = document.createElement("div");
    thName.textContent = item.name;

    const thAmount = document.createElement("div");
    thAmount.textContent = item.amount;

    const thType = document.createElement("div");
    const typeIcon = document.createElement("img");
    if (item.selected === "income") {
      typeIcon.setAttribute("src", "./icons/packing-svgrepo-com.svg");
    } else {
      typeIcon.setAttribute("src", "./icons/delivery-svgrepo-com.svg");
    }
    thType.appendChild(typeIcon);

    const thDelete = document.createElement("div");
    const deleteIcon = document.createElement("img");
    deleteIcon.classList.add("remove-btn");
    deleteIcon.setAttribute("src", "./icons/add-circle-svgrepo-com.svg");
    thDelete.appendChild(deleteIcon);
    deleteIcon.addEventListener("click", () => removeItem(item.id));

    trContainer.appendChild(thName);
    trContainer.appendChild(thAmount);
    trContainer.appendChild(thType);
    trContainer.appendChild(thDelete);
    listContinaer.appendChild(trContainer);
  });
};

const renderBalance = (arr) => {
  let resultExpense = 0;
  let resultIncome = 0;

  if (arr.length === 0) {
    totalExpence.textContent = 0;
    totalIncom.textContent = 0;
    resultBalance.textContent = 0;
  }
  arr.forEach((item) => {
    const selectedValue = item.selected;
    const amountOfItem = item.amount;

    if (selectedValue === "income") {
      resultIncome += amountOfItem;
    }

    if (selectedValue === "expence") {
      resultExpense += amountOfItem;
    }

    let totalBalance = resultIncome - resultExpense;
    if (totalBalance < 0) {
      resultBalance.style.color = "#e84118";
    }

    totalExpence.textContent = resultExpense;
    totalIncom.textContent = resultIncome;

    resultBalance.textContent = totalBalance;
  });
};

const removeItem = (id) => {
  lists = lists.filter((item) => item.id !== id);
  renderItem();
  renderBalance(lists);
};
