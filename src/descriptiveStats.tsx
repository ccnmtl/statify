import React, { useState } from 'react';
import { TabNav } from './tabNavigation';
import { TabData } from './common';
import { GraphForm } from './graphForm';

const descriptiveTabs: TabData[] = [
    {title: 'Part 1.1', info: 'Etiam sagittis ornare libero, vitae blandit.'}
];

export const DescriptiveStats: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <>
            <section id="top">
                <div className="container-fluid">
                    <h1 className={'py-4 px-3'}>1.Descriptive Statistics</h1>
                    <p className='lead py-4 px-3'>
                        This copy describes what this Descriptive Statistics
                        unit is all about.
                    </p>
                    <TabNav
                        tabsInfo={descriptiveTabs}
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
                            dataPointsField={false}
                            graphTypes={[1]} />
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