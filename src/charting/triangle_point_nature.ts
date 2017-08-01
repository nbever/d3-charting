
import { PointNature } from './model/point_nature';


class TrianglePointNature extends PointNature {
  getNatureName() {
    return 'triangle';
  }

  drawShape(appender) {
    return appender.append('polygon');
  }

  setShapeAttrs(shape, chartInfo) {
    return shape.attr('points', (d, i, nodes) => this.buildPoints(d, nodes, chartInfo));
  }

  buildPoints(data, nodes, chartInfo) {
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
