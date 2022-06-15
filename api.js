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