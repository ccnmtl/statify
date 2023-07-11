import React, { useRef, useEffect, useState } from 'react';
import { BinData, graphBins, toTitleCase } from '../common';
import { axisBottom, axisLeft } from 'd3';
import { bin, min } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { select, Selection } from 'd3-selection';


const BUCKET_PADDING = 4;
const FONT_SIZE = 14;
const MARGIN = 30;


interface histogramProps {
    color: string;
    data: number[];
    genre1: string;
    genre2: string | null;
    audioFeature: string | null;
}

export const Histogram: React.FC<histogramProps>  = (
    {data, genre1, genre2, audioFeature='tempo', color}
) => {
    const svgRef = useRef(null);

    const [selection, setSelection] = useState<null | Selection<
        null,
        unknown,
        null,
        undefined
    >>(null);

    useEffect(() => {
        if (!selection) {
            setSelection(select(svgRef.current));
        } else {
            const binData = graphBins[audioFeature] as BinData;

            selection.selectAll('g').remove();
            // Generate the bins buckets
            const bins = bin()
                .domain([binData.min, binData.max])
                .thresholds(
                    (binData.max - binData.min) / binData.ticks)(
                    data); // Data goes here

            const max = Math.max(...bins.map(col => col.length));
            const gWidth = Number.parseInt(selection.style('width')) - MARGIN;
            const height =
                Number.parseInt(selection.style('height')) - MARGIN * 2;

            const x = scaleLinear()
                .domain([binData.min, binData.max]).nice()
                .range([MARGIN, gWidth]);
            const y = scaleLinear()
                .domain([0, max])
                .range([height, MARGIN]);

            // Construct graph bars
            selection.append('g')
                .attr('fill', color)
                .selectAll()
                .data(bins)
                .join('rect')
                .attr('x', (d) => x(d.x0) + BUCKET_PADDING/2)
                .attr('width', (d) => x(d.x1) - x(d.x0) - BUCKET_PADDING)
                .attr('y', (d) => y(d.length))
                .attr('height', (d) => y(0) - y(d.length));

            // Construct the Y-axis
            selection.append('g')
                .attr('transform', `translate(${MARGIN}, 0)`)
                .call(axisLeft(y)
                    .ticks(min([10, max]))
                    .tickSizeOuter(0))
                .call((g) => g.select('.domain').remove())
                .call((g) => g.append('text')
                    .attr('x', - MARGIN)
                    .attr('y', 12)
                    .attr('fill', 'white')
                    .attr('text-anchor', 'start')
                    .text('Freq.'))
                .attr('font-size', FONT_SIZE);

            // Construct the X-axis
            selection.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(axisBottom(x).ticks(6).tickSizeOuter(6))
                .call((g) => g.append('text')
                    .attr('x', gWidth - MARGIN)
                    .attr('y', MARGIN + 10)
                    .attr('fill', 'white')
                    .attr('text-anchor', 'right')
                    .text(
                        audioFeature === 'tempo' ?
                            'Tempo, Beats Per Minute (BPM)' :
                            toTitleCase(audioFeature)
                    ))
                .attr('font-size', FONT_SIZE);

            // Construct Ticker Label
            selection.append('g')
                .call((g) => g.append('text')
                    .attr('fill', 'white')
                    .attr('text-anchor', 'end')
                    .attr('x', gWidth)
                    .attr('y', 12)
                    .text(`Count: ${data.length}`))
                .attr('font-size', FONT_SIZE);
        }
    }, [selection, data, genre1, genre2, audioFeature]);

    return (
        <div className='col-sm-8'>
            <svg
                id="bins"
                className="col"
                ref={svgRef}
                width="100%"
                height="20rem"
            />
        </div>
    );
};
