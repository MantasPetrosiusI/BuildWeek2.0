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

const audioPlayer = async (albumId) => {


    let respons = await fetch(` https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`, playerOptions)
    let data = await respons.json();
    const songs = data.tracks
    let arraySongs = []
    songs.data.map((song)=>{
        arraySongs.push(song)
    })
    let i = 0;

    const play = document.querySelector('.play.fa-solid.fa-circle-play');
    const pause = document.querySelector('.pause.fa-solid.fa-circle-pause');
    const prev = document.querySelector('.fas.fa-step-backward');
    const next = document.querySelector('.fas.fa-step-forward');
    const loop = document.querySelector('.fa-solid.fa-repeat');
    const shuffle = document.querySelector('.fas.fa-random');
    const unmute = document.querySelector('.fas.fa-volume-down')
    const mute = document.querySelector('.fa-solid.fa-volume-xmark')

    let audio = document.querySelector('audio')

    audio.src =  `${songs.data[i].preview}`;
    audio.volume = 0.5;
    audio.play();
    audio.pause();
    play.style.display = "block";
    pause.style.display = "none";
    
    //SHUFFLE
    shuffle.addEventListener('click', () => {

        i = Math.floor(Math.random() * songs.data.length);
        let randomSong = songs.data[i].preview
        audio.src = `${randomSong}`
        audio.play()
    })
    document.querySelector('.image-container').innerHTML = `<img src="${songs.data[i].album.cover_small}" alt=""/>`
    document.querySelector('p.title').innerHTML = `<b>${songs.data[i].album.title}</b>`;
    document.querySelector('p.artist').innerHTML = `${songs.data[i].artist.name}`;

    //PLAY
    play.addEventListener('click', () => {
        if (audio.paused) {
            audio.play()
            play.style.display = "none";
            pause.style.display = "block";
        }
    })
    //PAUSE
    pause.addEventListener('click', () => {
        if (!audio.paused) {
            audio.pause()
            play.style.display = "block";
            pause.style.display = "none";
        }
        })
    //REPEAT
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
    //TIMER =>>
    songCurrent = setInterval(function () {
        let current = document.getElementById("current");
        let bar = document.querySelector('.progress');
        let mins = Math.floor(audio.currentTime / 60);
        let secs = Math.floor(audio.currentTime % 60);
        let calc = Math.trunc((100*secs)/(audio.duration%60));
        bar.style.width = `${calc}%`
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
    // <<=
    //PREVIOUS SONG
    prev.addEventListener('click', () =>{
        if(i===0){
            i = arraySongs.length-1;
            audio.src = `${songs.data[i].preview}`
            audio.play()       
        }else{
            i--;
            audio.src = `${songs.data[i].preview}`
            audio.play()
        }  
    })
    //NEXT SONG
    next.addEventListener('click', () =>{
        if(i === arraySongs.length){
            i = 0;
            audio.src = audio.src = `${songs.data[i].preview}`
            audio.play()
        }else{
            i++;
            audio.src = `${songs.data[i].preview}`
            audio.play()
        }
    })

    //AFTER ONE SONG IS DONE NEXT ON PLAYS
    audio.onended = () =>{
        if(i === arraySongs.length){
            i = 0;
            audio.src = audio.src = `${songs.data[i].preview}`
            audio.play()
        }else{
            i++;
            audio.src = `${songs.data[i].preview}`
            audio.play()
        }
    }
    //MUTE
    mute.addEventListener('click', () =>{
        if(audio.muted){
            audio.muted = false;
            unmute.style.display = "block";
            mute.style.display = "none";
    }})
    unmute.addEventListener('click', () =>{
        if(!audio.muted){
            audio.muted = true;
            unmute.style.display = "none";
            mute.style.display = "block";
    }})
}
//VOLUME BAR
function setVol(el){
    const aud = document.querySelector('#audio')
    let newVal = el.value;
    console.log(newVal)
    aud.volume = el.value/100;
    }