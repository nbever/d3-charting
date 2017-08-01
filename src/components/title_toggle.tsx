

import * as React from 'react';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import Checkbox from './checkbox/checkbox';


class TitleToggle extends React.Component<any, any> {

  public static propTypes = {
    dataKey: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onChange: PropTypes.func,
  };

   public static defaultProps = {
    selected: true,
    onChange: _.noop,
  }
  componentWillReceiveProps() { // props
    const i = 0;
  }

  render() {
    return (
      <div className="title-toggle">
        <Checkbox selected={this.props.selected} onClick={newVal => this.props.onChange(newVal, this.props.dataKey)} />
        <div className="toggle-text">{this.props.children}</div>
      </div>
    );
  }
}


export default TitleToggle;
