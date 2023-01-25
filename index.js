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

const fetchSong = async() =>{
    const res = await fetch(url+"Metallica", options)
    const songs = await res.json();
    console.log(songs)


    const playPauses = document.querySelectorAll('.play-pause.fas.fa-play');
    let state = "paused";
        const audio = new Audio(`${songs.data[3].preview}`)
        playPauses.forEach((playPause)=>{
        playPause.addEventListener('click', ()=>{
            if(state === "paused"){
                audio.play()
                state = "playing"
            }else{
                audio.pause()
                state = "paused"
            }
            
        })
        })
}
fetchSong()







