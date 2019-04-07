import React, {Component} from 'react';
import { Grid} from 'semantic-ui-react';
import ReactMapGL from 'react-map-gl';
import PolylineOverlay from './overlay.js';

class SelectLocation extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
            viewport: {
                width: 600,
                height: 400,
                latitude: 12.96691,
                longitude: 77.74935,
                zoom: 8
            }
        };
    
        this.onChangeViewport = this.onChangeViewport.bind(this);
      }
    
      onChangeViewport(viewport) {
        this.setState({
          viewport: { ...this.state.viewport, ...viewport }
        });
      }

    render(){
        const points = [[77.62664,12.92768],
        [77.60668, 13.07746]];
        return(
            <div className="main_content">
                <Grid  columns={3}>
                    <Grid.Row>
                        <Grid.Column width={3}>
                        </Grid.Column>

                        <Grid.Column width={10} >
                        {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed quisquam commodi rerum aperiam alias labore enim eius ab explicabo, asperiores fugiat mollitia, reprehenderit excepturi ipsum suscipit ipsam obcaecati libero possimus. */}
                        <ReactMapGL
                            mapboxApiAccessToken="pk.eyJ1IjoiaGltYW5raGQiLCJhIjoiY2p1NzAwcTk4MWsxcjRlbnJvMHZqbnA2NCJ9.TWHl2ZQf7BJQV6oQDEuk8A"
                            {...this.state.viewport}
                            onViewportChange={(viewport) => this.setState({viewport})}
                        >
                        <PolylineOverlay points={points} />
                        </ReactMapGL>
                        </Grid.Column>
                        <Grid.Column width={3}>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
};

export default SelectLocation;