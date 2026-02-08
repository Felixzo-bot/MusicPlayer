const image = document.getElementById("cover");
const title = document.getElementById("music-title");
const artist = document.getElementById("music-artist");
const currenTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const playerProgress = document.getElementById("player-progress");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playBtn = document.getElementById("play");
const background = document.getElementById("bg-img");

const music = new Audio();

const songs = [
    { path: "assets/1.mp3", displayName: "Elon Musk", cover: "assets/1.jpg", artist: "Dgg" },
    { path: "assets/2.mp3", displayName: "Last Last", cover: "assets/2.jpg", artist: "Burna-Boy" },
    { path: "assets/3.mp3", displayName: "Wizkid", cover: "assets/3.jpg", artist: "Control" },
    { path: "assets/4.mp3", displayName: "NDA", cover: "assets/4.jpg", artist: "Nasty_C" },
    { path: "assets/5.mp3", displayName: "Work", cover: "assets/5.jpg", artist: "Rihanna" },
    { path: "assets/6.mp3", displayName: "Plenty", cover: "assets/2.jpg", artist: "Burna-Boy" },
    { path: "assets/7.mp3", displayName: "Sorry", cover: "assets/7.jpg", artist: "6lack" },
    { path: "assets/8.mp3", displayName: "Influence", cover: "assets/8.jpg", artist: "Chris-brown" },
    { path: "assets/9.mp3", displayName: "Woman", cover: "assets/9.jpg", artist: "Omah-lay" },
    { path: "assets/10.mp3", displayName: "Slip_N_Slide", cover: "assets/3.jpg", artist: "Wizkid feat._Skillibeng_&_Shenseaa" },
    { path: "assets/11.mp3", displayName: "goosebumps", cover: "assets/11.jpg", artist: "Travis scott_ft._Kendrick_Lama" },
    { path: "assets/12.mp3", displayName: "Sad", cover: "assets/2.jpg", artist: "XXtentacion" },
    { path: "assets/13.mp3", displayName: "Joha", cover: "assets/2.jpg", artist: "Asake" },

];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
    
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currenTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
playerProgress.addEventListener("click", setProgressBar);
music.addEventListener("timeupdate", updateProgressBar);

loadMusic(songs[musicIndex]);

