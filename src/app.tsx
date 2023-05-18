import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { Nav } from './nav';
import { DescriptiveStats} from './descriptiveStats';
import { Home} from './home';
import { InferentialStats} from './inferentialStats';
import { ComparingGenres} from './comparingGenres';
import { ConfidenceIntervals } from './confidenceIntervals';


export const App: React.FC = () => {

    return (
        <Router>
            <Routes>
                <Route path='*' element={<h1>404</h1>} />
                <Route path="/" element={<><Nav /><Home /></>} />
                <Route path="/descriptive"
                    element={<><Nav /><DescriptiveStats /></>} />

                <Route path="/inferential"
                    element={<><Nav /><InferentialStats /></>} />

                <Route path="/comparative"
                    element={<><Nav /><ComparingGenres /></>} />

                <Route path="/confidence"
                    element={<><Nav /><ConfidenceIntervals /></>} />

            </Routes>
        </Router>
    );
};
