import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries} from 'react-vis';
import Axios from 'axios';
import NProgress from 'nprogress';  
import {Segment, Container } from 'semantic-ui-react';

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
        NProgress.start();
        Axios.get('api/serveData/booking-method').then(data => {
            // loadProgressBar()
            NProgress.done();
            this.setState({citiD:data.data.stats})            //fetching the data from backend and updating in state to render in map
        }).catch(err => {
            NProgress.done();
            console.error(err);
        });
    }
    
    render(){
        const data = [        
            {x: new Date('01/01/2018'), y: 75},
            {x: new Date('01/14/2018'), y: 60},
            {x: new Date('03/18/2018'), y: 80},
            {x: new Date('04/15/2018'), y: 90}
        ];

        return(
            <div className="main_content ">
                <Segment style={{backgroundColor: 'transparent'}} className="mapSegment data-viz"  >

                <div className="data-viz">
                    <XYPlot
                    xType="time"
                    height={600} width={1800}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis title="Time Axis" />
                        <YAxis title="No of Booking"/>
                            <VerticalBarSeries data={this.state.citiD? this.renderData(): data} />
                            <LineSeries data={this.state.citiD? this.renderDataZ(): data} style={{stroke: 'red'}}/>
                        
                    </XYPlot>
                </div>
                </Segment>
            </div>
        )
    }
}

export default ViewChart;
