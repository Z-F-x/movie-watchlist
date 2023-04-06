// import {movieWatchlist} from './data.js'


var movieWatchlistContentContainer = document.getElementById('my-movie-watchlist')
// console.log(movieWatchlist)
    let getMovieSearchResults = localStorage.getItem('myWatchlist')
    var parsedGetMovieSearchResults = JSON.parse(getMovieSearchResults);
    console.log(parsedGetMovieSearchResults)




function renderMyWatchList(){
    if(parsedGetMovieSearchResults.length  === 0){
      movieWatchlistContentContainer.innerHTML = `            
      <div class="my-movie-watchlist-placeholder-content">
      <h2 class="my-watchlist-placeholder-headline">Your watchlist is looking a little empty...</h2>
      <a href="index.html" class="my-watchlist-placeholder-link">Let’s add some movies!</a>
      </div>`
    }
  else{
  document.body.style.height = 'auto'

  movieWatchlistContentContainer.innerHTML = ``
  parsedGetMovieSearchResults.forEach((movieItem)=>{
  movieWatchlistContentContainer.classList.remove('my-movie-watchlist')
  movieWatchlistContentContainer.innerHTML += `
       <div class="added-to-watchlist-movies">
           <div class="search-result-poster-container">
               <img src="${movieItem.Poster}" class="search-result-movie-poster" onerror="this.onerror=null;this.src="./images/fallback_image.png"/>
           </div>
           <div class="search-result-text">
               <div class="search-result-title-and-rating">
                 <p class="search-result-title">${movieItem.Title}</p>
                 <img src="./images/star_icon.png" class="search-result-rating-star-icon"/>
                 <div class="search-result-rating">${movieItem.imdbRating}</div>
               </div>

               <div class="search-result-meta-data">
                 <div class="search-result-runtime">${movieItem.Runtime}</div>
                 <div class="search-result-genre">${movieItem.Genre}</div>

                 <i class="remove-btn-icon" for="${movieItem.id}"></i>
                 <input type="button" Value="Remove" class="search-result-remove-from-watchlist-btn" id="${movieItem.id}">
                 </div>
               <div class="search-result-description-paragraph" id="">
                   <div class="plot-description-paragraph-trauncated" id="plot-trauncated${movieItem.id}">
                     ${movieItem.Plot.length > 133 && !movieItem.isPlotDescriptionExpanded ? movieItem.Plot.slice(0, 150) + `... <button id="${movieItem.id}" class="read-more-btn">Read More</button>` : movieItem.Plot}
                   </div>
                   <div class="plot-description-paragraph-expanded" id="plot-expanded${movieItem.id}">
                   ${movieItem.Plot + ` <button id="${movieItem.id}" class="show-less-btn">Show Less</button>`}
                   </div>
               </div>
           </div>
        </div>`

       const removeFromWatchlistIcons = document.querySelectorAll('.remove-btn-icon');
       removeFromWatchlistIcons.forEach((icon) => {
         icon.addEventListener('click', (event) => {
           event.preventDefault();
           const buttonId = event.target.getAttribute('for');
           const removeFromWatchListButtons = document.getElementById(buttonId);
           removeFromWatchListButtons.click();
           console.log('clicked')
         });
       });
       
       const removeFromWatchListButtons = document.querySelectorAll('.search-result-remove-from-watchlist-btn');
       removeFromWatchListButtons.forEach((button) => {
         button.addEventListener('click', (event) => {
           event.preventDefault();
           const buttonId = button.id;
   
          // var targetMovie = myWatchlist.some(movie => movie.id === buttonId);
          const itemIndexToRemove = parsedGetMovieSearchResults.findIndex(item => item.id === buttonId);
          // if (itemIndexToRemove !== -1) {
            // Remove the object at the specified index
            parsedGetMovieSearchResults.splice(itemIndexToRemove, 1);
            localStorage.setItem('myWatchlist', JSON.stringify(parsedGetMovieSearchResults)); 

            function movieRemovedToWatchlistSnackbar(){
              const movieRemovedSnackbar = document.getElementById("movie-removed-from-watchlist")
              movieRemovedSnackbar.className = "show"
              setTimeout(function(){ movieRemovedSnackbar.className = movieRemovedSnackbar.className.replace("show", ""); }, 3000); /* Hide the snackbar after 3 seconds */
            }

            movieRemovedToWatchlistSnackbar()      
            renderMyWatchList()          
          // }
          // else{
          //   // do nothing
          // }

          //  const movieToRemove = movieSearchResults.find(movie => movie.id === buttonId);
          //  if (movieToRemove) {
          //    // Add the movie to the watchlist
          //    // movieWatchlist.push(movieToAdd);
             
          //    var JSONmovieData = JSON.stringify(movieToRemove);
          //    localStorage.removeItem('movieSearchResultsArray', JSONmovieData);
             
          //    let getMovieSearchResults = localStorage.getItem('movieSearchResultsArray')
          //    const parsedMovie = JSON.parse(getMovieSearchResults);
          //    console.log(parsedMovie)
             
          //    // console.log(`Added movie ${movieToAdd.title} to watchlist`);
          //    // console.log(movieWatchlist)
          //  } else {
          //    console.log(`Errorius`);
          //  }
         })
         
       });




      })
    }
   
  }

  // if (parsedGetMovieSearchResults === [null]){
  //   movieWatchlistContentContainer.innerHTML += `            
  //   <div class="my-movie-watchlist-placeholder-content">
  //   <h2 class="my-watchlist-placeholder-headline">Your watchlist is looking a little empty...</h2>
  //   <a href="index.html" class="my-watchlist-placeholder-link">Let’s add some movies!</a>
  //   </div>`
  //   // renderMyWatchList()
  //   renderMyWatchList()
  // }


  


  renderMyWatchList()

