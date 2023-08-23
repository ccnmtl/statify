import React, { useRef, useEffect, useState } from 'react';
import { scaleLinear } from 'd3-scale';
import { select, Selection } from 'd3-selection';
import {
    area, axisBottom, axisLeft, deviation, mean, line, curveNatural, ScaleLinear
} from 'd3';
import {
    BinData, graphBins, toTitleCase, PRIMARY, SECONDARY, GRAPH_BG
} from '../common';


const FONT_SIZE = 14;
const MARGIN = 30;
const Y_LABEL = 12;
const GAUSSIAN = 1 / Math.sqrt(2 * Math.PI);
const Z_97_5 = 1.96; // 97.5th percentile, use negative for 2.5th percentile
// The Z-table is a list of known constants and can be found at:
// https://www.statology.org/z-table/

interface EstimatedDistributionProps {
    data1: number[];
    data2: number[];
    genre1: string;
    genre2: string;
    audioFeature: string;
    n: number;
}

export const EstimatedDistribution: React.FC<EstimatedDistributionProps>  = (
    {data1, data2, genre1, genre2, audioFeature='tempo', n}
) => {
    const svgRef = useRef(null);

    const [selection, setSelection] = useState<null | Selection<
        null,
        unknown,
        null,
        undefined
    >>(null);

    const [width, setWidth]  = useState<number>();

    const handleResize = function() {
        setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Does not follow the typical standard distribution, uses standard error.
    const gaussian = function(x:number, se:number, mean:number) {
        const z = (x - mean) / se;
        return GAUSSIAN * Math.exp(-0.5 * z * z) / se * n;
    };

    const gamma = function(x:number) {
        let val = 1;
        for (let i = 2; i < x; i++) {
            val *= i;
        }
        return val;
    };

    /**
     * Student's t-distribution p_v(t), Where _v is the degree of freedom.
     * https://bpb-us-w2.wpmucdn.com/voices.uchicago.edu/dist/9/1193/files/2016/01/05b-TandP.pdf
     * @param t T-value of the two datasets
     * @param n Size of the two datasets, assumed equal lengths
     * @returns P-value, the probability that two datasets are the same
     */
    const pValue = function(t:number, n:number) {
        const v = 2 * n - 2;
        return gamma((v + 1) / 2) / (Math.sqrt(v * Math.PI) * gamma(v / 2))
                * (1 + t^2 / v)^(-(v+1)/2);
    };

    /**
     * Calculate the probability of obtaining the observed difference between
     * datasets if the null hypothesis were true -- Meaning, if the datasets
     * were from the same source. The equations assume that both datasets are
     * the same size.
     * @param mu1 First Mean
     * @param mu2 Second Mean
     * @param sd1 First Standard Deviation
     * @param sd2 Second Standard Deviation
     * @returns Significance (P-value)
     */
    const significance = function(
        mu1:number, mu2:number, sd1:number, sd2:number
    ) {
        const pooledDeviation = Math.sqrt(
            (Math.pow(sd1, 2) + Math.pow(sd2, 2))/2);
        return 1 - Math.abs(100 - Math.abs(
            pValue((mu1 - mu2) / (pooledDeviation * 2 / n), n))) / 100;
    };

    const stdError = function(data:number[]) {
        return deviation(data) / Math.sqrt(n);
    };

    /**
     * Generates a normal distribution curve with an area underneath from the
     * 2.5th to the 97.5th percentile.
     * @param selection Target SVG
     * @param id Group ID
     * @param projection Uniform array between the minimum and maximum range
     * @param data Dataset to be processed
     * @param curve Dotted curve of normal distribution
     * @param fill Area under the curve
     * @param color Color of the area underneath the curve
     * @param se Standard Error of the dataset
     * @param mu Mean of the dataset
     * @param x Scaling for the X-axis
     * @param y Scaling for the Y-axis
     */
    const generateCurve = function(
        selection:Selection<null, unknown, null, undefined>,
        id:string,
        projection:number[],
        data:number[],
        curve:unknown,
        fill:unknown,
        color:string,
        se:number,
        mu:number,
        x:ScaleLinear<number, number, never>,
        y:ScaleLinear<number, number, never>
    ) {
        const lowerBound = mu - Z_97_5 * se;
        const upperBound = mu + Z_97_5 * se;
        // Construct the curve
        selection.append('g')
            .attr('id', id)
            .call((g) => g.append('path')
                .datum(projection
                    .filter(f => f > lowerBound && f < upperBound)
                    .map(d => [d, gaussian(d, se, mu)]))
                .attr('fill', color)
                .attr('d', fill as number[]))
            .call((g) => g.append('path')
                .datum(projection
                    .map(d => [d, gaussian(d, se, mu)]))
                .attr('fill', 'none')
                .attr('stroke', 'white')
                .attr('stroke-dasharray', '5 3')
                .attr('stroke-offset', 1)
                .attr('stroke-width', 1.5)
                .attr('stroke-linejoin', 'round')
                .attr('d', curve as number[]))
        // Mean line
            .call((g) => g.append('line')
                .attr('stroke', 'white')
                .attr('stroke-dasharray', '5 3')
                .attr('stroke-offset', 1)
                .attr('stroke-width', 1.5)
                .attr('x1', x(mu))
                .attr('x2', x(mu))
                .attr('y1', y(data.length > 0 ? gaussian(mu, se, mu) : 0))
                .attr('y2', y(0)));
        return [se, mu];
    };

    useEffect(() => {
        if (!selection) {
            setSelection(select(svgRef.current));
        } else if (data1.length > 0){
            const binData = graphBins[audioFeature] as BinData;
            const se1 = stdError(data1), mean1 = mean(data1);
            const se2 = stdError(data2), mean2 = mean(data2);
            const gWidth = Number.parseInt(selection.style('width')) - MARGIN;
            const height =
                Number.parseInt(selection.style('height')) - MARGIN * 2;
            const yScale = Math.max(
                gaussian(mean1, se1, mean1),
                gaussian(mean2, se2, mean2));
            const yMagnitude = 8 * Math.floor(Math.log10(yScale));
            const x = scaleLinear()
                .domain([binData.min, binData.max])
                .range([MARGIN + Y_LABEL + yMagnitude, gWidth]);
            const y = scaleLinear()
                .domain([0, yScale])
                .range([height, MARGIN]);

            const curve = line()
                .curve(curveNatural)
                .x(d => x(d[0]))
                .y(d => y(d[1])) as unknown;
            const fill = area()
                .x(d => x(d[0]))
                .y0(y(0))
                .y1(d => y(d[1])) as unknown;
            // Keep the number high to increase the smoothness of the curve
            const projection = Array.from(Array(1001).keys())
                .map(x => x * (binData.max - binData.min) / 1000
                        + binData.min);

            selection.selectAll('g').remove();

            // Generate graph body
            selection.append('g')
                .call((g) => g.append('rect')
                    .attr('fill', GRAPH_BG)
                    .attr('height', height - MARGIN)
                    .attr('width', gWidth - x(binData.min))
                    .attr('x', x(binData.min))
                    .attr('y', MARGIN));

            generateCurve(selection, 'curve1', projection, data1, curve, fill,
                PRIMARY, se1, mean1, x, y);
            generateCurve(selection, 'curve2', projection, data2, curve, fill,
                SECONDARY, se2, mean2, x, y);

            // Construct the Y-axis
            selection.append('g')
                .attr(
                    'transform',
                    `translate(${MARGIN + Y_LABEL + yMagnitude}, 0)`)
                .call(axisLeft(y)
                    .ticks(10))
                .call((g) => g.select('.domain').remove())
                .call((g) => g.append('text')
                    .attr('x', -height/2)
                    .attr('y', -x(binData.min) + Y_LABEL)
                    .attr('transform', 'rotate(270)')
                    .attr('fill', 'white')
                    .attr('text-anchor', 'middle')
                    .text('Estimated Frequency'))
                .attr('font-size', FONT_SIZE);

            // Construct the X-axis
            selection.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(axisBottom(x).ticks(6).tickSizeOuter(6))
                .call((g) => g.append('text')
                    .attr('x', gWidth/2 + MARGIN)
                    .attr('y', MARGIN + 10)
                    .attr('fill', 'white')
                    .attr('text-anchor', 'center')
                    .text(
                        audioFeature === 'tempo' ?
                            'Tempo, Beats Per Minute (BPM)' :
                            toTitleCase(audioFeature)
                    ))
                .attr('font-size', FONT_SIZE);

            // Display the P-value
            const sig = significance(
                mean1, mean2, deviation(data1), deviation(data2));
            selection.append('g')
                .attr('id', 'significance')
                .call((g) => g.append('text')
                    .attr('x', gWidth)
                    .attr('y', 12)
                    .attr('fill', 'white')
                    .attr('text-anchor', 'end')
                    .text(sig < 0.001 ?
                        'p-value < 0.001' :
                        `p-value = ${sig.toFixed(3)}`))
                .attr('font-size', FONT_SIZE);
        }
    }, [selection, data1, genre1, genre2, audioFeature, width]);

    return (
        <div className='col-sm-12'>
            <svg
                id='distribution'
                ref={svgRef}
                width='100%'
                height='20rem'
            />
        </div>
    );
};
