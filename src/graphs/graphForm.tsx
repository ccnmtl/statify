import React, { useEffect, useState } from 'react';
import { CumulativeSampleMean } from './sampleMeanLine';
import { Histogram } from './histogram';
import {
    toTitleCase, InstructionData, PRIMARY, SECONDARY, Store,
    AUDIO_DEFAULT, HIGHLIGHT_1, HIGHLIGHT_2, Genres, createSeedString
} from '../common';
import seedrandom from 'seedrandom'; // https://github.com/davidbau/seedrandom
import { EstimatedDistribution } from './estimatedSampleDistribution';
import { GenrePicker } from './genrePicker';
import { getDataPoints } from './utils';

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
    genres: Genres | null;
}

const audioFeatures: string[] = ['danceability', 'energy', 'key', 'loudness',
    'speechiness', 'acousticness', 'tempo'];
const dataPointOptions: number[] = [1, 10, 25, 50, 75, 100];


export const GraphForm: React.FC<GraphFormProps> = (
    {
        genre1Field, genre2Field, audioFeatureField, dataPointsField,
        graphTypes, instructions, activeTab, seedField, defaultPoints,
        store, setStore, genres
    }:
    GraphFormProps) => {

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
        () => store.prng || seedrandom(store.seed));

    const [oldData, setOldData] = useState(data1);
    const [oldData2, setOldData2] = useState(data1);
    const [prevData, setPrevData] = useState<[number, number][][]>([]);
    const [prevData2, setPrevData2] = useState<[number, number][][]>([]);
    const [seed, setSeed] = useState<string>(
        store.seed || createSeedString());

    useEffect(() => {
        if (setStore) {
            const checkAudio = audioFeature ?? AUDIO_DEFAULT;
            setStore({audioFeature: checkAudio, data1, data2, meanData1,
                meanData2, genre1, genre2, seed,
                dataPoints, prng});
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
        setPRNG(() => seedrandom(seed));
    };

    const SAMPLEDATAHISTOGRAM1 = 1;
    const SAMPLEDATAHISTOGRAM2 = 2;
    const SAMPLEDATAHISTOGRAMBOTH = 3;
    const DISTRIBUTIONHISTOGRAM = 4;
    const SAMPLEMEANLINE = 5;
    const ESTIMATED_DISTRIBUTION = 6;
    const N = 100; // The number of datapoints to compile into the mean

    const handleDataUpdate = (evt: React.FormEvent<HTMLFormElement>): void => {
        evt.preventDefault();
        if (genre1 !== '') {
            if (data1.length === N) {
                if (dataPoints === N) {
                    setMeanData1([
                        ...meanData1,
                        getDataPoints(genre1, audioFeature, N, prng, genres
                        ).reduce((i, sum) => i + sum) / N]);
                }
                setData1([
                    ...getDataPoints(genre1, audioFeature, dataPoints, prng,
                        genres)
                ]);
                if (genre2 !== '') {
                    if (dataPoints === N) {
                        setMeanData2([
                            ...meanData2,
                            getDataPoints(
                                genre2,
                                audioFeature,
                                N,
                                prng,
                                genres
                            ).reduce((i, sum) => i + sum) / N]);
                    }
                    setData2([
                        ...getDataPoints(
                            genre2, audioFeature, dataPoints, prng, genres)
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
                            N - data1.length,
                            prng,
                            genres
                        )
                    ].reduce((i, sum) => i + sum) / N]);
                setData1([
                    ...data1,
                    ...getDataPoints(
                        genre1, audioFeature, N - data1.length, prng, genres)
                ]);
                if (genre2) {
                    setMeanData2([
                        ...meanData2,
                        getDataPoints(genre2, audioFeature, N - data1.length,
                            prng, genres
                        ).reduce((i, sum) => i + sum) / N]);
                    setData2([
                        ...data2,
                        ...getDataPoints(
                            genre2, audioFeature, N - data1.length, prng,
                            genres)
                    ]);
                }
            } else {
                setData1([
                    ...data1,
                    ...getDataPoints(genre1, audioFeature, dataPoints,
                        prng, genres)
                ]);
                if (genre2) {
                    setData2([
                        ...data2,
                        ...getDataPoints(
                            genre2, audioFeature, dataPoints, prng,
                            genres)
                    ]);
                }
            }
        }
    };

    const handleGenre1Select = (
        evt: React.MouseEvent<HTMLElement>): void =>
    {
        evt.preventDefault();
        setGenre1((evt.target as HTMLInputElement).value);
        clearData();
        document.getElementById('genreList1')
            .classList.remove('show');
    };

    const handleGenre2Select = (
        evt: React.MouseEvent<HTMLElement>): void =>
    {
        evt.preventDefault();
        setGenre2((evt.target as HTMLInputElement).value);
        clearData();
        document.getElementById('genreList2')
            .classList.remove('show');
    };

    const handleAudioFeatureSelect = (
        evt: React.ChangeEvent<HTMLSelectElement>): void =>
    {
        setAudioFeature(evt.target.value);
        clearData();
    };

    const handleDataPointsSelect = (
        evt: React.ChangeEvent<HTMLSelectElement>): void =>
    {
        setDataPoints(Number(evt.target.value));
    };

    const handleSeed = (
        evt: React.ChangeEvent<HTMLInputElement>): void =>
    {
        setSeed(evt.target.value);
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
                        onSubmit={handleDataUpdate}>
                        {!genres ? (
                            <p className='loading fs-5 fw-bold'>
                                Loading genres...
                            </p>
                        ) : (
                            <>
                                {genre1Field && (
                                    <GenrePicker
                                        genre={genre1}
                                        handler={handleGenre1Select}
                                        label='first'
                                        x={1}
                                        genreList={genres} />
                                )}
                                {genre2Field && (
                                    <GenrePicker
                                        genre={genre2}
                                        handler={handleGenre2Select}
                                        label='second'
                                        x={2}
                                        genreList={genres} />
                                )}
                            </>
                        )}
                        {audioFeatureField && (
                            <div className='mb-3'>
                                <label htmlFor='audioFeature'
                                    className='form-label'>Audio Feature</label>
                                <select name='audioFeature' id='audioFeature'
                                    className='form-select hover-green'
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
                                    className='form-select hover-green'
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
                                    defaultValue={seed}
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
                                data-cy={'reset'}
                                onClick={reset}
                                value="Reset"/>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};