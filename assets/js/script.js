;

//event listeners that need work 
var button = document.querySelector(".button")

button.addEventListener("click", function () {

    // working function 
    function getApi() {

        let requestURL = 'https://api.openbrewerydb.org/breweries?by_city=atlanta&per_page=3'

        fetch(requestURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
            });
    }

    getApi();







