import React from 'react';
import {Link} from 'react-router-dom';

export const Home: React.FC = () => {
    return (
        <section className='container'>
            <div id={'intro'} className={'p-5 rounded my-5'}>
                <div className={'row'}>
                    <div className={'col-sm-8 py-5 mx-auto'}>
                        <h1>Introduction</h1>
                        <p>
                            Throughout the ages, music has been used as a way
                            of reflecting the fashion, culture, social and
                            cultural events of its time. When we listen to
                            songs from different genres, we are in a way
                            transporting ourselves to different places and
                            periods in history.
                        </p>
                        <p>
                            Our intuition might take us there when we close
                            our eyes to Spring by Vivaldi or when we dance to
                            Complete Control by The Clash, but is there a more
                            concrete way to define and differentiate different
                            music genres?
                        </p>
                        <p>
                            By using Statify, this Spotify data analysis tool,
                            what are some of the characteristics of a song
                            that we can use to assign it to one or another
                            genre?
                        </p>
                        <Link
                            to={'/descriptive/'}
                            className={'btn btn-primary btn-statify'}
                            data-cy={'statify-start'}
                            type={'submit'}
                        >
                            Good question. Let&apos;s Statify!
                        </Link>
                    </div>
                    <div className={'col-sm-4 py-5 mx-auto'}>
                        <img src={'/dist/images/phone.png'}
                            alt={`A hand holding a phone with the spotify
                                logo. The image is made up shades of
                                green.`}
                            className={'img-fluid rounded'} />
                    </div>
                </div>
            </div>
        </section>
    );
};