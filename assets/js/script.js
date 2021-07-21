var lisaKeyOMDb = "1a8f67fd"
var lisaKeyTMDb = "daa128ddea2f71cce78720652940a3fc"
var lisaKeyMovieGlu = "PQQlPe72DYaxrGIM8gzok6HV1n5KrZP04nSKjnWu"
//these are our base API keys, please note that movieglu api key calls are limited to 75 calls
//check gitignore if apikey hits cap, we have backups in there

var searchBtn = document.querySelector("#search-btn");
var searchInput = document.querySelector("#search-input");
var resultContentEl = document.querySelector('#result-Content');
var boredContainer = document.querySelector('#bored-result');
var cinemasContentEl = document.querySelector('#cinema-content');
var boredBtn = document.querySelector('#bored-btn');
var darkbutton = document.querySelector("#theme-toggle");
//various element class/ID selectors to tag various partts

document.addEventListener('DOMContentLoaded', () => {

  darkbutton.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    localStorage.setItem(
      'theme',
      document.body.classList.contains('dark') ? 'dark' : 'light'
    )
  })
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark')
  }
  //adds or removes darkmode functionality.  \
  //Also utilizes local storage for persistent theme

  // Calling OMDb and TMDb
  function handleSearchFormSubmit(event) {
    event.preventDefault();
    var movieTitle = document.querySelector('#search-input').value;
    if (!movieTitle) {
      console.error('You need a search input value!');
      return;
    }
    searchApi(movieTitle);
  }
//assures that the search field is actually filled, and not blank

  searchBtn.addEventListener('click', handleSearchFormSubmit);
//event listener for the search button

//this function calls the search to create the api call, fetch the results, then appends them to the page
  function searchApi(movieTitle) {
    var tmdbUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + lisaKeyTMDb + "&language=en-US&query=" + movieTitle + "&include_adult=false";
    var omdbUrl = "http://www.omdbapi.com/?s=" + movieTitle + "&apikey=" + lisaKeyOMDb;
    fetch(tmdbUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (data) {
        //creation of an area for the results of a movie search to be placed.
        console.log(data);
        resultContentEl.innerHTML = "";
        for (i = 0; i < data.results.length; i++) {
          //this for-loop displays all that are returned
          var resultCard = document.createElement('div');
          var resultBody = document.createElement('div');
          resultCard.append(resultBody);

          var title = data.results[i].title;
          var titleEl = document.createElement('h2');
          titleEl.innerHTML =
            '<strong>Title:</strong> ' + title;

          var overview = data.results[i].overview;
          var overviewEl = document.createElement('h3');
          overviewEl.innerHTML =
            '<strong>Overview</strong> ' + overview;

          var score = data.results[i].vote_average;
          var scoreEl = document.createElement('h3');
          scoreEl.innerHTML =
            '<strong>Movie Score:</strong> ' + score;

          var release = data.results[i].release_date;
          var releaseEl = document.createElement('h3');
          releaseEl.innerHTML =
            '<strong>Release Date:</strong> ' + release;


          var imgElement = document.createElement("img");
          var icon = data.results[i].poster_path;
          var iconurl = "https://image.tmdb.org/t/p/w200" + icon;
          imgElement.src = iconurl;


          resultBody.append(titleEl, imgElement, releaseEl, scoreEl, overviewEl);
          resultContentEl.append(resultCard);
        }
      });

    var latitude;
    var longitude;
    navigator.geolocation.getCurrentPosition((position) => {
      //gets the latitude and longitude of the user's current location to find nearby theatres
      latitude = position.coords.latitude.toFixed(3);
      longitude = position.coords.longitude.toFixed(3);
      console.log(`${position.coords.latitude};${position.coords.longitude}`)

      console.log(`${latitude};${longitude}`,)
      //this fetch call was something that only freddie krueger can concoct in the dream realm
      //required numerous headers to be sent over to actually get a proper response from the fetch, as well as other variables(?).
      fetch("https://cors.bridged.cc/https://api-gate2.movieglu.com/cinemasNearby/", {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "api-version": "v200",
          authorization: "Basic VFJJTF82OkNuWVNoSHBpSUZucg==",
          client: "TRIL_6",
          "device-datetime": "2021-07-17T16:43:47.524Z",
          geolocation: `${latitude};${longitude}`,
          origin: "https://app.cors.bridged.cc/",
          "sec-ch-ua":
            '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          territory: "US",
          "x-api-key": "UCq4xdlliA862m2SzWdvC5LNaHjskJnja8PhhMQx",
        },
        referrer: "https://app.cors.bridged.cc/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
      })
        .then(function(data) {
          return data.json();
        })
        .then(function (response){
          console.log(typeof response);
          console.log(response);
          //this is for the creation of new areas to display the results returned for nearby theatres then appends to the page
          for(var i=0;i<response.cinemas.length; i++){
            var cinemaCard = document.createElement('div');
            var cinemaBody = document.createElement('div');
             var cinemaName = response.cinemas[i].cinema_name;
             console.log(cinemaName);
             var cinemaAddress = response.cinemas[i].address;
             console.log(cinemaAddress);
             var nameEl = document.createElement('h3');
             var addressEl = document.createElement('h4');
            nameEl.innerHTML =
            '<strong>Cinema Name:</strong> ' + cinemaName;
            addressEl.innerHTML =
            '<strong>Address:</strong> ' + cinemaAddress;
             cinemaBody.append(nameEl, addressEl);
             cinemaCard.append(cinemaBody);
             cinemasContentEl.append(cinemaCard);
             console.log("passed");
           }
        })

    })

//   }
}
})


//our final API call, boredApi, gives you activity suggestions in case you arent a fan of any movies listed.
function boredAPI() {
  var boredURL = "http://www.boredapi.com/api/activity/"
  
  fetch(boredURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
       //this is for the creation of new areas to display the results returned for boredApi suggested activities.
      var boredResult = document.createElement('p');
      var boredActivity = data.activity;

      boredResult.innerHTML = boredActivity + "!";
      boredContainer.append(boredResult);
    })}


    //this is an event listener for the boredApi button and then calls the boredapi function above
    boredBtn.addEventListener('click', boredAPI);



