const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const fromSelect = document.querySelector("select[name='from']");
const toSelect = document.querySelector("select[name='to']");
const amountInput = document.querySelector(".amount");
const result = document.querySelector(".result");
const btn = document.querySelector("button");
const swap = document.querySelector(".swap");

function loadCurrencies() {
  for (let curr in countryList) {
    let opt1 = document.createElement("option");
    let opt2 = document.createElement("option");

    opt1.value = opt2.value = curr;
    opt1.innerText = opt2.innerText = curr;

    fromSelect.append(opt1);
    toSelect.append(opt2);
  }

  fromSelect.value = "INR";
  toSelect.value = "USD";
}

function updateFlag(select) {
  const countryCode = countryList[select.value];
  const img = select.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

async function convert() {
  let amount = amountInput.value || 1;

  const URL = `${BASE_URL}/${fromSelect.value.toLowerCase()}.json`;
  const response = await fetch(URL);
  const data = await response.json();

  const rate = data[fromSelect.value.toLowerCase()][toSelect.value.toLowerCase()];
  const finalAmount = (amount * rate).toFixed(6);

  result.innerText = `${amount} ${fromSelect.value} = ${finalAmount} ${toSelect.value}`;
}

swap.addEventListener("click", () => {
  [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
  updateFlag(fromSelect);
  updateFlag(toSelect);
  convert();
});

fromSelect.addEventListener("change", () => {
  updateFlag(fromSelect);
  convert();
});

toSelect.addEventListener("change", () => {
  updateFlag(toSelect);
  convert();
});

btn.addEventListener("click", convert);

window.addEventListener("load", () => {
  loadCurrencies();
  updateFlag(fromSelect);
  updateFlag(toSelect);
  convert();
});
