/* ===== SUPABASE CONFIG ===== */
const SUPABASE_URL = "https://zadiqggtisksokizmlpf.supabase.co";
const SUPABASE_KEY = "sb_publishable_0N0AN7u4X6cvSzAGZ3WRgw__9uKA1U7";
/* Songs will come from Supabase */
let songs = [];

/* ===== PLAYER ELEMENTS ===== */
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const songList = document.getElementById("songList");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volIcon = document.getElementById("volIcon");

const search = document.getElementById("search");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const themeToggle = document.getElementById("themeToggle");

let currentIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;


/* ===== FETCH SONGS FROM SUPABASE ===== */
async function fetchSongs() {

  try {

    const res = await fetch(`${SUPABASE_URL}/rest/v1/songs?select=*`, {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      console.error("Supabase error:", res.status);
      return;
    }

    const data = await res.json();
    console.log("Songs loaded:", data);

    songs = data;
    loadPlaylist();

  } catch (err) {
    console.error("Fetch failed:", err);
  }

}

fetchSongs();


/* ===== BUILD PLAYLIST ===== */
function loadPlaylist() {

  songList.innerHTML = "";

  songs.forEach((song, index) => {

    const li = document.createElement("li");
    li.innerText = `${song.title} - ${song.artist}`;

    li.onclick = () => {
      currentIndex = index;
      loadSong(index);
      audio.play();
      isPlaying = true;
      playBtn.innerText = "⏸";
    };

    songList.appendChild(li);

  });

  loadSong(0);
}


/* ===== FORMAT TIME ===== */
function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}


/* ===== LOAD SONG ===== */
function loadSong(index) {

  const song = songs[index];

  cover.classList.add("change");

  setTimeout(() => {
    cover.classList.remove("change");
  }, 200);

  title.innerText = song.title;
  artist.innerText = song.artist;

  audio.src = song.url;   // from database
  cover.src = song.cover; // from database

  document.querySelectorAll("#songList li").forEach(li =>
  li.classList.remove("active-song")
);

if (songList.children[index]) {
  songList.children[index].classList.add("active-song");
}
}


/* ===== PLAY / PAUSE ===== */
playBtn.onclick = () => {

  if (isPlaying) {
    audio.pause();
    playBtn.innerText = "▶";
    cover.classList.remove("playing");
  } else {
    audio.play();
    playBtn.innerText = "⏸";
    cover.classList.add("playing");
  }

  isPlaying = !isPlaying;
};


/* ===== NEXT ===== */
nextBtn.onclick = () => {

  currentIndex = (currentIndex + 1) % songs.length;

  loadSong(currentIndex);
  audio.play();

  isPlaying = true;
  playBtn.innerText = "⏸";
};


/* ===== PREVIOUS ===== */
prevBtn.onclick = () => {

  currentIndex = (currentIndex - 1 + songs.length) % songs.length;

  loadSong(currentIndex);
  audio.play();

  isPlaying = true;
  playBtn.innerText = "⏸";
};


/* ===== AUTO NEXT ===== */
audio.addEventListener("ended", () => {

  if (isRepeat) {
    audio.play();
  }
  else if (isShuffle) {

    currentIndex = Math.floor(Math.random() * songs.length);

    loadSong(currentIndex);
    audio.play();
  }
  else {
    nextBtn.click();
  }

});


/* ===== PROGRESS BAR ===== */
audio.addEventListener("timeupdate", () => {

  if (audio.duration) {

    progress.value = (audio.currentTime / audio.duration) * 100;

    currentTimeEl.innerText = formatTime(audio.currentTime);
    durationEl.innerText = formatTime(audio.duration);

    progress.style.background =
      `linear-gradient(to right, #22c55e ${progress.value}%, #334155 ${progress.value}%)`;

  }

});


/* ===== SEEK ===== */
progress.oninput = () => {

  audio.currentTime = (progress.value / 100) * audio.duration;

};


/* ===== VOLUME ===== */
volume.oninput = () => {

  audio.volume = volume.value;

  if (volume.value == 0) volIcon.innerText = "🔇";
  else if (volume.value < 0.5) volIcon.innerText = "🔉";
  else volIcon.innerText = "🔊";

};


/* ===== SEARCH ===== */
search.oninput = () => {

  const val = search.value.toLowerCase();

  document.querySelectorAll("#songList li").forEach(li => {

    li.style.display =
      li.innerText.toLowerCase().includes(val) ? "block" : "none";

  });

};


/* ===== SHUFFLE ===== */
shuffleBtn.onclick = () => {

  isShuffle = !isShuffle;

  if (isShuffle) {
    shuffleBtn.classList.add("control-active");
  } else {
    shuffleBtn.classList.remove("control-active");
  }

};

/* ===== REPEAT ===== */
repeatBtn.onclick = () => {

  isRepeat = !isRepeat;

  if (isRepeat) {
    repeatBtn.classList.add("control-active");
  } else {
    repeatBtn.classList.remove("control-active");
  }

};


/* ===== THEME TOGGLE ===== */
themeToggle.onclick = () => {

  document.body.classList.toggle("light-mode");

  themeToggle.innerText =
    document.body.classList.contains("light-mode") ? "☀️" : "🌙";

};