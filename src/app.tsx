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
import { Store } from './common';
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

    const [store, setStore] = useState<Store>({} as Store);
    const [selected, setSelected] = useState(location.pathname);

    useEffect(() => {
        ReactGA.send({
            hitType: 'pageview',
            page: window.location.pathname + window.location.search
        });

    }, []);

    return (
        <>
            <Nav {...{selected, setSelected}}/>

            <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path='/' element={<Home />} />
                <Route path='/about/' element={<About />} />
                <Route path='/descriptive/'
                    element={<DescriptiveStats {...{store, setStore}} />} />
                <Route path='/inferential/'
                    element={<InferentialStats {...{store, setStore}} />} />
                <Route path='/comparative/'
                    element={<ComparingGenres {...{store, setStore}} />} />
                <Route path='/confidence/'
                    element={<ConfidenceIntervals {...{store, setStore}} />} />
                <Route path='/glossary/'
                    element={<Glossary />} />
            </Routes>

            <Footer {...{selected, setSelected}}/>
        </>
    );
};
