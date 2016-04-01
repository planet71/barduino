define(['./barduino', './songs/oldMacDonald'], function (_barduino, _oldMacDonald) {
    'use strict';

    var _barduino2 = _interopRequireDefault(_barduino);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    !function () {
        var srv = 'http://localhost:3000';
        var barduino = new _barduino2.default('keyboard', { srv: srv, arduino: true });

        barduino.on('boardReady', function () {
            barduino.playSong(_oldMacDonald.oldMacDonaldSong);
        });
    }();
});