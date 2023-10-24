import React, { useEffect, useState } from 'react';
import { init } from '@sentry/react';
import { Route, Routes } from 'react-router-dom';
import { Nav } from './nav';
import { DescriptiveStats} from './modules/descriptiveStats';
import { Home} from './home';
import { InferentialStats} from './modules/inferentialStats';
import { ComparingGenres} from './modules/comparingGenres';
import { ConfidenceIntervals } from './modules/confidenceIntervals';
import { Glossary } from './glossary';
import { Footer } from './footer';
import ReactGA from 'react-ga4';
import { About } from './about';
import { Store, Genres, createSeedString } from './common';
import { NotFound } from './notFound';


if (process.env.NODE_ENV === 'production') {
    init({
        dsn: 'https://ad0efe61f65143d6b66e7b1a643988fb@o46310.ingest.sentry.io/4505127209992192'
    });
}

export const App: React.FC = () => {
    const options = {
        gtagOptions: {anonymizeIp: true},
        testMode:
            typeof process !== 'undefined' && process.env.NODE_ENV === 'test'
    };

    ReactGA.initialize('G-TKVQP6RR12', options);

    const initalSeed = createSeedString();
    const [store, setStore] =
        useState<Store>({seed: initalSeed} as Store);
    const [selected, setSelected] = useState(location.pathname);
    const [genres, setGenres] = useState<Genres | null>(null);

    useEffect(() => {
        ReactGA.send({
            hitType: 'pageview',
            page: window.location.pathname + window.location.search
        });
        fetch('https://s3.amazonaws.com/statify.stage.ctl.columbia.edu/public/trackDataByGenre.json')
            .then(response => response.json())
            .then(data => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                setGenres(data);
            })
            .catch(error => {
                console.error('Error fetching JSON data:', error);
            });

    }, []);

    return (
        <>
            <Nav {...{selected, setSelected}}/>

            <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path='/' element={<Home {...{setSelected}}/>} />
                <Route path='/about/' element={<About />} />
                <Route path='/descriptive/'
                    element={<DescriptiveStats
                        {...{store, setStore, genres}} />} />
                <Route path='/inferential/'
                    element={<InferentialStats
                        {...{store, setStore, genres}} />} />
                <Route path='/comparative/'
                    element={<ComparingGenres
                        {...{store, setStore, genres}} />} />
                <Route path='/confidence/'
                    element={<ConfidenceIntervals
                        {...{store, setStore, genres}} />} />
                <Route path='/glossary/'
                    element={<Glossary />} />
            </Routes>

            <Footer {...{selected, setSelected}}/>
        </>
    );
};
