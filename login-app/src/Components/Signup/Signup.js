import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

toast.configure();

class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
			password: '',
			usernameError: '',
			emailError: '',
			passwordError: '',
		};
	}

	onHandleChange = (e) => {
		console.log(e);
		let { name, value } = e.target;

		this.setState({
			[name]: value,
		});
	};

	onRegister = async(event) => {
		event.preventDefault();
		const { username, email, password } = this.state;

		console.log(username, email, password);
		if (username.length === 0) {
			this.setState({
				usernameError: 'Username can not be empty',
			});
			return;
		} else if (username.length < 3) {
			this.setState({
				usernameError: 'Username should be 3 or more than 3 character',
			});
			return;
		} else if (email.length === 0) {
			this.setState({
				usernameError: '',
				emailError: 'Email should not be empty',
			});
			return;
		} else if (!emailPattern.test(email)) {
			this.setState({
				usernameError: '',
				emailError: 'Invalid email',
			});
			return;
		} else if (password.length === 0) {
			this.setState({
				usernameError: '',
				emailError: '',
				passwordError: 'Password can not be empty',
			});
			return;
		} else if (password.length < 6) {
			this.setState({
				usernameError: '',
				emailError: '',
				passwordError: 'Password length should be 6 or more than 6',
			});
			return;
		} else {
			this.setState({
				usernameError: '',
				emailError: '',
				passwordError: '',
			});
			try {
				const response =await axios.post('http://localhost:3001/register', { username, email, password });
				console.log('response=>>>>\n');

				console.log(response.data);

				//to navigate to login page
				window.location.href = '/login';
			} catch (error) {
				console.log(error.response.data);

				//To show the error
				toast.error(error.response.data, {
					position: toast.POSITION.TOP_CENTER,
					hideProgressBar: true,
					autoClose: 2000,
				});
				// console.log('User does not exist');
			}
		}
	};

	render() {
		let { username, email, password } = this.state;
		return (
			<div>
				<div className="row  justify-content-center order-xs-12">
					<div className="side-page mt-5 col-sm-12 col-md-2 gradient-color d-flex  justify-content-center align-items-center ">
						<div>
							<div className="side-title text-white font-weight-bold text-center ">Welcome Back!</div>
							<div className=" text-white text-center ">
								To keep connected with us please login with your personal info
							</div>
							<div className="btn btn-outline-primary m-5  side-page-btn align-self-center">
								<Link to="/login" className="nav-item text-white">
									SIGN IN
								</Link>
							</div>
						</div>
					</div>
					<div className="col-md-4 mt-5 order-xs-2">
						<div className="card">
							<h3 className="card-title mx-auto mt-3 title ">Create Account</h3>
							<div className="card-body">
								<div className="icons-props rows  d-flex  justify-content-center">
									<span className="col-sm-1 fab fa-facebook  facebook-icon"></span>
									<span className="col-sm-1 fab fa-google google-icon"></span>
									<span className="col-sm-1 fab fa-linkedin linkedin-icon"></span>
								</div>
								<h6 className="text-center mt-2 ">or use your email for registration</h6>
								<form method="POST" onSubmit={this.onRegister}>
									<div className="form-group">
										{/* <label for="username">Username</label> */}
										<input
											className="form-control"
											type="text"
											id="username"
											name="username"
											placeholder="Enter username"
											value={username}
											onChange={this.onHandleChange}
										></input>
										<span className="text-danger error-message">{this.state.usernameError}</span>
									</div>
									<div className="form-group">
										{/* <label for="email">Email-Id</label> */}
										<input
											className="form-control"
											// type="email"
											id="email"
											name="email"
											placeholder="Enter email"
											value={email}
											onChange={this.onHandleChange}
										></input>
										<span className="text-danger error-message">{this.state.emailError}</span>
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
										<span className="text-danger error-message">{this.state.passwordError}</span>
									</div>
									<div className="d-flex justify-content-center ">
										<button type="submit" className="btn signin-btn  d-block ">
											SIGN UP
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Signup;
