import React, { useRef, useEffect, useState } from 'react';
import {
    BinData, graphBins, toTitleCase, SECONDARY, GRAPH_BG, HIGHLIGHT_2,
    AUDIO_DEFAULT, OVERLAP, HIGHLIGHT_OVERLAP,
} from '../common';
import { axisBottom, axisLeft } from 'd3';
import { bin, Bin } from 'd3-array';
import { scaleLinear } from 'd3-scale';
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
    highlight: string;
    data1: number[];
    data2: number[] | null;
    genre1: string;
    genre2: string | null;
    audioFeature: string | null;
    n: number | null;
}

export const Histogram: React.FC<HistogramProps>  = (
    {color, highlight, data1, data2, genre1, genre2,
        audioFeature=AUDIO_DEFAULT, n}
) => {
    const svgRef = useRef(null);
    const whichHisto = n ? 'DistributionHistogram' : 'SampleDataHistogram';
    const [width, setWidth]  = useState<number>();

    const handleResize = function() {
        setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    const generateDetails = function(
        bin:Bin<number, number>,
        group: Selection<SVGGElement, unknown, null, undefined>,
        id:string,
        x:number,
        y:number,
    ) {
        group.append('text')
            .attr('id', id)
            .attr('fill', 'white')
            .attr('font-size', FONT_SIZE)
            .attr('paint-order', 'stroke')
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('text-anchor', 'middle')
            .attr('x', x)
            .attr('y', y)
            .text(`[${bin.x0}, ${bin.x1}] : ${bin.length}`);
    };

    const buildBar = function(
        group: Selection<SVGGElement, unknown, null, undefined>,
        bin: Bin<number, number>, color: string, highlight: string,
        height: number, id: string, width: number, x: number, y: number,
    ) {
        group.append('rect')
            .attr('fill', color)
            .attr('height', height)
            .attr('width', width)
            .attr('x', x)
            .attr('y', y)
            .on('mouseenter', function(){
                generateDetails(
                    bin, group, id, x + width/2, Math.max(MARGIN + 10, y - 10));
                select(this)
                    .attr('fill', highlight);
            })
            .on('mouseout', function(){
                select(this).attr('fill', color);
                document.getElementById(id).remove();
            });
    };

    useEffect(() => {
        const svgGraph = select(svgRef.current);
        audioFeature ??= AUDIO_DEFAULT;
        const binData = graphBins[audioFeature] as BinData;

        svgGraph.selectAll('g').remove();
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

        const gWidth = Number.parseInt(svgGraph.style('width')) - MARGIN;
        const height =
                Number.parseInt(svgGraph.style('height')) - MARGIN * 2;

        const x = scaleLinear()
            .domain([binData.min, binData.max]).nice()
            .range([MARGIN + Y_LABEL, gWidth]);
        const y = scaleLinear()
            .domain([0, yCap])
            .range([height, MARGIN]);

        // Generate graph body
        svgGraph.append('g')
            .call((g) => g.append('rect')
                .attr('fill', GRAPH_BG)
                .attr('height', height-MARGIN)
                .attr('width', gWidth-MARGIN-Y_LABEL)
                .attr('x', MARGIN + Y_LABEL)
                .attr('y', MARGIN));

        const id1 = 'detail-1';
        const buckets = svgGraph.append('g');

        // Construct buckets
        if (bins2) {
            const id2 = 'detail-2';
            bins1.map((bin, i) => {
                if (bin.length < bins2[i].length) {
                    if (bin.length > 0) {
                        buildBar(buckets, bin, OVERLAP, HIGHLIGHT_OVERLAP,
                            y(0) - y(bin.length), id1,
                            x(bin.x1) - x(bin.x0) - BUCKET_PADDING,
                            x(bin.x0), y(bin.length));
                    }
                    buildBar(buckets, bins2[i], SECONDARY, HIGHLIGHT_2,
                        y(bin.length) - y(bins2[i].length), id2,
                        x(bin.x1) - x(bin.x0) - BUCKET_PADDING,
                        x(bin.x0), y(bins2[i].length));
                } else if (bin.length > bins2[i].length) {
                    if (bins2[i].length > 0) {
                        buildBar(
                            buckets, bins2[i], OVERLAP, HIGHLIGHT_OVERLAP,
                            y(0) - y(bins2[i].length), id2,
                            x(bins2[i].x1) -
                                    x(bins2[i].x0) - BUCKET_PADDING,
                            x(bins2[i].x0), y(bins2[i].length));
                    }
                    buildBar(buckets, bin, color, highlight,
                        y(bins2[i].length) - y(bin.length), id1,
                        x(bin.x1) - x(bin.x0) - BUCKET_PADDING,
                        x(bin.x0), y(bin.length));
                } else if (bin.length > 0) {
                    buildBar(buckets, bin, OVERLAP, HIGHLIGHT_OVERLAP,
                        y(0) - y(bin.length), id1,
                        x(bin.x1) - x(bin.x0) - BUCKET_PADDING,
                        x(bin.x0), y(bin.length));
                }
            });
        } else {
            bins1.map(bin => buildBar(buckets, bin, color, highlight,
                y(0) - y(bin.length), id1,
                x(bin.x1) - x(bin.x0) - BUCKET_PADDING,
                x(bin.x0), y(bin.length)));
        }

        // Construct the Y-axis
        svgGraph.append('g')
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
        svgGraph.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(axisBottom(x).ticks(6).tickSizeOuter(6))
            .call((g) => g.append('text')
                .attr('x', gWidth/2 + MARGIN)
                .attr('y', MARGIN + 10)
                .attr('fill', 'white')
                .attr('text-anchor', 'center')
                .text(
                    audioFeature === AUDIO_DEFAULT ?
                        'Tempo, Beats Per Minute (BPM)' :
                        toTitleCase(audioFeature)
                ))
            .attr('font-size', FONT_SIZE);

        // Construct Title and Ticker Label
        svgGraph.append('g')
            .attr('id', `graph-header-${whichHisto}-${color}`)
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
                    .attr('text-anchor', gWidth - MARGIN - Y_LABEL < 480 ?
                        'start' :
                        'middle')
                    .attr('x', gWidth - MARGIN - Y_LABEL < 480 ?
                        MARGIN + Y_LABEL :
                        gWidth/2 + MARGIN)
                    .attr('y', 18)
                    .text(
                        whichHisto === 'SampleDataHistogram'
                            ? 'Sample Data'
                            : 'Sampling Distribution When N = 100');});

        // Generate Legend
        if (data2) {
            svgGraph.append('g')
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

    }, [data1, audioFeature, width]);

    return (
        <div className='col-sm-12'>
            <svg
                id={`${whichHisto}-${color}`}
                data-cy={whichHisto}
                ref={svgRef}
                width='100%'
                height='20rem'
            />
        </div>
    );
};
