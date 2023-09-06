import React from 'react';

export const Glossary: React.FC = () => {
    const definitions = [
        [
            'Data Point',
            'a discrete unit of information derived from a measurement. It\
                could be number or a word for example, but it has to be\
                distinguishable from other data points.'
        ],
        [
            'Estimated Sampling Distribution',
            'probability distribution that approximates the sampling\
                distribution (of the mean), but is based only on a single\
                sample. To sample mean is used to estimate the true mean of\
                the population, while the formula SE=SD/√N is used to\
                approximate the standard error of the sampling distribution.'
        ],
        [
            'Population',
            'the full set of data points that is of interest for some question\
                or experiment.'
        ],
        [
            'Sample',
            'a collections of measurements or observations. A sample\
                can have one or more data points and is a subset of the\
                population.'
        ],
        [
            'Sample Distribution',
            'observed distribution of the values that a variable is observed\
                to have for one particular sample.'
        ],
        [
            'Sample Distribution (of the mean)',
            'probability distribution of the mean derived from all (or at least\
                a large number of) possible samples having the same size from\
                the population.'
        ]
    ];

    return (
        <>
            <h1 className='mx-4 mt-4'>Glossary of Terms</h1>
            <section className='container'>
                <div className="mx-auto">
                    <ul className='row align-items-stretch'>
                        {definitions.map((term, key) =>
                            <li key={key} className="col-6 no-bullet">
                                <p className={'glossary p-4 rounded my-2'}>
                                    <strong>{term[0]}</strong>: {term[1]}
                                </p>
                            </li>
                        )}
                    </ul>
                </div>
            </section>
        </>
    );
};