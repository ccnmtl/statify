import React, { useState } from 'react';
import { TabNav } from './tabNavigation';
import { InstructionData, TabData } from './common';
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

const instructions: InstructionData[] = [
    {instruction:
    'Etiam sagittis ornare libero, vitae blandit orci sodales nec. Quisque tem'
    + 'pus sem at ligula luctus lacinia. Aenean nec elementum nisl, sit amet v'
    },
    {instruction:
    'olutpat mi. Sed quis purus nec sapien aliquam tristique. Sed' +
    'vitae lorem quis elit scelerisque sodales. Nulla ante libero, t'
    },
    {instruction:
    'empus sit amet eros nec, convallis suscipit augue. Nam tempus'
    + 'rutrum cursus. Ut lacinia blandit orci, eu viverra nulla. Sed '
    }
];

export const ConfidenceIntervals: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <>
            <section className={'statify-section'}>
                <div className={'container-fluid'}>
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
            <section className={'mt-4 graph'}>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <GraphForm
                            genre1Field={true}
                            genre2Field={true}
                            audioFeatureField={true}
                            dataPointsField={false}
                            seedField={true}
                            defaultPoints={100}
                            graphTypes={[1, 2, 6]}
                            instructions={instructions}
                            activeTab={activeTab} />
                    </div>
                    <div className='row'>
                        <Assignment
                            questions={questions}
                            module={'ConfidenceIntervals'}
                        />
                    </div>
                </div>

            </section>
        </>
    );
};