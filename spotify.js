const cards = document.querySelectorAll('.card');
let lastClick = 0;

cards.forEach((card)=>{
    const audio=card.querySelector('.card-audio');

    card.addEventListener('click' , ()=>{
        const now = Date.now();

         // Agar 300ms ke andar dusra click aaya, ignore karo
        if (now - lastClick < 300) return;
        lastClick = now;

        //sabhi audio ko pause karne ke liye
        document.querySelectorAll('.card-audio').forEach(aud=>{
            aud.pause();
            if(aud !==audio){
                aud.currentTime=0;//reset
                aud.parentElement.classList.remove('playing');
            }
        });

        if(audio.paused){
            audio.play();
            card.classList.add('playing');
        }else{
            audio.pause();
            card.classList.remove('playing');
        }
    })
})

const audio = document.getElementById('global-audio');
const albumCover = document.querySelector('.album-cover');
const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name');
const playBtn = document.querySelector('.play-btn');
const progressBar = document.querySelector('.progressbar');
const currTime = document.querySelector('.curr-time');
const totTime = document.querySelector('.tot-time');

let currentTrackIndex = 0;
const card = document.querySelectorAll('.card');

// Function to load song details in player
function loadSong(card) {
    audio.src = card.getAttribute('data-src');
    songName.textContent = card.getAttribute('data-title');
    artistName.textContent = card.getAttribute('data-artist');
    albumCover.src = card.getAttribute('data-img');
    audio.play();
    playBtn.classList.replace('fa-circle-play', 'fa-circle-pause');
}
// Click on card → load song in player
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        currentTrackIndex = index;
        loadSong(card);
    });
});
// Play/Pause button
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.classList.replace('fa-circle-play', 'fa-circle-pause');
    } else {
        audio.pause();
        playBtn.classList.replace('fa-circle-pause', 'fa-circle-play');
    }
});
// Update progress bar
audio.addEventListener('timeupdate', () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currTime.textContent = formatTime(audio.currentTime);
    totTime.textContent = formatTime(audio.duration);
});

// Seek song
progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Helper function for time formatting
function formatTime(sec) {
    if (isNaN(sec)) return "00:00";
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
