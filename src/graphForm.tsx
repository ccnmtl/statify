import React, { useState } from 'react';
import genres from '../data/trackDataByGenre.json';
import { SampleDataHistogram } from './graphs/sampleDataHistogram';
import { CumulativeSampleMean } from './graphs/sampleMeanLine';
import { Histogram } from './graphs/histogram';
import { Genre, toTitleCase, InstructionData  } from './common';
import seedrandom from 'seedrandom'; // https://github.com/davidbau/seedrandom

interface GraphFormProps {
    genre1Field: boolean;
    genre2Field: boolean;
    audioFeatureField: boolean;
    dataPointsField: boolean;
    seedField: boolean;
    graphTypes: number[];
    activeTab: number;
    instructions: InstructionData[];
}

const audioFeatures: string[] = ['danceability', 'energy', 'key', 'loudness',
    'speechiness', 'acousticness', 'tempo', 'popularity'];

const dataPointOptions: number[] = [1, 10, 25, 50, 75, 100];

export const GraphForm: React.FC<GraphFormProps> = (
    {
        genre1Field, genre2Field, audioFeatureField, dataPointsField,
        graphTypes, instructions, activeTab, seedField
    }:
    GraphFormProps) => {
    const genresText: string[] = Object.keys(genres);
    const initialSeed = [...Array(8) as null[]].map(
        () => Math.floor(Math.random() * 16).toString(16)).join(''); // Pulled from https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript

    const [audioFeature, setAudioFeature] = useState<string>(
        audioFeatureField ? undefined : 'tempo');
    const [data1, setData1] = useState<number[]>([]);
    const [data2, setData2] = useState<number[]>([]);
    const [meanData1, setMeanData1] = useState<number[]>([]);
    const [meanData2, setMeanData2] = useState<number[]>([]);
    const [dataPoints, setDataPoints] = useState<number>(
        dataPointsField ? undefined : 1);
    const [genre1, setGenre1] = useState<string>();
    const [genre2, setGenre2] = useState<string>();
    const [prng, setPRNG] = useState<seedrandom.PRNG>(
        () => seedrandom(initialSeed));

    const clearData = function() {
        setData1([]);
        setData2([]);
        setMeanData1([]);
        setMeanData2([]);
    };

    const SAMPLEDATA = 1;
    const SAMPLEMEAN = 2;
    const DISTRIBUTION = 3;
    const SAMPLEDATA2 = 4;
    const N = 100; // The number of datapoints to compile into the mean

    const getDataPoints = function(genre:string, feature:string , n:number) {
        const data:number[] = [];
        const chosenGenre = genres[genre] as Genre;
        const chosenFeature = chosenGenre[feature] as number[];
        for (let i = 0; i < n; i++) {
            data.push(chosenFeature[
                Math.floor(prng() * (chosenGenre.count-1))
            ]);
        }
        return data;
    };

    const handleDataUpdate = function(e) {
        (e as Event).preventDefault();
        if (genre1) {
            if (data1.length === N) {
                if (dataPoints === N) {
                    setMeanData1([
                        ...meanData1,
                        getDataPoints(
                            genre1,
                            audioFeature,
                            N
                        ).reduce((i, sum) => i + sum) / N]);
                }
                setData1([
                    ...getDataPoints(genre1, audioFeature, dataPoints)
                ]);
                if (genre2) {
                    setMeanData2([
                        ...meanData2,
                        getDataPoints(
                            genre2,
                            audioFeature,
                            N
                        ).reduce((i, sum) => i + sum) / N]);
                    setData2([
                        ...getDataPoints(
                            genre2, audioFeature, dataPoints)
                    ]);
                }
            } else if (data1.length + dataPoints >= N) {
                setMeanData1([
                    ...meanData1,
                    [
                        ...data1,
                        ...getDataPoints(
                            genre1,
                            audioFeature,
                            N - data1.length
                        )
                    ].reduce((i, sum) => i + sum) / N]);
                setData1([
                    ...data1,
                    ...getDataPoints(genre1, audioFeature, N - data1.length)
                ]);
                if (genre2) {
                    setMeanData2([
                        ...meanData2,
                        getDataPoints(
                            genre2,
                            audioFeature,
                            N - data1.length
                        ).reduce((i, sum) => i + sum) / N]);
                    setData2([
                        ...data2,
                        ...getDataPoints(
                            genre2, audioFeature, N - data1.length)
                    ]);
                }
            } else {
                setData1([
                    ...data1,
                    ...getDataPoints(genre1, audioFeature, dataPoints)
                ]);
                if (genre2) {
                    setData2([
                        ...data2,
                        ...getDataPoints(
                            genre2, audioFeature, dataPoints)
                    ]);
                }
            }
        }
    };

    const handleGenre1Select = (
        evt: React.ChangeEvent<HTMLSelectElement>): void => {
        setGenre1(evt.target.value);
        clearData();
    };

    const handleGenre2Select = (
        evt: React.ChangeEvent<HTMLSelectElement>): void => {
        setGenre2(evt.target.value);
        clearData();
    };

    const handleAudioFeatureSelect = (
        evt: React.ChangeEvent<HTMLSelectElement>): void => {
        setAudioFeature(evt.target.value);
        clearData();
    };

    const handleDataPointsSelect = (
        evt: React.ChangeEvent<HTMLSelectElement>): void => {
        setDataPoints(Number(evt.target.value));
    };

    const handleSeed = (
        evt: React.ChangeEvent<HTMLInputElement>): void => {
        setPRNG(() => seedrandom(evt.target.value));
        clearData();
    };

    return (
        <>
            <div className={'col-md-9'}>
                <div className={'alert statify-alert'}role={'alert'}>
                    {(genre1 && !genre2) && (
                        `You are sampling from ${toTitleCase(genre1)}`
                    )}
                    {(!genre1 && genre2) && (
                        `You are sampling from ${toTitleCase(genre2)}`
                    )}
                    {(genre1 && genre2) && (
                        `You are sampling from ${toTitleCase(genre1)}
                        and ${toTitleCase(genre2)}`
                    )}
                    {!(genre1 || genre2) && (
                        'The copy in this alert depends on the form '
                        + 'input on the right—check it out!'
                    )}
                </div>
                <div className='row' id='capture'>
                    {graphTypes.includes(SAMPLEDATA) && (
                        <Histogram
                            color={'rgba(82, 208, 80, 1.0)'}
                            data1={data1}
                            data2={data2}
                            genre1={genre1}
                            genre2={genre2}
                            audioFeature={audioFeature}
                            n={null}/>
                    )}
                    {graphTypes.includes(SAMPLEDATA2) && (
                        <SampleDataHistogram
                            genre1={genre1}
                            genre2={genre2}
                            audioFeature={audioFeature}
                            dataPoints={dataPoints} />
                    )}
                    {graphTypes.includes(SAMPLEMEAN) && (
                        <CumulativeSampleMean
                            genre1={genre1}
                            genre2={genre2}
                            audioFeature={audioFeature}
                            dataPoints={dataPoints} />
                    )}
                    {graphTypes.includes(DISTRIBUTION) && (
                        <Histogram
                            data1={meanData1}
                            data2={meanData2}
                            color={'rgba(101, 188, 212, 1.0)'}
                            genre1={genre1}
                            genre2={genre2}
                            audioFeature={audioFeature}
                            n={N}/>
                    )}
                </div>
            </div>
            <div className={'col-md-3'}>
                <div className={'sticky-top p-3'}>
                    <h2>
                        <small>Instructions</small>
                    </h2>
                    <p>
                        <small>
                            {instructions[activeTab].instruction}
                        </small>
                    </p>

                    <form
                        className='p-2 graph-inputs'
                        onSubmit={(e) => handleDataUpdate(e)}
                    >
                        {genre1Field && (
                            <div className='mb-3'>
                                <label htmlFor='genre1'
                                    className='form-label'>Genre 1</label>
                                <select name='genre1' id='genre1'
                                    className='form-select'
                                    defaultValue={'Select one'}
                                    onChange={handleGenre1Select}
                                    required>
                                    <option value={''}>Select one</option>
                                    {genresText.map((genre, index) => {
                                        return (
                                            <option key={index} value={genre}>
                                                {toTitleCase(genre)}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        )}
                        {genre2Field && (
                            <div className='mb-3'>
                                <label htmlFor='genre2'
                                    className='form-label'>Genre 2</label>
                                <select name='genre2' id='genre2'
                                    className='form-select'
                                    defaultValue={'Select one'}
                                    onChange={handleGenre2Select}
                                    required>
                                    <option value={''}>Select one</option>
                                    {genresText.map((genre, index) => {
                                        return (
                                            <option key={index} value={genre}>
                                                {toTitleCase(genre)}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        )}
                        {audioFeatureField && (
                            <div className='mb-3'>
                                <label htmlFor='audioFeature'
                                    className='form-label'>Audio Feature</label>
                                <select name='audioFeature' id='audioFeature'
                                    className='form-select'
                                    defaultValue={'Select one'}
                                    onChange={handleAudioFeatureSelect}
                                    required>
                                    <option value={''}>Select one</option>
                                    {audioFeatures.map((
                                        audioFeature, index) => {
                                        return (
                                            <option key={index}
                                                value={audioFeature}>
                                                {audioFeature}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        )}
                        {dataPointsField && (
                            <div className='mb-3'>
                                <label htmlFor='dataPoints'
                                    className='form-label'>
                                Data Points to Draw
                                </label>
                                <select name='dataPoints' id='dataPoints'
                                    className='form-select'
                                    defaultValue={'Select one'}
                                    onChange={handleDataPointsSelect}
                                    required>
                                    <option value={''}>Select one</option>
                                    {dataPointOptions.map((points, index) => {
                                        return (
                                            <option key={index} value={points}>
                                                {points}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        )}
                        {seedField && (
                            <div className='mb-3'>
                                <label htmlFor='seed'
                                    className='form-label col-12'>
                                Seed
                                </label>
                                <input name='seed' id='seed'
                                    type='text'
                                    className='form-input'
                                    defaultValue={initialSeed}
                                    onChange={handleSeed}
                                    required>
                                </input>
                            </div>
                        )}
                        <input
                            type='submit'
                            id='submit-btn'
                            className='btn btn-primary'
                            value='Submit'
                        />
                    </form>
                </div>
            </div>
        </>

    );
};