import Oscillator from './oscillator';
import Octave from './octave';
import * as io from '../../node_modules/socket.io/node_modules/socket.io-client/socket.io';

export default class Barduino {
    constructor(targetID, opts) {
        opts = opts || {};

        // create socket
        if (opts.srv) {
            this.socket = io.connect(opts.srv);
            opts.arduino && this.socket.emit('arduino');
        }

        this.oscillator = new Oscillator();
        this.octave = new Octave();
        this.keyPressed = {};

        this.build(targetID);

        document.addEventListener('keydown', (e) => {
            let key = e.keyCode,
                keys = this.octave.keys,
                chord = keys[key],
                freq = chord && chord.freq;

            if (!this.keyPressed[key] && chord) {
                this.keyPressed[key] = chord;
                this.stopSong();

                this.playNote(freq);
                this.highlight(key);
            }
        });

        document.addEventListener('keyup', (e) => {
            let key = e.keyCode,
                keys = this.octave.keys,
                chord = keys[key],
                oKeys;

            this.muteNote();
            this.highlight(key, false);
            delete this.keyPressed[key];

            oKeys = Object.keys(this.keyPressed);

            if (oKeys.length) {
                let lastKey = oKeys[oKeys.length - 1];
                this.playNote(this.keyPressed[lastKey].freq);
            }
        });
    }

    playNote(freq = 200) {
        this.oscillator.frequency = freq;
        this.oscillator.start();
    }

    muteNote() {
        this.oscillator.stop();
    }

    build(id) {
        let el = document.getElementById(id),
            chords = this.octave.chords,
            chordsStr = '',
            i;

        for (i in chords) {
            if (chords.hasOwnProperty(i)) {
                let classNames = 'key ' + this.octave.getKeyColor(i),
                    chordName = i,
                    chordKey = chords[i].keyName;

                if (chordKey) {
                    chordsStr += '<div class="' + classNames + '" data-key="' + chordKey + '" data-chord="' + chordName + '"></div>';
                }
            }
        }

        el.innerHTML = chordsStr;
    }

    highlight(keyCode, highlight) {
        let keys = this.octave.keys,
            key = keys[keyCode],
            el = key && document.querySelector('[data-key="' + key.keyName + '"]');

        if (!el) return;

        if (highlight === false) {
            el.classList.remove('highlight');
            this.emit('keyup', key);
        } else {
            el.classList.add('highlight');
            this.emit('keydown', key);
        }
    }

    playSong(data) {
        let self = this,
            notes = data.notes,
            chords = this.octave.chords,
            bpm = data.bpm,
            repeat = data.repeat,
            t = (60/bpm*1000),
            index = 0,
            l = notes.length;

        (function play(index) {
            let note,
                chord;

            if ((l === index && !repeat) || self.blockSong) {
                return;
            }

            if (repeat && l === index) {
                index = 0;
            }

            note = notes[index]
            chord = chords[note[0]];
            self.playNote(chord.freq);
            self.highlight(chord.keyCode);
            self.timeout = setTimeout(function () {
                self.muteNote();
                self.highlight(chord.keyCode, false);
                // wait for it
                setTimeout(function () {
                    play(++index)
                }, 50);
            }, t*note[1]);
        }(index));
    }

    stopSong() {
        this.blockSong = true;
    }

    emit(event, data) {
        this.socket.emit(event, data.keyCode);
    }

    on(event, callback) {
        this.socket.on(event, callback);
    }
}
