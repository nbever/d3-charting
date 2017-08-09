import * as React from 'react';
import { render } from 'react-dom';
import * as  $ from 'jquery';
import * as _ from 'lodash';

import ChartBlock from './components/chart_block';
import { Chart, ChartProps, ChartState } from './charting/base_chart';

import { buildChartInfoObject, IChartDataObject, IScaleObject } from './charting/util/chartinfo_factory';

import { ChartNatureSpec, ChartNatures } from './charting/base_chart_config';

import Header from './components/header';
import { strings } from './utils/strings';

import { chartdata } from './chartdata';

import * as styles from './styles/base.scss';
interface AppState {
  data: IChartDataObject,
  natures: ChartNatures[]
}

interface AppProps {
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = chartdata;
  }

  setVisibility(val: any, key: any) {
    const natures = this.state.natures;

    natures.forEach((n: any) => {
      if (_.isArray(n.specs)) {
        n.specs.forEach((s: any) => {
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
    const newState = {...this.state};
    const numbersToChange = Math.floor((Math.random() * 10) + 1);

    const newData: IChartDataObject = {
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
      <div className={styles.main}>
        <Header />
        <div className={styles.chart}>
          <ChartBlock
            title={strings.charts.lineChart}
            data={this.state.data}
            setVisibility={(val: any, key: any) => this.setVisibility(val, key)} >
            <Chart
              domainPadding={5}
              padding={48}
              rangePadding={0}
              data={this.state.data}
              natures={this.state.natures} >
            </Chart>
          </ChartBlock>
        </div>
        <div className={styles.button} onClick={() => this.buttonClicked()}>Change Data</div>
        <div className={styles.button} onClick={() => this.addPoint()}>Add Point</div>
      </div>
    );
  }
}
