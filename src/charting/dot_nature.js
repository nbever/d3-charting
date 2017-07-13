import * as d3 from 'd3';
import Nature from './nature.js';
import DrawSpec from './draw_spec.js';

class DotNature extends Nature {

  initialize(svg, chartInfo, series) {
    this.dotGroup = svg.append('g').attr('class', 'dot_nature');
  }

  buildNewDots(chartInfo, series) {
    this.dotGroup.selectAll('.dot_group').remove();

    const dots = this.dotGroup.selectAll('.dot_nature').data(series[0]).enter()
      .append('g').attr('class','dot_group').attr('data-spec-index', (d,i) => i);

    dots.selectAll('.dot').data( d => d.datapoints).enter()
      .append('circle')
      .on('mouseover', (d,i,nodes) => {
      })
      .attr('class', 'dot');
  }

  draw(svg, chartInfo, series) {
    if (_.isUndefined(this.dotGroup)) {
      this.initialize(svg, chartInfo, series);
    }

    const circleCount = this.countCircles();
    const points = series[0].reduce((total,s) => {
      return total + s.datapoints.length;
    }, 0);

    if (points !== circleCount) {
      this.buildNewDots(chartInfo, series);
    }

    this.dotGroup.selectAll('.dot_group')
      .data(series[0])
      .attr('visibility', (d,i,nodes) => {
        if (this.specs[i].show === false){
          return 'hidden';
        }

        return 'visible';
      })
      .selectAll('.dot')
      .data(d => d.datapoints)
      .transition()
      .attr('cx', d => {
        return chartInfo.scales.x(d.x);
      })
      .attr('cy', d => chartInfo.scales.y(d.y))
      .attr('stroke', (d,i,nodes) => this.getSpecFromChild(nodes[0]).stroke)
      .attr('stroke-width', (d,i,nodes) => this.getSpecFromChild(nodes[0]).strokeWidth)
      .attr('fill', (d,i,nodes) => this.getSpecFromChild(nodes[0]).fill)
      .attr('r', (d,i,nodes) => this.getSpecFromChild(nodes[0]).radius)
      .attr('fill-opacity', (d,i,nodes) => this.getSpecFromChild(nodes[0]).opacity);
  }

  countCircles() {
    return this.dotGroup.selectAll('circle').size();
  }

  getSpecFromChild(child) {
    if(_.isUndefined(child)) {
      return undefined;
    }

    return this.specs[parseInt(child.parentNode.getAttribute('data-spec-index'))];
  }
}

class DotSpec extends DrawSpec {

  get radius() {
    return this.getValue(this.props.radius, 10, _.isNumber);
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

export {DotSpec,DotNature};
