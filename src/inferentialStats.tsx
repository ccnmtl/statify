import React, { useState, useEffect } from 'react';
import { TabNav } from './tabNavigation';
import { TabData } from './common';
import { GraphForm } from './graphForm';
import { Assignment } from './assignments/assignment';

const inferentialTabs: TabData[] = [
    {title: 'Part 2.1', info:
    'Now lets add a plot to help us track variability in the sample mean ' +
    'across separate samples. The line plot shows the number of data points' +
    ' drawn on the X axis and the sample mean on the Y axis. The histogram '
    + 'still shows the distribution of data points for an individual sample. '
    + 'Click the "draw data point” button a few dozen times. What happens?'},

    {title: 'Part 2.2', info:
    'The line plot will store sample means from ' +
    'multiple samples. Increase the # of data points to draw, then keep ' +
    'clicking the “Draw data point” button until you have drawn more than ' +
    '100 data points. What happens on the line plot?'},

    {title: 'Part 2.3', info:
    'One more piece of complexity! The histogram at the bottom now shows' +
    ' the distribution of sample means (for samples containing 100 data ' +
    'points). Increase the number of data points drawn to 25 and press the ' +
    '“draw data point” button a bunch of times. What happens on the bottom ' +
    'histogram?'}
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

export const InferentialStats: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [graphTypes, setGraphTypes] = useState([1, 2]);

    useEffect(() => {
        if (activeTab === 2) {
            setGraphTypes([1, 2, 3]);
        } else {
            setGraphTypes([1, 2]);
        }
    }, [activeTab]);

    return (
        <>
            <section id={'top'}>
                <div className={'container-fluid'}>
                    <h1 className={'py-4 px-3'}>
                        2.Inferential Stats
                    </h1>
                    <p className='lead py-4 px-3'>
                        This copy describes what this Inferential Statistics
                        unit is all about.
                    </p>
                    <TabNav
                        tabsInfo={inferentialTabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab} />
                </div>
            </section>
            <section id={'graph'} className={'mt-4'}>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <GraphForm
                            genre1Field={true}
                            genre2Field={false}
                            audioFeatureField={false}
                            dataPointsField={true}
                            graphTypes={graphTypes} />
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