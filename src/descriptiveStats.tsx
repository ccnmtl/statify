import React, { useState } from 'react';
import { TabNav } from './tabNavigation';
import { InstructionData, TabData } from './common';
import { GraphForm } from './graphForm';
import { Assignment } from './assignments/assignment';

const descriptiveTabs: TabData[] = [
    {title: 'Part 1.1', info: 'Etiam sagittis ornare libero, vitae blandit.'}
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

export const DescriptiveStats: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <>
            <section className={'statify-section'}>
                <div className={'container-fluid'}>
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
            <section className={'mt-4 graph'}>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <GraphForm
                            genre1Field={true}
                            genre2Field={false}
                            audioFeatureField={false}
                            dataPointsField={false}
                            seedField={true}
                            graphTypes={[1]}
                            instructions={instructions}
                            activeTab={activeTab} />
                    </div>
                    <div className='row'>
                        <Assignment
                            questions={questions}
                            module={'DescriptiveStatistics'}
                        />
                    </div>
                </div>

            </section>
        </>
    );
};