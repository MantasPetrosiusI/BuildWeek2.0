const playerUrl = ` https://striveschool-api.herokuapp.com/api/deezer/album/`;
const para = new URLSearchParams(location.search);
const playerId = para.get("id");

const playerOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '624ae02b3emsh4797618b358aa86p1c3a1djsn65e61e09845f',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
};

console.log("here")




const audioPlayer = async (albumId) => {

    let respons = await fetch(` https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`, playerOptions)
    let data = await respons.json();
    const songs = data.tracks
    console.log(songs);



    //CHANGE EVERYTHING THATS HARDCODED ACCORDINGLY TO OTHER JS FILES TO CORRESPOND TO THEIR FETCH/ onClick e.g songs.data[14]


    const play = document.querySelector('.play.fa-solid.fa-circle-play');
    const pause = document.querySelector('.pause.fa-solid.fa-circle-pause');
    const loop = document.querySelector('.fa-solid.fa-repeat');
    const shuffle = document.querySelector('.fas.fa-random')
    const audio = new Audio();
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio(`${songs.data[0].preview}`).play()

    shuffle.addEventListener('click', () => {
        let randomSong = songs.data[Math.floor(Math.random() * songs.data.length)].preview
        audio.pause()
        audio = new Audio(`${randomSong}`).play()
    })
    document.querySelector('.image-container').innerHTML = `<img src="${songs.data[0].album.cover_small}" alt=""/>`
    document.querySelector('p.title').innerHTML = `<b>${songs.data[0].album.title}</b>`;
    document.querySelector('p.artist').innerHTML = `${songs.data[0].artist.name}`;

    let state = "paused";
    play.addEventListener('click', () => {
        if (state === "paused") {
            audio.play()
            play.style.display = "none";
            pause.style.display = "block";
            state = "playing"


        }
        pause.addEventListener('click', () => {
            if (state = "playing") {

                audio.pause()
                play.style.display = "block";
                pause.style.display = "none";
                state = "paused"
            }

        })
    })
    let isLooping = false;
    loop.addEventListener('click', () => {

        if (!isLooping) {
            audio.loop = true;
            isLooping = true;
            loop.style.color = "#ddd"
        } else {
            audio.loop = false;
            isLooping = false;
            loop.style.color = "#999"
        }

    })


    songCurrent = setInterval(function () {
        let current = document.getElementById("current")
        let mins = Math.floor(audio.currentTime / 60);
        let secs = Math.floor(audio.currentTime % 60);
        if (secs < 10) {
            secs = '0' + String(secs);
        }
        current.innerHTML = mins + ':' + secs;
    }, 10);

    audio.addEventListener('loadeddata', () => {
        let songLength = document.getElementById("length")
        let mins = Math.floor(audio.duration / 60);
        let secs = Math.floor(audio.duration % 60);
        if (secs < 10) {
            secs = '0' + String(secs);
        }
        songLength.innerHTML = mins + ':' + secs;
    })
}
audioPlayer("915785")
let audioHtml = document.querySelector('#audio');
let dur = document.querySelector('#dur')


