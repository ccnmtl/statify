import React, { useState, useEffect } from 'react';
import { TabNav } from './tabNavigation';
import { TabData } from './common';
import { GraphForm } from './graphForm';

const inferentialTabs: TabData[] = [
    {title: 'Part 2.1', info: 'Lorem ipsum dolor sit amet, consectetur'},
    {title: 'Part 2.2', info: 'Donec dictum, elit ac cursus pharetra,'},
    {title: 'Part 2.3', info: 'Proin quam velit, vulputate id ullamcorper'}
];

export const InferentialStats: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [graphTypes, setGraphTypes] = useState([1, 2]);

    useEffect(() => {
        if (activeTab === 2) {
            setGraphTypes([1, 2, 3]);
        } else {
            setGraphTypes([1, 2]);
        }
    }, [activeTab]);

    return (
        <>
            <section id="top">
                <div className="container-fluid">
                    <h1 className={'py-4 px-3'}>2.Inferential Stats</h1>
                    <p className='lead py-4 px-3'>
                        This copy describes what this Inferential Statistics
                        unit is all about.
                    </p>
                    <TabNav
                        tabsInfo={inferentialTabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab} />
                </div>
            </section>
            <section id="graph" className="mt-4">
                <div className="container-fluid">
                    <div className="row">
                        <GraphForm
                            genre1Field={true}
                            genre2Field={false}
                            audioFeatureField={false}
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