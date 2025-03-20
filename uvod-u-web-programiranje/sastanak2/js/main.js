const apiUrl = "https://jsonblob.com/api/jsonBlob/1351950892655632384/";

const moviesSection = document.querySelector(".movies-section");
const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-form");

function constructMovieHTML(json) {
  return `
        <div class="movie">
        <div class="movie-image">
          <img
            src="${json.img}"
            alt="${json.title} cover image"
          />
        </div>
        <div class="movie-info">
          <h3>${json.title}</h3>
          <p><strong>Year:</strong> ${json.year}</p>
          <p><strong>Genre:</strong> ${json.genre}</p>
          <p><strong>IMBd Rating:</strong> ${json.imdb_rating}</p>
        </div>
      </div>
    `;
}

function cleanMovies() {
  document.querySelectorAll(".movie").forEach((element) => element.remove());
}

function displayMovies(json) {
  cleanMovies();
  json.forEach((element) => {
    if (!searchInput.value) {
      let movie = constructMovieHTML(element);
      moviesSection.insertAdjacentHTML("beforeend", movie);
      return;
    }

    let searchedMovie = searchInput.value;
    if (searchedMovie.toLowerCase() == element.title.toLowerCase()) {
      let movie = constructMovieHTML(element);
      moviesSection.insertAdjacentHTML("beforeend", movie);
    }
  });
}

async function getMovies() {
  const response = await fetch(apiUrl);
  const json = await response.json();
  displayMovies(json.movies);
}

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  getMovies();
});

getMovies();
