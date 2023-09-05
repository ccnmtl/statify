import React, { useState } from 'react';
import { TabNav } from './tabNavigation';
import { InstructionData, TabData } from './common';
import { GraphForm } from './graphForm';
import { Assignment } from './assignments/assignment';

const descriptiveTabs: TabData[] = [
    {
        title: 'Part 1.1',
        info: 'Etiam sagittis ornare libero, vitae blandit.'
    }
];

const questions: string[] = [
    'What does the x-axis of the histogram represent? What does the y-axis '+
        'represent?',
    'Select any two Beats Per Minute (BPM) values on the x-axis. How many '+
        'data points have BPM values within that range?',
    'The mean is the average value of a distribution of data points, and the '+
        'standard deviation is a measure of how dispersed the data is in '+
        'relation to the mean. Estimate the mean and standard deviation of '+
        'your sample.',
    'A new histogram is produced after every 100 data points. Draw additional '+
        'data points to get you to 100 and take a screenshot of your '+
        'histogram. Then draw another 100 data points, and paste a screenshot '+
        'of the new histogram below. Is it identical to the first one? Why or '+
        'why not?',
    'Comparing the two histograms from question 4, do you have any way of '+
        'knowing which one best represents the distribution of all BPMs in '+
        'your genre? Why or why not?',
    'How could you improve your estimate of the average tempo for your genre?'
];

const instructions: InstructionData[] = [
    {
        instruction: 'Start by drawing 80 data points on the graph to start '+
            'answering the following questions.'
    },
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
                            defaultPoints={1}
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