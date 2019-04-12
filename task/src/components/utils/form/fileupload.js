import React,{Component}  from 'react';
import {Link, withRouter} from 'react-router-dom';

import { Button, Icon, Loader } from 'semantic-ui-react';

import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import NProgress from 'nprogress';

import {setTimeoutFunction} from '../setTimeoutFunc';
    
class FileUpload extends Component {
    constructor() {
		super();
		this.onDrop = (files) => {
			this.setState({files})
		};
		this.state = {
			files: [],
			uploading: false
		};
	}


	handleClick = (e) => {
		e.preventDefault();
		this.setState({uploading: true});
		NProgress.start();
		
		if(this.state.files.length !== 0){

			let formData = new FormData();
			const config={
				header: {'content-type': 'multipart/form-data'}
			}
			formData.append('file', this.state.files[0]);
			axios.post('/api/uploadFile', formData, config)
				.then(response => {
					this.setState({uploading: false});
					NProgress.done();

					setTimeoutFunction(1000, 
						toast(
							{
								title: 'Success',
								description: <Link to="/select-location"><p>Lets select location</p></Link>
							},
							() => this.props.history.push('/select-location'),
							// () => console.log('toast clicked')
						));
					return this.setState({
						uploading:false
					});
				}).catch(err => {
						this.setState({uploading: false});
						NProgress.done();

						setTimeoutFunction(1000, 
							toast({
								type: 'warning',
								icon: 'envelope',
								title: 'Error',
								description: 'Something went wrong!! Please upload the csv file again....',
								animation: 'bounce',
								time: 5000
								// onClick: () => alert('you click on the toast'),
								// onClose: () => alert('you close this toast')
							})
						);
				})
		} else if(this.state.files.length === 0){
			this.setState({uploading: false});
            NProgress.done();

			setTimeout(() => {
				toast({
					type: 'warning',
					icon: 'envelope',
					title: 'Error',
					description: 'Please add a csv file in upload box.',
					animation: 'bounce',
					time: 5000,
					
					// onClick: () => this.props.history.push('/select-location'),
					// onClose: () => alert('you close this toast')
				});
			}, 1000);
		}
	}
		
	componentWillUnmount(){
        NProgress.done();
    }
  
    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
            {file.name} - {file.size} bytes
            </li>
        ));
    
      	return (
		  	<div>
				<Dropzone 
					onDrop={this.onDrop}
					multiple={false}
					accept="text/csv"
					>
						{({getRootProps, getInputProps}) => (
							<section className="container">
							<div {...getRootProps({className: 'dropzone'})}>
								<input {...getInputProps()} />
								<p>Drag 'n' drop some files here, or click to select files</p>
							</div>
							<aside>
								<h4>Files</h4>
								<ul>{files}</ul>
							</aside>
							</section>
						)}
				</Dropzone>
				
				{
					this.state.uploading ?
						<Loader active inline='centered' />
					:
					<Button animated primary onClick={(event) =>this.handleClick(event)}>
						<Button.Content visible >Upload File</Button.Content>
						<Button.Content hidden>
							<Icon name='arrow right' />
						</Button.Content>
					</Button>
				}
				<SemanticToastContainer position="top-right" />
			</div>
		);
    }
}

export default withRouter(FileUpload);