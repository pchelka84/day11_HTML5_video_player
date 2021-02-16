/* Get element */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

let isDown = false;

/* Build our functions */
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
 console.log(this.dataset.skip);
 // Adding skip time and converting to a true number
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  if (!isDown) return;
  video[this.name] = this.value;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e)
}

function handleProgress () {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousedown', e => isDown = true));
ranges.forEach(range => range.addEventListener('mouseup', () => isDown = false));
ranges.forEach(range => range.addEventListener('mouseout', () => isDown = false));

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => isDown && scrub(e));
progress.addEventListener('mousedown', () => isDown = true);
progress.addEventListener('mouseup', () => isDown = false);



