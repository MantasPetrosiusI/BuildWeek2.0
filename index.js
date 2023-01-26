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

const audioPlayer = async() =>{
    const res = await fetch(url+"Metallica", options)
    const songs = await res.json();
    console.log(songs)

    //CHANGE EVERYTHING THATS HARDCODED ACCORDINGLY TO OTHER JS FILES TO CORRESPOND TO THEIR FETCH/ onClick e.g songs.data[14]
    let audio = new Audio(`${songs.data[14].preview}`)
    
    
    const play = document.querySelector('.play.fa-solid.fa-circle-play');
    const pause = document.querySelector('.pause.fa-solid.fa-circle-pause');
    const loop = document.querySelector('.fa-solid.fa-repeat');
    const shuffle = document.querySelector('.fas.fa-random')

    shuffle.addEventListener('click', ()=>{
                let randomSong = songs.data[Math.floor(Math.random()*songs.data.length)].preview
                audio.pause()
                audio = new Audio(`${randomSong}`).play()
            })
    document.querySelector('.image-container').innerHTML +=`<img src="${songs.data[14].album.cover_small}" alt=""/>`
    document.querySelector('p.title').innerHTML += `<b>${songs.data[14].album.title}</b>`;
    document.querySelector('p.artist').innerHTML += `${songs.data[14].artist.name}`;
    
    let state = "paused";
        play.addEventListener('click', ()=>{
            if(state === "paused"){
                audio.play()            
                play.style.display = "none";
                pause.style.display= "block";
                state = "playing"

                
            }
        pause.addEventListener('click', () =>{
            if(state = "playing"){

                audio.pause()
                play.style.display= "block";
                pause.style.display ="none";
                state = "paused"
            }     
            
        })
        
            
        })
        let isLooping = false;
        loop.addEventListener('click', ()=>{
            
            if(!isLooping){
                audio.loop = true;
                isLooping = true;   
                loop.style.color = "#ddd"       
            }else{
                audio.loop = false;
                isLooping = false;
                loop.style.color = "#999"
            }
            
        })


      songCurrent = setInterval(function() {
      let current = document.getElementById("current")
      let mins = Math.floor(audio.currentTime / 60);
      let secs = Math.floor(audio.currentTime % 60);
      if (secs < 10) {
        secs = '0' + String(secs);
      }
      current.innerHTML = mins + ':' + secs;
    }, 10);

    audio.addEventListener('loadeddata', ()=>{
        let songLength = document.getElementById("length")
        let mins = Math.floor(audio.duration / 60);
        let secs = Math.floor(audio.duration % 60);
        if (secs < 10) {
        secs = '0' + String(secs);
      }
      songLength.innerHTML = mins + ':' + secs;
    })
        }
    let audioHtml = document.querySelector('#audio');
    let dur = document.querySelector('#dur')
    
window.onload = async ()=> {await audioPlayer()}
