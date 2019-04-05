import React, {Component} from 'react';

import MyButton from '../utils/button';
import FileUpload from '../utils/form/fileupload';

class Home extends Component {
    render(){
        return(
            <div className="main_content">
                <div className="tile">
                    <h1> Upload CSV file </h1>

                    <FileUpload className="dropzone_box"/>
                    
                    <MyButton
                        type="default"
                        title={'Lets Select Location'}
                        linkTo={'/select-location'}
                        addStyles={{
                            margin: '10px 0 0 0'
                        }}
                    />
                </div>
            </div>
        );
    }
};

export default Home;