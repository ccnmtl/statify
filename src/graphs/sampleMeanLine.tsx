import React, { useRef, useEffect, useState } from 'react';
import { BinData, graphBins, PRIMARY, SECONDARY, GRAPH_BG,
    FONT_SIZE, HIGHLIGHT_1, HIGHLIGHT_2, AUDIO_DEFAULT } from '../common';
import { cumulativeMeanFunc } from './utils';
import { extent, line, axisBottom, axisLeft, min, max, range } from 'd3';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';


const MARGIN = 50;

interface CumulativeSampleMeanProps {
    audioFeature: string | null;
    data1: number[];
    data2: number[] | null;
    oldData: number[];
    setOldData: React.Dispatch<React.SetStateAction<number[]>>;
    oldData2: number[] | null;
    setOldData2: React.Dispatch<React.SetStateAction<number[]>>;
    prevData: [number, number][][];
    setPrevData: React.Dispatch<React.SetStateAction<[number, number][][]>>
    prevData2: [number, number][][];
    setPrevData2: React.Dispatch<React.SetStateAction<[number, number][][]>>
}

const numTicks = 5;

export const CumulativeSampleMean: React.FC<CumulativeSampleMeanProps>  = (
    { data1, data2, audioFeature=AUDIO_DEFAULT, oldData, oldData2, setOldData,
        setOldData2, prevData, prevData2, setPrevData, setPrevData2}
) => {
    const svgRef = useRef(null);

    const [width, setWidth]  = useState<number>();
    let resizeTimeout;

    const handleResize = () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setWidth(window.innerWidth);
        }, 10); // Adjust the timeout duration as needed
    };

    window.addEventListener('resize', handleResize);

    useEffect(() => {
        audioFeature ??= AUDIO_DEFAULT;
        const cumulativeMean = cumulativeMeanFunc(data1);
        const svgGraph = select(svgRef.current);
        const binData = graphBins[audioFeature] as BinData;

        svgGraph.selectAll('g').remove();
        const gWidth = Number.parseInt(svgGraph.style('width')) - MARGIN;
        const HEIGHT = Number.parseInt(svgGraph.style('height')) - (MARGIN - 7);

        const datapoints = [];
        cumulativeMean.map((x) => {
            datapoints.push(x[1]);
        });

        const minYValue1 = cumulativeMean.length > 0
            ? min(cumulativeMean, (d) => d[0])
            : binData.min;
        const maxYValue1 = cumulativeMean.length > 0
            ? max(cumulativeMean, (d) => d[0])
            : binData.max;

        let minYValue = minYValue1;
        let maxYValue = maxYValue1;

        if (data2.length > 0) {
            const cumulativeMean2 = cumulativeMeanFunc(data2);
            const minYValue2 = min(cumulativeMean2, (d) => d[0]);
            const maxYValue2 = max(cumulativeMean2, (d) => d[0]);

            minYValue = Math.min(minYValue1, minYValue2);
            maxYValue = Math.max(maxYValue1, maxYValue2);

        }

        const tickValues = range(
            minYValue, maxYValue, (maxYValue - minYValue) / (numTicks - 1));


        // Create scales for x and y axes
        const x = scaleLinear()
            .domain(extent(datapoints))
            .range([MARGIN, gWidth + 20]);
        const y = scaleLinear()
            .domain([minYValue, maxYValue])
            .range([HEIGHT, MARGIN]);

        // Generate graph body
        svgGraph.append('g')
            .call((g) => g.append('rect')
                .attr('fill', GRAPH_BG)
                .attr('height', HEIGHT-MARGIN)
                .attr('width', gWidth + 20 - MARGIN)
                .attr('x', MARGIN)
                .attr('y', y(maxYValue)));

        // Construct the Y-axis
        svgGraph.append('g')
            .attr('transform', `translate(${MARGIN},0)`)
            .call(axisLeft(y).tickValues(tickValues))
            .call((g) => g.select('.domain').remove())
            .call((g) => g.append('text')
                .attr('x', -HEIGHT/2.5)
                .attr('y', -MARGIN + 10)
                .attr('transform', 'rotate(270)')
                .attr('fill', 'white')
                .attr('text-anchor', 'center')
                .text('Sample Mean'))
            .attr('font-size', FONT_SIZE);

        // Create X axis
        svgGraph.append('g')
            .attr('transform', `translate(0,${HEIGHT})`)
            .call(axisBottom(x))
            .call((g) => g.append('text')
                .attr('x', gWidth/2 + MARGIN)
                .attr('y', MARGIN - 10)
                .attr('fill', 'white')
                .attr('text-anchor', 'right')
                .text('# of data points'))
            .attr('font-size', FONT_SIZE);

        const cm = cumulativeMean.map(
            (c) => [x(c[1]), y(c[0])] as [number, number]);

        const lnMkr = line();

        //Old lines of 100 pts
        if(cm.length === 100 && data1 !== oldData) {
            setPrevData([
                ...prevData, cm
            ]);
            setOldData(data1);
        }

        //Old lines
        svgGraph.append('g').attr('id', 'genre1old')
            .call((g) =>  prevData.forEach((oldData) =>
                g.append('path')
                    .datum(oldData)
                    .attr('d', lnMkr(oldData))
                    .attr('fill', 'none')
                    .attr('stroke', PRIMARY)
                    .attr('opacity', 0.35)
                    .attr('stroke-width', 2)
            ));

        //lines
        svgGraph.append('g').attr('id', 'genre1line')
            .append('path')
            .datum(cm)
            .attr('d', lnMkr(cm))
            .attr('fill', 'none')
            .attr('stroke', PRIMARY)
            .attr('stroke-width', 2);

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

        // hover overlay dots
        const hover = svgGraph.append('g').attr('id', 'genre1hover')
            .selectAll('circle')
            .data(cm)
            .enter()
            .append('circle')
            .attr('r', 6)
            .attr('cx', d=>d[0])
            .attr('cy', d=>d[1])
            .style('fill', 'rgba(255,255,255,0)');

        // hover details
        svgGraph.append('g').attr('id', 'genre1text')
            .selectAll('text')
            .data(cm)
            .enter()
            .append('text')
            .attr('fill', 'white')
            .attr('font-size', FONT_SIZE)
            .attr('x', d => d[0])
            .attr('y', d => d[1])
            .attr('dy', -20)
            .attr('text-anchor', 'middle')
            .attr('class', 'circle-label')
            .style('opacity', 0)
            .text((d, i) => `[${i+1}, ${cumulativeMean[i][0].toFixed(2)}]`);

        hover
            .on('mouseenter', function(event, d) {
                select(this)
                    .style('fill', HIGHLIGHT_1);

                svgGraph.selectAll('.circle-label')
                    .filter(data => data === d)
                    .style('opacity', 1);
            })
            .on('mouseout', function(event, d) {
                select(this)
                    .style('fill', 'rgba(255,255,255,0)');

                svgGraph.selectAll('.circle-label')
                    .filter(data => data === d)
                    .style('opacity', 0);
            });

        if(data2.length > 0) {
            const cumulativeMean2 = cumulativeMeanFunc(data2);
            const cm2 = cumulativeMean2.map(
                (c) => [x(c[1]), y(c[0])] as [number, number]);

            const lnMkr2 = line();

            //Old lines of 100 pts
            if(cm2.length === 100 && data2 !== oldData2) {
                setPrevData2([
                    ...prevData2, cm2
                ]);
                setOldData2(data2);
            }
            prevData2.forEach((oldData) => {
                //lines
                svgGraph.append('g').attr('id', 'genre2old')
                    .append('path')
                    .datum(oldData)
                    .attr('d', lnMkr2(oldData))
                    .attr('fill', 'none')
                    .attr('stroke', SECONDARY)
                    .attr('opacity', 0.35)
                    .attr('stroke-width', 2);
            });

            //lines
            svgGraph.append('g').attr('id', 'genre2line')
                .append('path')
                .datum(cm2)
                .attr('d', lnMkr2(cm2))
                .attr('fill', 'none')
                .attr('stroke', SECONDARY)
                .attr('stroke-width', 2);

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

            // hover overlay dots
            const hover2 = svgGraph.append('g').attr('id', 'genre2hover')
                .selectAll('circle')
                .data(cm2)
                .enter()
                .append('circle')
                .attr('r', 6)
                .attr('cx', d=>d[0])
                .attr('cy', d=>d[1])
                .style('fill', 'rgba(255,255,255,0)');

            // hover details
            svgGraph.append('g').attr('id', 'genre2text')
                .selectAll('text')
                .data(cm2)
                .enter()
                .append('text')
                .attr('fill', 'white')
                .attr('font-size', FONT_SIZE)
                .attr('x', d => d[0])
                .attr('y', d => d[1])
                .attr('dy', -20)
                .attr('text-anchor', 'middle')
                .attr('class', 'circle-label2')
                .style('opacity', 0)
                .text((d, i) => `[${i+1},
                    ${cumulativeMean2[i][0].toFixed(2)}]`);

            hover2
                .on('mouseenter', function(event, d) {
                    select(this)
                        .style('fill', HIGHLIGHT_2);

                    svgGraph.selectAll('#genre2text .circle-label2')
                        .filter(data => data === d)
                        .style('opacity', 1);
                })
                .on('mouseout', function(event, d) {
                    select(this)
                        .attr('r', 2)
                        .style('fill', 'white');

                    svgGraph.selectAll('#genre2text .circle-label2')
                        .filter(data => data === d)
                        .style('opacity', 0);
                });
        }

        // Construct Ticker Label
        svgGraph.append('g')
            .call((g) => {
                g.append('text')
                    .attr('fill', 'white')
                    .attr('font-size', FONT_SIZE)
                    .attr('text-anchor', 'end')
                    .attr('x', gWidth)
                    .attr('y', 24)
                    .text(`Count: ${data1.length}`);
                g.append('text')
                    .attr('fill', 'white')
                    .attr('font-size', FONT_SIZE * 1.5)
                    .attr('text-anchor', 'middle')
                    .attr('x', gWidth/2 + MARGIN)
                    .attr('y', 36)
                    .text('Cumulative Sample Mean');});

    }, [data1, data2, audioFeature, width]);
    return (
        <div className='col-sm-12 mb-4'>
            <svg
                id='lines'
                data-cy={'sampleMean'}
                width={'100%'}
                height={'22rem'}
                ref={svgRef}
            />
        </div>
    );
};