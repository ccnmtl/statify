import React, { useState } from 'react';
import { TabNav } from './tabNavigation';
import { TabData } from './common';

const comparingTabs: TabData[] = [
    {title: 'Part 3.1', info: 'Fusce nec mi ac odio finibus tristique.'},
    {title: 'Part 3.2', info: 'Quisque tempus sem at ligula luctus lacinia.'},
    {title: 'Part 3.3', info: 'Ut lacinia blandit orci, eu viverra nulla.'},
    {title: 'Part 3.4', info: 'Sed pulvinar urna orci, id dictum elit hendrer'}
];

export const ComparingGenres: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <>
            <section id="top">
                <div className="container-fluid">
                    <h1 className={'py-4 px-3'}>Comparing Genres</h1>
                    <TabNav
                        tabsInfo={comparingTabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab} />
                </div>
            </section>
        </>
    );
};