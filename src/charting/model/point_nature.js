import * as d3 from 'd3';
import Nature from './nature.js';
import DrawSpec from './draw_spec.js';
import ChartEvent from './chart_event.js';

class PointNature extends Nature {

  initialize(svg, chartInfo, series) {
    this.pointGroup = svg.append('g').attr('class', `${this.getNatureName()}_nature`);
  }

  buildNewShapes(chartInfo, series) {
    this.pointGroup.selectAll(`.${this.getNatureName()}_group`).remove();

    const points = this.pointGroup.selectAll(`.${this.getNatureName()}_nature`).data(series[0]).enter()
      .append('g').attr('class',`${this.getNatureName()}_group`).attr('data-spec-index', (d,i) => i);

    const appender = points.selectAll(`.${this.getNatureName()}`).data( d => d.datapoints).enter();

    this.drawShape(appender)
      .on('mouseover', (d,i,nodes) => {
        const spec = this.getSpecFromChild(nodes[0]);
        chartInfo.fireEvent( new ChartEvent('mouseover', d, spec));
      })
      .on('mouseout', (d, i, nodes) => {
        const spec = this.getSpecFromChild(nodes[0]);
        chartInfo.fireEvent( new ChartEvent('mouseout', d, spec));
      })
      .attr('class', `${this.getNatureName()}`);
  }

  draw(svg, chartInfo, series) {
    if (_.isUndefined(this.pointGroup)) {
      this.initialize(svg, chartInfo, series);
    }

    const elmCount = this.countElements();
    const points = series[0].reduce((total,s) => {
      return total + s.datapoints.length;
    }, 0);

    if (points !== elmCount) {
      this.buildNewShapes(chartInfo, series);
    }

    const shape = this.pointGroup.selectAll(`.${this.getNatureName()}_group`)
      .data(series[0])
      .attr('visibility', (d,i,nodes) => {
        if (this.specs[i].show === false){
          return 'hidden';
        }

        return 'visible';
      })
      .selectAll(`.${this.getNatureName()}`)
      .data(d => d.datapoints)
      .transition();

    this.setShapeAttrs(shape, chartInfo)
      .attr('stroke', (d,i,nodes) => this.getSpecFromChild(nodes[0]).stroke)
      .attr('stroke-width', (d,i,nodes) => this.getSpecFromChild(nodes[0]).strokeWidth)
      .attr('fill', (d,i,nodes) => this.getSpecFromChild(nodes[0]).fill)
      .attr('fill-opacity', (d,i,nodes) => this.getSpecFromChild(nodes[0]).opacity)
      .attr('cursor', (d, i, nodes) => this.getSpecFromChild(nodes[0]).cursor);
  }

  countElements() {
    throw 'countElements is not implemented!';
  }

  drawShape(appender) {
    throw 'drawShape is not implemented!';
  }

  setShapeAttrs(shape) {
    throw 'setShapeAttrs is not implemented!';
  }

  getNatureName() {
    return 'point';
  }

  getSpecFromChild(child) {
    if(_.isUndefined(child)) {
      return undefined;
    }

    return this.specs[parseInt(child.parentNode.getAttribute('data-spec-index'))];
  }
}

class PointSpec extends DrawSpec {

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

export {PointSpec,PointNature};
