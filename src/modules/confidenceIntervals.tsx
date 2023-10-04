import React, { useState, useEffect } from 'react';
import { TabNav } from '../tabNavigation';
import { GraphProps, InstructionData, TabData } from '../common';
import { GraphForm } from '../graphs/graphForm';
import { Assignment } from '../assignments/assignment';
import { KeyTermModal } from '../keyTermModal';
import { ObjectiveModal } from '../objectiveModal';

const confidenceTabs: TabData[] = [
    {title: 'Part 4.1',
        info: 'You will draw a sample and use the plots in this tab to '+
            'learn about estimating sampling distributions from smaller '+
            'samples and using 95% confidence intervals to determine '+
            'statistically significant differences (or lack thereof).'}
];

const questions: string[] = [
    'We have previously determined that we cannot definitely say whether one '+
        'particular sample is representative of the entire population just by '+
        'looking at its data distribution. Instead, it is preferable to look '+
        'at a distribution of sample means, which we defined as a sampling '+
        'distribution. Consider an experiment in which you are comparing your '+
        'two genres based only on the two samples that you generated in the '+
        'simulation. Do you have access to a sampling distribution in this '+
        'case?',
    'Unfortunately, most of the time scientists are dealing with a single '+
        'sample rather than a sampling distribution. Identify ONE instance in '+
        'which you may not have access to a sampling distribution of the data '+
        'of interest in a scientific study related to what you learned so far '+
        'in the Mind and Brain unit.',
    'For each of the two genres that you are comparing, estimate the standard '+
        'deviation for each sample, then use the formula above to estimate '+
        'the standard error for the measurement of your chosen audio feature.',
    'The ‘Estimated Sampling distribution when N=100’ plot shows the 95% '+
        'confidence intervals for each genre (regions in yellow and blue). '+
        'How can you use the information shown in each ‘Sample Data’ plot, '+
        'and your estimates for the standard errors of their respective '+
        'populations in Question 7, to obtain the 95% confidence intervals '+
        'and this plot?',
    'We can use the 95% confidence interval to determine whether the '+
        'difference between the two genres is statistically significant. '+
        'Compare the estimated sampling distributions that you generated; are '+
        'they statistically significantly different? Explain how you reached '+
        'this conclusion.',
    'Another way we can determine statistical significance is by using '+
        'p-values. In this case, the p-value tells you the probability of '+
        'seeing data like yours if there was no true difference between the '+
        'genres. Typically, a p-value less than 0.05 is considered '+
        'statistically significant. For the sampling distribution that you '+
        'generated, is the conclusion you would draw from the p-value the '+
        'same or different from the conclusion based on the 95% confidence '+
        'intervals?',
    'What do you think would happen to the p-value if the amount of overlap '+
        'between the two estimated sampling distributions increased?'
];

const instructions: InstructionData[] = [
    {instruction: 'Select two genres and a feature you wish to compare the '+
        'genres by, and then press the “Submit” button a few times.'
    }
];

const keyTerm = [
    ['Estimated Sampling Distribution', 'probability distribution that ' +
        'approximates the sampling distribution (of the mean), but is based ' +
        'only on a single sample. A sample mean is used to estimate the true ' +
        'mean of the population, while the formula SE=SD/√N is used to ' +
        'approximate the standard error of the sampling distribution.']
];

const objectives = [
    'Students will understand the distinction between a true sampling '+
        'distribution and the estimated sampling distribution.',
    'Students will be able to describe the 95% confidence interval '+
        'rule-of-thumb as an extension of the underlying logic of hypothesis '+
        'tests.'
];

export const ConfidenceIntervals: React.FC<GraphProps> = (
    {store, setStore, genres}
) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [initialSeed, setInitialSeed] = useState('');

    useEffect(() => {
        setInitialSeed([...Array(8) as null[]].map(
            // Pulled from https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript
            () => Math.floor(Math.random() * 16).toString(16)).join(''));
    }, []);

    return (
        <>
            <section className={'statify-section'}>
                <div className={'container-fluid'}>
                    <h1 className={'py-4 px-3'}>4.Confidence Intervals</h1>
                    <p className='lead py-4 px-3'>
                        The Confidence Interval is a range of values that is
                        likely to contain the true population parameter,
                        calculated from sample statistics and a desired
                        confidence level. This simulation will help you
                        understand that confidence intervals represent the
                        variability inherent in estimates from sample data
                        rather than the exact population parameter value.
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
                            activeTab={activeTab}
                            store={store}
                            setStore={setStore}
                            initialSeed={initialSeed}
                            genres={genres} />
                    </div>
                    <div className='row'>
                        <Assignment
                            questions={questions}
                            module={'ConfidenceIntervals'}
                            initialSeed={initialSeed}
                        />
                    </div>
                </div>
            </section>
            <KeyTermModal definitions={keyTerm} />
            <ObjectiveModal objectives={objectives} />
        </>
    );
};