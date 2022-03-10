const minElem = document.querySelector("#minutes");
const secElem = document.querySelector("#seconds");
const settings = document.querySelector("#settings");
const startStop = document.querySelector("#stsp");
const progressBar = document.querySelector(".outerRing");

let toggleSettings = false;
let minutes = document.querySelector("#minutes").innerHTML;
let seconds = document.querySelector("#seconds").innerHTML;
let progress = null;
let progressStart = 0;
let progressEnd = parseInt(minutes) * 60 + parseInt(seconds);
let speed = 1000;
let degTravel = 360 / progressEnd;
let secRem = 0;
let minRem = 0;

settings.addEventListener("click", () => {
  if (!toggleSettings) {
    toggleSettings = true;
    minElem.contentEditable = true;
    minElem.style.borderBottom = `1px dashed #ffffff50`;
    secElem.contentEditable = true;
    secElem.style.borderBottom = `1px dashed #ffffff50`;
  } else {
    resetValues();
  }
});

minElem.addEventListener("blur", () => {
  resetValues();
});

secElem.addEventListener("blur", () => {
  resetValues();
});

startStop.addEventListener("click", () => {
  if (startStop.innerHTML === "START") {
    if (!(parseInt(minutes) === 0 && parseInt(seconds) === 0)) {
      startStop.innerHTML = "PAUSE";
      startStopProgress();
    } else {
      alert("Enter the time amount in your timer!");
    }
  } else if (startStop.innerHTML === "PAUSE") {
    clearInterval(progress);
    startStop.innerHTML = "START";
  } else if (startStop.innerHTML === "START") {
    progress = setInterval(progressTrack, speed);
    startStop.innerHTML = "PAUSE";
  } else {
    startStop.innerHTML = "START";
    startStopProgress();
  }
});

function startStopProgress() {
  if (!progress && startStop.innerHTML === "PAUSE") {
    progress = setInterval(progressTrack, speed);
  } else {
    clearInterval(progress);
    progress = null;
    progressStart = 0;
    progressBar.style.backgroundColor = `conic-gradient(
      #17171a 360deg,
      #17171a 360deg
    )`;
  }
}

function progressTrack() {
  progressStart++;

  secRem = Math.floor((progressEnd - progressStart) % 60);
  minRem = Math.floor((progressEnd - progressStart) / 60);

  secElem.innerHTML = secRem.toString().length === 2 ? secRem : `0${secRem}`;
  minElem.innerHTML = minRem.toString().length === 2 ? minRem : `0${minRem}`;

  progressBar.style.background = `conic-gradient(
    #9d0000 ${progressStart * degTravel}deg,
    #17171a ${progressStart * degTravel}deg
  )`;

  if (progressStart === progressEnd) {
    progressBar.style.backgroundColor = `conic-gradient(
      #00aa51 360deg,
      #00aa51 360deg
    )`;
    clearInterval(progress);
    startStop.innerHTML = "START";
    progress = null;
    progressStart = 0;
  }
}

function resetValues() {
  if (progress) {
    clearInterval(progress);
  }

  minutes = document.querySelector("#minutes").innerHTML;
  seconds = document.querySelector("#seconds").innerHTML;
  toggleSettings = false;
  minElem.contentEditable = false;
  minElem.style.borderBottom = `none`;
  secElem.contentEditable = false;
  secElem.style.borderBottom = `none`;
  progress = null;
  progressStart = 0;
  console.log(progressStart);
  progressEnd = parseInt(minutes) * 60 + parseInt(seconds);
  degTravel = 360 / progressEnd;
  progressBar.style.background = `conic-gradient(
    #17171a 360deg,
    #17171a 360deg
  )`;
}

// BUTTON FUNCTIONALITY
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");
const playCategory = document.getElementById("play-category");

// // Event Listeners
// openModal.addEventListener("click", () => {
//   document.getElementById("overlay").style.display = "block";
// });

// closeModal.addEventListener("click", () => {
//   document.getElementById("overlay").style.display = "none";
// });

// Categories
const play = [
  "Fly paper plane",
  "Play with ball - bounce in arm",
  "Hand flip pen",
  "Dance or sing out loud",
  "Play with your pet or someone around you",
];

const energy = [
  "Box breathing",
  "Close eyes and focus on your breath",
  "Sunbath barefoot",
  "Vigorously rub hands + Swing arms while turning turso",
  "Vigorously rub hands + shake body while gently jumping in one spot",
];

const move = [
  "Push ups",
  "Situps",
  "Arm circles forward x60 & backward. Arms forward up & down. Arms sideways up & down. Arms above the head raises. x20 each",
  "Alternate high knees _ alternate heel kicks_ calf raises (reps: each x30)",
  "Flossing or snack exercise",
];

const stretch = [
  "Squats",
  "Neck, shoulders & big arm circles and holds",
  "Leg and hip stretches",
  "Joints all over the body in circles",
  "Bend down and touch toes",
];

const create = [
  "Doodle standing up",
  "Color standing up",
  "Drum/play a song",
  "Haiku",
  "Improvise anything",
];
