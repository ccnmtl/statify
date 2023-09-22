import { getDataPoints } from '../src/graphForm'
import seedrandom from 'seedrandom'; 

describe('Get Datapoints Function', () => {
    test('The right number of datapoints are collected', () => {
        const prng = seedrandom('12345678');
        const points1 = getDataPoints('alternative_rock', 'tempo', 25, prng);
        expect(points1.length).toEqual(25);
    });
    
    test('A given seed generates the same datapoints', () => {
        let prng1 = seedrandom('12345678');
        const points1 = getDataPoints('alternative_rock', 'tempo', 25, prng1);
        prng1 = seedrandom('12345678');
        const points2 = getDataPoints('alternative_rock', 'tempo', 25, prng1);
        expect(points1).toEqual(points2);
    });
});