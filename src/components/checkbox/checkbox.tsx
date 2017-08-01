import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';

class Checkbox extends React.Component<any, any> {
  componentWillReceiveProps() {//props
    // const i = 0;
  }
  public static propTypes= {
    selected: PropTypes.boolean,
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
        className={`checkbox ${this.props.selected === true ? 'selected' : ''}`}
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
