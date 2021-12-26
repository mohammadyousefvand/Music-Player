let $ = document
//selected 
const audioElem = $.querySelector('audio')
const playMusic = $.querySelector('.play')
const playIcon = $.querySelector('.fa-play')
const loopIcon = $.querySelector('.fa-sync-alt')
const mutedIcon = $.querySelector('.fa-volume-up')
const forwardMusic = $.querySelector('.forward')
const backwardMusic = $.querySelector('.backward')
const mutedMusic = $.querySelector('.muted')
const logoMusic = $.querySelector('img')
const nameMusic = $.querySelector('.name-music')
const loopElem = $.querySelector('.loop')
const randomMusic = $.querySelector('.next-random')
const speedMusic = $.querySelector('.speed')
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

//all music in project
let dataMusic = [
    'sounds/music1.mp3',
    'sounds/music2.mp3',
    'sounds/music3.mp3',
    'sounds/music4.mp3',
    'sounds/music5.mp3',
    'sounds/music6.mp3',
    'sounds/music7.mp3',
]
//all cover in project
let dataLogo = [
    'images/logo1.jpg',
    'images/logo2.jpg',
    'images/logo3.jpg',
    'images/logo4.jpg',
    'images/logo5.jpg',
    'images/logo6.jpg',
    'images/logo7.jpg',
]
//all name artist or music in project
let dataNames = [
    'Ghalbe Man',
    'Khodetam Midoni',
    'Another Love',
    'Take Me To Church',
    'Ham Gonah',
    'On My Way',
    'Setare Baroon'
]
//flag play || pause
let isPlayed = false

//play music
function playSong() {
    isPlayed = true
    playIcon.removeAttribute('class')
    playIcon.setAttribute('class' , 'fas fa-pause')
    audioElem.play()
    logoMusic.classList.add('rotate')
    playMusic.style.color = '#fff'
    playMusic.style.backgroundColor = 'rgba(42, 52, 84, 1)'
}
//pause music
function pauseSong() {
    isPlayed = false
    playIcon.removeAttribute('class')
    playIcon.setAttribute('class' , 'fas fa-play')
    audioElem.pause()
    logoMusic.classList.remove('rotate')
    playMusic.style.color = 'rgba(42, 52, 84, 1)'
    playMusic.style.backgroundColor = '#e0e5ec'
}

//check play || pause with (if)
playMusic.addEventListener('click', function () {
    if (isPlayed) {
        pauseSong()
    } else {
        playSong()
    }
})

//variable for nextmusic buttun & backmusic buttun
let audioNew = 0
let logoNew = 0
let nameNew = 0

// next music buttun
function forwardHandler() {
    //plus for next index || next music
    audioNew++
    logoNew++
    nameNew++
    //music
    if (audioNew > dataMusic.length - 1) {
        audioNew = 0
    }
    audioElem.setAttribute('src', dataMusic[audioNew])
    //image
    if (logoNew > dataLogo.length - 1) {
        logoNew = 0
    }
    logoMusic.setAttribute('src', dataLogo[logoNew])
    //title
    if (nameNew > dataNames.length - 1) {
        nameNew = 0
    }
    nameMusic.innerHTML = dataNames[nameNew]
    // change style Play & pause buttun
    audioElem.play()
    playIcon.removeAttribute('class')
    playIcon.setAttribute('class', 'fas fa-pause')
    logoMusic.classList.add('rotate')
    playMusic.style.color = '#fff'
    playMusic.style.backgroundColor = 'rgba(42, 52, 84, 1)'

}

function backwardHandler() {
    //decrease for back index || back music
    audioNew--
    logoNew--
    nameNew--
    //music
    if (audioNew < 0) {
        audioNew = 6
    }
    audioElem.setAttribute('src', dataMusic[audioNew])
    //image
    if (logoNew < 0) {
        logoNew = 6
    }
    logoMusic.setAttribute('src', dataLogo[logoNew])
    //title
    if (nameNew < 0) {
        nameNew = 6
    }
    nameMusic.innerHTML = dataNames[nameNew]
    // change style Play & pause buttun
    audioElem.play()
    playIcon.removeAttribute('class')
    playIcon.setAttribute('class', 'fas fa-pause')
    logoMusic.classList.add('rotate')
    playMusic.style.color = '#fff'
    playMusic.style.backgroundColor = 'rgba(42, 52, 84, 1)'

}
//muted buttun function
function mutedMusicHandler() {
    if (mutedIcon.className == 'fas fa-volume-up') {
        audioElem.muted = true
        mutedIcon.removeAttribute('class')
        mutedIcon.setAttribute('class', 'fas fa-volume-mute')
    } else {
        audioElem.muted = false
        mutedIcon.removeAttribute('class')
        mutedIcon.setAttribute('class', 'fas fa-volume-up')
    }
}
// loop buttun function
function loopHandler() {
    if (audioElem.hasAttribute('loop') == false) {
        audioElem.setAttribute('loop', '')
        loopElem.style.color = '#ff0000'

    } else {
        audioElem.removeAttribute('loop')
        loopElem.style.color = 'rgba(42, 52, 84, 1)'
    }
}
//random music buttun function
function randomMusicHandler() {
    // random
    let musicRandom = Math.floor(Math.random() * dataMusic.length)

    // random music & image & title bacause everyone has a one Index in Array
    audioElem.setAttribute('src', dataMusic[musicRandom])
    logoMusic.setAttribute('src', dataLogo[musicRandom])
    nameMusic.innerHTML = dataNames[musicRandom]

    // change style Play & pause buttun
    audioElem.play()
    playIcon.removeAttribute('class')
    playIcon.setAttribute('class', 'fas fa-pause')
    logoMusic.classList.add('rotate')
    playMusic.style.color = '#fff'
    playMusic.style.backgroundColor = 'rgba(42, 52, 84, 1)'
}
//speed control buttun function
function speedMusicHandler() {
    if (audioElem.playbackRate == 1) {
        audioElem.playbackRate = 1.5
        speedMusic.innerHTML = '1.5x'
    } else if (audioElem.playbackRate == 1.5) {
        audioElem.playbackRate = 2
        speedMusic.innerHTML = '2x'
    } else if (audioElem.playbackRate == 2) {
        audioElem.playbackRate = 4
        speedMusic.innerHTML = '4x'
        speedMusic.style.backgroundColor = '#ff0000'
        speedMusic.style.color = '#fff'
    } else {
        audioElem.playbackRate = 1
        speedMusic.innerHTML = '1x'
        speedMusic.style.backgroundColor = '#e0e5ec'
        speedMusic.style.color = 'rgba(42, 52, 84, 1)'
    }
}

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlayed) {
      const duration = e.srcElement.duration;
      const currentTime = e.srcElement.currentTime;
      // Update progress bar width
      const progressPercent = (currentTime / duration) * 100;
      progress.style.width = progressPercent + "%";
      // Calculate display for duration
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      // Delay switching duration Element to avoid NaN
      if (durationSeconds) {
        durationEl.textContent = durationMinutes + " : " + durationSeconds;
      }
      // Calculate display for currentTime
      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      currentTimeEl.textContent = currentMinutes + " : " + currentSeconds;
    }
  }
  
  // Set Progress Bar
  function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioElem.duration;
    audioElem.currentTime = (clickX / width) * duration;
  }

//Events in Project
forwardMusic.addEventListener('click', forwardHandler)

backwardMusic.addEventListener('click', backwardHandler)

mutedMusic.addEventListener('click', mutedMusicHandler)

loopElem.addEventListener('click', loopHandler)

randomMusic.addEventListener('click', randomMusicHandler)

speedMusic.addEventListener('click', speedMusicHandler)

audioElem.addEventListener("timeupdate", updateProgressBar);

progressContainer.addEventListener("click", setProgressBar);