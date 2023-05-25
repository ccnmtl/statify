import React from 'react';
import genres from '../data/trackDataByGenre.json';

interface GraphFormProps {
    genre1Field: boolean;
    genre2Field: boolean;
    audioFeatureField: boolean;
    dataPointsField: boolean;
}

const audioFeatures: string[] = ['danceability', 'energy', 'key', 'loudness',
    'speechiness', 'acousticness', 'tempo', 'popularity'];

const dataPoints: number[] = [1, 10, 25, 50, 75, 100];

export const GraphForm: React.FC<GraphFormProps>  = (
    {genre1Field, genre2Field, audioFeatureField, dataPointsField}:
    GraphFormProps) => {
    const genresText: string[] = Object.keys(genres);


    return (
        <>
            <div className="col-md-9">
        Graph here
            </div>
            <div className="col-md-3">
                <form id='graph-inputs' className='sticky-top p-3'>
                    {genre1Field && (
                        <div className='mb-3'>
                            <label htmlFor='genre1'
                                className='form-label'>Genre 1</label>
                            <select name='genre1' id='genre1'
                                className='form-select'
                                defaultValue={'Select one'}>
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
                                defaultValue={'Select one'}>
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
                                defaultValue={'Select one'}>
                                <option value={''}>Select one</option>
                                {audioFeatures.map((audioFeature, index) => {
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
                                defaultValue={'Select one'}>
                                <option value={''}>Select one</option>
                                {dataPoints.map((points, index) => {
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
                        className='btn btn-primary'>
                    Submit
                    </button>
                </form>
            </div>
        </>

    );
};