import * as d3 from 'd3';
import { Nature } from './model/nature';
import DrawSpec from './model/draw_spec';

class LineNature extends Nature {
  initialize(svg, chartInfo, series) {
    this.lineGroup = svg.append('g').attr('class', 'line_nature');
    const lines = this.lineGroup.selectAll('.line_nature_path').data(series[0]).enter()
      .append('g')
      .attr('class', 'line_nature_path_group');
    lines.append('path')
      .attr('class', 'line_nature_path')
      .attr('d', (d, i) => this.getLineMethod(this.specs[i], chartInfo)(d.datapoints))
      .attr('stroke', (d, i) => this.specs[i].color)
      .attr('stroke-width', (d, i) => this.specs[i].thickness)
      .attr('fill', 'none');
  }

  draw(svg, chartInfo, series) {
    if (_.isUndefined(this.lineGroup)) {
      this.initialize(svg, chartInfo, series);
    }

    this.lineGroup.selectAll('.line_nature_path')
      .data(series[0])
      .transition()
      .attr('d', (d, i) => {
        if (this.specs[i].show === false) {
          return () => {};
        }

        return this.getLineMethod(this.specs[i], chartInfo)(d.datapoints);
      });
  }

  getLineMethod(spec, chartInfo) {
    return d3.line()
      .x(d => this.getXScale(spec, chartInfo)(d.x))
      .y(d => this.getYScale(spec, chartInfo)(d.y));
  }
}

class LineSpec extends DrawSpec {
  get color() {
    return this.getValue(this.props.color, 'black', _.isString);
  }

  get thickness() {
    return this.getValue(this.props.thickness, 1.0, _.isNumber);
  }
}

export { LineNature, LineSpec };
