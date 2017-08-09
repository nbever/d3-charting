import * as React from 'react';
import * as PropTypes from 'prop-types';
import TitleToggle from './title_toggle';
import { strings } from '../utils/strings';
import * as _ from 'lodash';

import * as styles from '../styles/base.scss';

class ChartBlock extends React.Component<any, any> {

  public static propTypes:PropTypes.ValidationMap<{
    title: string, 
    data: {},
    setVisibility: ()=>{} 
  }>  = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object,
    setVisibility: PropTypes.func,
  }

  public static defaultProps = {
    data: {},
    setVisibility: _.noop,
  };

  constructor(props: any) {
    super(props);

    const initState: any = {};

    // build our dictionary
    for (const key in props.data) {
      initState[key] = true;
    }

    this.state = initState;
  }

  setVisibility(val: any, key: any) {
    const state = this.state;
    state[key] = val;

    this.props.setVisibility(val, key);
    this.setState(state);
  }

  buildToggles() {
    const toggles = [];

    for (const key in this.props.data) {
      toggles.push(
        <TitleToggle
          dataKey={key}
          key={key}
          onChange={(val: any, localkey: any) => this.setVisibility(val, localkey)}
          selected={this.state[key]}
        >{key}
        </TitleToggle>);
    }

    return toggles;
  }

  render() {
    return (
      <div className={ styles.chartBlock}>
        <div className={ styles.title }>{this.props.title}</div>
        <div className={styles.container}>
          <div className={styles.toggles}>
            <div>{strings.charts.lineSeriesTitle}</div>
            {this.buildToggles()}
          </div>
          <div className={styles.chart}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}


export default ChartBlock;
