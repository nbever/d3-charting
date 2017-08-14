import { Nature, IspecsObj } from './model/nature';
import { DrawSpec, ISpecInitProp } from './model/draw_spec';
import ChartEvent from './model/chart_event';

import { IChartDataObject, IScaleObject, ISeries, Ixy } from './util/chartinfo_factory';
import ChartInfo from './model/chart_info';

import * as _ from 'lodash';

export class BarNature extends Nature {
  public barGroup: d3.Selection<SVGGElement, ISeries[][], HTMLElement, any>;
  public handleEvent() { }

  initialize(svg: d3.Selection<SVGElement, ISeries[][], HTMLElement, any>,
    chartInfo: ChartInfo,
    series: ISeries[][]) { // , chartInfo, series
    this.barGroup = svg.append<SVGGElement>('g').attr('class', 'bar_nature');
  }

  buildNewBars(chartInfo: ChartInfo, series: ISeries[][]) {
    this.barGroup.selectAll('.bar_group').remove();

    const bars = this.barGroup
      .selectAll('.bar_group')
      .data(series[0])
      .enter()
      .append('g')
      .attr('class', 'bar_group')
      .attr('data-spec-index', (d: any, i: any) => i);

    const theBars = bars.selectAll('.bar')
      .data((d: any) => d.datapoints)
      .enter()
      .append('rect')
      .on('mouseover', (d: any, i: any, nodes: any) => {
        const spec = this.getSpecFromChild(nodes[0]);
        chartInfo.fireEvent(new ChartEvent('mouseover', d, spec));
      })
      .on('mouseout', (d: any, i: any, nodes: any) => {
        const spec = this.getSpecFromChild(nodes[0]);
        chartInfo.fireEvent(new ChartEvent('mouseout', d, spec));
      })
      .attr('class', 'bar');

    bars.selectAll('.bar-outline')
      .data((d: any) => d.datapoints)
      .enter()
      .append('polyline')
      .attr('class', 'bar-outline');
  }

  draw(svg: d3.Selection<SVGElement, ISeries[][], HTMLElement, any>, chartInfo: ChartInfo, series: ISeries[][]) {
    if (_.isUndefined(this.barGroup)) {
      this.initialize(svg, chartInfo, series);
    }

    if (this.needToBuildNewBars(series)) {
      this.buildNewBars(chartInfo, series);
    }

    const maxBarWidth = this.calculateBarWidth(chartInfo, series);

    this.barGroup.selectAll('.bar_group')
      .data<ISeries>(series[0])
      .attr('visibility', (d: any, i: any) => { // , nodes
        if ((<any>this.specs)[i].show === false) {
          return 'hidden';
        }

        return 'visible';
      })
      .selectAll('.bar')
      .data((d: any) => d.datapoints)
      .transition()
      .attr('width', (d: any, i: any, nodes: any) => this.getWidth(d, i, nodes, maxBarWidth))
      .attr('height', (d: any, i: any, nodes: any) => this.getHeight(d, i, nodes, chartInfo))
      .attr('x', (d: any, i: any, nodes: any) => this.getXCoord(d, i, nodes, maxBarWidth, chartInfo))
      .attr('y', (d: any, i: any, nodes: any) => this.getYCoord(d, i, nodes, chartInfo))
      .attr('fill', (d: any, i: any, nodes: any) => this.getSpecFromChild(nodes[0]).fill)
      .attr('fill-opacity', (d: any, i: any, nodes: any) => this.getSpecFromChild(nodes[0]).opacity)
      .attr('cursor', (d: any, i: any, nodes: any) => this.getSpecFromChild(nodes[0]).cursor);

    this.barGroup.selectAll('.bar_group')
      .data(series[0])
      .selectAll('.bar-outline')
      .data((d: any) => d.datapoints)
      .transition()
      .attr('points', (d: any, i: any, nodes: any) => this.buildLine(d, i, nodes, maxBarWidth, chartInfo))
      .attr('stroke-width', (d: any, i: any, nodes: any) => this.getSpecFromChild(nodes[0]).strokeWidth)
      .attr('fill', 'none')
      .attr('stroke', (d: any, i: any, nodes: any) => this.getSpecFromChild(nodes[0]).stroke);
  }

  buildLine(data: any, index: any, nodes: any, maxBarWidth: any, chartInfo: ChartInfo) {
    const x = this.getXCoord(data, index, nodes, maxBarWidth, chartInfo);
    const y = this.getYCoord(data, index, nodes, chartInfo);
    const width = this.getWidth(data, index, nodes, maxBarWidth);
    const height = this.getHeight(data, index, nodes, chartInfo);

    const blPoint = `${x},${y + height}`;
    const tlPoint = `${x},${y}`;
    const trPoint = `${x + width},${y}`;
    const brPoint = `${x + width},${y + height}`;

    return `${blPoint} ${tlPoint} ${trPoint} ${brPoint}`;
  }

  getXCoord(d: any, i: any, nodes: any, maxBarWidth: any, chartInfo: ChartInfo) {
    const spec = this.getSpecFromChild(nodes[0]);
    const percWidth = spec.barWidth;
    const realWidth = Math.floor(maxBarWidth * (percWidth / 100.0));
    return this.getXScale(spec, chartInfo)(d.x) - (realWidth / 2);
  }

  getYCoord(d: any, i: any, nodes: any, chartInfo: ChartInfo) {
    const spec = this.getSpecFromChild(nodes[0]);
    return this.getYScale(spec, chartInfo)(d.y);

    // return chartInfo.yRange.max - this.getYScale(spec, chartInfo)(d.y);
  }

  getWidth(d: any, i: any, nodes: any, maxBarWidth: any) {
    const percWidth = this.getSpecFromChild(nodes[0]).barWidth;
    return Math.floor(maxBarWidth * (percWidth / 100.0));
  }

  getHeight(d: any, i: any, nodes: any, chartInfo: ChartInfo) {
    const spec = this.getSpecFromChild(nodes[0]);
    const y0 = _.isUndefined(d.y0) ? 0 : d.y0;

    const height = this.getYScale(spec, chartInfo)(d.y) -
      this.getYScale(spec, chartInfo)(y0) + chartInfo.yRange.min;
    return height > 0 ? height : height * -1;
  }

  calculateBarWidth(chartInfo: any, series: any) {
    const points = series[0].reduce((total: any, s: any) => Math.max(total, s.datapoints.length), 0);

    return Math.floor((chartInfo.xRange.max - chartInfo.xRange.min) / points);
  }

  needToBuildNewBars(series: ISeries[][]) {
    const circleCount = this.countBars();
    const points = series[0].reduce((total: any, s: any) => total + s.datapoints.length, 0);

    return (circleCount !== points);
  }

  countBars() {
    return this.barGroup.selectAll('rect').size();
  }

  getSpecFromChild(child: any) {
    if (_.isUndefined(child)) {
      return undefined;
    }

    return this.specs[parseInt(child.parentNode.getAttribute('data-spec-index'), 10)];
  }
}

export interface BarSpecInitProps extends ISpecInitProp {
  key: string,
  strokeWidth?: number,
  stroke?: string,
  strokeOpacity?: number,
  fill?: string,
  opacity?: number,
  barWidth?: number,
  useGlobalScale?: boolean,
  cursor?: string
};



export class BarSpec<T extends BarSpecInitProps> extends DrawSpec<T> implements IspecsObj {

  constructor(props: T) {
    super(props);

  }

  get barWidth() {
    return this.getValue(this.props.barWidth, 50, _.isNumber);
  }

  get fill() {
    return this.getValue(this.props.fill, 'black', _.isString);
  }

  get strokeWidth() {
    return this.getValue(this.props.strokeWidth, 1.0, _.isNumber);
  }

  get opacity() {
    return this.getValue(this.props.opacity, 1.0, _.isNumber);
  }

  get stroke() {
    return this.getValue(this.props.stroke, 'black', _.isString);
  }

  get strokeOpacity() {
    return this.getValue(this.props.strokeOpacity, 1.0, _.isNumber);
  }
}

