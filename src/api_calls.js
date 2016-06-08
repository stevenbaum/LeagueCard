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
		this.getSummonerInfo("supertanooki");
	}

	getSummonerInfo(summonerName) {
		var summonerReq = new XMLHttpRequest();
		var app = this;
		summonerReq.addEventListener("load", 
			function() {
				const DONE = 4;
				const OK = 200;
				if (this.readyState === DONE) {
					if (this.status === OK) {
						var responseObj = JSON.parse(this.responseText);
						var name = Object.keys(responseObj)[0];
						var id = responseObj[name].id;
						app.setState({summonerName: name,
										summonerID: id,
										summonerInfo: responseObj});
						app.getChampMastery(id);
					}
					else {
						console.log("Error in grabbing summoner Info, code: " + this.status);
					}
				}
			});

		summonerReq.open("GET", "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" 
						+ summonerName + "?api_key=ee0b8bc7-215a-4fed-b066-9af8ec3aa3cf");
		summonerReq.send();
	}

	getChampMastery(id) {
		var masteryReq = new XMLHttpRequest();
		var app = this;
		masteryReq.addEventListener("load",
			function() {
				const DONE = 4;
				const OK = 200;
				if (this.readyState === DONE) {
					if (this.status === OK) {
						var masteryObj = JSON.parse(this.responseText);
						app.setState({champMastery: masteryObj});
					}
					else {
						console.log("Error in getting champ mastery, code: " + this.status);
					}
				}
			});
		masteryReq.open("GET", "https://na.api.pvp.net/championmastery/location/NA1/player/"
						+ id + "/champions?api_key=ee0b8bc7-215a-4fed-b066-9af8ec3aa3cf");
		masteryReq.send();
	}

	render() {

		return (
			<div>
				{this.state.summonerName}
			</div>
		);
	}
}