import React, { useState } from 'react';
import { TabNav } from './tabNavigation';
import { TabData } from './common';

const descriptiveTabs: TabData[] = [
    {title: 'Part 1', info: 'Etiam sagittis ornare libero, vitae blandit.'}
];

export const DescriptiveStats: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <>
            <section id="top">
                <div className="container-fluid">
                    <h1 className={'py-4 px-3'}>Descriptive Stats</h1>
                    <TabNav
                        tabsInfo={descriptiveTabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab} />
                </div>
            </section>
        </>
    );
};