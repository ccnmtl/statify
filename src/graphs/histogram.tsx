import React, { useRef, useEffect, useState } from 'react';
import {
    BinData, graphBins, toTitleCase, SECONDARY, GRAPH_BG, HIGHLIGHT_1,
    HIGHLIGHT_2
} from '../common';
import { axisBottom, axisLeft } from 'd3';
import { bin, Bin } from 'd3-array';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import { select, Selection } from 'd3-selection';


const BUCKET_PADDING = 4;
const FONT_SIZE = 14;
const MARGIN = 30;
const Y_LABEL = 20;
const Y_SCALE = 20;
const LEGEND_R = 10;
const LEGEND_GAP = 20;
const LEGEND_TEXT_DROP = 5;
const LEGEND_CIRCLE_STROKE = 1.5;


interface HistogramProps {
    color: string;
    data1: number[];
    data2: number[] | null;
    genre1: string;
    genre2: string | null;
    audioFeature: string | null;
    n: number | null;
}

export function overlappingBins(
    bins1:Bin<number, number>[], bins2:Bin<number, number>[]
) {
    const overlap:Bin<number, number>[] = [];
    for (let go = true, one = 0, two = 0; go;) {
        if (bins1.length === one || bins2.length === two) {
            go = false;
        } else if(bins1[one].x0 < bins2[two].x0) {
            one++;
        } else if(bins1[one].x0 > bins2[two].x0) {
            two++;
        } else {
            if (bins1[one].length > 0 &&
                bins1[one].length < bins2[two].length
            ) {
                overlap.push(bins1[one]);
            }
            one++, two++;
        }
    }
    return overlap;
}

export const Histogram: React.FC<HistogramProps>  = (
    {color, data1, data2, genre1, genre2, audioFeature='tempo', n}
) => {
    const svgRef = useRef(null);
    const whichHisto = n ? 'DistributionHistogram' : 'SampleDataHistogram';

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

    const generateDetails = function(
        d:Bin<number, number>,
        id:string,
        x:ScaleLinear<number, number, never>,
        y:ScaleLinear<number, number, never>,
    ) {
        selection.append('text')
            .attr('id', id)
            .attr('fill', 'white')
            .attr('font-size', FONT_SIZE)
            .attr('paint-order', 'stroke')
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('text-anchor', 'middle')
            .attr('x', (x(d.x1) - x(d.x0)) / 2 + x(d.x0)
                + BUCKET_PADDING/2)
            .attr('y', Math.max(MARGIN, y(d.length)) - 10)
            .text(`[${d.x0}, ${d.x1}] : ${d.length}`);
    };

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
            const bins2 = data2 ?
                bin()
                    .domain([binData.min, binData.max])
                    .thresholds((binData.max - binData.min) / binData.ticks)(
                        data2) :
                null;
            const over20 = [...bins1.map(d => d.length),
                ...bins1.map(d => d.length)].find(x => x > Y_SCALE);
            const yCap = over20 ? 20 * Math.ceil(over20 / Y_SCALE) : Y_SCALE;

            const gWidth = Number.parseInt(selection.style('width')) - MARGIN;
            const height =
                Number.parseInt(selection.style('height')) - MARGIN * 2;

            const x = scaleLinear()
                .domain([binData.min, binData.max]).nice()
                .range([MARGIN + Y_LABEL, gWidth]);
            const y = scaleLinear()
                .domain([0, yCap])
                .range([height, MARGIN]);

            const id1 = 'detail-1';

            // Generate graph body
            selection.append('g')
                .call((g) => g.append('rect')
                    .attr('fill', GRAPH_BG)
                    .attr('height', height-MARGIN)
                    .attr('width', gWidth-MARGIN-Y_LABEL)
                    .attr('x', MARGIN + Y_LABEL)
                    .attr('y', MARGIN));

            // Construct graph bars
            selection.append('g')
                .attr('id', `genre1-${whichHisto}-${color}`)
                .attr('fill', color)
                .selectAll()
                .data(bins1)
                .join('rect')
                .attr('x', (d) => x(d.x0) + BUCKET_PADDING/2)
                .attr('width', (d) => x(d.x1) - x(d.x0) - BUCKET_PADDING)
                .attr('y', (d) => y(d.length))
                .attr('height', (d) => y(0) - y(d.length))
                .on('mouseenter', function(){
                    const d = select(this).datum() as Bin<number, number>;
                    generateDetails(d, id1, x, y);
                    select(this).attr('fill', HIGHLIGHT_1);
                })
                .on('mouseout', function(){
                    select(this).attr('fill', color);
                    document.getElementById(id1).remove();
                });

            // Construct 2nd set of graph bars
            if (data2) {
                const id2 = 'detail-2';
                selection.append('g')
                    .attr('id', `genre2-${whichHisto}`)
                    .attr('fill', SECONDARY)
                    .selectAll()
                    .data(bins2)
                    .join('rect')
                    .attr('x', (d) => x(d.x0) + BUCKET_PADDING/2)
                    .attr('width', (d) => x(d.x1) - x(d.x0) - BUCKET_PADDING)
                    .attr('y', (d) => y(d.length))
                    .attr('height', (d) => y(0) - y(d.length))
                    .on('mouseenter', function(){
                        const d = select(this).datum() as Bin<number, number>;
                        generateDetails(d, id2, x, y);
                        select(this).attr('fill', HIGHLIGHT_2);
                    })
                    .on('mouseout', function(){
                        select(this).attr('fill', SECONDARY);
                        document.getElementById(id2).remove();
                    });

                // Shared data column
                const binOverlap = overlappingBins(bins1, bins2);
                const idOverlap = 'detail-1-overlap';
                selection.append('g')
                    .attr('id', 'genre2-overlap')
                    .attr('fill', 'rgba(0, 0, 0, 0)')
                    .selectAll()
                    .data(binOverlap)
                    .join('rect')
                    .attr('x', (d) => x(d.x0) + BUCKET_PADDING/2)
                    .attr('width', (d) => x(d.x1) - x(d.x0) - BUCKET_PADDING)
                    .attr('y', (d) => y(d.length))
                    .attr('height', (d) => y(0) - y(d.length))
                    .on('mouseenter', function(){
                        const d = select(this).datum() as Bin<number, number>;
                        generateDetails(d, idOverlap, x, y);
                        select(this).attr('fill', HIGHLIGHT_1);
                    })
                    .on('mouseout', function(){
                        select(this).attr('fill', 'rgba(0, 0, 0, 0)');
                        document.getElementById(idOverlap).remove();
                    });
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
                    .attr('text-anchor', 'middle')
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

            // Construct Title and Ticker Label
            selection.append('g')
                .attr('id', 'graph-header')
                .call((g) => {
                    g.append('text')
                        .attr('fill', 'white')
                        .attr('font-size', FONT_SIZE)
                        .attr('text-anchor', 'end')
                        .attr('x', gWidth)
                        .attr('y', 12)
                        .text(`Count: ${data1.length}`);
                    g.append('text')
                        .attr('fill', 'white')
                        .attr('font-size', FONT_SIZE * 1.5)
                        .attr('text-anchor', 'middle')
                        .attr('x', gWidth/2 + MARGIN)
                        .attr('y', 18)
                        .text('Sample Data'.concat(
                            genre1 ? ` for ${toTitleCase(genre1)}`: ''));});

            // Generate Legend
            if (genre1 && genre2) {
                selection.append('g')
                    .attr('id', 'legend')
                    .attr('transform',
                        `translate(${gWidth}, ${3 * MARGIN / 2})`)
                    .call((g) => g.append('g')
                        .attr('transform',
                            `translate(${-LEGEND_GAP}, 0)`)
                        .call((g) => g.append('circle')
                            .attr('stroke', 'black')
                            .attr('stroke-width', LEGEND_CIRCLE_STROKE)
                            .attr('fill', color)
                            .attr('r', LEGEND_R))
                        .call((g) => g.append('text')
                            .attr('fill', 'white')
                            .attr('text-anchor', 'end')
                            .attr('x', -LEGEND_GAP)
                            .attr('y', LEGEND_TEXT_DROP)
                            .text(`${toTitleCase(genre1)}`)))
                    .call((g) => g.append('g')
                        .attr('transform',
                            `translate(${-LEGEND_GAP}, ${30})`)
                        .call((g) => g.append('circle')
                            .attr('stroke', 'black')
                            .attr('stroke-width', LEGEND_CIRCLE_STROKE)
                            .attr('fill', SECONDARY)
                            .attr('r', LEGEND_R))
                        .call((g) => g.append('text')
                            .attr('fill', 'white')
                            .attr('text-anchor', 'end')
                            .attr('x', -LEGEND_GAP)
                            .attr('y', LEGEND_TEXT_DROP)
                            .text(`${toTitleCase(genre2)}`)))
                    .attr('font-size', FONT_SIZE);
            }
        }
    }, [selection, data1, genre1, genre2, audioFeature, width]);

    return (
        <div className='col-sm-12'>
            <svg
                id={`${whichHisto}-${color}`}
                ref={svgRef}
                width='100%'
                height='20rem'
            />
        </div>
    );
};
