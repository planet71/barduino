var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    socket.on('arduino', () => {
        var j5 = require('johnny-five'),
            board = new j5.Board(),
            pins = [6, 7, 8, 9, 10, 11, 12],
            leds = {};

        board.on('ready', () => {
            var cases;

            socket.emit('boardReady');

            pins.forEach((pin) => {
                leds[pin] = new j5.Led(pin);
            });

            cases = {
                65: leds[pins[0]],
                87: leds[pins[0]],
                83: leds[pins[1]],
                69: leds[pins[1]],
                68: leds[pins[2]],
                70: leds[pins[3]],
                84: leds[pins[3]],
                71: leds[pins[4]],
                89: leds[pins[4]],
                72: leds[pins[5]],
                85: leds[pins[5]],
                74: leds[pins[6]]
            }

            socket.on('keydown', (data) => {
                var pin;
                if (cases[data]) {
                    pin = cases[data];
                    pin.on();
                }
            });

            socket.on('keyup', (data) => {
                var pin;
                if (cases[data]) {
                    pin = cases[data];
                    pin.off();
                }
            });
        });
    });
});

http.listen(3000, () => {
    console.log('Listening on port 3000!');
});
