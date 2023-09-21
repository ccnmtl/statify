import React, { useEffect, useState } from 'react';
import { TabNav } from './tabNavigation';
import { TabData, InstructionData, GraphProps } from './common';
import { GraphForm } from './graphForm';
import { Assignment } from './assignments/assignment';
import { KeyTermModal } from './keyTermModal';

const comparingTabs: TabData[] = [
    {   title: 'Part 3.1',
        info: 'The purpose of 3.1 is to start introducing you to the idea of '+
            'comparing two different samples in a statistically rigorous way. '+
            'By observing how the cumulative sample means for the two genres '+
            'change as more data points are drawn, you will be able to '+
            'observe that it isn’t definitive that two genres are different '+
            'for a given audio feature based on a single data point, as the '+
            'sample means can vary drastically with the number of data points '+
            'added. Additionally, you will see that the cumulative sample '+
            'means converge to a certain value as more data points are added, '+
            'and the difference between the genres becomes more robust (each '+
            'sample becomes more representative of the population).'},
    {   title: 'Part 3.2',
        info: 'In Part 3.2 you will play with different genres and audio '+
            'features, checking how their previous expectations compare to '+
            'the data sampled.'},
    {   title: 'Part 3.3',
        info: 'In Part 3.3 you will continue to play with different genres '+
            'and audio features, checking how their previous expectations '+
            'compare to the data sampled.'},
    {   title: 'Part 3.4',
        info: 'In Part 3.4 you will compare sampling distributions for two '+
            'genres and think about how to use the comparison to tell whether '+
            'those genres are indeed different. How much overlap is '+
            'acceptable for two sampling distributions to still be considered '+
            'different will be defined in the last module.'}
];

const questions: string[] = [
    'Draw 100 data points. What is the mean tempo for each genre when N = 100?'+
        '(make sure that you are comparing them by Audio Feature = tempo)'+
        'Which genre has a higher tempo? Note: If you mouse over a point on'+
        'the Cumulative Sample Mean graph you will be provided the sample mean'+
        'for a given number of data points.',
    'Based on this data, can you say definitively whether the genres have'+
        'different tempos? Why or why not?',
    'Continue drawing data points. Looking at the Cumulative Sample Mean plot,'+
        'how does the overlap between the sampling distributions change as the'+
        'number of data points in each sample increases? Why?',
    'Select any two genres from the dropdown menus on the left. Draw 1200 data'+
        'points for any two of the nine available audio parameters.'+
        'Intuitively, you can say that two populations can be said to be'+
        'different if their sampling distributions have minimal overlap. Based'+
        'on the distribution of sample means for the two audio features that'+
        'you are analyzing, do you think the two genres that you selected are'+
        'different? Why or why not? Do you think the genres could be'+
        'differentiated based on other features?'
];

const instructions: InstructionData[] = [
    {instruction: 'Select two genres and a feature you wish to compare the '+
        'genres by, and then press the “Submit” button a few times.'
    },
    {instruction: 'Select two genres and a feature you wish to compare the '+
        'genres by, and then press the “Submit” button a few times.'
    },
    {instruction: 'Select two genres and a feature you wish to compare the '+
        'genres by, and then press the “Submit” button a few times.'
    },
    {instruction: 'Draw several samples, building a histogram of samples of '+
        'means (sampling distribution – bottom plot). Check whether the '+
        'sampling distributions for the two genres overlap (suggesting there '+
        'may not be a difference between them) or not.'
    },
];

const keyTerms = [
    ['', 'There are no key terms for the Comparing Genres exercises.']
];

export const ComparingGenres: React.FC<GraphProps> = ({store, setStore}) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [graphTypes, setGraphTypes] = useState([5]);
    const [initialSeed, setInitialSeed] = useState('');

    useEffect(() => {
        setInitialSeed([...Array(8) as null[]].map(
            // Pulled from https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript
            () => Math.floor(Math.random() * 16).toString(16)).join(''));
    }, []);

    useEffect(() => {
        if (activeTab === 3) {
            setGraphTypes([5, 4]);
        } else {
            setGraphTypes([5]);
        }
    }, [activeTab]);
    return (
        <>
            <section className={'statify-section'}>
                <div className={'container-fluid'}>
                    <h1 className={'py-4 px-3'}>3.Comparing Genres</h1>
                    <p className={'lead py-4 px-3'}>
                        This Comparing Genres simulation will help you explore
                        the fundamental logic of hypothesis tests. The
                        simulation will have you compare data from audio
                        features between two chosen genres.
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
                            seedField={true}
                            defaultPoints={0}
                            graphTypes={graphTypes}
                            instructions={instructions}
                            activeTab={activeTab}
                            store={store}
                            setStore={setStore}
                            initialSeed={initialSeed} />
                    </div>
                    <div className='row'>
                        <Assignment
                            questions={questions}
                            module={'ComparingGenres'}
                            initialSeed={initialSeed}
                        />
                    </div>
                </div>

            </section>
            <KeyTermModal definitions={keyTerms} />
        </>
    );
};