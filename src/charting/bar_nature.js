import * as d3 from 'd3';
import Nature from './model/nature.js';
import DrawSpec from './model/draw_spec.js';
import ChartEvent from './model/chart_event.js';

class BarNature extends Nature {

  initialize(svg, chartInfo, series) {
    this.barGroup = svg.append('g').attr('class', 'bar_nature');
  }

  buildNewBars(chartInfo, series) {
    this.barGroup.selectAll('.bar_group').remove();

    const bars = this.barGroup.selectAll('.bar_group')
      .data(series[0])
      .enter()
      .append('g').attr('class', 'bar_group')
      .attr('data-spec-index', (d,i) => i );

    bars.selectAll('.bar')
      .data( d => d.datapoints)
      .enter()
      .append('rect')
      .on('mouseover', (d, i, nodes) => {
        chartInfo.fireEvent( new ChartEvent('mouseover', d, this.getSpecFromChild(nodes[0]).getKey(), chartInfo));
      })
      .on('mouseout', (d, i, nodes) => {
        chartInfo.fireEvent( new ChartEvent('mouseout', d, this.getSpecFromChild(nodes[0]).getKey(), chartInfo));
      })
      .attr('class', 'bar');
  }

  draw(svg, chartInfo, series) {
    if (_.isUndefined(this.barGroup)) {
      this.initialize(svg, chartInfo, series);
    }

    if (this.needToBuildNewBars(series)){
      this.buildNewBars(chartInfo, series);
    }

    const maxBarWidth = this.calculateBarWidth(chartInfo, series);

    this.barGroup.selectAll('.bar_group')
      .data(series[0])
      .attr('visibility', (d,i,nodes) => {
        if (this.specs[i].show === false){
          return 'hidden';
        }

        return 'visible';
      })
      .selectAll('.bar')
      .data( d => d.datapoints)
      .transition()
      .attr('width', (d, i, nodes) => {
        const percWidth = this.getSpecFromChild(nodes[0]).barWidth;
        return Math.floor(maxBarWidth * (percWidth/100.0));
      })
      .attr('height', (d, i, nodes) => {
        const spec = this.getSpecFromChild(nodes[0]);
        return chartInfo.yRange.max - this.getYScale(spec, chartInfo)(d.y);
      })
      .attr('x', (d, i, nodes) => {
        const spec = this.getSpecFromChild(nodes[0]);
        const percWidth = spec.barWidth;
        const realWidth = Math.floor(maxBarWidth * (percWidth/100.0));
        return this.getXScale(spec, chartInfo)(d.x) - (realWidth/2);
      })
      .attr('y', (d, i, nodes) => {
        const spec = this.getSpecFromChild(nodes[0]);
        return this.getYScale(spec, chartInfo)(d.y)
      })
      .attr('stroke-width', (d,i,nodes) => this.getSpecFromChild(nodes[0]).strokeWidth)
      .attr('fill', (d,i,nodes) => this.getSpecFromChild(nodes[0]).fill)
      .attr('fill-opacity', (d,i,nodes) => this.getSpecFromChild(nodes[0]).opacity);
  }

  calculateBarWidth(chartInfo, series) {
    const points = series[0].reduce((total,s) => {
      return total + s.datapoints.length;
    }, 0);

    return Math.floor((chartInfo.xRange.max - chartInfo.xRange.min) / points);
  }

  needToBuildNewBars(series) {

    const circleCount = this.countBars();
    const points = series[0].reduce((total,s) => {
      return total + s.datapoints.length;
    }, 0);

    return (circleCount !== points);
  }

  countBars() {
    return this.barGroup.selectAll('rect').size();
  }

  getSpecFromChild(child) {
    if(_.isUndefined(child)) {
      return undefined;
    }

    return this.specs[parseInt(child.parentNode.getAttribute('data-spec-index'))];
  }
}

class BarSpec extends DrawSpec {

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
}

export {BarNature,BarSpec};
