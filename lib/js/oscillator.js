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

    var Oscillator = function () {
        function Oscillator() {
            _classCallCheck(this, Oscillator);

            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            this.oscillator = this.audioCtx.createOscillator();
            this.oscillator.frequency.type = 'triangle';
            this.oscillator.start();
        }

        _createClass(Oscillator, [{
            key: 'start',
            value: function start() {
                this.oscillator.connect(this.audioCtx.destination);
            }
        }, {
            key: 'stop',
            value: function stop() {
                this.oscillator.disconnect();
            }
        }, {
            key: 'frequency',
            set: function set() {
                var freq = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

                this.oscillator.frequency.value = freq;
            }
        }]);

        return Oscillator;
    }();

    exports.default = Oscillator;
});