import React, {useEffect} from 'react';
import { Route, Routes  } from 'react-router-dom';
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


export const App: React.FC = () => {
    const options = {
        gtagOptions: {anonymizeIp: true},
        testMode:
            typeof process !== 'undefined' && process.env.NODE_ENV === 'test'
    };

    ReactGA.initialize('G-TKVQP6RR12', options);

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
                <Route path='*' element={<h1>404</h1>} />
                <Route path='/' element={<Home />} />
                <Route path='/about/' element={<About />} />
                <Route path='/descriptive/'
                    element={<DescriptiveStats />} />
                <Route path='/inferential/'
                    element={<InferentialStats />} />
                <Route path='/comparative/'
                    element={<ComparingGenres />} />
                <Route path='/confidence/'
                    element={<ConfidenceIntervals />} />
                <Route path='/glossary/'
                    element={<Glossary />} />
            </Routes>

            <Footer />
        </>
    );
};
