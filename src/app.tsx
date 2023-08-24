import React from 'react';
import { Route, Routes  } from 'react-router-dom';
import { Nav } from './nav';
import { DescriptiveStats} from './descriptiveStats';
import { Home} from './home';
import { InferentialStats} from './inferentialStats';
import { ComparingGenres} from './comparingGenres';
import { ConfidenceIntervals } from './confidenceIntervals';
import { Footer } from './footer';


export const App: React.FC = () => {

    return (
        <>
            <Nav />

            <Routes>
                <Route path='*' element={<h1>404</h1>} />
                <Route path='/' element={<Home />} />
                <Route path='/descriptive/'
                    element={<DescriptiveStats />} />
                <Route path='/inferential/'
                    element={<InferentialStats />} />
                <Route path='/comparative/'
                    element={<ComparingGenres />} />
                <Route path='/confidence/'
                    element={<ConfidenceIntervals />} />
            </Routes>

            <Footer />
        </>
    );
};
