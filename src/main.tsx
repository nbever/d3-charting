import * as React from 'react';
import { render } from 'react-dom';
import * as  $ from 'jquery';

import * as _ from 'lodash';

import Chart from './charting/base_chart';
import { LineSpec, LineNature } from './charting/line_nature';
import { AxisSpec, AxisNature } from './charting/axis_nature';
import { HoverAxisNature } from './charting/hover_axis_nature';
import { CirclePointNature } from './charting/circle_point_nature';
import TrianglePointNature from './charting/triangle_point_nature';
import { PointSpec } from './charting/model/point_nature';
import { BarNature, BarSpec } from './charting/bar_nature';
import { StackedBarNature, StackedBarSpec } from './charting/stacked_bar_nature';
import Header from './components/header';
import ChartBlock from './components/chart_block';
import { strings } from './utils/strings';

import * as styles from './styles/base.scss';

declare var require;
require('./styles/base.scss');

const stringPt: any = String.prototype;

stringPt.width = function monkeyWidth(font) {
  const o = $(`<div>${this}</div>`)
    .css({ position: 'absolute', float: 'left', 'white-space': 'nowrap', visibility: 'hidden', font })
    .appendTo($('body'));
  const w = o.width();
  o.remove();
  return w;
};

class App extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        l1: {
          datapoints: [
          ],
        },
        l2: {
          datapoints: [
          ],
        },
        l3: {
          datapoints: [],
        },
      },
      natures: [
        new BarNature([
          new BarSpec({
            key: 'l1',
            strokeWidth: 2,
            stroke: 'purple',
            fill: 'yellow',
            opacity: 0.4,
            barWidth: 10,
            useGlobalScale: false,
            cursor: 'pointer'
          }),
        ]),

        // new StackedBarNature([
        //   new StackedBarSpec({ key: 'l3',
        //     strokeWidth: 2,
        //     stroke: 'purple',
        //     fill: 'darkgreen',
        //     opacity: 0.4,
        //     barWidth: 10,
        //     cursor: 'pointer' }),
        //   new StackedBarSpec({ key: 'l2',
        //     strokeWidth: 2,
        //     stroke: 'black',
        //     fill: 'red',
        //     opacity: 0.4,
        //     barWidth: 10,
        //     cursor: 'pointer' }),
        // ]),

        new LineNature([
          new LineSpec({ key: 'l1', color: 'green', thickness: 2.0 }),
          new LineSpec({ key: 'l2', color: 'blue' }),
        ]),
        new CirclePointNature([
          new PointSpec({ key: 'l1', stroke: 'red', fill: 'blue', radius: 10, opacity: 0.3, cursor: 'pointer' }),
        ]),
        new TrianglePointNature([
          new PointSpec({ key: 'l2', stroke: 'green', fill: 'darkgray', radius: 3, cursor: 'pointer' }),
        ]),
        new AxisNature(new AxisSpec({ key: '', position: 'left', ticks: 3 })),
        new HoverAxisNature(new AxisSpec({
          key: '',
          position: 'left',
          ticks: 1,
          useGlobalScale: false,
          tickValues: AxisSpec.MAX_ONLY,
          strokeDashArray: '8,4',
          labelFunction: tick => parseInt(tick, 10).toFixed(2)
        })),
        new AxisNature(new AxisSpec({ key: '', position: 'bottom', ticks: 4, tickSizeOuter: 0 })),
      ],
    };
  }

  setVisibility(val, key) {
    const natures = this.state.natures;

    natures.forEach((n) => {
      if (_.isArray(n.specs)) {
        n.specs.forEach((s) => {
          if (s.getKey() == key) {
            s.show = val;
          }
        });
      } else if (n.specs.getKey() == key) {
        n.specs.show = val;
      }
    });

    this.setState({ ...this.state, natures });
  }


  buttonClicked() {
    const newState = this.state;
    const numbersToChange = Math.floor((Math.random() * 10) + 1);

    const newData = {
      l1: {
        datapoints: [
          { x: 0, y: 123 },
          { x: 1, y: 100 },
          { x: 2, y: 83 },
          { x: 3, y: 185 },
          { x: 4, y: 12 },
        ],
      },
      l2: {
        datapoints: [
          { x: 0, y: 45 },
          { x: 1, y: 72 },
          { x: 2, y: 6 },
          { x: 3, y: 111 },
          { x: 4, y: 12 },
        ],
      },
      l3: {
        datapoints: [
          { x: 0, y: 1.32 },
          { x: 1, y: 24.123242 },
          { x: 2, y: 62.12 },
          { x: 3, y: 0.432 },
          { x: 4, y: 10 },
        ],
      },
    };

    for (let i = 0; i < numbersToChange; i++) {
      const whichArray = Math.floor((Math.random() * 3) + 1);

      let range = [10, 150];

      if (whichArray === 3) {
        range = [0, 75];
      }

      const newNum = (Math.random() * range[1]) + range[0];
      const whichIndex = Math.floor((Math.random() * 5));

      newData[`l${whichArray}`].datapoints[whichIndex].y = newNum;
    }

    newState.data = newData;
    this.setState(newState);
  }

  addPoint() {
    const newState = this.state;
    const newNum = (Math.random() * 180) + 5;
    newState.data.l2.datapoints.push({ x: newState.data.l2.datapoints.length, y: newNum });
    this.setState(_.cloneDeep(newState));
  }


  render() {
    return (
      <div className={ styles.main }>
        <Header />
        <div className={ styles.chart}>
          <ChartBlock
            title={strings.charts.lineChart}
            data={this.state.data}
            setVisibility={(val, key) => this.setVisibility(val, key)}
          >
            <Chart
              domainPadding={5}
              padding={48}
              rangePadding={0}
              data={this.state.data} 
              natures={this.state.natures} />
          </ChartBlock>
        </div>
        <div className={ styles.button} onClick={() => this.buttonClicked()}>Change Data</div>
        <div className={ styles.button} onClick={() => this.addPoint()}>Add Point</div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
