import React, { useRef, useEffect } from 'react';
import { BinData, graphBins, toTitleCase } from '../common';
import { line, axisBottom, axisLeft } from 'd3';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';

const FONT_SIZE = 14;
const MARGIN = 30;
const Y_LABEL = 30;
const X_CAP = 15;
const HEIGHT = 350;

interface CumulativeSampleMeanProps {
    color: string;
    genre1: string;
    genre2: string | null;
    audioFeature: string | null
    cumulativeMean: number[][];
}


export const CumulativeSampleMean: React.FC<CumulativeSampleMeanProps>  = (
    { genre1, genre2, cumulativeMean, audioFeature='tempo'}
) => {
    const svgRef = useRef(null);

    useEffect(() => {

        const svgGraph = select(svgRef.current);
        const binData = graphBins[audioFeature] as BinData;

        svgGraph.selectAll('g').remove();
        const gWidth = Number.parseInt(svgGraph.style('width')) - MARGIN;

        // Create scales for x and y axes
        const x = scaleLinear()
            .domain([0, 100])
            .range([MARGIN, gWidth]);

        const y = scaleLinear()
            .domain([binData.min, binData.max]).nice()
            .range([HEIGHT, MARGIN]);

        const cm = cumulativeMean.map((c) => [x(c[1]), y(c[0])]);

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
            .attr('transform', `translate(25,${HEIGHT})`)
            .call(axisBottom(x).ticks(X_CAP))
            .call((g) => g.append('text')
                .attr('x', gWidth/2 + MARGIN)
                .attr('y', MARGIN + 10)
                .attr('fill', 'white')
                .attr('text-anchor', 'right')
                .text('# of data points'))
            .attr('font-size', FONT_SIZE);

        // scatter dots
        svgGraph.append('g')
            .selectAll('circle')
            .data(cm)
            .enter()
            .append('circle')
            .attr('r', 2)
            .attr('cx', d=>d[0])
            .attr('cy', d=>d[1])
            .style('fill', 'white');

        const lnMkr = line();

        svgGraph.append('g')
            .append('path')
            .datum(cm)
            .attr('d', lnMkr(cm))
            .attr('fill', 'none')
            .attr('stroke', 'green')
            .attr('stroke-width', 2);

    }, [cumulativeMean, genre1, genre2, audioFeature]);
    return (
        <div className='col-sm-12'>
            <svg
                id="lines"
                className="col"
                ref={svgRef}
                width="100%"
                height="30rem"
            />
        </div>

    );
};