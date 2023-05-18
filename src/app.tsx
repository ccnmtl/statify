import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { Nav } from './nav';


export const App: React.FC = () => {

    return (
        <Router>
            <Routes>
                <Route path='*' element={<h1>404</h1>} />
                <Route path="/" element={<><Nav /><h1>Home Page</h1></>} />
                <Route path="/descriptive"
                    element={<><Nav /><h1>Descripitive Statistics</h1></>} />

                <Route path="/inferential"
                    element={<><Nav /><h1>Inferential Statistics</h1></>} />

                <Route path="/comparative"
                    element={<><Nav /><h1> Comparing Genres</h1></>} />

                <Route path="/confidence"
                    element={<><Nav /><h1>Confidence Intervals</h1></>} />

            </Routes>
        </Router>
    );
};
