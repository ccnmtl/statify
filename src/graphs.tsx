import React from 'react';
import genres from '../data/trackDataByGenre.json';

export const Graph: React.FC  = () => {
    const data = [
        { x: 0 },
        { x: 1 },
        { x: 1 },
        { x: 2 },
        { x: 3 },
        { x: 4 },
        { x: 4 },
        { x: 5 },
        { x: 6 },
        { x: 7 },
        { x: 8 },
        { x: 9 },
        { x: 10 },
        { x: 11 }
    ];

    return (
        <>
            <div className='h-50 d-inline-block'>
                Graph
            </div>
        </>

    );
};