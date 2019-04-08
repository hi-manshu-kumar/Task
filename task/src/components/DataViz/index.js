import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';


// var LineChart = require("react-chartjs").Line;

class ViewChart extends Component{
    render(){
        const data = [
            {x: 0, y: 8},
            {x: 1, y: 5},
            {x: 2, y: 4},
            {x: 3, y: 9},
            {x: 4, y: 1},
            {x: 5, y: 7},
            {x: 6, y: 6},
            {x: 7, y: 3},
            {x: 8, y: 2},
            {x: 9, y: 0}
          ];
          const data2 = [
            {x: 1, y: 8},
            {x: 2, y: 5},
            {x: 3, y: 4},
            {x: 4, y: 9},
            {x: 5, y: 1},
            {x: 6, y: 7},
            {x: 7, y: 6},
            {x: 8, y: 3},
            {x: 9, y: 2},
            {x: 9, y: 0}
          ];
        return(
            <div className="main_content">
                <div className="tile">
                    <XYPlot height={300} width={300}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <LineSeries data={data} />
                        <LineSeries data={data2} />
                    </XYPlot>
                </div>
            </div>
        )
    }
}

export default ViewChart;
