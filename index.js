
import {movieWatchlist} from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


// document.addEventListener('DOMContentLoaded', (e) => {
const myWatchListLink = document.getElementsByClassName('my-watchlist-link')
const inputField = document.getElementById("search-input-field")
const searchBtn = document.getElementById("search-btn")
const contentContainer = document.getElementById('content-container')
// const movieWatchlistContentContainer = document.getElementsByClassName('my-movie-watchlist')
let movieSearchResults = []

contentContainer.innerHTML += ``


searchBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  try{


  
  document.body.style.height = 'auto'
  // contentContainer.classList.toggle('content-container')
  contentContainer.innerHTML = ``
  
  const res = await fetch(`http://www.omdbapi.com/?apikey=245e2a39&s=${inputField.value}&type=movie`)
  const data = await res.json()
  // console.log(data)

  // var parsedData = alert(JSON.stringify(data))
  // if(parsedData.response === false){
  //   console.log(parsedData.response)
  // }

  // console.log(data)


//   const errorHandling = {
//     "Response": "False",
//     "Error": "Movie not found!"
// }
  // if (typeof data === "boolean") {
  //   console.log("myObj is a boolean");
  // } else {
  //   console.log("myObj is not a boolean");
  // }

  if (data.Response === "False"){
    contentContainer.innerHTML = `
    <div class="negative-search-result-message-container">
    <p class="negative-search-result-message">Unable to find what you’re looking for. Please try another search.</p>
    </div>
    `
  }

  else{
  data.Search.forEach(async (movie) => {
    const res = await fetch(`http://www.omdbapi.com/?apikey=245e2a39&i=${movie.imdbID}`)
    const data = await res.json()

    let movieWithUUID = Object.assign({}, data, {id: uuidv4(), isPlotDescriptionExpanded: false});
    
    if (movieWithUUID.Poster === "N/A") {
      movieWithUUID.Poster = "./images/fallback_image_1.png";
    }

    console.log(movieWithUUID)
    movieSearchResults.push(movieWithUUID)
    // var movieSearchResults = JSON.stringify(movieWithUUID);

    // localStorage.setItem('movieSearchResults', {myObjString});

  

//     var movieSearchResults = localStorage.getItem('movieSearchResults');
// console.log(movieSearchResults); // Output: 'John Doe'
    
  

    contentContainer.innerHTML += `
                  <div class="movie-search-results">
                      <div class="search-result-poster-container">
                          <img src="${movieWithUUID.Poster}" class="search-result-movie-poster" onerror="this.onerror=null;this.src="./images/fallback_image.png"/>
                      </div>
                      <div class="search-result-text">
                          <div class="search-result-title-and-rating">
                            <p class="search-result-title">${movieWithUUID.Title}</p>
                            <img src="./images/star_icon.png" class="search-result-rating-star-icon"/>
                            <div class="search-result-rating">${movieWithUUID.imdbRating}</div>
                          </div>

                          <div class="search-result-meta-data">
                            <div class="search-result-runtime">${movieWithUUID.Runtime}</div>
                            <div class="search-result-genre">${movieWithUUID.Genre}</div>

                            <i class="add-btn-icon" for="${movieWithUUID.id}"></i>
                            <input type="button" Value="Watchlist" class="search-result-add-to-watchlist-btn" id="${movieWithUUID.id}">
                            </div>
                          <div class="search-result-description-paragraph" id="">
                              <div class="plot-description-paragraph-trauncated" id="plot-trauncated${movieWithUUID.id}">
                                ${movieWithUUID.Plot.length > 133 && !movieWithUUID.isPlotDescriptionExpanded ? movieWithUUID.Plot.slice(0, 150) + `... <button id="${movieWithUUID.id}" class="read-more-btn">Read More</button>` : movieWithUUID.Plot}
                              </div>
                              <div class="plot-description-paragraph-expanded" id="plot-expanded${movieWithUUID.id}">
                                ${movieWithUUID.Plot + ` <button id="${movieWithUUID.id}" class="show-less-btn">Show Less</button>`}
                              </div>
                          </div>
                      </div>
                   </div>`
                  

                  const addToWatchlistIcons = document.querySelectorAll('.add-btn-icon');
                  addToWatchlistIcons.forEach((icon) => {
                    icon.addEventListener('click', (event) => {
                      event.preventDefault();
                      const buttonId = event.target.getAttribute('for');
                      const addToWatchListButton = document.getElementById(buttonId);
                      addToWatchListButton.click();
                    });
                  });
                  
                  const addToWatchListButtons = document.querySelectorAll('.search-result-add-to-watchlist-btn');
                  addToWatchListButtons.forEach((button) => {
                    button.addEventListener('click', (event) => {
                      event.preventDefault();
                      const buttonId = button.id;
                      
                      //  LocalStorage

                      

                      // console.log(`Clicked add to watchlist button for movie with ID ${buttonId ? buttonId.slice(0) : ''}`);
                      // movieWatchlist
                      // movieSearchResults.find(ob, buttonId)

                      const movieToAdd = movieSearchResults.find(movie => movie.id === buttonId);
                      if (movieToAdd) {
                        // Add the movie to the watchlist
                        // movieWatchlist.push(movieToAdd);
                        
                        // if(localStorage.getItem('data') == null){
                        //   localStorage.setItem('data', '[]')
                        // }

                        var myWatchlist = JSON.parse(localStorage.getItem('myWatchlist')) || [];
                        // const theNull = 'End'
                        // localStorage.setItem('myWatchlist', theNull)

                        var isAlreadyAdded = myWatchlist.some(movie => movie.id === movieToAdd.id);


                        if (!isAlreadyAdded) {
                          myWatchlist.push(movieToAdd);
                          localStorage.setItem('myWatchlist', JSON.stringify(myWatchlist)); 

                        }else{

                        }
                        // myWatchlist.push(movieToAdd)
                        

                        // var JSONmovieData = JSON.stringify(movieToAdd);
                        // localStorage.setItem('movieSearchResultsArray', JSONmovieData);
                        
                        // let getMovieSearchResults = localStorage.getItem('movieSearchResultsArray')
                        // const parsedMovie = JSON.parse(getMovieSearchResults);
                        // console.log(parsedMovie)
                        
                        // console.log(`Added movie ${movieToAdd.title} to watchlist`);
                        // console.log(movieWatchlist)
                        movieAddedToWatchlistSnackbar()
                      } else {
                        console.log(`Errorius`);
                      }
                    })
                  });


                  const readMoreBtn = document.querySelectorAll('.read-more-btn')
                  readMoreBtn.forEach((readMoreBtn) => {
                    readMoreBtn.addEventListener('click', (e) =>{
                      
                      // console.log(readMoreBtn.id)
                      expandPlot(readMoreBtn.id)
                    })
                  })
                  
                  const showLessBtn = document.querySelectorAll('.show-less-btn')
                  showLessBtn.forEach((showLessBtn) => {
                    showLessBtn.addEventListener('click', (e) =>{
                      
                      // console.log(readMoreBtn.id)
                      tranucatePlot(showLessBtn.id)
                    })
                  })

                      
                
  })
}
} catch (error) {
  console.error(error);
}


  movieSearchResults = []
})


// inputField hendelselyttere: 
inputField.addEventListener('focus', (e) => {
  e.preventDefault();
    if ( e.target){inputField.setAttribute('placeholder', '');

    }
});

inputField.addEventListener('blur', (e) => {
  e.preventDefault();
  if (e.target){inputField.setAttribute('placeholder', 'Search...');

    }
});

// Lytter til tastetrykk for Enter, trigger search knappen ved klikk.
inputField.addEventListener('keypress', (e) =>{
  if (e.key === "Enter"){
    // e.preventDefault();
    document.getElementById("search-btn").click()
  }
})

document.addEventListener('click', (e) => {
  if(e.target !== searchBtn && e.target !== inputField && e.target !== myWatchListLink){
    inputField.value = "";
  }
  if(e.target === myWatchListLink){
    // myWatchListLink.click()
    renderMyWatchList()
  }

  });

  
  function expandPlot(movieObjectId){
    console.log(`mark${movieObjectId}`)
    let movieParaGraphTrauncated = document.getElementById(`plot-trauncated${movieObjectId}`)
    let movieParaGraphExpanded = document.getElementById(`plot-expanded${movieObjectId}`)

  //  let movieParaGraphTrauncated = document.getElementById(`plot-trauncated${movieObjectId}`)
  //  let movieParaGraphExpanded = document.getElementById(`plot-expanded${movieObjectId}`)
  //  movieParaGraph.classList.remove()
  movieParaGraphTrauncated.style.display = "none" 
  movieParaGraphExpanded.style.display = "inline"
D
  }

  function tranucatePlot(showLessBtnId){
    let movieParaGraphTrauncated = document.getElementById(`plot-trauncated${showLessBtnId}`)
    let movieParaGraphExpanded = document.getElementById(`plot-expanded${showLessBtnId}`)
    movieParaGraphTrauncated.style.display = "inline" 
    movieParaGraphExpanded.style.display = "none"
  }

function movieAddedToWatchlistSnackbar(){
  const movieAddedToSnackbar = document.getElementById("movie-added-to-watchlist")
  movieAddedToSnackbar.className = "show"
  setTimeout(function(){ movieAddedToSnackbar.className = movieAddedToSnackbar.className.replace("show", ""); }, 1500); /* Hide the snackbar after 3 seconds */
}





// const addToWatchListButtons = document.querySelectorAll('.search-result-add-to-watchlist-btn');
// addToWatchListButtons.forEach((button) => {
//   button.addEventListener('click', (event) => {
//     event.preventDefault();
//     const buttonId = button.id;
//     console.log(`Clicked add to watchlist button for movie with ID ${buttonId ? buttonId.slice(32) : ''}`);
//   });
// });




// });

// Til i morgen, 28.03.2023: 
// 1. Finne ut hvordan hvordan å endre default behavior på button-click | view spretter opp. ✅
// 2. Finne ut hvordan search kan responderer med submit ved å trykke enter ✅
// 3. Finne ut hvordan man kan kople add-btn ikonet opp mot eventlytteren slik at man kan trykke 
  // på den og legge til filmer. ✅
// 4. Lage fallback bilde for broken poster links ✅
// God natt ☺ ♥


// Til i morgen 29.03.2023
// 1. Finn ut hvordan du kan endre kodelinje 118 slik at det bare er cursoret som autofokuser og ikkje heile vindauget ;) ✅
// 2. Finne ut hvordan search kan responderer med submit ved å trykke enter ✅
// 3. Lage fallback bilde for broken poster links ✅
// 4. Gjør det slik at hvis plot-paragrafen overskrider forelder-elementet så wrappes den og legger til en "read more" ✅
// 5. Legge til negativ search result span ✅
// 6. Finne ut hvordan å kople opp ID'en til knappen med ID'en til posten og lagre det i en array av objekt og kalle de i my-watchlist.html ✅

//Til i morgen 31.03.2023 
// 1. Gjør det slik at hvis plot-paragrafen overskrider forelder-elementet så wrappes den og legger til en "read more" ✅
// 2. Legge til negativ search result span ✅
// 3. Finne ut hvordan å kople opp ID'en til knappen med ID'en til posten og lagre det i en array av objekt og kalle de i my-watchlist.html ✅

// Til 05.04.2023
// Fix default splash screen når alle watchlist items er fjernet ✅
// Leg til (Movie Added to your Watch List!) popup når du klikker add to watchlist ✅
// Legg til error message når negativt søkeresultat ✅
// Fix up CSS ✅