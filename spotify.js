// Global elements
const cards = document.querySelectorAll('.card');
const globalAudio = document.getElementById('global-audio');
const albumCover = document.querySelector('.album-cover');
const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name');
const playBtn = document.querySelector('.play-btn');
const progressBar = document.querySelector('.progressbar');
const currTime = document.querySelector('.curr-time');
const totTime = document.querySelector('.tot-time');

let currentTrackIndex = 0;

// Function to load song details in global player
function loadSong(card) {
    const src = card.getAttribute('data-src');
    const title = card.getAttribute('data-title');
    const artist = card.getAttribute('data-artist');
    const img = card.getAttribute('data-img');

    if (!src) {
        console.warn('No data-src for this card - cannot play');
        return;  // Skip if no audio source
    }

    globalAudio.src = src;
    songName.textContent = title || 'Unknown Song';
    artistName.textContent = artist || 'Unknown Artist';
    albumCover.src = img || '';
    globalAudio.play();
    playBtn.classList.replace('fa-circle-play', 'fa-circle-pause');

    // Remove 'playing' from all cards, add to current
    cards.forEach(c => c.classList.remove('playing'));
    card.classList.add('playing');
}

// Card click → load song in global player
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        currentTrackIndex = index;
        loadSong(card);
    });
});

// Play/Pause button
playBtn.addEventListener('click', () => {
    if (globalAudio.paused) {
        globalAudio.play();
        playBtn.classList.replace('fa-circle-play', 'fa-circle-pause');
    } else {
        globalAudio.pause();
        playBtn.classList.replace('fa-circle-pause', 'fa-circle-play');
    }
});

// Update progress bar
globalAudio.addEventListener('timeupdate', () => {
    if (globalAudio.duration) {
        progressBar.value = (globalAudio.currentTime / globalAudio.duration) * 100;
        currTime.textContent = formatTime(globalAudio.currentTime);
        totTime.textContent = formatTime(globalAudio.duration);
    }
});

// Seek song
progressBar.addEventListener('input', () => {
    globalAudio.currentTime = (progressBar.value / 100) * globalAudio.duration;
});

// Helper function for time formatting
function formatTime(sec) {
    if (isNaN(sec)) return "00:00";
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}