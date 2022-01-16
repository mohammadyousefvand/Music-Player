let $ = document
//selected 
const audioElem = $.querySelector('.audio-defult')
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
const currentTimeEl = $.getElementById("current-time");
const durationEl = $.getElementById("duration");
const progress = $.getElementById("progress");
const progressContainer = $.getElementById("progress-container");
const dayNight = $.querySelector('.day-night')
const sunMoon = $.querySelector('.sun-moon')
const iconList = $.querySelectorAll('.click-play')
const openList = $.querySelector('.open-list')
const musicListContainer = $.querySelector('.list-music')
const closeList = $.querySelector('.close-list')

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

// Dark mode
dayNight.addEventListener('click', function () {
    document.body.classList.toggle('dark')

    //localSeorage save last Theme
    if (document.body.className == 'dark') {
        localStorage.setItem('theme', 'dark')
        sunMoon.className = 'fas fa-sun'
        localStorage.setItem('icon', 'fas fa-sun')
    } else {
        localStorage.setItem('theme', 'light')
        sunMoon.className = 'fas fa-moon'
        localStorage.setItem('icon', 'fas fa-moon')
    }
})

function localSetTheme() {
    //check last theme and set
    let theme = localStorage.getItem('theme')
    let iconTheme = localStorage.getItem('icon')

    if (theme === 'dark') {
        document.body.classList.add('dark')
        sunMoon.className = iconTheme
    } else {
        sunMoon.className = iconTheme
    }
}


//flag play || pause
let isPlayed = false

//play music
function playSong() {
    isPlayed = true
    playIcon.removeAttribute('class')
    playIcon.setAttribute('class', 'fas fa-pause')
    audioElem.play()
    logoMusic.classList.add('rotate')
    playMusic.classList.add('play-style')
}
//pause music
function pauseSong() {
    isPlayed = false
    playIcon.removeAttribute('class')
    playIcon.setAttribute('class', 'fas fa-play')
    audioElem.pause()
    logoMusic.classList.remove('rotate')
    playMusic.classList.remove('play-style')
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
    isPlayed = true
    playIcon.removeAttribute('class')
    playIcon.setAttribute('class', 'fas fa-pause')
    logoMusic.classList.add('rotate')
    playMusic.classList.add('play-style')
}

function backwardHandler() {
    //decrease for back index || back music
    audioNew--
    logoNew--
    nameNew--
    //music
    if (audioNew < 0) {
        audioNew = dataMusic.length - 1
    }
    audioElem.setAttribute('src', dataMusic[audioNew])
    //image
    if (logoNew < 0) {
        logoNew = dataLogo.length - 1
    }
    logoMusic.setAttribute('src', dataLogo[logoNew])
    //title
    if (nameNew < 0) {
        nameNew = dataNames.length - 1
    }
    nameMusic.innerHTML = dataNames[nameNew]
    // change style Play & pause buttun
    audioElem.play()
    isPlayed = true
    playIcon.removeAttribute('class')
    playIcon.setAttribute('class', 'fas fa-pause')
    logoMusic.classList.add('rotate')
    playMusic.classList.add('play-style')
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
        loopElem.classList.add('loop-style')

    } else {
        audioElem.removeAttribute('loop')
        loopElem.classList.remove('loop-style')
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
    playMusic.classList.add('play-style')
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
        speedMusic.classList.add('speed-style')
    } else {
        audioElem.playbackRate = 1
        speedMusic.innerHTML = '1x'
        speedMusic.classList.remove('speed-style')
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

        if (duration == currentTime) {
            logoMusic.classList.remove('rotate')
        }
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioElem.duration;
    audioElem.currentTime = (clickX / width) * duration;
}

function openListMusic() {
    musicListContainer.classList.add('openlist')
}

function closeListMusic() {
    musicListContainer.classList.remove('openlist')
}

//Music list Play

let nameMusicList;

iconList.forEach(function (item) {
    item.addEventListener('click', function (event) {
        musicListContainer.classList.remove('openlist')

        nameMusicList = event.target.dataset.name

        audioElem.setAttribute('src', nameMusicList)
        playSong()

        let searchIndex = dataMusic.findIndex(function (item) {
            return item == nameMusicList
        })

        logoMusic.setAttribute('src', dataLogo[searchIndex])

        nameMusic.innerHTML = dataNames[searchIndex]
    })
})

//Events in Project
forwardMusic.addEventListener('click', forwardHandler)
backwardMusic.addEventListener('click', backwardHandler)
mutedMusic.addEventListener('click', mutedMusicHandler)
loopElem.addEventListener('click', loopHandler)
randomMusic.addEventListener('click', randomMusicHandler)
speedMusic.addEventListener('click', speedMusicHandler)
audioElem.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
window.addEventListener('load', localSetTheme)
openList.addEventListener('click', openListMusic)
closeList.addEventListener('click', closeListMusic)