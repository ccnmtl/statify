import React, { useRef, useEffect, useState } from 'react';
import {
    BinData, graphBins, PRIMARY, SECONDARY, GRAPH_BG, FONT_SIZE, HIGHLIGHT_1,
    HIGHLIGHT_2, AUDIO_DEFAULT, LineProps, LineSetProps, StdProps, GraphRange
} from '../common';
import { cumulativeMeanFunc } from './utils';
import { line, axisBottom, axisLeft } from 'd3';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import { select } from 'd3-selection';


const MARGIN = 50;

interface CumulativeSampleMeanProps {
    stdProps: StdProps;
    lineProps: LineProps;
    lineSetProps: LineSetProps;
    graphRange: GraphRange;
}

export const CumulativeSampleMean: React.FC<CumulativeSampleMeanProps>  = ({
    stdProps: {data1, data2, audioFeature=AUDIO_DEFAULT},
    lineProps: {oldData, oldData2, prevData, prevData2},
    lineSetProps: {setOldData, setOldData2, setPrevData, setPrevData2},
    graphRange
}) => {
    const svgRef = useRef(null);

    const [width, setWidth] = useState<number>();
    const [cumulativeMean, setCumulativeMean] =
        useState<number[]>(cumulativeMeanFunc(data1));
    const [cumulativeMean2, setCumulativeMean2] =
        useState<number[]>(cumulativeMeanFunc(data2));
    let resizeTimeout;

    const handleResize = () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setWidth(window.innerWidth);
        }, 10); // Adjust the timeout duration as needed
    };

    const getRange = function(data: number[], min: number, max: number
    ):[number, number] {
        const binData = graphBins[audioFeature ?? AUDIO_DEFAULT] as BinData;
        data.map((x) => {
            if (x < min) {
                min = x - (2 * binData.ticks);
            }
            if (x > max) {
                max = x + (2 * binData.ticks);
            }
        });
        return [min, max];
    };

    const scaleData = function(
        x:ScaleLinear<number, number>, y: ScaleLinear<number, number>,
        data:number[]
    ): [number, number][] {
        if (data) {
            return data.map(
                (c, i) => [x(i+1), y(c)]);
        }
    };

    window.addEventListener('resize', handleResize);

    useEffect(() => {
        const cm = cumulativeMeanFunc(data1);
        const cm2 = cumulativeMeanFunc(data2);
        let [min, max] = getRange(
            cm, graphRange.min ?? 1000, graphRange.max ?? 0);
        if (cm2) {
            [min, max] = getRange(cm2, min, max);
        }
        graphRange.setMin(min);
        graphRange.setMax(max);
        setCumulativeMean(cm);
        setCumulativeMean2(cm2);
    }, [data1]);

    useEffect(() => {
        audioFeature ??= AUDIO_DEFAULT;
        const svgGraph = select(svgRef.current);
        const binData = graphBins[audioFeature] as BinData;

        svgGraph.selectAll('g').remove();
        const gWidth = Number.parseInt(svgGraph.style('width')) - MARGIN;
        const HEIGHT = Number.parseInt(svgGraph.style('height')) - (MARGIN - 7);

        const datapoints = [];
        cumulativeMean.map((x) => {
            datapoints.push(x[1]);
        });

        // Create scales for x and y axes
        const x = scaleLinear()
            .domain([1, data1.length])
            .range([MARGIN, gWidth + 20]);

        const y = scaleLinear()
            .domain(data1.length > 0 ?
                [graphRange.min, graphRange.max] :
                [binData.min, binData.max])
            .nice()
            .range([HEIGHT, MARGIN]);

        // Generate graph body
        svgGraph.append('g')
            .call((g) => g.append('rect')
                .attr('fill', GRAPH_BG)
                .attr('height', HEIGHT-MARGIN)
                .attr('width', gWidth + 20 - MARGIN)
                .attr('x', MARGIN)
                .attr('y', MARGIN));

        // Construct the Y-axis
        svgGraph.append('g')
            .attr('transform', `translate(${MARGIN},0)`)
            .call(axisLeft(y))
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

        const cm = scaleData(x, y, cumulativeMean);
        const cm2 = scaleData(x, y, cumulativeMean2);

        const lnMkr = line();

        //Old lines of 100 pts
        if(cm && cm.length === 100 && data1 !== oldData) {
            setPrevData([...prevData, cumulativeMean]);
            setOldData(data1);
        }

        if (prevData) {
            //Old lines
            let opacity1 = 0.36;
            opacity1 = (opacity1 - 0.01);
            svgGraph.append('g').attr('id', 'genre1old')
                .call((g) =>  prevData.forEach((data) => {
                    opacity1 = (opacity1 - 0.01);
                    const old = scaleData(x, y, data.slice(0, data1.length));
                    g.append('path')
                        .datum(old)
                        .attr('d', lnMkr(old))
                        .attr('fill', 'none')
                        .attr('stroke', PRIMARY)
                        .attr('opacity', opacity1)
                        .attr('stroke-width', 2);
                }));
        }

        if (data2) {
            if (prevData2) {
                let opacity2 = 0.36;
                opacity2 = (opacity2 - 0.01);
                svgGraph.append('g').attr('id', 'genre2old')
                    .call((g) => prevData2.forEach((data2) => {
                        opacity2 = (opacity2 - 0.01);
                        const old =
                            scaleData(x, y, data2.slice(0, data1.length));
                        g.append('path')
                            .datum(old)
                            .attr('d', lnMkr(old))
                            .attr('fill', 'none')
                            .attr('stroke', SECONDARY)
                            .attr('opacity', opacity2)
                            .attr('stroke-width', 2);
                    }));
            }
        }

        const lineGroup = svgGraph.append('g').attr('id', 'genre1line');

        // border line
        lineGroup
            .append('path')
            .datum(cm)
            .attr('d', lnMkr(cm))
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 2.5);
        // main line
        lineGroup
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
            .attr('z-index', 100)
            .style('opacity', 0)
            .text((_, i) => `[${i+1}, ${cumulativeMean[i].toFixed(2)}]`);

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

        if(data2) {

            const lnMkr2 = line();

            //Old lines of 100 pts
            if(cm2.length === 100 && data2 !== oldData2) {
                setPrevData2([ ...prevData2, cumulativeMean2]);
                setOldData2(data2);
            }

            const lineGroup2 = svgGraph.append('g').attr('id', 'genre2line');

            // border line
            lineGroup2
                .append('path')
                .datum(cm2)
                .attr('d', lnMkr2(cm2))
                .attr('fill', 'none')
                .attr('stroke', 'black')
                .attr('stroke-width', 2.5);

            // main line
            lineGroup2
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
                .attr('z-index', 100)
                .text((_, i) => `[${i+1}, ${cumulativeMean2[i].toFixed(2)}]`);

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
                    .attr('text-anchor', 'start')
                    .attr('x', MARGIN + 8)
                    .attr('y', MARGIN + FONT_SIZE + 4)
                    .text(`Count: ${data1.length}`);
                g.append('text')
                    .attr('fill', 'white')
                    .attr('font-size', FONT_SIZE * 1.5)
                    .attr('text-anchor', gWidth + 20 - MARGIN < 480 ?
                        'start' :
                        'middle')
                    .attr('x', gWidth + 20 - MARGIN < 480 ?
                        MARGIN :
                        gWidth/2 + MARGIN)
                    .attr('y', 36)
                    .text('Cumulative Sample Mean');});

    }, [audioFeature, width, cumulativeMean]);
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