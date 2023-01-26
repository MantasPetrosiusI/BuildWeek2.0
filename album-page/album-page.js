const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "624ae02b3emsh4797618b358aa86p1c3a1djsn65e61e09845f",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const params = new URLSearchParams(location.search);
const albumID = params.get("id");
console.log(albumID);

const url = ` https://striveschool-api.herokuapp.com/api/deezer/album/${albumID}`;
const albumImg = document.getElementsByClassName("album-img")[0];
const albumName = document.getElementsByClassName("album-name")[0];
const albumInfo = document.getElementsByClassName("album-info")[0];
const albumMusicList = document.getElementsByClassName("album-music-list")[0];

window.onload = async () => {
  await fetchData();
};

const fetchData = async () => {
  try {
    let res = await fetch(url, options);

    if (res.ok) {
      data = await res.json();
      console.log(data);
      displayData();
    }
  } catch (error) {
    console.log(error);
  }
};

const displayData = async () => {
  let counter = 1;
  albumImg.innerHTML = `<img src="${data.cover_medium}" alt="">`;
  albumName.innerHTML = `<h1>${data.title}</h1>`;
  albumInfo.innerHTML = `<img src="${
    data.artist.picture
  }" alt="" class="artist-picture mr-2">
    <span><a href="../Artist Page/artist.html?id=${
      data.artist.id
    }" class="text-white">${data.artist.name}<a/> • 2003 • ${
    data.tracks.data.length
  } songs, <span class="time-span">${convertSec(
    data.duration,
    true
  )}<span></span>`;

  await data.tracks.data.map((song) => {
    albumMusicList.innerHTML += `
        <tr class="track-row" onclick="audioPlayer(${song.album.id})">
            <th scope="row" class="align-middle track-number">${counter}</th>
                <td>
                    <div class="row m-0">${song.title}</div>
                    <div class="row m-0"><a href="../Artist Page/artist.html?id=${
                      data.artist.id
                    }" class="track-list">${song.artist.name}</a></div>
                </td>
            <td class="ml-auto align-middle"><span class ="mr-5 tracklistHeart"></span>${convertSec(
              song.duration
            )}</td>
        </tr>
        `;
    counter++;
  });
  addEventListeners();
};

//const addEventListeners 0
//history.back

const addEventListeners = async () => {
  let trackNumbers = document.getElementsByClassName("track-number");
  let heartIcons = document.getElementsByClassName("tracklistHeart");

  for (const trackNumber of trackNumbers) {
    let number = trackNumber.innerHTML;
    trackNumber.closest("tr").addEventListener("mouseover", function () {
      trackNumber.innerHTML = '<i class="bi bi-play-fill"></i>';
    });
    trackNumber.closest("tr").addEventListener("mouseleave", function () {
      trackNumber.innerHTML = `${number}`;
    });
  }

  for (const heartIcon of heartIcons) {
    heartIcon.closest("tr").addEventListener("mouseover", function () {
      heartIcon.innerHTML = '<i class="bi bi-heart" id="songHeart"></i>';
    });
    heartIcon.closest("tr").addEventListener("mouseleave", function () {
      heartIcon.innerHTML = "";
    });
  }
};

const convertSec = (sec, song = false) => {
  const totalMinutes = Math.floor(sec / 60);
  let seconds = sec % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (song === false) {
    return `${minutes}:${seconds}`;
  }

  if (hours >= 1 && song === false) {
    return `${hours} hr ${minutes} min ${seconds} sec`;
  } else {
    return `${minutes} min ${seconds} sec`;
  }
};
