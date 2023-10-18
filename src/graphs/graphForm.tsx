import React, { useEffect } from 'react';
import { toTitleCase, InstructionData, LineSetProps, StdProps, SetStdProps,
    FieldProps, GraphProps, LineProps, GraphRange} from '../common';
import seedrandom from 'seedrandom'; // https://github.com/davidbau/seedrandom
import { GenrePicker } from './genrePicker';
import { getDataPoints } from './utils';

interface GraphFormProps {
    activeTab: number;
    instructions: InstructionData[];
    lineProps: LineProps;
    lineSetProps: LineSetProps;
    fieldProps: FieldProps;
    graphProps: GraphProps;
    setStdProps: SetStdProps;
    stdProps: StdProps;
    graphRange: GraphRange | null;
}

const audioFeatures: string[] = ['danceability', 'energy', 'key', 'loudness',
    'speechiness', 'acousticness', 'tempo'];
const dataPointOptions: number[] = [1, 10, 25, 50, 75, 100];


export const GraphForm: React.FC<GraphFormProps> = ({
    activeTab, instructions,
    fieldProps: {audioFeatureField, dataPointsField, genre1Field, genre2Field,
        seedField},
    graphProps: {genres, setStore},
    lineProps: {prevData, prevData2},
    lineSetProps: {setPrevData, setPrevData2},
    stdProps: {audioFeature, data1, data2, dataPoints, genre1, genre2,
        meanData1, meanData2, seed, prng},
    setStdProps: {setAudioFeature, setData1, setData2, setDataPoints, setGenre1,
        setGenre2, setMeanData1, setMeanData2, setPRNG, setSeed},
    graphRange
}: GraphFormProps) => {

    useEffect(() => {
        if (setStore) {
            setStore({audioFeature, data1, data2, meanData1,
                meanData2, genre1, genre2, seed, prevData,
                prevData2, dataPoints, prng, min: graphRange.min,
                max: graphRange.max});
        }
    }, [audioFeature, data1, data2, meanData1, meanData2, genre1, genre2,
        dataPoints, prng]);

    const clearData = function() {
        setData1([]);
        if (meanData1) {
            setMeanData1([]);
        }
        if (data2) {
            setData2([]);
            if (meanData2) {
                setMeanData2([]);
            }
        }
        if (setPrevData) {
            setPrevData([]);
            if (setPrevData2) {
                setPrevData2([]);
            }
        }
        if (graphRange.min) {
            graphRange.setMax(null);
            graphRange.setMin(null);
        }
    };

    const reset = function() {
        clearData();
        if (dataPointsField) {
            setDataPoints(0);
        }
        setGenre1('');
        if (genre2) {
            setGenre2('');
        }
        if (audioFeatureField) {
            setAudioFeature(null);
        }
        setPRNG(() => seedrandom(seed));
    };

    const N = 100; // The number of datapoints to compile into the mean

    const handleDataUpdate = (evt: React.FormEvent<HTMLFormElement>): void => {
        evt.preventDefault();
        if (genre1) {
            if (data1.length === N) {
                if (dataPoints === N) {
                    setMeanData1([
                        ...meanData1,
                        getDataPoints(genre1, audioFeature, N, prng, genres
                        ).reduce((i, sum) => i + sum) / N]);
                }
                setData1([
                    ...getDataPoints(genre1, audioFeature, dataPoints, prng,
                        genres)]);
                if (genre2) {
                    if (dataPoints === N) {
                        setMeanData2([
                            ...meanData2,
                            getDataPoints(genre2, audioFeature, N, prng, genres
                            ).reduce((i, sum) => i + sum) / N]);
                    }
                    setData2([
                        ...getDataPoints(
                            genre2, audioFeature, dataPoints, prng, genres)]);
                }
            } else if (data1.length + dataPoints >= N) {
                setMeanData1([
                    ...meanData1,
                    [
                        ...data1,
                        ...getDataPoints(genre1, audioFeature, N - data1.length,
                            prng, genres)].reduce((i, sum) => i + sum) / N]);
                setData1([
                    ...data1,
                    ...getDataPoints(genre1, audioFeature, N - data1.length,
                        prng, genres)]);
                if (genre2) {
                    setMeanData2([
                        ...meanData2,
                        [
                            ...data2,
                            ...getDataPoints(genre2, audioFeature,
                                N - data2.length, prng, genres)
                        ].reduce((i, sum) => i + sum) / N]);
                    setData2([
                        ...data2,
                        ...getDataPoints(
                            genre2, audioFeature, N - data1.length, prng,
                            genres)]);
                }
            } else {
                setData1([
                    ...data1,
                    ...getDataPoints(genre1, audioFeature, dataPoints, prng,
                        genres)]);
                if (genre2) {
                    setData2([
                        ...data2,
                        ...getDataPoints(genre2, audioFeature, dataPoints,
                            prng, genres)]);
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
        <div className={'col-md-3'}>
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
    );
};
