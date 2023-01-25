const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const par = new URLSearchParams(location.search);
const id = par.get("id");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "828f11075cmsh673f44971af4ac0p15da10jsn7af9d8953784",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const loadArtist = async (query) => {
  try {
    const response = await fetch(url + query, options);

    const songs = await response.json();
    const { data } = songs;
    console.log(songs);
    const artists = data.slice(0, 8);
    let popularAlbums = document.getElementById("inner");
    // console.log(popularAlbums);
    artists.forEach((song) => {
      popularAlbums.innerHTML += `<div class="col-12 col-sm-12 col-md-4 col-lg-3 mb-4" id="topCards">
                  <a href="./album-page/album-page.html?id=${song.album.id}" class="horizontal-card-block d-flex align-items-center">
               
                    <img
                      src="${song.album.cover}"
                      alt="${song.album.title}"
                      width="60px"
                      class="media-img"
                    />

                    <h6 class="ml-3 mb-0 text-truncate text-white">${song.album.title}</h6>
                 </a>
                  </div>`;
    });
  } catch (err) {
    console.log(err);
  }
};
const artistArray = ["queen", , "Avicii", "Metallica", "Eminem", "Akon"];
const loadAlbums = async () => {
  try {
    for (let i = 0; i < artistArray.length; i++) {
      const response = await fetch(url + artistArray[i], options);

      const albums = await response.json();
      const { data } = albums;
      const displayAlbums = data.slice(0, 1);
      let popularAlbums = document.getElementById("showsToTry");
      displayAlbums.forEach((album) => {
        popularAlbums.innerHTML += `<div class=" col-12 mb-4 col-sm-4 mb-sm-4 col-md-4 mb-md-4 col-lg-3 mb-lg-4 col-xl-2">
        <div  class="album-card w-100">
        <a href="./album-page/album-page.html?id=${album.album.id}" class="w-100">
          <button type="button" title="Play" class="play-green-btn">
            <svg
              role="img"
              height="24"
              width="24"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-encore-id="icon"
            >
              <path
                d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
              ></path>
            </svg>
          </button>
          <div class="card">
            <img
              src="${album.album.cover_medium}"
              class="card-img-top mb-3"
              alt="${album.album.title}"
             width="100%"
            />
            <div class="card-body p-0">
              <h6
                class="card-title text-capitalize text-truncate text-white mb-0"
              >
              ${album.album.title}
              </h6>
              <p class="card-text text-truncate mt-1"> ${album.title_short}</p>
            </div>
          </div>
          </a>
        </div>
      </div>`;
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const loadQueen = async (value) => {
  try {
    const response = await fetch(url + value, options);

    const songs = await response.json();
    const { data } = songs;
    const displaySongs = data.slice(0, 6);
    console.log(displaySongs);
    let popularAlbums = document.getElementById("recentlyPlayed");
    displaySongs.forEach((song) => {
      popularAlbums.innerHTML += `<div class=" col-12 mb-4 col-sm-4 mb-sm-4 col-md-4 mb-md-4 col-lg-3 mb-lg-4 col-xl-2">
        <div  class="album-card w-100">
        <a href="./album-page/album-page.html?id=${song.album.id}" class="w-100">
          <button type="button" title="Play" class="play-green-btn">
            <svg
              role="img"
              height="24"
              width="24"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-encore-id="icon"
            >
              <path
                d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
              ></path>
            </svg>
          </button>
          <div class="card">
            <img
              src="${song.album.cover_medium}"
              class="card-img-top mb-3"
              alt="${song.album.title}"
             width="100%"
            />
            <div class="card-body p-0">
              <h6
                class="card-title text-capitalize text-truncate text-white mb-0"
              >
              ${song.album.title}
              </h6>
              <p class="card-text text-truncate mt-1"> ${song.title_short}</p>
            </div>
          </div>
          </a>
        </div>
      </div>`;
    });
  } catch (err) {
    console.log(err);
  }
};

let header = document.querySelector(".content-header");
function scrollHeader() {
  document.addEventListener("scroll", () => {
    let scrollPosition = window.scrollY;
    if (scrollPosition >= 1) {
      header.classList.add("header-bg-color");
      // header.style.backgroundColor = "#000";
    }
    if (scrollPosition < 1) {
      header.classList.remove("header-bg-color");
      // header.style.backgroundColor = "transparent";
    }
  });
}

window.onload = async () => {
  await loadArtist("Metallica");
  await loadQueen("queen");
  await loadAlbums();
  await scrollHeader();
};

function next() {
  window.history.forward();
}

function previous() {
  window.history.back();
}
