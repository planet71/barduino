import Barduino from './barduino';
import {oldMacDonaldSong} from './songs/oldMacDonald';

!(function () {
    const srv = 'http://localhost:3000';
    let barduino = new Barduino('keyboard', { srv, arduino: true });

    barduino.on('boardReady', function() {
        barduino.playSong(oldMacDonaldSong);
    });
}());
