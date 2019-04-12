import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis,Crosshair, Highlight,  DiscreteColorLegend } from 'react-vis';
import Axios from 'axios';
import NProgress from 'nprogress';  
import {Segment } from 'semantic-ui-react';

class ViewChart extends Component{
    constructor(props){
        super(props)
        this.state = {
            citiD: null,
        }
    }

    state = {
        lastDrawLocation: null}

    renderData = () =>{
        const {citiD} = this.state;
        return citiD.map(index => {
            index.x= new Date(index.x);
            return {x:index.x, y:index.y};
        }) 
    }
    renderDataZ = () =>{
        const {citiD} = this.state;
        return citiD.map(index => {
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
        const {series, lastDrawLocation} = this.state;
        const data = [        
            {x: new Date('01/01/2018'), y: 0},
            {x: new Date('01/14/2018'), y: 0},
            {x: new Date('03/18/2018'), y: 0},
            {x: new Date('04/15/2018'), y: 0}
        ];

        return(
            <div className="main_content ">
                <Segment style={{backgroundColor: 'transparent'}} className="mapSegment data-viz"  >

                <div className="data-viz">
                
                    <XYPlot
                    xType="time"
                    height={600} width={1800}
                    xDomain={
                        lastDrawLocation && [
                          lastDrawLocation.left,
                          lastDrawLocation.right
                        ]
                      }
                      yDomain={
                        lastDrawLocation && [
                          lastDrawLocation.bottom,
                          lastDrawLocation.top
                        ]
                    }>
                    <DiscreteColorLegend
                                style={{position: 'absolute', left: '80px', top: '10px'}}
                                orientation="horizontal"
                                items={[
                                {
                                    title: 'Mobile Booking',
                                    color: '#12939A'
                                },
                                {
                                    title: 'Webiste Booking',
                                    color: 'red'
                                }
                                ]}
                    />
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis title="Time Axis" />
                        <YAxis title="No of Booking"/>
                            <LineSeries data={this.state.citiD? this.renderData(): data} />
                            <LineSeries data={this.state.citiD? this.renderDataZ(): data} style={{stroke: 'red'}}/>
                            <Highlight
                                onBrushEnd={area => this.setState({lastDrawLocation: area})}
                                onDrag={area => {
                                    this.setState({
                                    lastDrawLocation: {
                                        bottom: lastDrawLocation.bottom + (area.top - area.bottom),
                                        left: lastDrawLocation.left - (area.right - area.left),
                                        right: lastDrawLocation.right - (area.right - area.left),
                                        top: lastDrawLocation.top + (area.top - area.bottom)
                                    }
                                    });
                                }}
                            />

                    </XYPlot>
                </div>
                <button
                        className="showcase-button"
                        onClick={() => this.setState({lastDrawLocation: null})}
                        >
                        Reset Zoom
                </button>
                </Segment>
            </div>
        )
    }
}

export default ViewChart;
