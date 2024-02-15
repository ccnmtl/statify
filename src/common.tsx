import React from 'react';
import seedrandom from 'seedrandom'; // https://github.com/davidbau/seedrandom

export type TabData = {
    title: string;
    info: string;
}

export type AssignmentData = {
    answers: object;
    module: string;
    uni: string;
    name: string;
}

export type InstructionData = {
    instruction: string;
}

export type GraphRange = {
    min: number;
    max: number;
    setMin: React.Dispatch<React.SetStateAction<number>>;
    setMax: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Given a string, the first character of each subset separated by a space is
 * capitalized. E.g. a tale of two cities => A Tale Of Two Cities
 * @param text Any string input
 * @returns Title Case equivalent of the input
 */
export function toTitleCase(text: string) {
    // Regex searches for all instances of space and underscore
    return text.split(/ |_/g).map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

/**
 * A pseudorandomized string generator for the seedrandom generator
 * @returns string
 */
export function createSeedString() {
    // Pulled from https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript
    return [...Array(8) as null[]].map(
        () => Math.floor(Math.random() * 16).toString(16)).join('');
}

export function failureCallback(error) {
    console.error(`Error fetching data: ${error}`);
}

export interface Genre {
    count: number;
    acousticness: number[];
    danceability: number[];
    energy: number[];
    key: number[];
    loudness: number[];
    speechiness: number[];
    tempo: number[];
}

export interface Genres {
    [genre: string]: Genre;
}

export interface LineProps {
    oldData: number[];
    oldData2: number[] | null;
    prevData: number[][];
    prevData2: number[][] | null;
}

export interface LineSetProps {
    setOldData: React.Dispatch<React.SetStateAction<number[]>>;
    setOldData2: React.Dispatch<React.SetStateAction<number[]>> | null;
    setPrevData: React.Dispatch<React.SetStateAction<number[][]>>;
    setPrevData2: React.Dispatch<React.SetStateAction<number[][]>> | null;
}

export interface FieldProps {
    audioFeatureField: boolean;
    dataPointsField: boolean;
    genre1Field: boolean;
    genre2Field: boolean;
    seedField: boolean;
}

export interface Store {
    audioFeature: string;
    data1: number[];
    data2: number[];
    dataPoints: number | null;
    genre1: string;
    genre2: string;
    seed: string;
    meanData1: number[];
    meanData2: number[];
    prevData: number[][];
    prevData2: number[][];
    prng: seedrandom.PRNG;
    min: number | null;
    max: number | null;
}

export interface StdProps {
    audioFeature: string;
    data1: number[];
    data2: number[];
    dataPoints: number;
    genre1: string;
    genre2: string;
    meanData1: number[];
    meanData2: number[];
    prng: seedrandom.PRNG;
    seed: string;
}

export interface SetStdProps {
    setAudioFeature: React.Dispatch<React.SetStateAction<string>> | null;
    setData1: React.Dispatch<React.SetStateAction<number[]>>
    setData2: React.Dispatch<React.SetStateAction<number[]>>
    setDataPoints: React.Dispatch<React.SetStateAction<number>>
    setGenre1: React.Dispatch<React.SetStateAction<string>>;
    setGenre2: React.Dispatch<React.SetStateAction<string>>;
    setMeanData1: React.Dispatch<React.SetStateAction<number[]>>
    setMeanData2: React.Dispatch<React.SetStateAction<number[]>>
    setPRNG: React.Dispatch<React.SetStateAction<seedrandom.PRNG>>
    setSeed: React.Dispatch<React.SetStateAction<string>>;
}

export interface GraphProps {
    store: Store;
    setStore: React.Dispatch<React.SetStateAction<Store>>;
    genres: Genres;
}

export interface PageSelect {
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
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
    ticks: 3
};

const key: BinData = {
    min: 0,
    max: 12,
    width: 0.5,
    ticks: 0.2
};

const loudness: BinData = {
    min: -60,
    max: 6,
    width: 1,
    ticks: 1
};

const alternative: BinData = {
    min: 0,
    max: 1,
    width: 0.01,
    ticks: 0.02
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

export const PRIMARY = 'rgba(0, 119, 178, 1.0)';
export const SECONDARY = 'rgba(254, 207, 73, 1.0)';
export const OVERLAP = 'rgba(76, 187, 81, 1.0)';
export const HIGHLIGHT_1 = 'rgba(83, 175, 220, 1.0)';
export const HIGHLIGHT_2 = 'rgba(254, 237, 185, 1.0)';
export const HIGHLIGHT_OVERLAP = 'rgba(159, 229, 162, 1.0)';
export const GRAPH_BG = 'rgba(64, 64, 64, 1.0)';
export const FONT_SIZE = 14;
export const MARGIN = 30;
export const AUDIO_DEFAULT = 'tempo';
