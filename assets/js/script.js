var lisaKeyOMDb = "1a8f67fd"
var lisaKeyTMDb = "daa128ddea2f71cce78720652940a3fc"
var lisaKeyMovieGlu = "PQQlPe72DYaxrGIM8gzok6HV1n5KrZP04nSKjnWu"

var searchBtn = document.querySelector("#search-btn");
var searchInput = document.querySelector("#search-input");
var resultContentEl = document.querySelector('#result-Content');
var darkbutton = document.querySelector("#theme-toggle")
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

  searchBtn.addEventListener('click', handleSearchFormSubmit);

  function searchApi(movieTitle) {
    var tmdbUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + lisaKeyTMDb + "&language=en-US&query=" + movieTitle + "&include_adult=false";
    var omdbUrl = "http://www.omdbapi.com/?s=" + movieTitle + "&apikey=" + lisaKeyOMDb;
    // var 
    fetch(tmdbUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        resultContentEl.innerHTML = "";
        for (i = 0; i < data.results.length; i++) {
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

      latitude = position.coords.latitude.toFixed(3);
      longitude = position.coords.longitude.toFixed(3);
      console.log(`${position.coords.latitude};${position.coords.longitude}`)

      console.log(`HERE - ${latitude};${longitude}`);
      //   var headers = new Headers({
      //     "api-version": "v200",
      //     "Authorization": "Basic VFJJTF82X1hYOlFxYjRvUzhGbVlwVw==",
      //     "x-api-key": "SVt8eQZ41o9XOTJqUaG8m1OhgiXP2Q0l3NDDj1sm",
      //     "device-datetime": new Date().toISOString(),
      //     "territory": "XX",
      //     "client": "TRIL_6",
      //     "geolocation" : `${latitude};${longitude}`,
      //     "origin": "https://app.cors.bridged.cc"
      //   });
      //   var gluUrl = "https://cors.bridged.cc/https://api-gate2.movieglu.com/cinemasNearby/";
      // var dateTime = moment().toISOString();
      // console.log(dateTime);
      // fetch(gluUrl, {"headers": headers, "redirect": "follow"})
      //   .then(function (response) {
      //     console.log(response);
      //     if (!response.ok) {
      //       throw response.json();
      //     }
      //     return response.json();
      //   })
      //   .then(function (data) {
      //     console.log(data);
      //   });
      console.log(`${latitude};${longitude}`,)
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
        .then((response) => console.log(response));

    })

  }
})


