export default class Oscillator {
    constructor() {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.oscillator = this.audioCtx.createOscillator();
        this.oscillator.frequency.type =  'triangle';
        this.oscillator.start();
    }

    set frequency(freq = 0) {
        this.oscillator.frequency.value = freq;
    }

    start() {
        this.oscillator.connect(this.audioCtx.destination);
    }

    stop() {
        this.oscillator.disconnect();
    }
}
