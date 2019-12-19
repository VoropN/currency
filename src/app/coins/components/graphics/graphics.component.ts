import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { CoinHistory } from '../../models/coin-history.model';
import { Margin } from './models/margin.model';
import { HistoryPoint } from '../../models/history-point.model';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphicsComponent implements OnInit {
  @ViewChild('chart', {static: true}) private chartContainer: ElementRef;
  @Input() private data: CoinHistory;
  private margin: Margin = { top: 20, bottom: 20, left: 60, right: 15};
  private width: number;
  private height: number;
  private colors = 'steelblue';
  private svg;
  private tooltip;
  private y;
  private x;
  private xAxis;
  private yAxis;
  private line;

  public ngOnInit(): void {
    this.createChart();
  }

  private createAxisX(): void {
    this.xAxis = g => g
    .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
    .call(
      d3
      .axisBottom(this.x)
      .tickFormat(d3.timeFormat('%b %d'))
      .ticks(this.width / 80)
      .tickSizeOuter(0)
    )
    .attr('class', 'axis');
  }

  private createAxisY(): void {
    this.yAxis = g => g
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(d3.axisLeft(this.y))
      .call((gInside) => gInside.select('.tick:last-of-type text').clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text('$ USD'))
        .attr('class', 'axis');
  }

  private addSignaturesAxisX(): void {
    this.x = d3.scaleUtc()
      .domain(d3.extent(this.data.history, ({timestamp}) => timestamp))
      .range([this.margin.left, this.width - this.margin.right]);
  }

  private addSignaturesAxisY(): void {
    this.y = d3.scaleLinear()
      .domain([0, d3.max(this.data.history, ({price}) => price)]).nice()
      .range([this.height - this.margin.bottom, this.margin.top]);
  }

  private addLine(): void {
    this.line = d3.line()
      .curve(d3.curveStep)
      .defined(({price}: any) => !isNaN(price))
      .x(({timestamp}: any) => this.x(timestamp))
      .y(({price}: any) => this.y(price));
  }

  private createSVG(): void {
    this.svg = d3.select(this.chartContainer.nativeElement).append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('-webkit-tap-highlight-color', 'transparent')
      .style('overflow', 'visible');

    this.svg.append('g')
      .call(this.xAxis);

    this.svg.append('g')
      .call(this.yAxis);

    this.svg.append('path')
      .datum(this.data.history)
      .attr('fill', 'none')
      .attr('stroke', this.colors)
      .attr('stroke-width', 1)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', this.line);
  }

  private addListeners(): void {
    this.tooltip = this.svg.append('g');
    this.svg.on('mousemove', () => this.mousemove());
    this.svg.on('mouseleave', () => this.tooltip.call(this.showTooltip, null));
  }

  private createChart(): SVGElement | number {
    if (!this.data.history.length) {
      return;
    }

    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.addSignaturesAxisX();
    this.addSignaturesAxisY();
    this.createAxisX();
    this.createAxisY();
    this.addLine();
    this.createSVG();
    this.addListeners();

    return this.svg.node();
  }

  private showTooltip(g, value: string | null) {
    if (!value) {
      return g.style('display', 'none');
    }

    g
      .style('display', null)
      .style('pointer-events', 'none')
      .style('font', '10px sans-serif');

    const path = g.selectAll('path')
      .data([null])
      .join('path')
      .attr('fill', 'white')
      .attr('stroke', 'black');

    const text = g.selectAll('text')
      .data([null])
      .join('text')
      .call((textInside) => textInside
        .selectAll('tspan')
        .data((value + '').split(/\n/))
        .join('tspan')
        .attr('x', 0)
        .attr('y', (d, i) => `${i * 1.1}em`)
        .style('font-weight', (_, i) => i ? null : 'bold')
        .text(d => d));

    const {x, y, width: w, height: h} = text.node().getBBox();

    text.attr('transform', `translate(${-w / 2},${38 - y})`);
    path.attr('d', `M${-10},35H-10l10,-35l0,0H${0}v${0}h-${ 0}z`)
      .attr('class', 'tooltip');
  }

  private searchPoint(coordMouse: [number, number]): HistoryPoint {
    const bisectData = d3.bisector(({timestamp}) => timestamp).left;
    const date = this.x.invert(coordMouse[0]);
    const index = bisectData(this.data.history.sort(({timestamp: f}, {timestamp: s}) => f - s), date, 1);
    const a = this.data.history[index - 1];
    const b = this.data.history[index];
    return Number(date) - (a && a.timestamp) > (b && b.timestamp) - Number(date) ? b : a;
  }

  private mousemove(): void {
  const {price, timestamp} = this.searchPoint(d3.mouse(this.chartContainer.nativeElement));
  this.tooltip
    .attr('transform', `translate(${this.x(timestamp)},${this.y(price)})`)
    .call(this.showTooltip,
      `$${price} USD
      ${new Date(timestamp).toLocaleString(undefined,
        {month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'})}`);
  }
}
