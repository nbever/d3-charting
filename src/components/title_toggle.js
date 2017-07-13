import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './checkbox/checkbox.js';

class TitleToggle extends React.Component {

  componentWillReceiveProps(props) {
    let i = 0;
  }

  render() {
    return (
      <div className="title-toggle">
        <Checkbox selected={this.props.selected} onClick={(newVal) => this.props.onChange(newVal, this.props.dataKey)} />
        <div className="toggle-text">{this.props.children}</div>
      </div>
    );
  }
};

TitleToggle.propTypes = {
  dataKey: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onChange: PropTypes.func
};

TitleToggle.defaultProps = {
  selected: true,
  onChange: _.noop
};

export default TitleToggle;
