import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Nav } from './nav';
import { DescriptiveStats} from './descriptiveStats';
import { Home} from './home';
import { InferentialStats} from './inferentialStats';
import { ComparingGenres} from './comparingGenres';
import { ConfidenceIntervals } from './confidenceIntervals';
import { Glossary } from './glossary';
import { Footer } from './footer';
import ReactGA from 'react-ga4';
import { About } from './about';
import { Store } from './common';
import { NotFound } from './notFound';


export const App: React.FC = () => {
    const options = {
        gtagOptions: {anonymizeIp: true},
        testMode:
            typeof process !== 'undefined' && process.env.NODE_ENV === 'test'
    };

    ReactGA.initialize('G-TKVQP6RR12', options);

    const [store, setStore] = useState<Store>({} as Store);

    useEffect(() => {
        ReactGA.send({
            hitType: 'pageview',
            page: window.location.pathname + window.location.search
        });

    }, []);

    return (
        <>
            <Nav />

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

            <Footer />
        </>
    );
};
