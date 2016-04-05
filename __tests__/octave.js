jest.unmock('../src/js/octave.js');

import Octave from '../src/js/octave';

describe('Octave method', () => {
    const keys = ['foo', 'foo#'];
    let o;
    beforeEach(() => {
        o = new Octave();
    });

    it ('\'getKeyColor\' which return proper key color', () => {
        let color;
        color = o.getKeyColor(keys[0]);
        expect(color).toBe('white');
        color = o.getKeyColor(keys[1]);
        expect(color).toBe('black');
    });
});
