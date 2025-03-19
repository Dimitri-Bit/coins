const apiUrl = "https://jsonblob.com/api/jsonBlob/1351950892655632384/";

const moviesSection = document.querySelector(".movies-section");

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

function displayMovies(json) {
  json.forEach((element) => {
    let movie = constructMovieHTML(element);
    moviesSection.insertAdjacentHTML("beforeend", movie);
  });
}

async function getMovies() {
  const response = await fetch(apiUrl);
  const json = await response.json();
  displayMovies(json.movies);
}

getMovies();
