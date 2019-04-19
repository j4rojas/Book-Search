function watchForm () {
    $('form').submit(function (event) {
        event.preventDefault();
        let userSearch =$('.userSearch').val();
        $('.results').empty();
        getData(userSearch);
    })
}

function getData (userSearch) {
    let url =`https://www.googleapis.com/books/v1/volumes?q=${userSearch}`;
    fetch(url)
        .then(function(response){
            return response.json();
        })

        .then(function(myJson){  //only display the amount of results user is searching for
            renderData(myJson);
        })
}

function renderData(myJson) {
    let myLength = 0;
    let max = $('.maxResult').val();
    if(myJson.items.length < max ) {
        myLength = myJson.items.length;
    }
    else {
        myLength= max;
    }
    for(let i =0; i<myLength; i++){ //display all API objects to the main page results
        let price = "price not listed";
        let currency= "-";
        if(myJson.items[i].saleInfo.listPrice) {
            price = myJson.items[i].saleInfo.listPrice.amount; 
            currency = myJson.items[i].saleInfo.listPrice.currencyCode;
        } 
    $('.results').append(`
    <div class="column left">
        <h1 class="title">${myJson.items[i].volumeInfo.title}</h1>
        <p>- ${myJson.items[i].volumeInfo.authors}</p>
        <p>${myJson.items[i].volumeInfo.description}</p>
    </div>

    <div class="column right">
        <h1>Sale Information</h1>
        <img src="${myJson.items[i].volumeInfo.imageLinks.thumbnail}">
        <p class="link"><a href="${myJson.items[i].saleInfo.buyLink}">Purchase</a></p>
        <span>${price}</span>
        <span>${currency}</span>                
    </div>
    `);
    }
}

$(watchForm);

