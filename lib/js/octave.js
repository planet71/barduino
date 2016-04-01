define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

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

    var Octave = function () {
        function Octave() {
            _classCallCheck(this, Octave);
        }

        _createClass(Octave, [{
            key: 'getKeyColor',
            value: function getKeyColor(chord) {
                return chord.indexOf('#') === -1 ? 'white' : 'black';
            }
        }, {
            key: 'chords',
            get: function get() {
                return {
                    'c': {
                        freq: 261.63,
                        keyCode: 65,
                        keyName: 'a'
                    },
                    'c#': {
                        freq: 277.18,
                        keyCode: 87,
                        keyName: 'w'
                    },
                    'd': {
                        freq: 293.66,
                        keyCode: 83,
                        keyName: 's'
                    },
                    'd#': {
                        freq: 311.13,
                        keyCode: 69,
                        keyName: 'e'
                    },
                    'e': {
                        freq: 329.63,
                        keyCode: 68,
                        keyName: 'd'
                    },
                    'f': {
                        freq: 349.23,
                        keyCode: 70,
                        keyName: 'f'
                    },
                    'f#': {
                        freq: 369.99,
                        keyCode: 84,
                        keyName: 't'
                    },
                    'g': {
                        freq: 392,
                        keyCode: 71,
                        keyName: 'g'
                    },
                    'g#': {
                        freq: 415.3,
                        keyCode: 89,
                        keyName: 'y'
                    },
                    'a': {
                        freq: 440,
                        keyCode: 72,
                        keyName: 'h'
                    },
                    'a#': {
                        freq: 466.16,
                        keyCode: 85,
                        keyName: 'u'
                    },
                    'b': {
                        freq: 493.88,
                        keyCode: 74,
                        keyName: 'j'
                    },
                    '~': {
                        freq: 0,
                        keyCode: 192,
                        keyName: null
                    }
                };
            }
        }, {
            key: 'keys',
            get: function get() {
                var chords = this.chords;
                return {
                    65: chords['c'],
                    87: chords['c#'],
                    83: chords['d'],
                    69: chords['d#'],
                    68: chords['e'],
                    70: chords['f'],
                    84: chords['f#'],
                    71: chords['g'],
                    89: chords['g#'],
                    72: chords['a'],
                    85: chords['a#'],
                    74: chords['b']
                };
            }
        }]);

        return Octave;
    }();

    exports.default = Octave;
});