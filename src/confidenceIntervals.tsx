import React, { useState } from 'react';
import { TabNav } from './tabNavigation';
import { TabData } from './common';
import { GraphForm } from './graphForm';

const confidenceTabs: TabData[] = [
    {title: 'Part 4', info: 'Nunc eget laoreet orci, convallis maximus purus.'}
];

export const ConfidenceIntervals: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <>
            <section id="top">
                <div className="container-fluid">
                    <h1 className={'py-4 px-3'}>Confidence Intervals</h1>
                    <TabNav
                        tabsInfo={confidenceTabs}
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
                            dataPointsField={false} />

                        <p>
                            Q/A here
                        </p>
                    </div>
                </div>

            </section>
        </>
    );
};