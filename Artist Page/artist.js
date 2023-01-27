const accountPill = document.getElementById("account-pill");
const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const params = new URLSearchParams(location.search);
console.log(params);
const id = params.get("id"); //this can either an id or null
//const id = 13612387; //this can either an id or null
console.log(id);

window.onload = async () => {
  await getArtist(id);
  await fetchTrack(id);
  await scrollHeader();
};
if (sessionStorage.getItem('username') === null) {
  window.location.replace("../login-page/login-page.html")
} else {
  accountPill.innerText = sessionStorage.getItem("username");
}



const getArtist = async (id) => {
  try {
    const options = {
      method: "GET",
      headers: new Headers({
        // "X-RapidAPI-Key": "17885d541bmsh28101685e13b5fap15dc1ejsn0bddab4514f9",
        // "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2FjZGU3MzczODAwMTUzNzQzOGIiLCJpYXQiOjE2NzQ1NTYzNjgsImV4cCI6MTY3NTc2NTk2OH0.oOhKfDMa6Rrq8nZX2NU7dxrUGXvr2aQdXLOkGapH9UE",
      }),
    };
    const response = await fetch(url + id, options);
    const artistArray = await response.json();
    console.log("artistArray", artistArray);
    changeElement(".artist-big-img", "src", artistArray.picture_xl);
    changeElement("h2", "innerText", artistArray.name);
    changeElement(
      ".fan",
      "innerText",
      `${artistArray.nb_fan} monthly listeners`
    );
    
  } catch (err) {
    console.error(err);
  }
};

const changeElement = (elementQuery, prop, value) => {
  let contentPop = document.querySelector(elementQuery);
  contentPop[prop] = value;
};

const fetchTrack = async (id) => {
  try {
    let response = await fetch(url + id + "/top?limit=50");
    // let response = await fetch(
    //   `https://striveschool-api.herokuapp.com/api/deezer/album/363906907`
    // );
    let trackData = await response.json();
    console.log("data", trackData);
    renderFetchedSongs(trackData);
  } catch (err) {
    console.error(err);
  }
};

const renderFetchedSongs = async (trackDataArray) => {
  try {
    let playerTrackBlock = document.querySelector(".player-track-block");
    let track = trackDataArray.data;
    //   console.log("track", track);
    track.forEach((singleSong, index) => {
      playerTrackBlock.innerHTML += `<div class="player-track-list">
      <div class="row align-items-center" onclick = "audioPlayer(${singleSong.album.id})">
        <div class="col-6">
          <div class="d-flex align-items-center">
            <span class="track-num">${index + 1}</span>
            <svg
              role="img"
              height="18"
              width="18"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-encore-id="icon"
              fill="#fff"
              class="play-icon"
            >
              <path
                d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
              ></path>
            </svg>
            <img
              src="${singleSong.album.cover}"
              alt="${singleSong.album.title}"
              width="40px"
              class="mr-3 ml-4"
            />
            <h6 class="mb-0 text-white text-truncate track-title">
              ${singleSong.title}
            </h6>
          </div>
        </div>
        <div class="col-3">
          <small class="artist-small">${singleSong.rank}</small>
        </div>
        <div class="col-3">
          <div
            class="d-flex align-items-center justify-content-end"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-heart mr-3 heart-hover"
              viewBox="0 0 16 16"
            >
              <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
              />
            </svg>
  
            <span class="artist-small mx-3">${(
              singleSong.duration / 60
            ).toFixed(2)}</span>
            <button
              type="button"
              data-toggle="tooltip"
              data-placement="top"
              title="More options for Arijit Singh"
              class="more-btn more-btn2 px-0"
            >
              <svg
                role="img"
                height="24"
                width="24"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-encore-id="icon"
                class="more-svg"
                fill="rgb(145, 148, 150)"
              >
                <path
                  d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>`;
    });
  } catch (err) {
    console.error(err);
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
const logoutBtn = document.querySelector('#logout')
logoutBtn.addEventListener('click', () =>{
  sessionStorage.removeItem('username')
})
// let searchSidebar = document.getElementById("search-sidebar");

// function handleSearch() {
//   let searchBar = document.getElementById("search-bar");
//   if (searchBar.style.display === "none") {
//     searchBar.classList.add("d-block");
//   } else {
//     searchBar.classList.remove("d-none");
//   }
// }
