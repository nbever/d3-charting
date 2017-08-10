
import { PointNature } from './point_nature';

import ChartInfo from './model/chart_info';

import { IChartDataObject, IScaleObject, ISeries, Ixy } from './util/chartinfo_factory';

class TrianglePointNature extends PointNature {
  getNatureName() {
    return 'triangle';
  }
  handleEvent() { }

  drawShape(appender: any) {
    return appender.append('polygon');
  }

  setShapeAttrs(shape: any, chartInfo: ChartInfo) {
    return shape.attr('points', (d: any, i: any, nodes: any) => this.buildPoints(d, nodes, chartInfo));
  }

  buildPoints(data: any, nodes: any, chartInfo: ChartInfo) {
    const spec = this.getSpecFromChild(nodes[0]);
    const mX = this.getXScale(spec, chartInfo)(data.x);
    const mY = this.getYScale(spec, chartInfo)(data.y);
    const r = spec.radius;
    return `${mX},${mY - r} ${mX + r},${mY + r} ${mX - r},${mY + r}`;
  }

  countElements() {
    return this.pointGroup.selectAll('polygon').size();
  }
}

export default TrianglePointNature;
