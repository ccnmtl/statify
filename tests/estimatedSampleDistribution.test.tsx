import { 
    GAUSSIAN, gaussian, stdError
} from '../src/graphs/estimatedSampleDistribution';
import React from 'react';
import renderer from 'react-test-renderer';

const N = 100;

describe('Gaussian Function', () => {
    const x = 25.3, se = 2.76, mean = 24.5;
    const z = (x - mean) / se;
    test('Runs properly', () => {
        expect(gaussian(0, 1, 0, N)).toBe(GAUSSIAN / 1 * N);
        expect(gaussian(x, se, mean, N)).toBe(
            GAUSSIAN * Math.exp(-0.5 * z * z) / se * N);
    });
    test('(se) and (n) cannot be zero', () => {
        // Throws error if se or n is 0
        expect(() => {gaussian(0, 0, 0, N)}).toThrowError('Divide by zero');
        expect(() => {gaussian(0, 1, 0, 0)}).toThrowError('Divide by zero');
    });
});

describe('Standard Error Function', () => {
    const data = [1, 4, 5, 2, 6, 8, 3, 6, 3, 2, 6, 5, 9, 2, 5, 8, 1, 3, 6, 5];
    test('Runs Properly', () => {
        expect(stdError(data, data.length)).toBe(0.5256574830378469);
    });
    test('Sanitizes inputs', () => {
        expect(stdError([], 0)).toBe(0);
    });
});