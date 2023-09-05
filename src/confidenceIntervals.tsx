import React, { useState } from 'react';
import { TabNav } from './tabNavigation';
import { InstructionData, TabData } from './common';
import { GraphForm } from './graphForm';
import { Assignment } from './assignments/assignment';

const confidenceTabs: TabData[] = [
    {title: 'Part 4.1',
        info: 'Nunc eget laoreet orci, convallis maximus purus.'}
];

const questions: string[] = [
    'We have previously determined that we cannot definitely say whether one\
        particular sample is representative of the entire population just by\
        looking at its data distribution. Instead, it is preferable to look at\
        a distribution of sample means, which we defined as a sampling\
        distribution. Consider an experiment in which you are comparing your\
        two genres based only on the two samples that you generated in the\
        simulation. Do you have access to a sampling distribution in this\
        case?',
    'Unfortunately, most of the time scientists are dealing with a single\
        sample rather than a sampling distribution. Identify ONE instance in\
        which you may not have access to a sampling distribution of the data of\
        interest in a scientific study related to what you learned so far in\
        the Mind and Brain unit.',
    'For each of the two genres that you are comparing, estimate the standard\
        deviation for each sample, then use the formula above to estimate the\
        standard error for the measurement of your chosen audio feature.',
    'The ‘Estimated Sampling distribution when N=100’ plot shows the 95%\
        confidence intervals for each genre (regions in yellow and blue). How\
        can you use the information shown in each ‘Sample Data’ plot, and your\
        estimates for the standard errors of their respective populations in\
        Question 7, to obtain the 95% confidence intervals and this plot?',
    'We can use the 95% confidence interval to determine whether the difference\
        between the two genres is <strong><em>statistically significant</em>\
        </strong>. Compare the estimated sampling distributions that you\
        generated; are they statistically significantly different? Explain how\
        you reached this conclusion.',
    'Another way we can determine statistical significance is by using\
        p-values. In this case, the p-value tells you the probability of seeing\
        data like yours if there was no true difference between the genres.\
        Typically, a p-value less than 0.05 is considered statistically\
        significant. For the sampling distribution that you generated, is the\
        conclusion you would draw from the p-value the same or different from\
        the conclusion based on the 95% confidence intervals?',
    'What do you think would happen to the p-value if the amount of overlap\
        between the two estimated sampling distributions increased?'
];

const instructions: InstructionData[] = [
    {instruction: 'Previously, you learned that the standard deviation of a\
        sampling distribution is called the standard error. However, for each\
        of the two histograms shown on this page, you are not looking at a\
        sampling distribution, but at the distribution of the 100 data points\
        in a single sample. Therefore, the standard error is not equal to the\
        standard deviation (unless your population size is equal to 100!). When\
        we only have access to a small portion of the population (as is the\
        case here!), the standard error, and therefore the sampling\
        distribution, can be estimated by dividing the standard deviation of\
        the sample by the square root of the sample size, i.e., SE = SD/√N.'
    }
];

export const ConfidenceIntervals: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <>
            <section className={'statify-section'}>
                <div className={'container-fluid'}>
                    <h1 className={'py-4 px-3'}>4.Confidence Intervals</h1>
                    <p className='lead py-4 px-3'>
                        This copy describes what this Confidence Intervals
                        unit is all about.
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
                            activeTab={activeTab} />
                    </div>
                    <div className='row'>
                        <Assignment
                            questions={questions}
                            module={'ConfidenceIntervals'}
                        />
                    </div>
                </div>

            </section>
        </>
    );
};