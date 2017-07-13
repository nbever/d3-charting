import React from 'react'
import {strings} from '../utils/strings.js';

class Header extends React.Component {

  render() {
    return (
      <div className="header">{strings.title}</div>
    );
  }
}

export default Header;
