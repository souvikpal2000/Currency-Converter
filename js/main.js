const select = document.querySelectorAll('select');
console.log(select.length);
const input = document.querySelectorAll('input');
const date_DOM = document.querySelector('.date');

const api_url =  "https://api.exchangeratesapi.io/latest";

let html = '';

async function currency()
{
    const res = await fetch(api_url);
    const data = await res.json();
    rates = data.rates;
    date = data.date;
    //console.log(data.rates);
    //console.log(date);
    date_DOM.innerHTML = date;
    const arrKeys = Object.keys(data.rates);
    //console.log(arrKeys[10]);
    arrKeys.map(key => {
        return html += `<option value=${key}>${key}</option>`;
    });
    //console.log(html);
    for(let i=0; i<select.length; i++)
    {
        select[i].innerHTML = html;
    }
    //console.log(rates[select[1].value]);

    input[0].addEventListener('keyup', () => {
        input[1].value = input[0].value * rates[select[1].value] / rates[select[0].value];
    });

    input[1].addEventListener('keyup', () => {
        input[0].value = input[1].value * rates[select[0].value] / rates[select[1].value];
    });

    select[0].addEventListener('change', () => {
        input[1].value = input[0].value * rates[select[1].value] / rates[select[0].value];
    });

    select[1].addEventListener('change', () => {
        input[0].value = input[1].value * rates[select[0].value] / rates[select[1].value];
    });
};

currency();