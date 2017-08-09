import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as _ from 'lodash';
import { buildChartInfoObject, IChartDataObject, IScaleObject } from './util/chartinfo_factory';
import { createSvgElement } from './util/svg_factory';
import ChartInfo  from './model/chart_info';
import {ChartNatureSpec}  from './base_chart_config';

import * as styles from '../styles/base.scss';


 export interface ChartProps {
  padding: PropTypes.number,
  data: IChartDataObject,
  natures: ChartNatureSpec[],
  domainPadding: PropTypes.number,
  rangePadding: PropTypes.number,
};

 export interface ChartState {
  svg?: d3.Selection< SVGElement,{},HTMLElement,any>,
  chartInfo?: ChartInfo,
  padding?: PropTypes.number,
  data?: PropTypes.object,
  natures?: ChartNatureSpec[],
  domainPadding?: PropTypes.number,
  rangePadding?: PropTypes.number,
};

export class Chart extends React.Component<ChartProps, ChartState>  {
  public state: ChartState = {
      svg: undefined,
    };
  private root: any;
  private xRangeBF: [number];
  private yRangeBF: [number];
  private chartInfoBF: ChartInfo;

  public static propTypes: ChartProps= {
      padding: PropTypes.number,
      data: PropTypes.object,
      natures: PropTypes.array,
      domainPadding: PropTypes.number,
      rangePadding: PropTypes.number      
    };
  public static defaultProps: ChartState = {
      padding: 8,
      data: {},
      natures: [],
      domainPadding: 0,
      rangePadding: 0,
    };
      
  constructor(public props: ChartProps) {
    super(props);
  }

  componentWillMount() {
    window.addEventListener('resize', this.resizeChart.bind(this));
  }

  componentDidUpdate() {
    const chartInfo = this.buildScales(false);
    this.drawNatures(this.state.svg, chartInfo, this.props.data);
  } 

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeChart.bind(this));
  }

  setRoot(elem) {
    // debugger
    this.root = elem;
    this.initializeChart();
  }


  initializeChart() {
    if (!_.isUndefined(this.state.svg)) {
      return;
    }
    const svg = createSvgElement(this.root, '100%','100%');
    const chartInfo = this.buildScales();

    this.setState({ ...this.state, chartInfo, svg });
    this.drawNatures(svg, chartInfo, this.props.data);
  }

  drawNatures(svg: d3.Selection< SVGElement,{},HTMLElement,any>, chartInfo: ChartInfo, data) {
    if (_.isUndefined(this.props.natures)) {
      return;
    }

    this.props.natures.forEach((n) => {
      const natureData = [];
      natureData.push(n.getKeys().map(k => data[k]));
      //debugger
      n.draw(svg, chartInfo, natureData);
    });
  }

  buildScales( whatwasthisfor? : boolean) {
    delete this.xRangeBF;
    delete this.yRangeBF;
    this.chartInfo = buildChartInfoObject(this.props.data,
      this.xRange, this.props.domainPadding,
      this.yRange, this.props.rangePadding,
      this.eventHandler.bind(this));
    return this.chartInfo;
  }

  resizeChart() {
    const chartInfo = this.buildScales();
    this.drawNatures(this.state.svg, chartInfo, this.props.data);
  }

  get xRange() {
    if (_.isUndefined(this.xRangeBF)) {
      this.xRangeBF = [this.props.padding,
        this.root.parentElement.clientWidth - this.props.padding];
    }
    return this.xRangeBF;
  }

  get yRange() {
    if (_.isUndefined(this.yRangeBF)) {
      this.yRangeBF = [this.root.parentElement.clientHeight -
    this.props.padding, this.props.padding];
    }
    return this.yRangeBF;
  }

  get chartInfo(): ChartInfo {
    return this.chartInfoBF;
  }

  set chartInfo(chartInfo: ChartInfo) {
    this.chartInfoBF = chartInfo;
  }

  eventHandler(chartEvent: d3.BaseEvent) {
    this.props.natures.forEach((n) => {
      if (_.isFunction(n.handleEvent)) {
        n.handleEvent(chartEvent, this.chartInfo);
      }
    });
  }

  render() {
    return (
      <div ref={r => this.setRoot(r)} />
    );
  }
}



