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

export interface AudioFeature {
    mean: number,
    sd: number
}

export interface Genre {
    count: number,
    acousticness: AudioFeature,
    danceability: AudioFeature,
    energy: AudioFeature,
    key: AudioFeature,
    loudness: AudioFeature,
    popularity: AudioFeature,
    speechiness: AudioFeature,
    tempo: AudioFeature
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
    ticks: 6
};

const alternative: BinData = {
    min: 0,
    max: 1,
    width: 0.01,
    ticks: 0.1
};

export const graphBins = {
    tempo,
    key,
    loudness,
    acousticness: alternative,
    speechiness: alternative,
    danceability: alternative,
    energy: alternative,
};
