import React from 'react';

interface SampleDataHistogramProps {
    genre1: string
    genre2: string | null;
    audioFeature: string | null;
    dataPoints: number;
}

export const SampleDataHistogram: React.FC<SampleDataHistogramProps>  = (
    {genre1, genre2, audioFeature, dataPoints}
) => {

    return (
        <>
            <div className='col-sm-8'>
                Sample Data Histogram
            </div>
        </>

    );
};