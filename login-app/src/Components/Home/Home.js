import React, { Component } from 'react';

export default class Home extends Component {

	// componentDidMount() {
	// 	let isLogin = localStorage.getItem('is_login');
	// 	if (isLogin === null || isLogin === false) {
	// 		window.location.href = '/login';
	// 	}
	// }

	render() {
		return (
			<div>
				<div className='justify-content-center'>Hello this is a home page</div>
			</div>
		);
	}
}
