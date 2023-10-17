// show the shows with highest ranking
fetch('https://api.tvmaze.com/shows')
    .then(blob => blob.json())
    .then(json => {
        const topTenShows = json
        .filter(show => show.rating.average) 
        .sort((a, b) => a.rating.average > b.rating.average ? -1 : 1) 
        .slice(0, 9) // tar element 0-9 i arrayen

    return topTenShows
  })
  .then(shows => {
    const app = document.getElementById('app')

    app.innerHTML = shows.map(show => `
      <div class="col-sm movie-content">
        <img src="${show.image.medium}">
        <div class="movie-info">
          <h5>${show.name}</h5>
          <span>Rating: ${show.rating.average}</span>
          <br />
          <span>Rating: ${show.genres}</span>
        </div>
      </div>

    `).join()
  })

// show the search results
function searchTvAmaze ({ target }) {
    fetch(`https://api.tvmaze.com/search/shows?q=${target.value}`)
        .then(blob => blob.json())
        .then(shows => {
            const app = document.getElementById('app')
        app.innerHTML = shows.map(({ show }) => `
          <div class="col-sm movie-content">
            ${show.image ? `<img src="${show.image.medium}">` : ''}
            <div class="movie-info">
              <h5>${show.name}</h5>
              <span>Rating: ${show.rating.average}</span>
              <br />
              <span>Rating: ${show.genres}</span>
            </div>
          </div>

        `).join();
      })
  }

  const inputSearchField = document.querySelector('.inputSearchField')
  inputSearchField.addEventListener('keydown', searchTvAmaze)

  
  let searchText = document.getElementByID('searchText').value;
let searchBtn = document.getElementByID('searchBtn').addEventListener('click',search());

async function search(){
  let results = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchText}/&api_key=dc6zaTOxFJmzC`)
  console.log(results);
}