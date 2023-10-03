import React, { useState, useEffect } from 'react';
import { TabNav } from '../tabNavigation';
import { TabData, InstructionData, Store, GraphProps } from '../common';
import { GraphForm } from '../graphs/graphForm';
import { Assignment } from '../assignments/assignment';
import { KeyTermModal } from '../keyTermModal';
import { ObjectiveModal } from '../objectiveModal';

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
    'What do the x and y axes of the Cumulative Sample Mean plot represent?',
    'What information does the Cumulative Sample Mean plot provide that the '+
        'Sample Data histogram does not?',
    'What happens to the distribution of the sample means as more data'+
        'points are added to each sample? Why does this happen?',
    'Continue drawing data points until you have collected 12 samples (100 '+
        'data points each). What statistical parameters could you use to '+
        'describe the shape of the sampling distribution shown in the bottom '+
        'plot?',
    'Compare and contrast the distribution of data points (top histogram) to'+
        ' the distribution of sample means (bottom histogram).',
    'How would the bottom histogram look different if it showed the sample'+
        ' means for samples with 20 data points instead of 100? What if it '+
        'showed the sample means for samples with 3 data points?'
];

const keyTerms = [
    ['Sampling Distribution', 'Observed distribution of the values that a ' +
        'variable is observed to have for one particular sample.'],
    ['Sampling distribution (of the mean)', 'Probability distribution of the ' +
        'mean derived from all (or at least a large number of) possible ' +
        'samples having the same size from the population.']
];

const objectives = [
    'Students will be able to describe what a sampling distribution ' +
        'represents and why it is useful in making statistical ' +
        'inferences.',
    'Students will be able to differentiate between the standard deviation ' +
        'and the standard error, as well as draw a relationship between them ' +
        '(i.e., the standard error is the standard deviation of a sampling ' +
        'distribution.',
    'Students will be able to describe the effect of changing the sample ' +
        'size on the standard error.'
];

export const InferentialStats: React.FC<GraphProps> = ({store, setStore}) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [graphTypes, setGraphTypes] = useState([1, 5]);

    useEffect(() => {
        if (activeTab === 2) {
            setGraphTypes([1, 5, 4]);
        } else {
            setGraphTypes([1, 5]);
        }
    }, [activeTab]);

    useEffect(() => {
        setStore({} as Store);
    }, []);

    return (
        <>
            <section className={'statify-section'}>
                <div className={'container-fluid'}>
                    <h1 className={'py-4 px-3'}>
                        2.Inferential Statistics
                    </h1>
                    <p className='lead py-4 px-3'>
                        Inferential statistics involves making population
                        inferences based on sample data. The simulations in
                        this unit will help you to better understand sampling
                        distribution, standard deviation, and standard error.
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
                            defaultPoints={0}
                            graphTypes={graphTypes}
                            instructions={instructions}
                            activeTab={activeTab}
                            store={store}
                            setStore={null} />
                    </div>
                    <div className='row'>
                        <Assignment
                            questions={questions}
                            module={'InferentialStatistics'}
                            seed={store.seed}
                        />
                    </div>
                </div>
            </section>
            <KeyTermModal definitions={keyTerms} />
            <ObjectiveModal objectives={objectives} />
        </>
    );
};