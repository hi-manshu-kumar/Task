import React, {Component} from 'react';
import { Grid} from 'semantic-ui-react';
import ReactMapGL, {Marker, Popup ,NavigationControl, FullscreenControl} from 'react-map-gl';
import axios from 'axios';
import NProgress from 'nprogress';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';


import CityPin from './city-pin';
import CityInfo from './city-info';

const fullscreenControlStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};


const navStyle = {
    position: 'absolute',
    top: 36,
    left: 0,
    padding: '10px'
};

class SelectLocation extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
            viewport: {
                width: 1000,
                height: 600,
                latitude: 12.99313,
                longitude: 77.59828,
                zoom: 11
            },
            citiD:null,
            popupInfo: null
        };
    }
    
    renderPopup(){
        return this.state.popupInfo && (
          <Popup tipSize={5}
            anchor="bottom-right"
            longitude={this.state.popupInfo.state.longitude}
            latitude={this.state.popupInfo.state.latitude}
            onClose={() => this.setState({popupInfo: null})}
            closeOnClick={true}>
            <p>hi there</p>
          </Popup>
        )
    }

    _renderCityMarker = (city, index) => {
        return (
          <Marker 
            key={`marker-${index}`}
            longitude={city.longitude}
            latitude={city.latitude} >
            <CityPin size={20} onClick={() => this.setState({popupInfo: city})} />
          </Marker>
        );
    }

    _renderPopup() {
        const {popupInfo} = this.state;
    
        return popupInfo && (
          <Popup tipSize={5}
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick={false}
            onClose={() => this.setState({popupInfo: null})} >
            <CityInfo info={popupInfo} />
          </Popup>
        );
    }

    componentDidMount(){
        NProgress.start();

        axios.get('/api/serveData/trip-location')
            .then(data => {
                NProgress.done();

                console.log(data);
                this.setState({citiD:data.data.tripLoc})            //fetching the data from backend and updating in state to render in map
            }).catch(err => {
                NProgress.done();
                setTimeout(() => {
                    toast({
                        type: 'warning',
                        icon: 'envelope',
                        title: 'Error',
                        description: 'Oops!! Something went wrong while featching of data...',
                        animation: 'bounce',
                        time: 5000
                        // onClick: () => alert('you click on the toast'),
                        // onClose: () => alert('you close this toast')
                    });
                }, 1000);
            });
    }

    render(){
        const {citiD} = this.state;
        return(
            <div className="main_content">
                <Grid  columns={3} className="data-viz">
                    <Grid.Row>
                        <Grid.Column width={1}>
                        </Grid.Column>

                        <Grid.Column width={10} className="data-viz">
                        <div className="data-viz">
                            <ReactMapGL 
                                mapboxApiAccessToken="pk.eyJ1IjoiaGltYW5raGQiLCJhIjoiY2p1NzAwcTk4MWsxcjRlbnJvMHZqbnA2NCJ9.TWHl2ZQf7BJQV6oQDEuk8A"
                                {...this.state.viewport}
                                mapStyle="mapbox://styles/mapbox/dark-v9"

                                onViewportChange={(viewport) => this.setState({viewport})}
                            >

                            { this.state.citiD? citiD.map(this._renderCityMarker): <span>Waiting for data</span> }
                            {this._renderPopup()}

                            <div className="fullscreen" style={fullscreenControlStyle}>
                                <FullscreenControl />
                            </div>
                            
                            <div className="nav" style={navStyle}>
                                <NavigationControl onViewportChange={this._updateViewport} />
                            </div>

                        </ReactMapGL>
                        </div>
                        </Grid.Column>
                        <Grid.Column width={1}>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
				<SemanticToastContainer position="top-right" />
            </div>
        );
    }
};

export default SelectLocation;