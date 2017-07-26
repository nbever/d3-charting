import React from 'react';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {
  componentWillReceiveProps(props) {
    // const i = 0;
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
        { this.props.selected === true &&
        <div className="inner-checkbox" />
        }
      </div>
    );
  }
}

Checkbox.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

Checkbox.defaultProps = {
  selected: true,
  onClick: _.noop,
};

export default Checkbox;
