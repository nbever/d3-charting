import React from 'react';
import {render} from 'react-dom';
import Chart from './charting/base_chart.js';
import {LineSpec, LineNature} from './charting/line_nature.js';
import {AxisSpec, AxisNature} from './charting/axis_nature.js';
import {HoverAxisNature} from './charting/hover_axis_nature.js';
import {DotSpec, DotNature} from './charting/dot_nature.js';
import {BarNature, BarSpec} from './charting/bar_nature.js';
import Header from './components/header.js';
import ChartBlock from './components/chart_block.js';
import {strings} from './utils/strings.js';

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
                    ]
                },
                'l2': {
                    datapoints: [
                    ]
                }
            },
            natures: [
                new BarNature([
                    new BarSpec({key: 'l1', strokeWidth: 2, stroke: 'black', fill: 'yellow', opacity: 0.4, barWidth: 10, useGlobalScale: false})
                ]),
                new LineNature([
                    new LineSpec({key: 'l1', color: 'green', thickness: 2.0}),
                    new LineSpec({key: 'l2', color: 'blue'})
                ]),
                new DotNature([
                    new DotSpec({key: 'l1', stroke: 'red', fill: 'blue', radius: 10, opacity: 0.3}),
                    new DotSpec({key: 'l2', stroke: 'green', fill: 'green', radius: 3})
                ]),
                // new AxisNature(new AxisSpec({key: '', position: 'left', ticks: 3})),
                new HoverAxisNature(new AxisSpec({key: '', position: 'left', ticks: 3, useGlobalScale: false})),
                new AxisNature(new AxisSpec({key: '', position: 'bottom', ticks: 4}))
            ]
        };
    }

    buttonClicked() {
        const newState = this.state;
        const numbersToChange = Math.floor((Math.random() * 10) + 1);

        const newData = {
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
        };

        for ( let i = 0; i < numbersToChange; i++ ) {
            const newNum = (Math.random() * 150) + 10;
            const whichArray = Math.floor((Math.random() * 2) + 1);
            const whichIndex = Math.floor((Math.random() * 5));

            newData['l' + whichArray].datapoints[whichIndex].y = newNum;
        }

        newState.data = newData;
        this.setState(newState);
    }

    addPoint() {
        const newState = this.state;
        const newNum = (Math.random() * 180) + 5;
        newState.data.l2.datapoints.push({x:5, y: newNum});
        this.setState(_.cloneDeep(newState));
    }

    setVisibility(val, key) {
        const natures = this.state.natures;

        natures.forEach( n => {
            if (_.isArray(n.specs)){
                n.specs.forEach( s => {
                    if (s.getKey() == key){
                        s.show = val;
                    }
                });
            }
            else {
                if (n.specs.getKey() == key){
                    n.specs.show = val;
                }
            }
        });

        this.setState({...this.state, natures});
    }

    render(){
        return (
            <div>
                <Header/>
                <div className="chart-stack">
                    <ChartBlock title={strings.charts.lineChart} data={this.state.data} setVisibility={(val, key) => this.setVisibility(val, key)}>
                        <Chart domainPadding={5} padding={48} data={this.state.data} natures={this.state.natures}></Chart>
                    </ChartBlock>
                </div>
                <div className="button" onClick={() => this.buttonClicked()}>Change Data</div>
                <div className="button" onClick={() => this.addPoint()}>Add Point</div>
            </div>
        );
    }
}

render( <App/>, document.getElementById( 'app' ) );
