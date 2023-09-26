import React from 'react';
import SadOwl from './images/sadowl.jpg';

export const NotFound: React.FC = () => {
    return (
        <>
            <section className='container'>
                <div className='row mt-5 mb-5'>
                    <div className='col'>
                        <div className='text-center'>
                            <img alt='Banner for HTTP 404 Page not found'
                                src={SadOwl} />
                        </div>
                    </div>
                    <div className='col
                    text-center text-lg-left'>
                        <h1>Page not found</h1>

                        <p className='fs-4 mt-5'>
                        We&apos;re sorry. The page you&apos;re looking for
                        doesn&apos;t exist at this address.
                        </p>

                        <div className='text-center mt-3'>
                            <a href={'/'}
                                className='btn btn-lg btn-statify'>
                                <span>
                                Return to Home page
                                </span>
                            </a>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};
