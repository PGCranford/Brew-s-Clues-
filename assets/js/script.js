var cityEl = document.querySelector("#addressInput");
var errorEl = document.querySelector(".warning");


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

            if (data.length <= 0) {
                var p = document.createElement("p");
                p.textContent = "Please Enter a Valid City";
                errorEl.appendChild(p);

            }
        })
}










