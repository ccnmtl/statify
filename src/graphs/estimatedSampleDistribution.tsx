import React, { useRef, useEffect, useState } from 'react';
import { scaleLinear } from 'd3-scale';
import { select, Selection } from 'd3-selection';
import { tTestTwoSample } from 'simple-statistics';
import {
    area, axisBottom, axisLeft, deviation, mean, line, curveNatural, ScaleLinear
} from 'd3';
import {
    BinData, graphBins, toTitleCase, PRIMARY, SECONDARY, GRAPH_BG, AUDIO_DEFAULT
} from '../common';

const FONT_SIZE = 14;
const MARGIN = 30;
const Y_LABEL = 12;
export const GAUSSIAN = 1 / Math.sqrt(2 * Math.PI);
const Z_97_5 = 1.96; // 97.5th percentile, use negative for 2.5th percentile
// The Z-table is a list of known constants and can be found at:
// https://www.statology.org/z-table/

interface EstimatedDistributionProps {
    data1: number[];
    data2: number[];
    genre1: string;
    genre2: string;
    audioFeature: string | null;
    n: number;
}

// Does not follow the typical standard distribution, uses standard error.
export const gaussian = function(x:number, se:number, mean:number, n:number) {
    if (se === 0 || n === 0) {
        throw new Error('Divide by zero');
    }
    const z = (x - mean) / se;
    return GAUSSIAN * Math.exp(-0.5 * z * z) / se * n;
};

export const stdError = function(data:number[], n:number) {
    if (data.length === 0) {
        return 0;
    }
    return (deviation(data) ?? 0) / Math.sqrt(n === 0 ? 1 : n);
};

export const EstimatedDistribution: React.FC<EstimatedDistributionProps>  = (
    {data1, data2, genre1, genre2, audioFeature=AUDIO_DEFAULT, n}
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
                    .map(d => [d, gaussian(d, se, mu, n)]))
                .attr('fill', color)
                .attr('d', fill as number[]))
            .call((g) => g.append('path')
                .datum(projection
                    .map(d => [d, gaussian(d, se, mu, n)]))
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
                .attr('y1', y(data.length > 0 ? gaussian(mu, se, mu, n) : 0))
                .attr('y2', y(0)));
        return [se, mu];
    };

    useEffect(() => {
        if (!selection) {
            setSelection(select(svgRef.current));
        } else {
            audioFeature ??= AUDIO_DEFAULT;
            const binData = graphBins[audioFeature] as BinData;
            const se1 = stdError(data1, n), mean1 = mean(data1) ?? 0;
            const se2 = stdError(data2, n), mean2 = mean(data2) ?? 0;
            const gWidth = Number.parseInt(selection.style('width')) - MARGIN;
            const height =
                Number.parseInt(selection.style('height')) - MARGIN * 2;

            const yScale = data1.length > 0  && data2.length > 0 ? Math.max(
                gaussian(mean1, se1, mean1, n),
                gaussian(mean2, se2, mean2, n)):
                20;
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

            if (data1.length > 0 && data2.length > 0){
                generateCurve(selection, 'curve1', projection, data1, curve,
                    fill, PRIMARY, se1, mean1, x, y);
                generateCurve(selection, 'curve2', projection, data2, curve,
                    fill, SECONDARY, se2, mean2, x, y);
            }
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
                            toTitleCase(audioFeature  ?? AUDIO_DEFAULT)
                    ))
                .attr('font-size', FONT_SIZE);

            // Display the P-value
            const t = Math.abs(tTestTwoSample(data1, data2) ?? 0);
            const sig = 1/(Math.pow(t, Math.PI)+1);
            selection.append('g')
                .attr('id', 'title-header')
                .call((g) => {
                    g.append('text')
                        .attr('x', gWidth - 4)
                        .attr('y', MARGIN + FONT_SIZE)
                        .attr('paint-order', 'stroke')
                        .attr('stroke', 'black')
                        .attr('stroke-width', 4)
                        .attr('fill', 'white')
                        .attr('font-size', FONT_SIZE)
                        .attr('text-anchor', 'end')
                        .text(sig < 0.001 ?
                            'p-value < 0.001' :
                            `p-value = ${sig.toFixed(3)}`);
                    g.append('text')
                        .attr('fill', 'white')
                        .attr('font-size', FONT_SIZE * 1.5)
                        .attr('text-anchor', 'middle')
                        .attr('x', gWidth/2 + MARGIN)
                        .attr('y', 18)
                        .text(
                            `Estimated Sampling Distribution when N = ${n}`);});
        }
    }, [selection, data1, genre1, genre2, audioFeature, width]);

    return (
        <div className='col-sm-12'>
            <svg
                id='distribution'
                data-cy={'estimatedDistribution'}
                ref={svgRef}
                width='100%'
                height='20rem'
            />
        </div>
    );
};
