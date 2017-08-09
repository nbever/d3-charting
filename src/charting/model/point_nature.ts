
import { Nature } from './nature';
import DrawSpec from './draw_spec';
import ChartEvent from './chart_event';

import ChartInfo from '../model/chart_info';

import { IChartDataObject, IScaleObject, ISeries, Ixy } from '../util/chartinfo_factory';

import * as _ from 'lodash';

class PointNature extends Nature {

  public pointGroup: any;
  initialize(svg: d3.Selection<SVGElement, ISeries[][], HTMLElement, any>, chartInfo: ChartInfo, series: ISeries[][]) { // 
    this.pointGroup = svg.append('g').attr('class', `${this.getNatureName()}_nature`);
  }

  handleEvent() { }

  buildNewShapes(chartInfo: ChartInfo, series: ISeries[][]) {
    this.pointGroup.selectAll(`.${this.getNatureName()}_group`).remove();

    const points = this.pointGroup.selectAll(`.${this.getNatureName()}_nature`).data(series[0]).enter()
      .append('g')
      .attr('class', `${this.getNatureName()}_group`)
      .attr('data-spec-index', (d: any, i: any) => i);

    const appender = points
      .selectAll(`.${this.getNatureName()}`)
      .data((d: any) => d.datapoints)
      .enter();

    this.drawShape(appender)
      .on('mouseover', (d: any, i: any, nodes: any) => {
        const spec = this.getSpecFromChild(nodes[0]);
        chartInfo.fireEvent(new ChartEvent('mouseover', d, spec));
      })
      .on('mouseout', (d: any, i: any, nodes: any) => {
        const spec = this.getSpecFromChild(nodes[0]);
        chartInfo.fireEvent(new ChartEvent('mouseout', d, spec));
      })
      .attr('class', `${this.getNatureName()}`);
  }

  draw(svg: d3.Selection<SVGElement, ISeries[][], HTMLElement, any>, chartInfo: ChartInfo, series: ISeries[][]) {
    if (_.isUndefined(this.pointGroup)) {
      this.initialize(svg, chartInfo, series);
    }

    const elmCount = this.countElements();
    const points = (<any[]><any>series[0]).reduce((total: any, s: any) => total + s.datapoints.length, 0);

    if (points !== elmCount) {
      this.buildNewShapes(chartInfo, series);
    }

    const shape = this.pointGroup.selectAll(`.${this.getNatureName()}_group`)
      .data(series[0])
      .attr('visibility', (d: any, i: any) => { // , nodes
        if (this.specs[i].show === false) {
          return 'hidden';
        }

        return 'visible';
      })
      .selectAll(`.${this.getNatureName()}`)
      .data((d: any) => d.datapoints)
      .transition();

    this.setShapeAttrs(shape, chartInfo)
      .attr('stroke', (d: any, i: any, nodes: any) => this.getSpecFromChild(nodes[0]).stroke)
      .attr('stroke-width', (d: any, i: any, nodes: any) => this.getSpecFromChild(nodes[0]).strokeWidth)
      .attr('fill', (d: any, i: any, nodes: any) => this.getSpecFromChild(nodes[0]).fill)
      .attr('fill-opacity', (d: any, i: any, nodes: any) => this.getSpecFromChild(nodes[0]).opacity)
      .attr('cursor', (d: any, i: any, nodes: any) => this.getSpecFromChild(nodes[0]).cursor);
  }

  countElements() {
    throw new Error('countElements is not implemented!');
  }

  drawShape(appender?: any): any { // appender
    throw new Error('drawShape is not implemented!');
  }

  setShapeAttrs(arg1?: any, arg2?: any): any { // shape
    throw new Error('setShapeAttrs is not implemented!');
  }

  getNatureName() {
    return 'point';
  }

  getSpecFromChild(child: any) {
    if (_.isUndefined(child)) {
      return undefined;
    }

    return this.specs[parseInt(child.parentNode.getAttribute('data-spec-index'), 10)];
  }
}
export interface PointSpecInitProp {
  key: string, 
  stroke?: string, 
  fill?: string, 
  radius?: number, 
  cursor?: string,
  opacity?: number
};

class PointSpec extends DrawSpec {

  constructor(props: PointSpecInitProp) {
    super(props);
  }

  get radius() {
    return this.getValue(this.props.radius, 10, <any>_.isNumber);
  }

  get stroke() {
    return this.getValue(this.props.stroke, 'black', _.isString);
  }

  get strokeWidth() {
    return this.getValue(this.props.strokeWidth, 1, _.isNumber);
  }

  get fill() {
    return this.getValue(this.props.fill, 'transparent', _.isString);
  }

  get opacity() {
    return this.getValue(this.props.opacity, 1.0, _.isNumber);
  }
}

export { PointSpec, PointNature };
