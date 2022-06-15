var cityEl = document.querySelector("#addressInput")


// working function 
function getApi() {
    let city = cityEl.value

    let requestURL = ('https://api.openbrewerydb.org/breweries?by_city=' + city + '&per_page=3')

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });


}









