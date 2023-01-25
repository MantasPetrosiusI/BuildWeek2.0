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
    artists.forEach((song) => {
      const popularAlbums = document.getElementById("inner");
      popularAlbums.innerHTML += `<div class="col-2" id="topCards">
                    <div class="card mb-3">
                      <div class="row no-gutters">
                        <div class="col-4">
                          <a href="./album-page/album-page.html?id=${song.album.id}"><img src="${song.album.cover}" class="card-img" alt="..." style="height:64px; width: 64px;></a>
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title">${song.album.title}</h5>
                            
                          </div>
                        </div>
                      </div>
                    </div>
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
      displayAlbums.forEach((album) => {
        const popularAlbums = document.getElementById("showsToTry");
        popularAlbums.innerHTML += `<div class="col col-2">
<div class="card" id="bottomCard">
  <a href="./album-page/album-page.html?id=${album.album.id}"><img src="${album.album.cover_medium}" class="card-img-top" alt="..." ></a>
  <div class="card-body">
  <span>${album.album.title}</span></a>
    <span id="spotifyPlay"><i class="bi bi-play-circle-fill" style="font-size: 45px; color: #1fdf64"></i></span>
  </div>
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
    displaySongs.forEach((song) => {
      const popularAlbums = document.getElementById("recentlyPlayed");
      popularAlbums.innerHTML += `<div class="col col-2">
<div class="card" id="bottomCard">
  <a href="./album-page/album-page.html?id=${song.album.id}"><img src="${song.album.cover_medium}" class="card-img-top" alt="..." ></a>
  <div class="card-body">
  <span>${song.album.title}</span></a>
    <span id="spotifyPlay"><i class="bi bi-play-circle-fill" style="font-size: 45px; color: #1fdf64"></i></span>
  </div>
</div>
</div>`;
    });
  } catch (err) {
    console.log(err);
  }
};
window.onload = async () => {
  await loadQueen("queen");
  await loadAlbums();
  await loadArtist("Metallica");
};

function next() {
  window.history.forward();
}

function previous() {
  window.history.back();
}
