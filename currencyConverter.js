const currencySelector = document.querySelectorAll(".currency");
const input = document.getElementById("input");
const output = document.getElementById("output");
const convertButton = document.getElementById("convertButton");

// Fetching currency data
fetch("https://api.frankfurter.app/currencies")
  .then((data) => data.json())
  .then((data) => {
    display(data);
  });

// Choosing currency
function display(currencyData) {
  const entries = Object.entries(currencyData);
  for (var i = 0; i < entries.length; i++) {
    currencySelector[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
    currencySelector[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
  }
}

// Converting action
convertButton.addEventListener("click", () => {
  let currency1 = currencySelector[0].value;
  let currency2 = currencySelector[1].value;
  let value = input.value;

  if (currency1 != currency2) {
    convert(currency1, currency2, value);
  } else {
    alert("These are the same currency, please choose different currencies");
  }
});

// Convert algorithm
function convert(currency1, currency2, value) {
  const host = "api.frankfurter.app";
  fetch(
    `https://${host}/latest?amount=${value}&from=${currency1}&to=${currency2}`
  )
    .then((val) => val.json())
    .then((val) => {
      console.log(Object.values(val.rates)[0]);
      output.value = Object.values(val.rates)[0];
    });
}
