// selectors
const url = 'https://restcountries.com/v3.1/name/'
const input = document.querySelector('.input')
const findBtn = document.querySelector('.btn')
const mainCountry = document.querySelector('.mainCountry')
const borders = document.querySelector('.borders')
const neighbourText = document.querySelector('.neighbourText')
const beginText = document.querySelector('.beginText')

// events
findBtn.addEventListener('click', fetching)

borders.addEventListener('click', nextClick)

// functions
function fetching() {
    let value = input.value;
    fetch(url+value)
    .then((response) => {
        if(!response.ok) {
            alert(value + ' is not found. Please enter valid country')
        }
        return response.json()
    })
    .then((data) => {
        renderMainCountry(data[0])
        const countries = data[0].borders
        return fetch('https://restcountries.com/v3.1/alpha?codes='+countries)
    })
    .then((response) => {
        return response.json()
    })
    .then ((data) => {
        renderNeighbours(data)
    })
}

function renderMainCountry(country) {
    let MainDiv = `
    <div class="flag">
        <span class="countryName">${country.name.common}</span>
        <img src="${country.flags.png}" class="mainImage">
    </div>
    <div class="details">
        <div class="capital">Capital: ${country.capital}</div>
        <div class="language">Language: ${Object.values(country.languages)}</div>
        <div class="population">Population: ${(country.population/1000000).toFixed(1)} M</div>
        <div class="year">Region: ${country.region}</div>
        <div class="money">Currencies: ${Object.values(country.currencies)[0].name}</div>
    </div>
    `
    mainCountry.innerHTML = MainDiv;
    neighbourText.style.display = 'block'
    beginText.style.display= 'none';
}

function renderNeighbours(countries) {
    borders.innerHTML ='';
    for(let country of countries) {
        borders.innerHTML +=`
        <div class="${country.name.common} border">
            <img src="${country.flags.png}" class="borderImage">
            <div class="borderCountry">${country.name.common}</div>
        </div>
    `
    }
}

function nextClick(e) {
    if(!e.target.parentElement.classList.contains('border')) {
        return
    }
    else {
        mainCountry.innerHTML = '';
        const newCountry = (e.target.parentElement.classList[0]);
    fetch(url+newCountry)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        renderMainCountry(data[0])
        const countries = data[0].borders

        return fetch('https://restcountries.com/v3.1/alpha?codes='+countries)
    })
    .then((response) => {
        return response.json()
    })
    .then ((data) => {
        renderNeighbours(data);
    })
    } 
}





