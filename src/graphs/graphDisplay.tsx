import React from 'react';
import { Histogram } from './histogram';
import { EstimatedDistribution } from './estimatedSampleDistribution';
import { CumulativeSampleMean } from './sampleMeanLine';
import { toTitleCase, PRIMARY, SECONDARY, HIGHLIGHT_1, HIGHLIGHT_2, LineProps,
    LineSetProps, StdProps} from '../common';

interface GraphDisplayProps {
    stdProps: StdProps;
    graphTypes: number[];
    lineProps: LineProps;
    lineSetProps: LineSetProps;
}

export const GraphDisplay: React.FC<GraphDisplayProps> = ({
    stdProps: {audioFeature, data1, data2, genre1, genre2, meanData1,
        meanData2},
    graphTypes, lineProps, lineSetProps
}: GraphDisplayProps) => {

    const SAMPLEDATAHISTOGRAM1 = 1;
    const SAMPLEDATAHISTOGRAM2 = 2;
    const SAMPLEDATAHISTOGRAMBOTH = 3;
    const DISTRIBUTIONHISTOGRAM = 4;
    const SAMPLEMEANLINE = 5;
    const ESTIMATED_DISTRIBUTION = 6;
    const N = 100;


    return (
        <div id='graph-display'>
            {(genre1 || genre2) && (
                <div className={'alert statify-alert mx-4'}role={'alert'}>
                    {(genre1 && !genre2) && (
                        `You are sampling from ${toTitleCase(genre1)}`
                    )}
                    {(!genre1 && genre2) && (
                        `You are sampling from ${toTitleCase(genre2)}`
                    )}
                    {(genre1 && genre2) && (
                        `You are sampling from ${toTitleCase(genre1)}
                        and ${toTitleCase(genre2)}`
                    )}
                </div>
            )}
            <div className='row' id='capture'>
                {graphTypes.includes(SAMPLEDATAHISTOGRAM1) && (
                    <Histogram
                        stdProps={{audioFeature, data1, genre1} as StdProps}
                        color={PRIMARY}
                        highlight={HIGHLIGHT_1}
                        n={null}/>
                )}
                {graphTypes.includes(SAMPLEDATAHISTOGRAM2) && (
                    <Histogram
                        stdProps={{audioFeature, data1: data2,
                            genre1: genre2} as StdProps}
                        color={SECONDARY}
                        highlight={HIGHLIGHT_2}
                        n={null}/>
                )}
                {graphTypes.includes(SAMPLEDATAHISTOGRAMBOTH) && (
                    <Histogram
                        stdProps={{audioFeature, data1, data2, genre1,
                            genre2} as StdProps}
                        color={PRIMARY}
                        highlight={HIGHLIGHT_1}
                        n={null}/>
                )}
                {graphTypes.includes(ESTIMATED_DISTRIBUTION) && (
                    <EstimatedDistribution
                        stdProps={{audioFeature, data1, data2, genre1,
                            genre2} as StdProps}
                        n={N} />
                )}
                {graphTypes.includes(SAMPLEMEANLINE) && (
                    <CumulativeSampleMean
                        {...{lineProps, lineSetProps}}
                        stdProps={{audioFeature, data1, data2} as StdProps} />
                )}
                {graphTypes.includes(DISTRIBUTIONHISTOGRAM) && (
                    <Histogram
                        color={PRIMARY}
                        highlight={HIGHLIGHT_1}
                        stdProps={{audioFeature, data1: meanData1,
                            data2: meanData2, genre1, genre2} as StdProps}
                        n={N}/>
                )}
            </div>
        </div>
    );
};