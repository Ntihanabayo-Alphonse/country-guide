const countryInfo= document.getElementById('country_info')
const searchBtn = document.getElementById('search_btn')
let inputValue = document.getElementById('search_input');
const flagImage = document.getElementById('country_flag')
let countryName = document.getElementById('country_name')


async function getCountry() {
    let searchInput = inputValue.value;

    try {
        const url = `https://restcountries.com/v3.1/name/${searchInput}?fullText=true`;

        const response = await fetch(url)
        const data = await response.json()
        console.log(data)

        countryInfo.innerHTML = `
            <div class="flag">
                <img id="country_flag" src=${data[0].flags.svg}>
                <h1 id="country_name">${data[0].name.common}</h1>
            </div>

            <div class="country_details">
                <p>Capital: <span id="capital">${data[0].capital[0]}</span></p>
                <p>Continent: <span id="continent">${data[0].continents[0]}</span></p>
                <p>Population: <span id="population">${data[0].population}</span></p>
                <p>Currency: <span>${Object.keys(data[0].currencies)[0]}</span> <span id="currency">- ${data[0].currencies[Object.keys(data[0].currencies)].name}</span></p>
                <p>Common Language: <span id="common_languages">${Object.values(data[0].languages).toString().split(',').join(', ')}</span></p>
            </div>
        `
    } catch (error) {
            if(searchInput === ''){
                countryInfo.innerHTML = `<h3>The country field must be filled!</h3>`
            } else{
                countryInfo.innerHTML = `<h3>Enter a valid country name!</h3>`
            }
        }
}

searchBtn.addEventListener('click', getCountry)
