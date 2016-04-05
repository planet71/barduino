jest.unmock('../src/js/oscillator.js');

import Oscillator from '../src/js/oscillator';

describe('Oscillator constructor', () => {
    const oscillatorType = 'triangle';
    let o;
    beforeEach(() => {
        window.AudioContext = jest.fn(function () {
            this.createOscillator = jest.fn(function () {
                return {
                    frequency: {
                        type: 'sin',
                        value: null
                    },
                    start: jest.genMockFunction(),
                    connect: jest.genMockFunction(),
                    disconnect: jest.genMockFunction()
                };
            });

            this.disconnect = jest.genMockFunction();
        });

        o = new Oscillator();
    });

    it('creates AudioContext object', () => {
        expect(typeof o.audioCtx === 'undefined').toBe(false);
    });

    it('creates oscillator property', () => {
        expect(typeof o.oscillator === 'undefined').toBe(false);
    });

    it('sets oscillator frequency type to \'triangle', () => {
        expect(o.oscillator.frequency.type).toBe('triangle');
    });
});

describe('Oscillator method', () => {
    const oscillatorType = 'triangle',
          audioCtxDest = 'foo';

    let o;

    beforeEach(() => {
        window.AudioContext = jest.fn(function () {
            this.createOscillator = jest.fn(function () {
                return {
                    frequency: {
                        type: 'sin',
                        value: null
                    },
                    start: jest.genMockFunction(),
                    connect: jest.genMockFunction(),
                    disconnect: jest.genMockFunction()
                };
            });

            this.destination = 'foo';
        });

        o = new Oscillator();
    });

    it('\'start\' calls native OscillatorNode \'connect\' method with proper param', () => {
        spyOn(o.oscillator, 'connect');
        o.start();
        expect(o.oscillator.connect).toHaveBeenCalledWith(audioCtxDest);
    });

    it('\'stop\' calls native OscillatorNode \'disconnect\' method', () => {
        spyOn(o.oscillator, 'disconnect');
        o.stop();
        expect(o.oscillator.disconnect).toHaveBeenCalled();
    });
});
