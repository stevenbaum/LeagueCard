import React from 'react';
import {render} from 'react-dom';

export default class ApiCall extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			summonerInfo: {},
		};
	}

	componentDidMount() {
		this.getChampInfo("supertanooki");

	}

	getChampInfo(summonerName) {
		var apiReq = new XMLHttpRequest();
		var app = this;
		apiReq.addEventListener("load", 
			function() {
				const DONE = 4;
				const OK = 200;
				if (this.readyState === DONE) {
					if (this.status === OK) {
						console.log("OK get");
						var responseObj = JSON.parse(this.responseText);
						var name = Object.keys(responseObj)[0];
						var id = responseObj[name].id;
						app.setState({summonerName: name,
										summonerID: id,
										summonerInfo: responseObj});
					}
					else {
						console.log("Error in grabbing champ Info, code: " + this.status);
					}
				}
			});

		apiReq.open("GET", "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" 
						+ summonerName + "?api_key=ee0b8bc7-215a-4fed-b066-9af8ec3aa3cf");
		apiReq.send();

	}

	render() {

		return (
			<div>
				{this.state.summonerName}
			</div>
		);
	}
}