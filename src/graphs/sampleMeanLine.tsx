import React from 'react';

interface CumulativeSampleMeanProps {
    genre1: string
    genre2: string | null;
    audioFeature: string | null;
    dataPoints: number;
}


export const CumulativeSampleMean: React.FC<CumulativeSampleMeanProps>  = (
    {genre1, genre2, audioFeature, dataPoints}
) => {

    return (
        <>
            <div className='col-sm-8'>
                Cumulative Sample Mean
            </div>
        </>

    );
};