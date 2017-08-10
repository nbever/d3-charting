
import * as _ from 'lodash';
import { ChartConfiguration, ChartNatureSpec, ChartNatures, ChartSpecs } from './base_chart_config';
import { LineNature } from '../charting/line_nature';
import { BarNature } from '../charting/bar_nature';
import { StackedBarNature } from '../charting/stacked_bar_nature';
import { AxisNature } from '../charting/axis_nature';
import { HoverAxisNature } from '../charting/hover_axis_nature';
import CirclePointNature from '../charting/circle_point_nature';
import TrianglePointNature from '../charting/triangle_point_nature';





import { LineSpec } from '../charting/line_nature';
import { BarSpec } from '../charting/bar_nature';
import { AxisSpec } from '../charting/axis_nature';
import { PointSpec } from '../charting/point_nature';
import { StackedBarSpec } from '../charting/stacked_bar_nature';



export const convertConfig: (src: ChartConfiguration) => ChartNatures[] = (src: ChartConfiguration) => {
  const dest0 = _.map(src.natures, (nature) => {
    let tempNctor: any = LineNature;
     if (nature.nature === 'line') {
      // tempNctor = <ChartNatures><any>LineNature;
      tempNctor = LineNature;
      
    }
    else if (nature.nature === 'bar') {
      tempNctor = BarNature;
      
    }
    else if (nature.nature === 'stackedBar') {
      tempNctor = StackedBarNature;
      
    }
    else if (nature.nature === 'axis') {
      tempNctor = AxisNature;
      
    }
    else if (nature.nature === 'hoverAxis') {
      tempNctor = HoverAxisNature;
      
    }
    else if (nature.nature === 'circlePoint') {
      tempNctor = CirclePointNature;
      
    }
    else if (nature.nature === 'trianglePoint') {
      tempNctor = TrianglePointNature;
      
    }

    return ({ ...nature, Nctor: tempNctor});

  });

  const dest: ChartNatures[] =
    _.map(dest0, (d) => {
        return (new d.Nctor(d.specs));
      
    });

  return dest;
}