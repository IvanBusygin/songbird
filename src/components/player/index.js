// import './style.scss';

const svgPlay = `
  <svg viewBox="-200 0 1200 1000">
  <path fill="#0075FF" d="M96.51 11.97c-31.23 8.05-53.26 32.76-63.42 71.27-3.45 12.84-3.64 29.7-3.64 416.71s.19 403.87 3.64 416.71c16.09 60.74 61.69 86.03 120.9 67.25 9-2.87 53.65-25.1 116.49-58.24 56.14-29.51 221.29-116.3 367.28-192.93 145.99-76.64 271.29-143.31 278.38-148.1 39.28-25.68 59.59-63.04 53.26-97.52-4.79-26.63-24.33-53.07-52.88-71.65C892 399.37 172.58 22.32 154.95 16.38c-18.97-6.33-43.3-8.24-58.44-4.41z"></path>
  </svg>`;

const svgPause = `
  <svg viewBox="0 0 47.607 47.607">
  <path fill="#0075FF" d="M17.991 40.976a6.631 6.631 0 01-13.262 0V6.631a6.631 6.631 0 0113.262 0v34.345zM42.877 40.976a6.631 6.631 0 01-13.262 0V6.631a6.631 6.631 0 0113.262 0v34.345z"></path>
  </svg> `;

export default class {
  constructor(src) {
    this.src = src;
    this.audio = new Audio(this.src);
    this.btn = document.createElement('div');
    this.elem = this.render();
  }

  render() {
    const that = this;
    let isRun = false;
    const soundVal = localStorage.getItem('soundVal') || 100;

    const player = document.createElement('div');
    const current = document.createElement('div');
    const duration = document.createElement('div');
    const volume = document.createElement('input');
    const progress = document.createElement('progress');
    const progressBlock = document.createElement('div');
    const progressDuration = document.createElement('div');
    progressBlock.append(progress, progressDuration);
    progressDuration.append(current, duration);
    player.append(that.btn, progressBlock, volume);
    player.classList.add('player');
    progressBlock.classList.add('player__block');
    progressDuration.classList.add('player__duration');

    current.classList.add('player__current');
    duration.classList.add('player__duration');

    that.btn.classList.add('player__btn');
    that.btn.innerHTML = svgPlay;

    volume.classList.add('player__volume');
    volume.type = 'range';
    volume.value = soundVal;
    progress.classList.add('player__progress');
    progress.value = 0;
    current.textContent = '00:00';

    function timeStamp(t) {
      const s = t % 60;
      const m = ((t - s) / 60) % 60;
      const h = (t - (m * 60) - s) / 3600;
      return `${h < 1 ? '' : `${h}:`} ${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
    }

    function progressUpdate() {
      const curr = that.audio.currentTime;
      progress.value = curr / that.audio.duration;
      current.textContent = `${timeStamp(Math.round(curr))}`;
    }

    function soundVolume() {
      const val = this.value;
      localStorage.setItem('soundVal', val);
      that.audio.volume = val / 100;
    }

    function rewind({ offsetX }) {
      const to = offsetX / this.offsetWidth;
      this.value = to;
      that.pause();
      that.audio.currentTime = that.audio.duration * to;
      that.play();
      isRun = true;
      that.btn.innerHTML = svgPause;
    }

    function loader() {
      duration.textContent = `${timeStamp(Math.round(that.audio.duration))}`;
    }

    function run() {
      if (isRun) that.pause();
      else that.play();
      isRun = !isRun;
    }

    this.btn.onclick = run;
    this.audio.ontimeupdate = progressUpdate;
    this.audio.onloadeddata = loader;
    volume.oninput = soundVolume;
    progress.onclick = rewind;

    return player;
  }

  play() {
    this.audio.play();
    this.btn.innerHTML = svgPause;
  }

  pause() {
    this.audio.pause();
    this.btn.innerHTML = svgPlay;
  }

  stop() {
    this.pause();
    this.audio.currentTime = 0;
  }
}
