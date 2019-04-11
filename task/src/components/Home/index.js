import React, {Component} from 'react';

import FileUpload from '../utils/form/fileupload';
import NProgress from 'nprogress';

import { Segment, Container} from 'semantic-ui-react';


class Home extends Component {
    constructor(){
        super();
        this.state= {}
    }

    handleClick = (e) => {
        e.preventDefault();
        console.log('hi');
    }

    componentDidMount(){
        NProgress.done();
    }

    render(){
        return(
            
            <div className="main_content">
            <Container text className="shadow">
                <Segment style={{ textAlign: 'center', margin: '0 auto'}} >
                    <h1> Upload CSV file </h1>
                    <FileUpload className="dropzone_box" />
                </Segment>
            </Container>
            </div>
        );
    }
};

export default Home;