import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis,xType} from 'react-vis';
import Axios from 'axios';


// var LineChart = require("react-chartjs").Line;

class ViewChart extends Component{
    constructor(props){
        super(props)
        this.state = {
            citiD: null
        }
    }


    renderData = () =>{
        return this.state.citiD.map(index => {
            index.x= new Date(index.x);
            return {x:index.x, y:index.y};
        }) 
    }
    renderDataZ = () =>{
        return this.state.citiD.map(index => {
            index.x= new Date(index.x);
            return {x:index.x, y:index.z};
        }) 
    }
    componentDidMount(){
        Axios.get('api/serveData/booking-method').then(data => {
            console.log(data.data.stats);
            this.setState({citiD:data.data.stats})            //fetching the data from backend and updating in state to render in map
        })
        console.log(this.state.citiD);

    }
    
    render(){
        const data = [        
            {x: new Date('01/01/2018'), y: 75},
            {x: new Date('01/14/2018'), y: 60},
            {x: new Date('03/18/2018'), y: 80},
            {x: new Date('04/15/2018'), y: 90}
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
                <div >
                    <XYPlot
                    xType="time"
                    height={600} width={1800}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis title="Booking Axis" />
                        <YAxis title="Time Axis"/>
                            <LineSeries data={this.state.citiD? this.renderData(): data} />
                            <LineSeries data={this.state.citiD? this.renderDataZ(): data} style={{stroke: 'red'}}/>
                        
                        {/* <LineSeries data={data2} /> */}
                    </XYPlot>
                </div>
            </div>
        )
    }
}

export default ViewChart;
