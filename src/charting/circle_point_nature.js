import * as d3 from 'd3';
import Nature from './model/point_nature.js';
import {PointNature} from './model/point_nature.js';

class CirclePointNature extends PointNature {

  getNatureName() {
    return 'dot';
  }

  drawShape(appender) {
    return appender.append('circle');
  }

  setShapeAttrs(shape, chartInfo) {
    return shape.attr('cx', (d, i, nodes) => {
      const spec = this.getSpecFromChild(nodes[0]);
      return this.getXScale(spec, chartInfo)(d.x);
    })
    .attr('cy', (d, i, nodes) => {
      const spec = this.getSpecFromChild(nodes[0]);
      return this.getYScale(spec, chartInfo)(d.y)
    })
    .attr('r', (d,i,nodes) => this.getSpecFromChild(nodes[0]).radius);
  }

  countElements() {
    return this.pointGroup.selectAll('circle').size();
  }

}

export {CirclePointNature};
