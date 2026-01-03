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

// Function to format time (mm:ss)
function formatTime(sec) {
    if (isNaN(sec)) return "00:00";
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Function to load song and update UI
function loadSong(card) {
    const src = card.getAttribute('data-src');
    const title = card.getAttribute('data-title');
    const artist = card.getAttribute('data-artist');
    const img = card.getAttribute('data-img');

    console.log("Loading song:", src);

    if (!src) {
        console.warn('No data-src for this card');
        return;
    }

    globalAudio.src = src;
    globalAudio.play().catch(err => console.error("Audio play failed:", err));

    // Update UI
    songName.textContent = title || 'Unknown Song';
    artistName.textContent = artist || 'Unknown Artist';
    albumCover.src = img || '';

    // Highlight current card
    cards.forEach(c => c.classList.remove('playing'));
    card.classList.add('playing');

    // Set play button to pause
    playBtn.classList.replace('fa-circle-play', 'fa-circle-pause');
}

// Click on card → load song
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        currentTrackIndex = index;
        loadSong(card);
    });
});

// Play/Pause button
playBtn.addEventListener('click', () => {
    if (globalAudio.paused) {
        globalAudio.play().catch(err => console.error("Audio play failed:", err));
        playBtn.classList.replace('fa-circle-play', 'fa-circle-pause');
    } else {
        globalAudio.pause();
        playBtn.classList.replace('fa-circle-pause', 'fa-circle-play');
    }
});

// Update progress bar and times
globalAudio.addEventListener('timeupdate', () => {
    if (globalAudio.duration) {
        progressBar.value = (globalAudio.currentTime / globalAudio.duration) * 100;
        currTime.textContent = formatTime(globalAudio.currentTime);
        totTime.textContent = formatTime(globalAudio.duration);
    }
});

// Seek audio using progress bar
progressBar.addEventListener('input', () => {
    globalAudio.currentTime = (progressBar.value / 100) * globalAudio.duration;
});
