import React, { useRef, useEffect } from 'react';
import { BinData, graphBins, toTitleCase, primary, secondary,
    FONT_SIZE, MARGIN } from '../common';
import { cumulativeMeanFunc } from './utils';
import { line, axisBottom, axisLeft } from 'd3';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';

const Y_LABEL = 30;
const HEIGHT = 350;

interface CumulativeSampleMeanProps {
    audioFeature: string | null
    data1: number[];
    data2: number[] | null;
}


export const CumulativeSampleMean: React.FC<CumulativeSampleMeanProps>  = (
    { data1, data2, audioFeature='tempo'}
) => {
    const svgRef = useRef(null);

    useEffect(() => {

        const cumulativeMean = cumulativeMeanFunc(data1);
        const svgGraph = select(svgRef.current);
        const binData = graphBins[audioFeature] as BinData;

        svgGraph.selectAll('g').remove();
        const gWidth = Number.parseInt(svgGraph.style('width')) - MARGIN;

        let xScale;
        if(data1.length > 25 && data1.length < 50)
        {
            xScale = 50;
        } else if(data1.length > 50 && data1.length < 75) {
            xScale = 75;
        } else if(data1.length > 75) {
            xScale = 100;
        } else {
            xScale = 25;
        }
        // Create scales for x and y axes
        const x = scaleLinear()
            .domain([0, xScale])
            .range([MARGIN, gWidth]);

        const y = scaleLinear()
            .domain([binData.min, binData.max]).nice()
            .range([HEIGHT, MARGIN]);

        // Construct the Y-axis
        svgGraph.append('g')
            .attr('transform', `translate(${MARGIN + Y_LABEL -10}, -20)`)
            .call(axisLeft(y).ticks(10).tickSizeOuter(2))
            .call((g) => g.select('.domain').remove())
            .call((g) => g.append('text')
                .attr('x', -HEIGHT/2)
                .attr('y', -MARGIN-7)
                .attr('transform', 'rotate(270)')
                .attr('fill', 'white')
                .attr('text-anchor', 'center')
                .text(`Sample Mean for ${toTitleCase(audioFeature)}`))
            .attr('font-size', FONT_SIZE);

        // Create X axis
        svgGraph.append('g')
            .attr('transform', `translate(20,${HEIGHT})`)
            .call(axisBottom(x).ticks(10))
            .call((g) => g.append('text')
                .attr('x', gWidth/2 + MARGIN)
                .attr('y', MARGIN + 10)
                .attr('fill', 'white')
                .attr('text-anchor', 'right')
                .text('# of data points'))
            .attr('font-size', FONT_SIZE);

        const cm = cumulativeMean.map((c) => [x(c[1]), y(c[0])]);
        // scatter dots
        svgGraph.append('g').attr('id', 'genre1dots')
            .selectAll('circle')
            .data(cm)
            .enter()
            .append('circle')
            .attr('r', 2)
            .attr('cx', d=>d[0])
            .attr('cy', d=>d[1])
            .style('fill', 'white');

        const lnMkr = line();
        //lines
        svgGraph.append('g').attr('id', 'genre1line')
            .append('path')
            .datum(cm)
            .attr('d', lnMkr(cm))
            .attr('fill', 'none')
            .attr('stroke', primary)
            .attr('stroke-width', 2);

        if(data2) {
            const cumulativeMean2 = cumulativeMeanFunc(data2);
            const cm2 = cumulativeMean2.map((c) => [x(c[1]), y(c[0])]);
            // scatter dots
            svgGraph.append('g').attr('id', 'genre2dots')
                .selectAll('circle')
                .data(cm2)
                .enter()
                .append('circle')
                .attr('r', 2)
                .attr('cx', d=>d[0])
                .attr('cy', d=>d[1])
                .style('fill', 'white');

            const lnMkr2 = line();
            //lines
            svgGraph.append('g').attr('id', 'genre2line')
                .append('path')
                .datum(cm2)
                .attr('d', lnMkr2(cm2))
                .attr('fill', 'none')
                .attr('stroke', secondary)
                .attr('stroke-width', 2);
        }

        // Construct Ticker Label
        svgGraph.append('g')
            .call((g) => g.append('text')
                .attr('fill', 'white')
                .attr('text-anchor', 'end')
                .attr('x', gWidth)
                .attr('y', 12)
                .text(`Count: ${data1.length}`))
            .attr('font-size', FONT_SIZE);

    }, [data1, data2, audioFeature]);
    return (
        <div className='col-sm-12'>
            <svg
                id='lines'
                ref={svgRef}
                width='100%'
                height='30rem'
            />
        </div>
    );
};