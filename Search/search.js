let searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

let searchRow = document.getElementById("search-row");
let searchArtistRow = document.getElementById("search-artist-row");
let albumArtistData = [];
let albumData = [];
let allData = [];
let filteredItem;
let filteredArtist;

const options = {
  method: "GET",
  headers: new Headers({
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2FjZGU3MzczODAwMTUzNzQzOGIiLCJpYXQiOjE2NzQ1NTYzNjgsImV4cCI6MTY3NTc2NTk2OH0.oOhKfDMa6Rrq8nZX2NU7dxrUGXvr2aQdXLOkGapH9UE",
  }),
};
window.onload = async () => {
  await loadFetchAlbum("Metallica");
  await scrollHeader();
  // await loadAllArtist();
};

const artistArray = ["queen", "Avicii", "Metallica", "Eminem", "Akon"];

const loadAllArtist = async () => {
  try {
    for (let i = 0; i < artistArray.length; i++) {
      const response = await fetch(searchUrl + artistArray[i], options);

      const albumArray = await response.json();

      albumArtistData = albumArray.data;
      displayAllArtist(albumArtistData);
    }
  } catch (err) {
    console.error(err);
  }
};
function displayAllArtist(albumArtistList) {
  const artistList = albumArtistList.slice(0, 5);
  artistList.forEach((album) => {
    searchArtistRow.innerHTML += `<div class=" col-12 mb-4 col-sm-4 mb-sm-4 col-md-4 mb-md-4 col-lg-3 mb-lg-4 col-xl-2">
    <div  class="album-card w-100">
    <a href="../album-page/album-page.html?id=${album.album.id}" class="w-100">
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

const loadFetchAlbum = async (query) => {
  try {
    const response = await fetch(searchUrl + query, options);
    const albumArray = await response.json();

    albumData = albumArray.data;
    // console.log(albumData);
    displayAlbums(albumData);
  } catch (err) {
    console.error(err);
  }
};

function displayAlbums(albums) {
  // const albumList = albums.slice(0, 12);
  albums.forEach((singleItem) => {
    searchRow.innerHTML += `
    <div
              class="col-12 mb-4 col-sm-4 mb-sm-4 col-md-4 mb-md-4 col-lg-3 mb-lg-4 col-xl-2"
            >
              <div class="album-card w-100">
                <a
                   href="../album-page/album-page.html?id=${singleItem.album.id}"
                  class="w-100"
                >
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
                      src="${singleItem.album.cover_medium}"
                      class="card-img-top mb-3"
                      alt="${singleItem.album.title}"
                      width="100%"
                    />
                    <div class="card-body p-0">
                      <h6
                        class="card-title text-capitalize text-truncate text-white mb-0"
                      >
                      ${singleItem.album.title}
                      </h6>
                      <p class="card-text text-truncate mt-1">${singleItem.title_short}</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
    `;
  });
}

const handleSearchQuery = (e) => {
  let deleteText = document.getElementById("delete-text");
  let searchInput = document.querySelector(".search-input");
  console.log(albumData);
  if (e) {
    deleteText.classList.remove("d-none");
    deleteText.classList.add("d-block");
    deleteText.style.cursor = "pointer";
    deleteText.addEventListener("click", () => {
      searchInput.value = "";
      window.location.assign("./search.html");
    });
  } else {
    deleteText.classList.add("d-none");
  }
  if (e.length > 2) {
    searchRow.innerHTML = "";
    filteredItems = albumData.filter((item) => {
      return item.album.title.toLowerCase().includes(e.toLowerCase());
    });

    let albumTitle = document.getElementById("album-title");
    albumTitle.textContent = "Searched Album";
    displayAlbums(filteredItems);
  } else {
    displayAlbums(albumData);
  }
};

let header = document.querySelector(".content-header");
function scrollHeader() {
  document.addEventListener("scroll", () => {
    let scrollPosition = window.scrollY;
    if (scrollPosition >= 1) {
      header.classList.add("header-bg-color");
    }
    if (scrollPosition < 1) {
      header.classList.remove("header-bg-color");
    }
  });
}
