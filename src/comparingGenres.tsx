import React, { useEffect, useState } from 'react';
import { TabNav } from './tabNavigation';
import { TabData } from './common';
import { GraphForm } from './graphForm';

const comparingTabs: TabData[] = [
    {title: 'Part 3.1', info: 'Fusce nec mi ac odio finibus tristique.'},
    {title: 'Part 3.2', info: 'Quisque tempus sem at ligula luctus lacinia.'},
    {title: 'Part 3.3', info: 'Ut lacinia blandit orci, eu viverra nulla.'},
    {title: 'Part 3.4', info: 'Sed pulvinar urna orci, id dictum elit hendrer'}
];

export const ComparingGenres: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [graphTypes, setGraphTypes] = useState([2]);

    useEffect(() => {
        if (activeTab === 3) {
            setGraphTypes([2, 3]);
        } else {
            setGraphTypes([2]);
        }
    }, [activeTab]);
    return (
        <>
            <section id="top">
                <div className="container-fluid">
                    <h1 className={'py-4 px-3'}>Comparing Genres</h1>
                    <p className='lead py-4 px-3'>
                        This copy describes what this Comparing Genres
                        unit is all about.
                    </p>
                    <TabNav
                        tabsInfo={comparingTabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab} />
                </div>
            </section>
            <section id="graph" className="mt-4">
                <div className="container-fluid">
                    <div className="row">
                        <GraphForm
                            genre1Field={true}
                            genre2Field={true}
                            audioFeatureField={true}
                            dataPointsField={true}
                            graphTypes={graphTypes} />
                        <div className='mt-4'>
                            <h2>Questions</h2>
                            <p>
                            Q/A here
                            </p>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
};