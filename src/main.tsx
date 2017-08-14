import * as React from 'react';
import { render } from 'react-dom';
import * as  $ from 'jquery';

import App from './app';

const stringPt: any = String.prototype;
stringPt.width = function monkeyWidth(font: any) {
  const o = $(`<div>${this}</div>`)
    .css({ position: 'absolute', float: 'left', 'white-space': 'nowrap', visibility: 'hidden', font })
    .appendTo($('body'));
  const w = o.width();
  o.remove();
  return w;
};

render(<App />, document.getElementById('app'));
