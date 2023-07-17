import React, { useRef, useEffect, useState } from 'react';
import { BinData, graphBins, toTitleCase } from '../common';
import { axisBottom, axisLeft } from 'd3';
import { bin } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { select, Selection } from 'd3-selection';


const BUCKET_PADDING = 4;
const FONT_SIZE = 14;
const MARGIN = 30;
const Y_LABEL = 20;
const Y_CAP = 20;


interface histogramProps {
    color: string;
    data1: number[];
    data2: number[] | null;
    genre1: string;
    genre2: string | null;
    audioFeature: string | null;
    n: number | null;
}

export const Histogram: React.FC<histogramProps>  = (
    {data1, data2, genre1, genre2, audioFeature='tempo', n}
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
            const bins1 = bin()
                .domain([binData.min, binData.max])
                .thresholds(
                    (binData.max - binData.min) / binData.ticks)(
                    data1); // First data goes here

            const gWidth = Number.parseInt(selection.style('width')) - MARGIN;
            const height =
                Number.parseInt(selection.style('height')) - MARGIN * 2;

            const x = scaleLinear()
                .domain([binData.min, binData.max]).nice()
                .range([MARGIN + Y_LABEL, gWidth]);
            const y = scaleLinear()
                .domain([0, Y_CAP])
                .range([height, MARGIN]);

            // Construct graph bars
            selection.append('g')
                .attr('id', 'genre1')
                .attr('fill', 'rgba(82, 208, 80, 1.0)')
                .selectAll()
                .data(bins1)
                .join('rect')
                .attr('x', (d) => x(d.x0) + BUCKET_PADDING/2)
                .attr('width', (d) => x(d.x1) - x(d.x0) - BUCKET_PADDING)
                .attr('y', (d) => y(d.length))
                .attr('height', (d) => y(0) - y(d.length));

            if (data2) {
                const bins2 = bin()
                    .domain([binData.min, binData.max])
                    .thresholds(
                        (binData.max - binData.min) / binData.ticks)(
                        data2); //Second data set goes here
                selection.append('g')
                    .attr('id', 'genre2')
                    .attr('fill', 'rgba(255, 100, 100, 0.7)')
                    .selectAll()
                    .data(bins2)
                    .join('rect')
                    .attr('x', (d) => x(d.x0) + BUCKET_PADDING/2)
                    .attr('width', (d) => x(d.x1) - x(d.x0) - BUCKET_PADDING)
                    .attr('y', (d) => y(d.length))
                    .attr('height', (d) => y(0) - y(d.length));
            }

            // Construct the Y-axis
            selection.append('g')
                .attr('transform', `translate(${MARGIN+Y_LABEL}, 0)`)
                .call(axisLeft(y).ticks(10))
                .call((g) => g.select('.domain').remove())
                .call((g) => g.append('text')
                    .attr('x', -height/2)
                    .attr('y', -MARGIN-5)
                    .attr('transform', 'rotate(270)')
                    .attr('fill', 'white')
                    .attr('text-anchor', 'center')
                    .text('Freq.' + (n ? ` -- Distribution, N = ${n}` : '')))
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

            // Construct Ticker Label
            selection.append('g')
                .call((g) => g.append('text')
                    .attr('fill', 'white')
                    .attr('text-anchor', 'end')
                    .attr('x', gWidth)
                    .attr('y', 12)
                    .text(`Count: ${data1.length}`))
                .attr('font-size', FONT_SIZE);
        }
    }, [selection, data1, genre1, genre2, audioFeature]);

    return (
        <div className='col-sm-12'>
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
