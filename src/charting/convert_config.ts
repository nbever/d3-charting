
import * as _ from 'lodash';
import { ChartConfiguration, ChartNatureSpec, ChartNatures } from './base_chart_config';
import { LineNature } from '../charting/line_nature';
import { BarNature } from '../charting/bar_nature';
import { StackedBarNature } from '../charting/stacked_bar_nature';
import { AxisNature } from '../charting/axis_nature';
import { HoverAxisNature } from '../charting/hover_axis_nature';
import CirclePointNature from '../charting/circle_point_nature';
import TrianglePointNature from '../charting/triangle_point_nature';


export const convertConfig = (src: ChartConfiguration) => {
  const dest0 = _.map(src.natures, (nature) => {
    return ({
      ...nature,
      ctor: nature.nature === 'line' ? LineNature :
        nature.nature === 'bar' ? BarNature :
          nature.nature === 'stackedBar' ? StackedBarNature :
            nature.nature === 'axis' ? AxisNature :
              nature.nature === 'hoverAxis' ? HoverAxisNature :
                nature.nature === 'circlePoint' ? CirclePointNature :
                  nature.nature === 'trianglePoint' ? TrianglePointNature : 
                  () => { throw new Error('invalid nature provided') }
    })
  });

  const dest = _.map(dest0, (d: any) => {
    return _.map(d.specs, (spec: any) => {
      return new d.ctor(spec)
    });
  });

  return dest;
}