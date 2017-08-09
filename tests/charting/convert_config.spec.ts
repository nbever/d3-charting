import { expect } from 'chai';

import { ChartConfiguration } from '../../src/charting/base_chart_config';
import { LineSpec } from '../../src/charting/line_nature';
import { BarSpec } from '../../src/charting/bar_nature';
import { AxisSpec } from '../../src/charting/axis_nature';
import { PointSpec } from '../../src/charting/model/point_nature';
import { StackedBarSpec } from '../../src/charting/stacked_bar_nature';



import { convertConfig } from '../../src/charting/convert_config';



describe('config object conversions work', () => {

  it('converts config object to the original format, using one nature', () => {
    const t1 = <ChartConfiguration>{};
    t1.natures = [{
      nature: 'line',
      specs: [new LineSpec({ key: 'l1' }), new LineSpec({ key: 'l1' })]
    }];
    const c1 = convertConfig(t1);

    expect(c1.length).to.equal(1);
  });



  it('converts to config object to the original format using two natures and  multiple specs', () => {
    const t1 = <ChartConfiguration>{};
    t1.natures = [{
      nature: 'line',
      specs: [new LineSpec({ key: 'l1' }), new LineSpec({ key: 'l1' })]
    }, {
      nature: 'bar',
      specs: [new BarSpec({ key: 'l1' }), new BarSpec({ key: 'l1' })]
    }];
    const c1 = convertConfig(t1);

    expect(c1.length).to.equal(2);
  });


  it('converts to config object to the original format using two natures and one spec each', () => {
    const t1 = <ChartConfiguration>{};
    t1.natures = [{
      nature: 'line',
      specs: [new LineSpec({ key: 'l1' })]
    }, {
      nature: 'bar',
      specs: [new BarSpec({ key: 'l1' })]
    }];
    const c1 = convertConfig(t1);

    expect(c1.length).to.equal(2);
  });

})