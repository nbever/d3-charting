import * as React from 'react'
import {strings} from '../utils/strings.js';

import * as styles from '../styles/base.scss';
class Header extends React.Component<any, any> {

  render() {
    return (
      <div className={styles.header}>{strings.title}</div>
    );
  }
}

export default Header;
