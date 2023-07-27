export type TabData = {
    title: string;
    info: string;
}

export type InstructionData = {
    instruction: string;
}

/**
 * Given a string, the first character of each subset separated by a space is
 * capitalized.
 * @param text string
 * @returns string
 */
export function toTitleCase(text: string) {
    // Regex searches for all instances of space and underscore
    return text.split(/ |_/g).map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export interface Genre {
    count: number,
    acousticness: number[],
    danceability: number[],
    energy: number[],
    key: number[],
    loudness: number[],
    popularity: number[],
    speechiness: number[],
    tempo: number[]
}

export interface BinData {
    min: number;
    max: number;
    ticks: number;
    width: number;
}

const tempo: BinData = {
    min: 50,
    max: 200,
    width: 5,
    ticks: 5
};

const key: BinData = {
    min: 0,
    max: 12,
    width: 0.5,
    ticks: 1
};

const loudness: BinData = {
    min: -60,
    max: 6,
    width: 1,
    ticks: 2
};

const alternative: BinData = {
    min: 0,
    max: 1,
    width: 0.01,
    ticks: 0.04
};

const popularity: BinData = {
    min: 0,
    max: 100,
    width: 5,
    ticks: 5
};

export const graphBins = {
    tempo,
    key,
    loudness,
    acousticness: alternative,
    speechiness: alternative,
    danceability: alternative,
    energy: alternative,
    popularity: popularity
};

export const primary = 'rgba(82, 208, 80, 1.0)';
export const secondary = 'rgba(255, 100, 100, 0.7)';
export const FONT_SIZE = 14;
export const MARGIN = 30;
