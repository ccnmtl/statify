import React, { useState } from 'react';
import { TabNav } from './tabNavigation';
import { TabData } from './common';

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
        </>
    );
};