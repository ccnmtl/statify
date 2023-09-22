import React, { useEffect, useState } from 'react';
import genres from '../data/trackDataByGenre.json';
import { CumulativeSampleMean } from './graphs/sampleMeanLine';
import { Histogram } from './graphs/histogram';
import {
    Genre, toTitleCase, InstructionData, PRIMARY, SECONDARY, Store,
    AUDIO_DEFAULT, HIGHLIGHT_1, HIGHLIGHT_2
} from './common';
import seedrandom from 'seedrandom'; // https://github.com/davidbau/seedrandom
import { EstimatedDistribution } from './graphs/estimatedSampleDistribution';

interface GraphFormProps {
    genre1Field: boolean;
    genre2Field: boolean;
    audioFeatureField: boolean;
    dataPointsField: boolean;
    seedField: boolean;
    defaultPoints: number;
    graphTypes: number[];
    activeTab: number;
    instructions: InstructionData[];
    store: Store;
    setStore: React.Dispatch<React.SetStateAction<Store>> | null;
}

const audioFeatures: string[] = ['danceability', 'energy', 'key', 'loudness',
    'speechiness', 'acousticness', 'tempo'];

const dataPointOptions: number[] = [1, 10, 25, 50, 75, 100];

export const GraphForm: React.FC<GraphFormProps> = (
    {
        genre1Field, genre2Field, audioFeatureField, dataPointsField,
        graphTypes, instructions, activeTab, seedField, defaultPoints,
        store, setStore
    }:
    GraphFormProps) => {
    const genresText: string[] = Object.keys(genres);
    const initialSeed = [...Array(8) as null[]].map(
        // Pulled from https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript
        () => Math.floor(Math.random() * 16).toString(16)).join('');

    const [audioFeature, setAudioFeature] = useState<string|null>(
        audioFeatureField ? store.audioFeature : null);
    const [data1, setData1] = useState<number[]>(store.data1 || []);
    const [data2, setData2] = useState<number[]>(store.data2 || []);
    const [meanData1, setMeanData1] = useState<number[]>(
        store.meanData1 || []);
    const [meanData2, setMeanData2] = useState<number[]>(
        store.meanData2 || []);
    const [dataPoints, setDataPoints] = useState<number>(
        dataPointsField ? store.dataPoints || defaultPoints : defaultPoints);
    const [genre1, setGenre1] = useState<string>(store.genre1 || '');
    const [genre2, setGenre2] = useState<string>(store.genre2 || '');
    const [prng, setPRNG] = useState<seedrandom.PRNG>(
        () => store.prng || seedrandom(initialSeed));

    const [oldData, setOldData] = useState(data1);
    const [oldData2, setOldData2] = useState(data1);
    const [prevData, setPrevData] = useState<[number, number][][]>([]);
    const [prevData2, setPrevData2] = useState<[number, number][][]>([]);

    useEffect(() => {
        if (setStore) {
            const checkAudio = audioFeature ?? AUDIO_DEFAULT;
            setStore({audioFeature: checkAudio, data1, data2, meanData1,
                meanData2, genre1, genre2, dataPoints, prng});
        }
    }, [audioFeature, data1, data2, meanData1, meanData2, genre1, genre2,
        dataPoints, prng]);

    const clearData = function() {
        setData1([]);
        setData2([]);
        setMeanData1([]);
        setMeanData2([]);
        setOldData([]);
        setOldData2([]);
        setPrevData([]);
        setPrevData2([]);
    };

    const reset = function() {
        clearData();
        setDataPoints(dataPointsField ? 0 : defaultPoints);
        setGenre1('');
        setGenre2('');
        setAudioFeature(null);
        setPRNG(() => seedrandom(initialSeed));
    };

    const SAMPLEDATAHISTOGRAM1 = 1;
    const SAMPLEDATAHISTOGRAM2 = 2;
    const SAMPLEDATAHISTOGRAMBOTH = 3;
    const DISTRIBUTIONHISTOGRAM = 4;
    const SAMPLEMEANLINE = 5;
    const ESTIMATED_DISTRIBUTION = 6;
    const N = 100; // The number of datapoints to compile into the mean

    const getDataPoints = function(
        genre:string, feature:string|null , n:number)
    {
        const data:number[] = [];
        const chosenGenre = genres[genre] as Genre;
        const chosenFeature = chosenGenre[feature ?? AUDIO_DEFAULT] as number[];
        for (let i = 0; i < n; i++) {
            data.push(chosenFeature[
                Math.floor(prng() * (chosenGenre.count-1))
            ]);
        }
        return data;
    };

    const handleDataUpdate = (evt: React.FormEvent<HTMLFormElement>): void => {
        evt.preventDefault();
        if (genre1 !== '') {
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
                if (genre2 !== '') {
                    if (dataPoints === N) {
                        setMeanData2([
                            ...meanData2,
                            getDataPoints(
                                genre2,
                                audioFeature,
                                N
                            ).reduce((i, sum) => i + sum) / N]);
                    }
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
                {(genre1 !== '' || genre2 !== '') && (
                    <div className={'alert statify-alert'}role={'alert'}>
                        {(genre1 !== '' && genre2 === '') && (
                            `You are sampling from ${toTitleCase(genre1)}`
                        )}
                        {(genre1 === '' && genre2 !== '') && (
                            `You are sampling from ${toTitleCase(genre2)}`
                        )}
                        {(genre1 !== '' && genre2 !== '') && (
                            `You are sampling from ${toTitleCase(genre1)}
                            and ${toTitleCase(genre2)}`
                        )}
                    </div>
                )}
                <div className='row' id='capture'>
                    {graphTypes.includes(SAMPLEDATAHISTOGRAM1) && (
                        <Histogram
                            color={PRIMARY}
                            highlight={HIGHLIGHT_1}
                            data1={data1}
                            data2={null}
                            genre1={genre1}
                            genre2={null}
                            audioFeature={audioFeature}
                            n={null}/>
                    )}
                    {graphTypes.includes(SAMPLEDATAHISTOGRAM2) && (
                        <Histogram
                            color={SECONDARY}
                            highlight={HIGHLIGHT_2}
                            data1={data2}
                            data2={null}
                            genre1={genre2}
                            genre2={null}
                            audioFeature={audioFeature}
                            n={null}/>
                    )}
                    {graphTypes.includes(SAMPLEDATAHISTOGRAMBOTH) && (
                        <Histogram
                            color={PRIMARY}
                            highlight={HIGHLIGHT_1}
                            data1={data1}
                            data2={data2}
                            genre1={genre1}
                            genre2={genre2}
                            audioFeature={audioFeature}
                            n={null}/>
                    )}
                    {graphTypes.includes(ESTIMATED_DISTRIBUTION) && (
                        <EstimatedDistribution
                            data1={data1}
                            data2={data2}
                            genre1={genre1}
                            genre2={genre2}
                            audioFeature={audioFeature}
                            n={N}/>
                    )}
                    {graphTypes.includes(SAMPLEMEANLINE) && (
                        <CumulativeSampleMean
                            data1={data1}
                            data2={data2}
                            audioFeature={audioFeature}
                            oldData={oldData}
                            oldData2={oldData2}
                            prevData={prevData}
                            prevData2={prevData2}
                            setOldData={setOldData}
                            setOldData2={setOldData2}
                            setPrevData={setPrevData}
                            setPrevData2={setPrevData2}/>
                    )}
                    {graphTypes.includes(DISTRIBUTIONHISTOGRAM) && (
                        <Histogram
                            color={PRIMARY}
                            highlight={HIGHLIGHT_1}
                            data1={meanData1}
                            data2={meanData2}
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
                        data-cy={'graphForm'}
                        onSubmit={handleDataUpdate}
                    >
                        {genre1Field && (
                            <div className='mb-3'>
                                <label htmlFor='firstGenre'
                                    className='form-label'>Genre 1</label>
                                <select name='firstGenre' id='firstGenre'
                                    className='form-select'
                                    value={genre1 ? genre1 : 'Select One'}
                                    onChange={handleGenre1Select}
                                    aria-required={'true'}
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
                                <label htmlFor='secondGenre'
                                    className='form-label'>Genre 2</label>
                                <select name='secondGenre' id='secondGenre'
                                    className='form-select'
                                    value={genre2 ? genre2 : 'Select One'}
                                    onChange={handleGenre2Select}
                                    aria-required={'true'}
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
                                    value={
                                        audioFeature ?
                                            audioFeature :
                                            'Select One'}
                                    onChange={handleAudioFeatureSelect}
                                    aria-required={'true'}
                                    required>
                                    <option value={''}>Select one</option>
                                    {audioFeatures.map((
                                        audioFeature, index) => {
                                        return (
                                            <option key={index}
                                                value={audioFeature}>
                                                {toTitleCase(audioFeature)}
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
                                    value={
                                        dataPoints ? dataPoints : 'Select One'}
                                    onChange={handleDataPointsSelect}
                                    aria-required={'true'}
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
                                    className='form-control'
                                    defaultValue={initialSeed}
                                    onChange={handleSeed}
                                    aria-required={'true'}
                                    required>
                                </input>
                            </div>
                        )}
                        <div className="row px-4">
                            <input
                                type='submit'
                                id='submit-btn'
                                className='col mx-1 mb-2 btn btn-primary'
                                value='Submit'
                            />
                            <input
                                type='button'
                                id='reset-btn'
                                className='col mx-1 mb-2 btn btn-danger'
                                onClick={reset}
                                value="Reset"/>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};
