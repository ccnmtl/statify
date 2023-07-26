import React, { useState, useEffect } from 'react';
import { TabNav } from './tabNavigation';
import { TabData, InstructionData } from './common';
import { GraphForm } from './graphForm';
import { Assignment } from './assignments/assignment';

const inferentialTabs: TabData[] = [
    {title: 'Part 2.1', info:
    'The purpose of the simulation in Part 2.1 is to introduce you to the “Cu'
    + 'mulative Sample Mean” plot. The plot will help you to track variability'
    + ' in the sample mean across separate samples. The line plot shows the ' +
    'number of data points drawn on the X axis and the sample mean on the Y' +
    ' axis.'},

    {title: 'Part 2.2', info:
    'The purpose of the simulation in Part 2.2 is for you to use the ' +
    '“Cumulative Sample Mean” plot to investigate the relationship between ' +
    'sample size and the dispersion of sample means. The line plot will store '
    + 'sample means from multiple samples.'},

    {title: 'Part 2.3', info:
    'The purpose of the simulation in Part 2.3 is to introduce you to a ' +
    'sampling distribution and to highlight 1) that the dispersion of a ' +
    'sampling distribution is smaller than that for the sample distribution,' +
    ' and 2) that the sampling distribution is at least normal-ish compared to '
    + 'the sample distribution when the sample size is sufficiently large. A ' +
    'third graph, a histogram, now shows the distribution of sample means (for '
    + 'samples containing 100 data points)'}
];

const instructions: InstructionData[] = [
    {instruction:
    'Click the “Draw data point” button to generate a sample that is added to '
    + 'the graph. The “Sample Data” histogram shows the distribution of data ' +
    'points within the sample, while the “Cumulative Sample Mean” line plot ' +
    'shows the average value in the sample as more samples are added. For this'
    + ' part start with adding and drawing just 1 sample point at a time.'},
    {instruction:
    'Click the “Draw data point” to draw 100 data points at a time. The ' +
    'cumulative sample mean plot shows how the mean changes within each sample'
    + ' as more data points are added. By comparing results for separate ' +
    'samples students can see how the dispersion of sample means decreases as '
    + 'the number of data points in a sample increases. '},
    {instruction:
    'Increase the number of data points drawn to 25 and click the “draw data ' +
    'point” button a repetitively many times to see the distribution forming. '}
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
    const [graphTypes, setGraphTypes] = useState([1, 5]);

    useEffect(() => {
        if (activeTab === 2) {
            setGraphTypes([1, 5, 4]);
        } else {
            setGraphTypes([1, 5]);
        }
    }, [activeTab]);

    return (
        <>
            <section className={'statify-section'}>
                <div className={'container-fluid'}>
                    <h1 className={'py-4 px-3'}>
                        2.Inferential Statistics
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
            <section className={'mt-4 graph'}>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <GraphForm
                            genre1Field={true}
                            genre2Field={false}
                            audioFeatureField={false}
                            dataPointsField={true}
                            seedField={true}
                            defaultPoints={1}
                            graphTypes={graphTypes}
                            instructions={instructions}
                            activeTab={activeTab} />
                    </div>
                    <div className='row'>
                        <Assignment
                            questions={questions}
                            module={'InferentialStatistics'}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};