import * as d3 from 'd3';
import { Nature, IspecsObj } from './model/nature';
import {DrawSpec, ISpecInitProp} from './model/draw_spec';

import * as _ from 'lodash';


import { IChartDataObject, IScaleObject, ISeries, Ixy } from './util/chartinfo_factory';
import ChartInfo from './model/chart_info';
class LineNature extends Nature {
  private lineGroup: any;
  handleEvent() { }

  constructor(public specs: LineSpec[]) {
    super(specs)
  }

  initialize(svg: d3.Selection<SVGElement, ISeries[][], HTMLElement, any>, chartInfo: ChartInfo, series: ISeries[][]) {
    this.lineGroup = svg.append('g').attr('class', 'line_nature');
    const lines = this.lineGroup.selectAll('.line_nature_path').data(series[0]).enter()
      .append('g')
      .attr('class', 'line_nature_path_group');
    lines.append('path')
      .attr('class', 'line_nature_path')
      .attr('d', (d: any, i: any) => this.getLineMethod(this.specs[i], chartInfo)(d.datapoints))
      .attr('stroke', (d: any, i: any) => this.specs[i].color)
      .attr('stroke-width', (d: any, i: any) => this.specs[i].thickness)
      .attr('fill', 'none');
  }

  draw(svg: d3.Selection<SVGElement, ISeries[][], HTMLElement, any>, chartInfo: ChartInfo, series: ISeries[][]) {
    if (_.isUndefined(this.lineGroup)) {
      this.initialize(svg, chartInfo, series);
    }

    this.lineGroup.selectAll('.line_nature_path')
      .data(series[0])
      .transition()
      .attr('d', (d: any, i: any) => {
        if ((<any>this.specs)[i].show === false) {
          return () => { };
        }

        return this.getLineMethod(this.specs[i], chartInfo)(d.datapoints);
      });
  }

  getLineMethod(spec: any, chartInfo: ChartInfo) {
    return d3.line()
      .x(d => this.getXScale(spec, chartInfo)((<any>d).x))
      .y(d => this.getYScale(spec, chartInfo)((<any>d).y));
  }
}

export interface LineSpecInitProps extends ISpecInitProp{
  key: string,
  color?: string,
  thickness?: number
};

class LineSpec extends DrawSpec<LineSpecInitProps> implements IspecsObj {

  constructor(props: LineSpecInitProps) {
    super(props);
  }

  get color() {
    return this.getValue(this.props.color, 'black', _.isString);
  }

  get thickness() {
    return this.getValue(this.props.thickness, 1.0, _.isNumber);
  }
}

export { LineNature, LineSpec };
