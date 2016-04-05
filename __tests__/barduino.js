jest.unmock('../src/js/barduino.js');

import Barduino from '../src/js/barduino';

describe('Barduino constructor', () => {
    let id = 'foo',
        chords = {
            'foo' : {},
            'foo#': {}
        },
        create;

    beforeEach(() => {
         create = function (arduino) {
            return new Barduino(id, {
                srv: 'localhost',
                arduino: arduino || false
            });
         }

         document.body.innerHTML = '<div id="' + id + '"></div>';
    });

    it ('creates Oscillator instance', () => {
        let o = create();
        expect(typeof o.oscillator === 'undefined').toBe(false);
    });

    it('creates Octave instance', () => {
        let o = create();
        expect(typeof o.octave === 'undefined').toBe(false);
    });

    it('creates keyPressed literal object', () => {
        let o = create();
        expect(o.keyPressed).toEqual({});
    });

    it('calls \'build\' method', () => {
        spyOn(Barduino.prototype, 'build');
        create();
        expect(Barduino.prototype.build).toHaveBeenCalled();
    });

    it('adds \'keydown\' event listener', () => {
        spyOn(document, 'addEventListener');
        create();
        expect(document.addEventListener.calls.argsFor(0)[0]).toBe('keydown');
        expect(document.addEventListener.calls.argsFor(1)[0]).toBe('keyup');
    });
});


describe('Barduino method', () => {
    let id = 'foo',
        chords = {
            'foo' : {},
            'foo#': {}
        },
        create;

    beforeEach(() => {
         create = function (arduino) {
            return new Barduino(id, {
                srv: 'localhost',
                arduino: arduino || false
            });
         }

         document.body.innerHTML = '<div id="' + id + '"></div>';
    });

    it('\'playNote\' sets oscillator frequency property', () => {
        let o = create();
        o.playNote();
        expect(o.oscillator.frequency).toEqual(200);
        o.playNote(100);
        expect(o.oscillator.frequency).toEqual(100);
    });
});
