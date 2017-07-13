import React from 'react';
import PropTypes from 'prop-types';
import TitleToggle from './title_toggle.js';
import {strings} from '../utils/strings.js';

class ChartBlock extends React.Component {

  constructor(props){
    super(props);

    const initState = {};

    //build our dictionary
    for (let key in props.data) {
      initState[key] = true;
    }

    this.state = initState;
  }

  setVisibility(val, key) {
    const state = this.state;
    state[key] = val;

    this.props.setVisibility(val, key);
    this.setState(state);
  }

  buildToggles() {
    const toggles = [];

    for ( let key in this.props.data) {
      toggles.push(
        <TitleToggle dataKey={key} key={key}
          onChange={(val, key) => this.setVisibility(val, key)}
          selected={this.state[key]}>{key}
        </TitleToggle>);
    }

    return toggles;
  }

  render() {
    return (
      <div className="chart-block">
        <div className="title">{this.props.title}</div>
        <div className="container">
          <div className="toggles">
            <div>{strings.charts.lineSeriesTitle}</div>
            {this.buildToggles()}
          </div>
          <div className="chart">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

ChartBlock.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object,
  setVisibility: PropTypes.func
};

ChartBlock.defaultProps = {
  data: {},
  setVisibility: _.noop
};

export default ChartBlock;
