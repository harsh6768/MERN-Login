import React, { Component } from 'react';
import './Login.css';
import { SocialIcon } from 'react-social-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
	}
	//for handling the input
	onHandleChange = (e) => {
		let { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	//for login button
	onLogin = (event) => {
		event.preventDefault();

		const user = {
			email: this.state.email,
			password: this.state.password,
		};
		console.log(user.email, user.password);

		axios
			.post('http://localhost:3001/login', user)
			.then((result) => {
				// console.log(result)
				window.location.href = '/';
			})
			.catch((err) => {
				throw err;
			});
	};

	render() {
		let { email, password } = this.state;
		return (
			<div>
				<div className="row mt-5 justify-content-center">
					<div className="col-md-4">
						<div className="card">
							<h3 className="card-title mx-auto mt-3 title ">Sign In to Codec</h3>
							<div className="card-body">
								<div className="icons-props rows  d-flex  justify-content-center">
									<span className="col-sm-1 col-xs-1 fab fa-facebook  facebook-icon"></span>
									<span className="col-sm-1 col-xs-1 fab fa-google google-icon"></span>
									<span className="col-sm-1 col-xs-1 fab fa-linkedin linkedin-icon"></span>
								</div>
								<div className="text-center mt-2">or use your email account</div>
								<form method="POST" onSubmit={this.onLogin}>
									<div className="form-group">
										{/* <label for="email">Email-Id</label> */}
										<input
											className="form-control"
											type="email"
											id="email"
											name="email"
											placeholder="Enter email"
											value={email}
											onChange={this.onHandleChange}
										></input>
									</div>
									<div className="form-group">
										{/* <label for="Password">Password</label> */}
										<input
											className="form-control"
											type="password"
											id="password"
											name="password"
											placeholder="Enter password"
											value={password}
											onChange={this.onHandleChange}
										></input>
									</div>
									<div className="text-center mb-2">Forgot your password ?</div>
									<div className="d-flex justify-content-center ">
										<button type="submit" className="btn signin-btn  d-block ">
											SIGN IN
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>

					<div className="side-page col-md-2 gradient-color d-flex  justify-content-center align-items-center">
						<div>
							<div className="side-title text-white font-weight-bold text-center ">Hello ,Friend!</div>
							<div className=" text-white text-center ">
								Enter your personal details and start journey with us
							</div>
							<div className="btn btn-outline-primary m-5  side-page-btn">
								<Link to="/signup" className="nav-item text-white">
									SIGN UP
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
