import { AUDIO_DEFAULT, Genres } from '../common';
import seedrandom from 'seedrandom';

export const cumulativeMeanFunc = (array: number[]): number[] => {
    if (array) {
        let sum = 0;
        return array.map((value, index) => {
            sum += value;
            return sum / (index + 1);
        });
    }
};

export const getDataPoints = (
    genre: string, feature: string|null , n: number, prng: seedrandom.PRNG,
    genres: Genres
): number[] => {
    const data:number[] = [];
    const chosenGenre = genres[genre];
    const chosenFeature = chosenGenre[feature ?? AUDIO_DEFAULT] as number[];
    for (let i = 0; i < n; i++) {
        data.push(chosenFeature[
            Math.floor(prng() * (chosenGenre.count-1))
        ]);
    }
    return data;
};