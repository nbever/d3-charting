import React from 'react';
import {render} from 'react-dom';
import Chart from './charting/base_chart.js';
import {LineSpec, LineNature} from './charting/line_nature.js';

require( './styles/base.scss' );

String.prototype.width = function(font) {
  var o = $('<div>' + this + '</div>')
            .css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': font})
            .appendTo($('body')),
      w = o.width();

  o.remove();

  return w;
}

class App extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            data: {
                'l1': {
                    datapoints: [
                        {x:0, y: 123},
                        {x:1, y: 100},
                        {x:2, y: 83},
                        {x:3, y: 185},
                        {x:4, y: 12}
                    ]
                },
                'l2': {
                    datapoints: [
                        {x:0, y: 45},
                        {x:1, y: 72},
                        {x:2, y: 6},
                        {x:3, y: 111},
                        {x:4, y: 12}
                    ]
                }                
            },
            natures: [
                new LineNature([
                    new LineSpec({key: 'l1', color: 'green', thickness: 2.0}),
                    new LineSpec({key: 'l2', color: 'blue'})
                ])
            ]
        };
    }

    buttonClicked() {
        const newState = this.state;
        const newNum = (Math.random() * 150) + 10;
        newState.data.l1.datapoints[2].y = newNum;
        this.setState(newState);
    }

    render(){
        return (
            <div>
                <div>Hello</div>
                <Chart padding={9} data={this.state.data} natures={this.state.natures}></Chart>
                <div className="button" onClick={() => this.buttonClicked()}>Change Data</div>
            </div>
        );
    }
}

render( <App/>, document.getElementById( 'app' ) );