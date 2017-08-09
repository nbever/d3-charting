

import * as React from 'react';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import Checkbox from './checkbox/checkbox';
import * as styles from '../styles/base.scss';

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
      <div className={styles.titleToggle}>
        <Checkbox selected={this.props.selected}
          onClick={(newVal: any) => this.props.onChange(newVal, this.props.dataKey)} />
        <div className={styles.toggleText}>{this.props.children}</div>
      </div>
    );
  }
}


export default TitleToggle;
