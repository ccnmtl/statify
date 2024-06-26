import React, { useEffect, useState } from 'react';
import { TabNav } from '../tabNavigation';
import { AUDIO_DEFAULT, FieldProps,
    GraphProps, GraphRange, InstructionData, LineProps,
    LineSetProps, SetStdProps, StdProps, Store, TabData,
    createSeedString
} from '../common';
import { GraphForm } from '../graphs/graphForm';
import { Assignment } from '../assignments/assignment';
import { KeyTermModal } from '../keyTermModal';
import { ObjectiveModal } from '../objectiveModal';
import { GraphDisplay } from '../graphs/graphDisplay';
import seedrandom from 'seedrandom';

const descriptiveTabs: TabData[] = [
    {
        title: 'Part 1.1',
        info: 'The purpose of Part 1.1 is to introduce students to the '+
            'following fundamental concepts: data point, sample, population, '+
            'histogram. Students click the “Draw data point” button to '+
            'generate a sample. The “Sample Data” histogram shows the '+
            'distribution of data points within the sample.'
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

const keyTerms = [
    ['Data point', 'A discrete unit of information derived from a ' +
        'measurement. It could be a number or a word for example, but it has ' +
        'to be distinguishable from other data points.'],
    ['Sample', 'A collection of measurements or observations. A sample can ' +
        'have one or more data points and is a subset of the population.'],
    ['Population', 'The full set of data points that is of interest for some ' +
        'question or experiment.']
];

const objectives = [
    'Students will learn to describe a dataset using standard terminology ' +
        '(e.g., mean, standard deviation).',
    'Students will be able to identify the limitations of what can be ' +
        'inferred from a single sample.'
];

export const DescriptiveStats: React.FC<GraphProps> = ({
    genres, setStore
}) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [data1, setData1] = useState<number[]>([]);
    const [genre1, setGenre1] = useState<string>();
    const [prng, setPRNG] = useState<seedrandom.PRNG>(
        () => seedrandom());
    const [seed, setSeed] = useState<string>(createSeedString());

    useEffect(() => {
        setStore({seed: createSeedString()} as Store);
    }, []);

    return (
        <>
            <section className={'statify-section'}>
                <div className={'container-fluid'}>
                    <h1 className={'py-4 px-3'}>
                        1.Descriptive Statistics
                    </h1>
                    <p className='lead py-4 px-3'>
                        Descriptive statistics involves describing datasets
                        using standard terminology and identifying the
                        limitations of what can be inferred from a single
                        sample. The simulations in this unit will introduce you
                        to the cumulative sample mean and the sampling
                        distribution to make such descriptions and
                        identifications.
                    </p>
                    <TabNav
                        tabsInfo={descriptiveTabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab} />
                </div>
            </section>
            <section className={'mt-4 graph'}>
                <div className={'container-fluid'}>
                    <div className={'d-flex flex-row-reverse'}>
                        <GraphForm
                            {...{activeTab, instructions}}
                            fieldProps={{genre1Field: true,
                                seedField: true} as FieldProps}
                            graphProps={{
                                genres, store: {} as Store} as GraphProps}
                            lineProps={{} as LineProps}
                            lineSetProps={{} as LineSetProps}
                            setStdProps={{setData1,
                                setGenre1, setPRNG, setSeed} as SetStdProps}
                            stdProps={{audioFeature: AUDIO_DEFAULT, data1,
                                dataPoints: 1, genre1, prng,
                                seed} as StdProps}
                            graphRange={{} as GraphRange} />
                        <div className="col-md-9">
                            <GraphDisplay
                                stdProps= {{ audioFeature: AUDIO_DEFAULT,
                                    data1, genre1} as StdProps}
                                graphTypes={[1]}
                                lineProps={{} as LineProps}
                                lineSetProps={{} as LineSetProps}
                                graphRange={{} as GraphRange} />
                            <Assignment
                                {...{questions, seed}}
                                module={'DescriptiveStatistics'}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <KeyTermModal definitions={keyTerms} />
            <ObjectiveModal objectives={objectives} />
        </>
    );
};