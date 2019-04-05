import React from 'react';
import { Segment } from 'semantic-ui-react';

const Header = () => {
  	return (
		<header>
			<Segment raised className="header_name"><h1>XRider Visualizer</h1></Segment>
		</header>
	);
}

export default Header;