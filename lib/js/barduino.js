define(['exports', './oscillator', './octave', '../../node_modules/socket.io/node_modules/socket.io-client/socket.io'], function (exports, _oscillator, _octave, _socket) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _oscillator2 = _interopRequireDefault(_oscillator);

    var _octave2 = _interopRequireDefault(_octave);

    var io = _interopRequireWildcard(_socket);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var Barduino = function () {
        function Barduino(targetID, opts) {
            var _this = this;

            _classCallCheck(this, Barduino);

            opts = opts || {};

            // create socket
            if (opts.srv) {
                this.socket = io.connect(opts.srv);
                opts.arduino && this.socket.emit('arduino');
            }

            this.oscillator = new _oscillator2.default();
            this.octave = new _octave2.default();
            this.keyPressed = {};

            this.build(targetID);

            document.addEventListener('keydown', function (e) {
                var key = e.keyCode,
                    keys = _this.octave.keys,
                    chord = keys[key],
                    freq = chord && chord.freq;

                if (!_this.keyPressed[key] && chord) {
                    _this.keyPressed[key] = chord;
                    _this.stopSong();

                    _this.playNote(freq);
                    _this.highlight(key);
                }
            });

            document.addEventListener('keyup', function (e) {
                var key = e.keyCode,
                    keys = _this.octave.keys,
                    chord = keys[key],
                    oKeys = void 0;

                _this.muteNote();
                _this.highlight(key, false);
                delete _this.keyPressed[key];

                oKeys = Object.keys(_this.keyPressed);

                if (oKeys.length) {
                    var lastKey = oKeys[oKeys.length - 1];
                    _this.playNote(_this.keyPressed[lastKey].freq);
                }
            });
        }

        _createClass(Barduino, [{
            key: 'playNote',
            value: function playNote() {
                var freq = arguments.length <= 0 || arguments[0] === undefined ? 200 : arguments[0];

                this.oscillator.frequency = freq;
                this.oscillator.start();
            }
        }, {
            key: 'muteNote',
            value: function muteNote() {
                this.oscillator.stop();
            }
        }, {
            key: 'build',
            value: function build(id) {
                var el = document.getElementById(id),
                    chords = this.octave.chords,
                    chordsStr = '',
                    i = void 0;

                for (i in chords) {
                    if (chords.hasOwnProperty(i)) {
                        var classNames = 'key ' + this.octave.getKeyColor(i),
                            chordName = i,
                            chordKey = chords[i].keyName;

                        if (chordKey) {
                            chordsStr += '<div class="' + classNames + '" data-key="' + chordKey + '" data-chord="' + chordName + '"></div>';
                        }
                    }
                }

                el.innerHTML = chordsStr;
            }
        }, {
            key: 'highlight',
            value: function highlight(keyCode, _highlight) {
                var keys = this.octave.keys,
                    key = keys[keyCode],
                    el = key && document.querySelector('[data-key="' + key.keyName + '"]');

                if (!el) return;

                if (_highlight === false) {
                    el.classList.remove('highlight');
                    this.emit('keyup', key);
                } else {
                    el.classList.add('highlight');
                    this.emit('keydown', key);
                }
            }
        }, {
            key: 'playSong',
            value: function playSong(data) {
                var self = this,
                    notes = data.notes,
                    chords = this.octave.chords,
                    bpm = data.bpm,
                    repeat = data.repeat,
                    t = 60 / bpm * 1000,
                    index = 0,
                    l = notes.length;

                (function play(index) {
                    var note = void 0,
                        chord = void 0;

                    if (l === index && !repeat || self.blockSong) {
                        return;
                    }

                    if (repeat && l === index) {
                        index = 0;
                    }

                    note = notes[index];
                    chord = chords[note[0]];
                    self.playNote(chord.freq);
                    self.highlight(chord.keyCode);
                    self.timeout = setTimeout(function () {
                        self.muteNote();
                        self.highlight(chord.keyCode, false);
                        // wait for it
                        setTimeout(function () {
                            play(++index);
                        }, 50);
                    }, t * note[1]);
                })(index);
            }
        }, {
            key: 'stopSong',
            value: function stopSong() {
                this.blockSong = true;
            }
        }, {
            key: 'emit',
            value: function emit(event, data) {
                this.socket.emit(event, data.keyCode);
            }
        }, {
            key: 'on',
            value: function on(event, callback) {
                this.socket.on(event, callback);
            }
        }]);

        return Barduino;
    }();

    exports.default = Barduino;
});