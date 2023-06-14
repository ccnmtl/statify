import React, { useState } from 'react';
import { TabNav } from './tabNavigation';
import { TabData } from './common';
import { GraphForm } from './graphForm';
import { Assignment } from './assignments/assignment';

const confidenceTabs: TabData[] = [
    {title: 'Part 4.1',
        info: 'Nunc eget laoreet orci, convallis maximus purus.'}
];

const questions: string[] = [
    'Etiam sagittis ornare libero, vitae blandit orci sodales nec. Quisque tem'
    + 'pus sem at ligula luctus lacinia. Aenean nec elementum nisl, sit amet v'
    + 'olutpat mi. Sed quis purus nec sapien aliquam tristique. Sed',
    'vitae lorem quis elit scelerisque sodales. Nulla ante libero, t'
    + 'empus sit amet eros nec, convallis suscipit augue. Nam tempus'
    + 'rutrum cursus. Ut lacinia blandit orci, eu viverra nulla. Sed '
    + 'pulvinar urna orci, id dictum elit hendrerit a.'
];

export const ConfidenceIntervals: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <>
            <section id="top">
                <div className="container-fluid">
                    <h1 className={'py-4 px-3'}>4.Confidence Intervals</h1>
                    <p className='lead py-4 px-3'>
                        This copy describes what this Confidence Intervals
                        unit is all about.
                    </p>
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
                            dataPointsField={false}
                            graphTypes={[1, 3, 4]} />
                    </div>
                    <div className='row'>
                        <Assignment
                            questions={questions}
                        />
                    </div>
                </div>

            </section>
        </>
    );
};