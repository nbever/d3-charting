import { expect } from 'chai';

import { ChartConfiguration } from '../../src/charting/base_chart_config';
import { LineSpec } from '../../src/charting/line_nature';
import { BarSpec } from '../../src/charting/bar_nature';
import { AxisSpec } from '../../src/charting/axis_nature';
import { PointSpec } from '../../src/charting/point_nature';
import { StackedBarSpec } from '../../src/charting/stacked_bar_nature';

// please note that these test are analysed by the type checker 
// and if there are no build errors or only the expected build errors 
// they can be considered passing

describe('config object types work', () => {


  it('should let me combine a line with a linespec', () => {
    const t1 = <ChartConfiguration>{};
    t1.natures = [{
      nature: 'line',
      specs: [new LineSpec({ key: 'l1' })]
    }];
    expect(true).to.equal(true);
  });

  it('should let me combine a bar with a barspec', () => {
    const t1 = <ChartConfiguration>{};
    t1.natures = [{
      nature: 'bar',
      specs: [new BarSpec({
        key: 'l1',
        strokeWidth: 2,
        stroke: 'purple',
        fill: 'yellow',
        opacity: 0.4,
        barWidth: 10,
        useGlobalScale: false,
        cursor: 'pointer'
      })]
    }];
    expect(true).to.equal(true);
  });

  it('should let me combine a axis with a axisspec', () => {
    const t1 = <ChartConfiguration>{};
    t1.natures = [{
      nature: 'axis',
      specs: new AxisSpec({
        key: 'l1'
      })
    }];
    expect(true).to.equal(true);
  });

  it('should let me combine a circlepoint with a pointspec', () => {
    const t1 = <ChartConfiguration>{};
    t1.natures = [{
      nature: 'circlePoint',
      specs: [new PointSpec({
        key: 'l1',
        stroke: 'purple',
        fill: 'yellow',
        opacity: 0.4,
        cursor: 'pointer'
      })]
    }];
    expect(true).to.equal(true);
  });


  it('should let me combine a stackedbar with a stackedbarspec', () => {
    const t1 = <ChartConfiguration>{};
    t1.natures = [{
      nature: 'stackedBar',
      specs: [new StackedBarSpec({
        key: 'l1',
        stroke: 'purple',
        fill: 'yellow',
        opacity: 0.4,
        cursor: 'pointer'
      })]
    }];
    expect(true).to.equal(true);
  });


  it('should not let me combine a line with a barspec, type checker should complain', () => {
    const t1 = <ChartConfiguration>{};
    // t1.natures = [{
    //   nature: 'line',
    //   specs: [new BarSpec({ key: 'l1'})]
    // }];
    expect(true).to.equal(true);
  });

})