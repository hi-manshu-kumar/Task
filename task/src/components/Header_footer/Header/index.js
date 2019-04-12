import React from 'react';
import { Container, Dropdown, Responsive, Segment,Icon} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom'

const Header = () => {
  	return (
		<header>
			
				{/* <Container textAlign='left'  className="header" style={{ margin: '0 0.5em' }} >Xrider Visualizer</Container> */}
				<div className="headerDiv" >
					<Container textAlign="left" style={{display: 'inline', marginLeft: '0.5em', marginTop:'1em', position: 'absolute'}}> Xrider Visualizer</Container>
					<Container textAlign='right' style={{marginTop:'1em'}} >
						<Responsive  minWidth={768}>
							<NavLink exact to="/" activeClassName="active" style={{ marginRight: '0.5em' }}  className="navlink" >Upload CSV</NavLink>
							<NavLink  to="/select-location" activeClassName="active" className="navlink" style={{ marginRight: '0.5em',display: 'inline-block' }} >View Map</NavLink>
							<NavLink  to="/data-viz" activeClassName="active" className="navlink" style={{ marginRight: '0.5em',display: 'inline-block' }}  >View Chart</NavLink>
						</Responsive>
						<Responsive style={{marginRight: '3em', fontSize: '1em', marginTop: '1em'}} maxWidth={768}>
						<Dropdown item 	>
							<Dropdown.Menu>
								<Dropdown.Item>
								<NavLink exact to="/" activeClassName="active"   className="navlink" >Upload CSV</NavLink>
								</Dropdown.Item>
								<Dropdown.Item>
							<NavLink  to="/select-location" activeClassName="active" className="navlink" style={{ marginRight: '0.5em',display: 'inline-block' }} >View Map</NavLink>

								</Dropdown.Item>
								<Dropdown.Item>
							<NavLink  to="/data-viz" activeClassName="active" className="navlink" style={{ marginRight: '0.5em',display: 'inline-block' }}  >View Chart</NavLink>

								</Dropdown.Item>
							</Dropdown.Menu>
							</Dropdown>
						</Responsive>
					</Container>
				</div>
			
		</header>
	);
}

export default Header;