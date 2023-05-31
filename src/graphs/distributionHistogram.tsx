import React from 'react';

interface SamplingDistributionProps {
    genre1: string
    genre2: string | null;
    audioFeature: string | null;
    dataPoints: number;
}

export const SamplingDistribution: React.FC<SamplingDistributionProps>  = (
    {genre1, genre2, audioFeature, dataPoints}
) => {

    return (
        <>
            <div className='col-sm-8'>
                Sampling Distribution Histogram
            </div>
        </>

    );
};