const minElem = document.querySelector('#minutes');
const secElem = document.querySelector('#seconds');
const settings = document.querySelector('#settings');
const startStop = document.querySelector('#stsp');
const progressBar = document.querySelector('.outerRing');
const breakBtn = document.querySelector('#breakBtn');
const playCategory = document.querySelector('#playCategory');

const DEFAULT_START_TIME = { MINUTES: '00', SECONDS: '03' };
const DEFAULT_BREAK_TIME = { MINUTES: '00', SECONDS: '01' };

breakBtn.style.display = 'none';
minElem.innerHTML = DEFAULT_START_TIME.MINUTES;
secElem.innerHTML = DEFAULT_START_TIME.SECONDS;
let toggleSettings = false;
let minutes = document.querySelector('#minutes').innerHTML;
let seconds = document.querySelector('#seconds').innerHTML;
let progress = null;
let progressStart = 0;
let progressEnd = parseInt(minutes) * 60 + parseInt(seconds);
let speed = 1000;
let degTravel = 360 / progressEnd;
let secRem = 0;
let minRem = 0;
let isPaused = false;
let isBreak = false;

settings.addEventListener('click', () => {
  if (!toggleSettings) {
    pauseProgress();
    toggleSettings = true;
    minElem.contentEditable = true;
    minElem.style.borderBottom = `1px dashed #ffffff50`;
    secElem.contentEditable = true;
    secElem.style.borderBottom = `1px dashed #ffffff50`;
  } else {
    toggleSettings = false;
    minElem.contentEditable = false;
    minElem.style.borderBottom = `none`;
    secElem.contentEditable = false;
    secElem.style.borderBottom = `none`;
  }
});

function startRestTimer() {
  isBreak = true;
  breakBtn.style.display = 'inline-block';
  document.querySelector('#minutes').innerHTML = DEFAULT_BREAK_TIME.MINUTES;
  document.querySelector('#seconds').innerHTML = DEFAULT_BREAK_TIME.SECONDS;
  const categoriesArray = Object.keys(categories);
  const randomCategoryIndex = Math.floor(
    Math.random() * categoriesArray.length,
  );
  const randomCategoryKey = categoriesArray[randomCategoryIndex];

  const randomCategory = categories[randomCategoryKey];

  const randomSubCategoryIndex = Math.floor(
    Math.random() * randomCategory.length,
  );

  const randomSubCategory = randomCategory[randomSubCategoryIndex];

  playCategory.innerHTML = randomSubCategory;
}

minElem.addEventListener('blur', () => {
  resetValues();
});

secElem.addEventListener('blur', () => {
  resetValues();
});

function startProgress() {
  if (toggleSettings) return;
  isPaused = false;
  startStop.innerHTML = 'PAUSE';
  if (!progress) {
    progress = setInterval(progressTrack, speed);
  }
}
function pauseProgress() {
  isPaused = true;
  startStop.innerHTML = 'START';
}

function stopProgress() {
  if (progress) {
    clearInterval(progress);
    progress = null;
  }
  resetValues();
}

function handleStartPauseClick() {
  let clickedStart = startStop.innerHTML === 'START';
  let isAtZero = parseInt(minutes) === 0 && parseInt(seconds) === 0;

  if (clickedStart) {
    return startProgress();
  } else if (isAtZero) {
    alert('Enter the time amount in your timer!');
  } else {
    return pauseProgress();
  }
}

startStop.addEventListener('click', handleStartPauseClick);

function progressTrack() {
  if (!isPaused) {
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
      progressBar.style.background = `conic-gradient(
        #00aa51 360deg,
        #00aa51 360deg
      )`;

      if (!isBreak) {
        startRestTimer();
      } else {
        isBreak = false;
        document.querySelector('#minutes').innerHTML =
          DEFAULT_START_TIME.MINUTES;
        document.querySelector('#seconds').innerHTML =
          DEFAULT_START_TIME.SECONDS;
        breakBtn.style.display = 'none';
        playCategory.style.display = 'none';
      }
      stopProgress();
    }
  }
}

function resetValues() {
  pauseProgress();
  minutes = document.querySelector('#minutes').innerHTML;
  seconds = document.querySelector('#seconds').innerHTML;
  toggleSettings = false;
  minElem.contentEditable = false;
  minElem.style.borderBottom = `none`;
  secElem.contentEditable = false;
  secElem.style.borderBottom = `none`;
  progressStart = 0;
  console.log(progressStart);
  progressEnd = parseInt(minutes) * 60 + parseInt(seconds);
  degTravel = 360 / progressEnd;
  progressBar.style.background = `conic-gradient(
    #17171a 360deg,
    #17171a 360deg
  )`;
}

// Categories'
const categories = {
  play: [
    'Fly paper plane',
    'Play with ball - bounce in arm',
    'Hand flip pen',
    'Dance or sing out loud',
    'Play with your pet or someone around you',
  ],
  energy: [
    'Box breathing',
    'Close eyes and focus on your breath',
    'Sunbath barefoot',
    'Vigorously rub hands + Swing arms while turning turso',
    'Vigorously rub hands + shake body while gently jumping in one spot',
  ],
  move: [
    'Push ups',
    'Situps',
    'Arm circles forward x60 & backward. Arms forward up & down. Arms sideways up & down. Arms above the head raises. x20 each',
    'Alternate high knees _ alternate heel kicks_ calf raises (reps: each x30)',
    'Flossing or snack exercise',
  ],
  stretch: [
    'Squats',
    'Neck, shoulders & big arm circles and holds',
    'Leg and hip stretches',
    'Joints all over the body in circles',
    'Bend down and touch toes',
  ],
  create: [
    'Doodle standing up',
    'Color standing up',
    'Drum/play a song',
    'Haiku',
    'Improvise anything',
  ],
};
