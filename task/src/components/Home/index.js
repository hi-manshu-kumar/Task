import React, {Component} from 'react';

import FileUpload from '../utils/form/fileupload';

class Home extends Component {
    constructor(){
        super();
        this.state= {}
    }

    handleClick = (e) => {
        e.preventDefault();
        console.log('hi');
    }

    render(){
        return(
            <div className="main_content">
                <div className="tile">
                    <h1> Upload CSV file </h1>

                    <FileUpload className="dropzone_box" />
                </div>
            </div>
        );
    }
};

export default Home;