import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';

import * as styles from '../../styles/base.scss';

class Checkbox extends React.Component<any, any> {
  componentWillReceiveProps() {//props
    // const i = 0;
  }
  public static propTypes= {
    selected: PropTypes.bool,
    onClick: PropTypes.func,
  }

  public static defaultProps = {
    selected: true,
    onClick: _.noop,
  }

  buildClassName() {
    let className = 'inner-checkbox';

    if (this.props.selected === true) {
      className += ' selected';
    }

    return className;
  }


  render() {
    return (
      <div
        className={`${styles.checkbox} ${this.props.selected === true ? styles.selected : ''}`}
        onClick={() => this.props.onClick(!this.props.selected)}
      >
        {this.props.selected === true &&
          <div className="inner-checkbox" />
        }
      </div>
    );
  }
}



export default Checkbox;
