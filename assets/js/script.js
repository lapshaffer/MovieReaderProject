var lisaKeyOMDb = "1a8f67fd"
var lisaKeyTMDb = "daa128ddea2f71cce78720652940a3fc"

var searchBtn = document.querySelector("#search-btn");
var searchInput = document.querySelector("#search-input");
var resultContentEl = document.querySelector('#result-Content');
var darkbutton = document.querySelector("#theme-toggle")
 document.addEventListener('DOMContentLoaded', () => {
    //  var themeStylesheet = document.getElementById('theme');
    //  var storedTheme = localStorage.getItem('theme');
    //  if(storedTheme){
    //     //  themeStylesheet.href = storedTheme;
    //  }
    //  const themeToggle = document.getElementById('theme-toggle');
    //  themeToggle.addEventListener('click', () => {
    //      if(themeStylesheet.href.includes('light')){
    //          themeStylesheet.href = 'dark-theme.css';
    //          themeToggle.innerText = 'Switch to light mode';
    //      } else {
    //          themeStylesheet.href = 'light-theme.css';
    //          themeToggle.innerText = 'Switch to dark mode';
    //      }
    //      localStorage.setItem('theme',themeStylesheet.href)
    //  })


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
    // addToRecent(searchInputVal);
    searchApi(movieTitle);
  }

  searchBtn.addEventListener('click', handleSearchFormSubmit);

  function searchApi(movieTitle) {
    var tmdbUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + lisaKeyTMDb + "&language=en-US&query=" + movieTitle + "&include_adult=false";
    var omdbUrl = "http://www.omdbapi.com/?s=" + movieTitle + "&apikey=" + lisaKeyOMDb ;
    
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
        for(i=0; i<data.results.length; i++){
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
//         if (locRes.message == "city not found") {
//           console.log('No results found!');
//           resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
//         } else {
//           resultContentEl.textContent = '';
//         }
//       })
//       .catch(function (error) {
//         console.error(error);
      });

    fetch(omdbUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data);
//         if (locRes.message == "city not found") {
//           console.log('No results found!');
//           resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
//         } else {
//           resultContentEl.textContent = '';
//         }
    //   })
//       .catch(function (error) {
//         console.error(error);
      });
  }
 })
