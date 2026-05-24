let selects = document.querySelectorAll('.select select');
let btn = document.querySelector("#btn");
let amount = document.querySelector("#amount-input");
let baseUrl = 'https://open.er-api.com/v6/latest/USD';
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector('.to select');
let message = document.querySelector('#result');
let swapIcon = document.querySelector('.swap');

for(let select of selects) {
  for(let currCode in countryList) {
    let newOption = document.createElement('option');
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);
    if (select.name === 'from' && newOption.value === 'USD') {
      newOption.selected = 'selected';
    } else if (select.name === 'to' && newOption.value === 'INR') {
      newOption.selected = 'selected';
    }
    
  }
  select.addEventListener('change', (e) => {
    updateFlag(e.target);
  })
}

swapIcon.addEventListener("click", () => {
  let temporary = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temporary;
  updateFlag(fromCurr);
  updateFlag(toCurr);
})


function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let flagLink = `https://flagsapi.com/${countryCode}/flat/64.png`;  
  let image = element.parentElement.querySelector('img');
  image.src = flagLink;
}

btn.addEventListener('click', (e) => {
  e.preventDefault();
  finalAmount();
})

async function finalAmount() {
  let amountVal = parseFloat(amount.value);
  if (!amountVal || amountVal < 0 || isNaN(amountVal)) {
    amount.value = 0;
    amountVal = 0;
  };
  let URL = `https://open.er-api.com/v6/latest/${fromCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.rates[toCurr.value];
  let totalRate = (amountVal * rate).toFixed(2);
  message.innerText = `${amountVal} ${fromCurr.value} = ${totalRate} ${toCurr.value}`;
}


