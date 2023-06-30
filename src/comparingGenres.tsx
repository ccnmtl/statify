import React, { useEffect, useState } from 'react';
import { TabNav } from './tabNavigation';
import { TabData, InstructionData } from './common';
import { GraphForm } from './graphForm';
import { Assignment } from './assignments/assignment';

const comparingTabs: TabData[] = [
    {title: 'Part 3.1', info: 'Fusce nec mi ac odio finibus tristique.'},
    {title: 'Part 3.2', info: 'Quisque tempus sem at ligula luctus lacinia.'},
    {title: 'Part 3.3', info: 'Ut lacinia blandit orci, eu viverra nulla.'},
    {title: 'Part 3.4', info: 'Sed pulvinar urna orci, id dictum elit hendrer'}
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

export const ComparingGenres: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [graphTypes, setGraphTypes] = useState([2]);

    useEffect(() => {
        if (activeTab === 3) {
            setGraphTypes([2, 3]);
        } else {
            setGraphTypes([2]);
        }
    }, [activeTab]);
    return (
        <>
            <section className={'statify-section'}>
                <div className={'container-fluid'}>
                    <h1 className={'py-4 px-3'}>3.Comparing Genres</h1>
                    <p className={'lead py-4 px-3'}>
                        This copy describes what this Comparing Genres
                        unit is all about.
                    </p>
                    <TabNav
                        tabsInfo={comparingTabs}
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
                            dataPointsField={true}
                            graphTypes={graphTypes}
                            instructions={instructions}
                            activeTab={activeTab} />
                    </div>
                    <div className='row'>
                        <Assignment
                            questions={questions}
                            module={'ComparingGenres'}
                        />
                    </div>
                </div>

            </section>
        </>
    );
};