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
    {instruction: 'Answer these questions after completing Part 3.4 of the'+
        'simulations.'
    },
    {instruction: 'Answer these questions after completing Part 3.4 of the'+
        'simulations.'
    },
    {instruction: 'Answer these questions after completing Part 3.4 of the'+
        'simulations.'
    },
    {instruction: 'Answer these questions after completing Part 3.4 of the'+
        'simulations.'
    },
];

export const ComparingGenres: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [graphTypes, setGraphTypes] = useState([5]);

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
                            seedField={true}
                            defaultPoints={1}
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