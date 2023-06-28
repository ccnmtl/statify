import React, { useState } from 'react';
import genres from '../data/trackDataByGenre.json';
import { SampleDataHistogram } from './graphs/sampleDataHistogram';
import { CumulativeSampleMean } from './graphs/sampleMeanLine';
import { SamplingDistribution } from './graphs/distributionHistogram';
import { Histogram } from './graphs/histogram';
import { InstructionData } from './common';
import { AudioFeature, Genre, toTitleCase } from './common';

interface GraphFormProps {
    genre1Field: boolean;
    genre2Field: boolean;
    audioFeatureField: boolean;
    dataPointsField: boolean;
    graphTypes: number[];
    activeTab: number;
    instructions: InstructionData[];
}

const audioFeatures: string[] = ['danceability', 'energy', 'key', 'loudness',
    'speechiness', 'acousticness', 'tempo', 'popularity'];

const dataPointOptions: number[] = [1, 10, 25, 50, 75, 100];

const boxMullerTransform = function() {
    const u1 = Math.random();
    const u2 = Math.random();
    return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
};

export const GraphForm: React.FC<GraphFormProps> = (
    {
        genre1Field, genre2Field, audioFeatureField, dataPointsField,
        graphTypes, instructions, activeTab
    }:
        GraphFormProps) => {
    const genresText: string[] = Object.keys(genres);

    const [audioFeature, setAudioFeature] = useState<string>(audioFeatures[0]);
    const [data1, setData1] = useState<number[]>([]);
    const [data2, setData2] = useState<number[]>([]);
    const [dataPoints, setDataPoints] = useState(1);
    const [genre1, setGenre1] = useState<string>();
    const [genre2, setGenre2] = useState<string>();

    const SAMPLEDATA = 1;
    const SAMPLEMEAN = 2;
    const DISTRIBUTION = 3;
    const SAMPLEDATA2 = 4;

    /**
     * Produces a set of randomized numbers based on normal (Gaussian)
     * distribution. The range of numbers generated is determined by the
     * preprocessed mean and standard deviation of the selected genre and audio
     * feature.
     * @param genre The selected music genre ('latin' by default)
     * @param feature The selected audio feature ('danceability' by default)
     * @param amount The number of datapoints to generate (1 by default)
     * @returns And array of new data points
     */
    const randomGaussianSet = function(
        genre:string, feature:string, amount:number) {

        const data:number[] = [];
        for (let i = 0; i < amount; i++) {
            const genreData = genres[genre] as Genre;
            const featureData = genreData[feature] as AudioFeature;
            data.push(featureData.sd * boxMullerTransform() + featureData.mean);
        }
        return data;
    };

    const handleDataUpdate = function() {
        let amount = dataPoints;
        if (data1.length + dataPoints > 100) {
            amount = 100 - data1.length;
            setData1([
                ...randomGaussianSet(genre1, audioFeature, amount)
            ]);
            if (genre2) {
                setData2([
                    ...randomGaussianSet(genre2, audioFeature, amount)
                ]);
            }
        } else {
            setData1([
                ...data1,
                ...randomGaussianSet(genre1, audioFeature, amount)
            ]);
            if (genre2) {
                setData2([
                    ...data2,
                    ...randomGaussianSet(genre2, audioFeature, amount)
                ]);
            }
        }
    };

    const handleGenre1Select = (
        evt: React.ChangeEvent<HTMLSelectElement>): void => {
        setGenre1(evt.target.value);
        setData1([]);
        setData2([]);
    };

    const handleGenre2Select = (
        evt: React.ChangeEvent<HTMLSelectElement>): void => {
        setGenre2(evt.target.value);
        setData1([]);
        setData2([]);
    };

    const handleAudioFeatureSelect = (
        evt: React.ChangeEvent<HTMLSelectElement>): void => {
        setAudioFeature(evt.target.value);
    };

    const handleDataPointsSelect = (
        evt: React.ChangeEvent<HTMLSelectElement>): void => {
        setDataPoints(Number(evt.target.value));
    };

    return (
        <>
            <div className={'col-md-9'}>
                <div className={'alert statify-alert'}role={'alert'}>
                    {(genre1 && !genre2) && (
                        `You are sampling from ${toTitleCase(genre1)}`
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
                            data1={data1}
                            data2={data2}
                            genre1={genre1}
                            genre2={genre2}
                            audioFeature={audioFeature}/>
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
                        <SamplingDistribution
                            genre1={genre1}
                            genre2={genre2}
                            audioFeature={audioFeature}
                            dataPoints={dataPoints} />
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

                    <div className='p-2 graph-inputs'>
                        {genre1Field && (
                            <div className='mb-3'>
                                <label htmlFor='genre1'
                                    className='form-label'>Genre 1</label>
                                <select name='genre1' id='genre1'
                                    className='form-select'
                                    defaultValue={'Select one'}
                                    onChange={handleGenre1Select} >
                                    <option value={''}>Select one</option>
                                    {genresText.map((genre, index) => {
                                        return (
                                            <option key={index} value={genre}>
                                                {genre}
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
                                    onChange={handleGenre2Select} >
                                    <option value={''}>Select one</option>
                                    {genresText.map((genre, index) => {
                                        return (
                                            <option key={index} value={genre}>
                                                {genre}
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
                                    onChange={handleAudioFeatureSelect} >
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
                                    onChange={handleDataPointsSelect} >
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
                        <button type='submit' id='submit-btn'
                            className='btn btn-primary'
                            onClick={handleDataUpdate}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
};