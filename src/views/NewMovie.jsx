import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import MovieService from '../services/moviesService';

const NewMovieForm = () => {
	const { id } = useParams();
	const movieService = new MovieService;
	const [movieForm, setmovieform] = useState({
		title: '',
		review: '',
		author: '',
		rate: ''
	})
	const history = useHistory()

	const onSubmitHandler = (e) => {
		e.preventDefault();
		console.log('llegué')
		if (id) {
			movieService.updatemovie(id, movieForm);
			history.push("/home");
		} else {
			console.log(movieForm)
			axios.post('http://localhost:8000/api/movies/new', movieForm)
				.then(() => history.push("/home"))
				.catch(err => console.log(err))
		}
	}

	const getmovieFromService = async () => {
		try {
			const movieFromService = await movieService.getOneSinglemovie(id);
			setmovieform({
				title: movieFromService.title,
				review: movieFromService.reviews.review,
				author: movieFromService.author,
				rate: movieService.rate
			})
		} catch (err) {
			return err;
		}
	}

	useEffect(() => {
		console.log(movieForm)
		getmovieFromService();
	}, [])

	return (
		<div className="movie-form-container">
			<h1>Mi nuevo movie:</h1>
			<Form onSubmit={onSubmitHandler}>
				<Form.Group controlId="exampleForm.ControlTextarea1">
					<Form.Label>Titulo</Form.Label>
					<Form.Control type="text" name="title" value={movieForm.title} onChange={(e) => setmovieform({ ...movieForm, [e.target.name]: e.target.value })} />
				</Form.Group>
				<Form.Group controlId="exampleForm.ControlTextarea1">
					<Form.Label>Rate</Form.Label>
					<select name='rate' value={movieForm.rate} onChange={(e) => setmovieform({ ...movieForm, [e.target.name]: e.target.value })}>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</select>
				</Form.Group>
				<Form.Group controlId="exampleForm.ControlTextarea1">
					<Form.Label>Usuario</Form.Label>
					<Form.Control type="text" name="author" value={movieForm.author} onChange={(e) => setmovieform({ ...movieForm, [e.target.name]: e.target.value })} />
				</Form.Group>
				<Form.Group controlId="exampleForm.ControlTextarea1">
					<Form.Label>Example textarea</Form.Label>
					<Form.Control as="textarea" rows={3} name="review" value={movieForm.review} onChange={(e) => setmovieform({ ...movieForm, [e.target.name]: e.target.value })} />
				</Form.Group>
				<Button variant="primary" type="submit">
					{id ? 'Editar' : 'Enviar'}
				</Button>
			</Form>
		</div>
	)
}

export default NewMovieForm;