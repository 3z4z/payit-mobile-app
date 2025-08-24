function getInputValue(id) {
  return document.getElementById(id);
}

const prevAmount = getInputValue("prev-amount");
const historyWrap = document.getElementById("history-wrap");

function getRandomTxid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// add money form doms
const bankSelect = getInputValue("select-bank");
const bankAccNo = getInputValue("bank-acc-no");
const addAmount = getInputValue("add-amount");
const pinNoAdd = getInputValue("pin-no-add-money");
const btnAdd = getInputValue("btn-add-money");

// cash out form doms
const agentNo = getInputValue("agent-no");
const withdrawAmount = getInputValue("withdraw-amount");
const withdrawPinNo = getInputValue("pin-no-withdraw");
const btnOut = getInputValue("btn-withdraw-money");

// transfer money form doms
const transAccNo = getInputValue("transfer-account-no");
const transAmount = getInputValue("transfer-amount");
const transPinNo = getInputValue("pin-no-transfer");
const btnTrans = getInputValue("btn-transfer-money");

//get bonus form doms
const couponInput = getInputValue("coupon-code-input");
const btnAddCoupon = getInputValue("btn-get-bonus");

//pay bill form doms
const billBankSelect = getInputValue("bill-select-bank");
const billAccNo = getInputValue("bill-acc-no");
const payAmount = getInputValue("pay-amount");
const billPinNo = getInputValue("pin-no-bill");
const btnPay = getInputValue("btn-pay");

// form doms
const addMoneyForm = getInputValue("add-money-form");
const cashOutForm = getInputValue("cash-out-form");
const transferForm = getInputValue("transfer-form");
const couponForm = getInputValue("coupon-form");
const billPayForm = getInputValue("pay-bill-form");

// nav buttons doms
const addMoneyBtn = getInputValue("add-money-btn");
const cashOutBtn = getInputValue("cash-out-btn");

// form sections doms
const addMoneySection = getInputValue("add-money-section");
const cashOutSection = getInputValue("cash-out-section");

const allowedPin = "5587";
const allowedCoupons = ["out15", "add15", "trs15"];

//Nav-tab program
const navButtons = document.querySelector("nav").querySelectorAll("button");
const formSections = document.querySelectorAll("section");

for (let i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener("click", function () {
    for (let j = 0; j < navButtons.length; j++) {
      navButtons[j].classList.remove("active");
      formSections[j].classList.add("hidden");
      formSections[j].classList.remove("block");
    }

    navButtons[i].classList.add("active");
    formSections[i].classList.remove("hidden");
    formSections[i].classList.add("block");
  });
}

// transaction card

const transactionData = [];
const btnReport = document.getElementById("transactions-btn");

// add money functions
btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  if (bankSelect.value === "") {
    console.error("select a bank!");
  } else if (bankAccNo.value.length != 11) {
    console.error("Bank Account No invalid!");
  } else if (addAmount.value < 500) {
    console.error("Minimum Add amount 500BDT!");
  } else if (pinNoAdd.value !== allowedPin) {
    console.error("Invalid PIN!");
  } else {
    prevAmount.innerText =
      parseInt(prevAmount.innerText) + parseInt(addAmount.value);
    const bankUiChange = e.target
      .closest("#add-money-form")
      .querySelector("#select-bank");
    bankUiChange.classList.add("text-gray-500");
    bankUiChange.classList.remove("text-gray-900");
    prevAmount.parentNode.classList.add("value-change-green");
    setTimeout(() => {
      prevAmount.parentNode.classList.remove("value-change-green");
    }, 2000);
    const data = {
      name: "Money added",
      date: `${new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "2-digit",
        year: "numeric",
      })} ${new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`,
      txid: getRandomTxid(10),
      iconUrl: "assets/icons/cash-in.png",
      historyIconUrl: "assets/icons/h-cash-in.png",
    };
    transactionData.push(data);
    const history = document.createElement("div");
    history.classList.add("flex", "items-center");
    history.innerHTML = `
    <img src=${data.historyIconUrl} alt="" class="w-7">
    <p class="ms-3">${addAmount.value} BDT added from Account No:
    <span class="text-blue-600">
    ${bankAccNo.value}
    </span>
    </p>
    `;
    historyWrap.appendChild(history);
    addMoneyForm.reset();
  }
});

// cash out functions
btnOut.addEventListener("click", (e) => {
  e.preventDefault();
  if (agentNo.value.length != 11) {
    console.error("invalid Agent Number");
  } else if (withdrawAmount.value < 500) {
    console.error("Below 500BDT, Withdraw not allowed!");
  } else if (withdrawPinNo.value !== allowedPin) {
    console.error("Invalid PIN");
  } else {
    const newAmount =
      parseInt(prevAmount.innerText) - parseInt(withdrawAmount.value);
    prevAmount.innerText = newAmount;
    prevAmount.parentNode.classList.add("value-change-red");
    setTimeout(() => {
      prevAmount.parentNode.classList.remove("value-change-red");
    }, 2000);
    const data = {
      name: "Cash out done",
      date: `${new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "2-digit",
        year: "numeric",
      })} ${new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`,
      txid: getRandomTxid(10),
      iconUrl: "assets/icons/cash-out.png",
      historyIconUrl: "assets/icons/h-cash-out.png",
    };
    transactionData.push(data);
    const history = document.createElement("div");
    history.classList.add("flex", "items-center");
    history.innerHTML = `
  <img src=${data.historyIconUrl} alt="" class="w-7">
  <p class="ms-3">${withdrawAmount.value} BDT cashed out via Agent
  <span class="text-blue-600">
  ${agentNo.value}
  </span> from your account
  </p>
  `;
    historyWrap.appendChild(history);
    cashOutForm.reset();
  }
});

//Transfer money functions
btnTrans.addEventListener("click", (e) => {
  e.preventDefault();
  if (transAccNo.value.length != 11) {
    console.error("Invalid Account Number");
  } else if (transAmount.value < 500) {
    console.error("Minimum transfer amount is 500BDT");
  } else if (transPinNo.value !== allowedPin) {
    console.error("Invalid PIN");
  } else {
    const newAmount =
      parseInt(prevAmount.innerText) - parseInt(transAmount.value);
    prevAmount.innerText = newAmount;
    prevAmount.parentNode.classList.add("value-change-red");
    setTimeout(() => {
      prevAmount.parentNode.classList.remove("value-change-red");
    }, 2000);
    const data = {
      name: "Money Transferred",
      date: `${new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "2-digit",
        year: "numeric",
      })} ${new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`,
      txid: getRandomTxid(10),
      iconUrl: "assets/icons/transfer.png",
      historyIconUrl: "assets/icons/h-transfer.png",
    };
    transactionData.push(data);
    const history = document.createElement("div");
    history.classList.add("flex", "items-center");
    history.innerHTML = `
    <img src=${data.historyIconUrl} alt="" class="w-7">
    <p class="ms-3">${newAmount} BDT is transferred to
    <span class="text-blue-600">
    ${transAccNo.value}
    </span> from your account
    </p>
    `;
    historyWrap.appendChild(history);
    transferForm.reset();
  }
});

// add coupon functions
btnAddCoupon.addEventListener("click", (e) => {
  e.preventDefault();
  if (couponInput.value.toLowerCase() === allowedCoupons[0]) {
    console.log("Next Cashout will give 15% Bonus!");
  } else if (couponInput.value.toLowerCase() === allowedCoupons[1]) {
    console.log("Next Add money will give 15% Bonus!");
  } else if (couponInput.value.toLowerCase() === allowedCoupons[2]) {
    console.log("Next Transfer Money will give 15% Bonus!");
  } else {
    console.error("Invalid coupon code");
  }
  couponForm.reset();
});

// pay bill Functions
btnPay.addEventListener("click", (e) => {
  e.preventDefault();
  if (billBankSelect.value === "") {
    console.error("select a bank to pay bill!");
  } else if (billAccNo.value.length != 11) {
    console.error("Billing Account No invalid!");
  } else if (!payAmount.value || payAmount.value < 0) {
    console.error("Payment Amount is invalid!");
  } else if (billPinNo.value !== allowedPin) {
    console.error("Invalid PIN!");
  } else {
    prevAmount.innerText =
      parseInt(prevAmount.innerText) - parseInt(payAmount.value);
    const bankUiChange = e.target
      .closest("#pay-bill-form")
      .querySelector("#bill-select-bank");
    bankUiChange.classList.add("text-gray-500");
    bankUiChange.classList.remove("text-gray-900");
    prevAmount.parentNode.classList.add("value-change-red");
    setTimeout(() => {
      prevAmount.parentNode.classList.remove("value-change-red");
    }, 2000);
    const data = {
      name: "Bill Paid",
      date: `${new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "2-digit",
        year: "numeric",
      })} ${new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`,
      txid: getRandomTxid(10),
      iconUrl: "assets/icons/bill.png",
      historyIconUrl: "assets/icons/h-bill.png",
    };
    transactionData.push(data);
    const history = document.createElement("div");
    history.classList.add("flex", "items-center");
    history.innerHTML = `
      <img src=${data.historyIconUrl} alt="" class="w-7">
      <p class="ms-3">${payAmount.value} BDT paid to
      <span class="text-blue-600">
      ${billAccNo.value}
      </span> from your account
      </p>
      `;
    historyWrap.appendChild(history);
    billPayForm.reset();
  }
});

const transactionWrap = document.getElementById("transaction-wrap");

btnReport.addEventListener("click", (e) => {
  e.preventDefault();
  transactionWrap.innerHTML = "";
  for (const data of transactionData) {
    const transactionCard = document.createElement("div");
    transactionCard.classList.add(
      "px-4",
      "py-3",
      "bg-white",
      "shadow-sm",
      "rounded-lg",
      "hover:bg-amber-50/25",
      "ease-in-out",
      "duration-100",
      "mb-5"
    );

    transactionCard.innerHTML = `
      <div class="flex items-center">
          <figure
              class="max-w-10 max-h-10 sm:max-w-12 sm:max-h-12 border border-blue-300 bg-blue-50 rounded-full p-2">
              <img src=${data.iconUrl} alt="" class="icon w-full object-contain">
          </figure>
          <div class="ms-4 grow">
              <div class="flex items-baseline flex-wrap">
                  <h3 class="me-2 font-semibold">${data.name}</h3>
                  <small class="text-gray-500">TxID: ${data.txid}</small>
              </div>
              <small class="text-gray-600">${data.date}</small>
          </div>
          <button
              class=" rounded-full border border-transparent p-1 transition-all cursor-pointer bg-white/0 hover:shadow-md hover:border-gray-50 hover:bg-white/100">
              <figure>
                  <img class="w-6" src="assets/icons/menu-dots.png" alt="">
              </figure>
          </button>
      </div>
    `;
    transactionWrap.appendChild(transactionCard);
  }
});
