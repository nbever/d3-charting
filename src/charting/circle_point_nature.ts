
import { PointNature } from './point_nature';

import ChartInfo  from './model/chart_info';

class CirclePointNature extends PointNature {
  getNatureName() {
    return 'dot';
  }

  drawShape(appender: any) {
    return appender.append('circle');
  }

  setShapeAttrs(shape: any, chartInfo: ChartInfo) {
    return shape.attr('cx', (d: any, i: any, nodes: any) => {
      const spec = this.getSpecFromChild(nodes[0]);
      return this.getXScale(spec, chartInfo)(d.x);
    })
      .attr('cy', (d: any, i: any, nodes: any) => {
        const spec = this.getSpecFromChild(nodes[0]);
        return this.getYScale(spec, chartInfo)(d.y);
      })
      .attr('r', (d: any, i: any, nodes: any) => this.getSpecFromChild(nodes[0]).radius);
  }

  countElements() {
    return this.pointGroup.selectAll('circle').size();
  }
}

export default CirclePointNature ;
