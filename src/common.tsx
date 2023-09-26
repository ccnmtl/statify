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

export interface Genre {
    count: number,
    acousticness: number[],
    danceability: number[],
    energy: number[],
    key: number[],
    loudness: number[],
    speechiness: number[],
    tempo: number[]
}

export interface Store {
    audioFeature: string,
    data1: number[],
    data2: number[],
    dataPoints: number | null,
    genre1: string,
    genre2: string,
    meanData1: number[],
    meanData2: number[],
    prng: seedrandom.PRNG
}

export interface GraphProps {
    store: Store,
    setStore: React.Dispatch<React.SetStateAction<Store>>
}

export interface PageSelect {
    selected: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>
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
