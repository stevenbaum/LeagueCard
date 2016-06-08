import React from 'react';
import {render} from 'react-dom';
import ApiCall from './api_calls';

export default class Hello extends React.Component {

	render() {
		return (
			<div>
				{this.props.text}
				<ApiCall />
			</div>
		);
	}
}

render(<Hello text="heythere" />, document.getElementById("root"));