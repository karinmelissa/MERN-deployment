import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import MovieService from '../services/moviesService';
import { useHistory } from "react-router-dom";

const Login = () => {
	const movieService = new MovieService();
	let history = useHistory();

	const [loginForm, setLoginForm] = useState({
		username: '',
		email: '',
		password: ''
	});

	const [isLogin, setIsLogin] = useState(true);

	const loginUser = async (e) => {
		e.preventDefault();
		if(isLogin){
			try {
				await movieService.loginUser(loginForm)
				return (localStorage.setItem('currentUser',loginForm.username),
			history.push("/home")
			)
			} catch (err) {
				console.log(err)
			}
		}
		try {
			await movieService.registerUser(loginForm)
			return (localStorage.setItem('currentUser',loginForm.username),
			history.push("/home")
			)
		} catch (err) {
			console.log(err)
		}


	
	}
	return (
		<div className="login-container">
			<h1>{isLogin ? 'Inicia sesión' : 'Registra tus datos'}</h1>
			<Form onSubmit={loginUser}>
				{!isLogin && (
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" name="username" value={loginForm.username}
							onChange={(e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value })} />
					</Form.Group>
				)}
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control type="text" name="email" value={loginForm.email}
						onChange={(e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value })} />
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" name="password" value={loginForm.password}
						onChange={(e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value })} />
				</Form.Group>
				<Button variant="primary" type="submit">
					{isLogin ? 'Login' : 'Registrarse'}
				</Button>
			</Form>
			{isLogin ? (
				<p>
					¿Aún no tienes una cuenta?
					<Button variant="link" onClick={() => setIsLogin(false)}>Regístrate</Button>
				</p>
			) : (
				<p>
					¿Ya tienes una cuenta?
					<Button variant="link" onClick={() => setIsLogin(true)}>Ir al Login</Button>
				</p>
			)}

		</div>
	)
}

export default Login;