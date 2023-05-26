import React, { useState } from 'react';
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

    return (
        <>
            <section id="top">
                <div className="container-fluid">
                    <h1 className={'py-4 px-3'}>Inferential Stats</h1>
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
                            dataPointsField={true} />

                        <p>
                            Q/A here
                        </p>
                    </div>
                </div>

            </section>
        </>
    );
};