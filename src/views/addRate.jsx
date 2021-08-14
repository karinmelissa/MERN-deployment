import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import MovieService from '../services/moviesService';

const NewRate = () => {
	const { id } = useParams();
	const movieService = new MovieService;
	const [movie, setmovie] = useState({});
	const [movieForm, setmovieform] = useState({
		review: '',
		author: '',
		rate: '',
		title:''
	})
	const history = useHistory();

	const getmovieFromService = async () => {
		try {
			const movieFromService = await movieService.getOneSinglemovie(id);
			setmovie(movieFromService);
			setmovieform({
				title: movieFromService.title,
			})
		} catch (err) {
			return err;
		}
	}

	useEffect(() => {
		getmovieFromService();
	}, [])

    const addRate = async (e) => {
			e.preventDefault();
			console.log('hola')
			console.log(movie)
			console.log(movieForm)
		try {
			const updatedMovierates = await movieService.updatemovie(id, { ...movie, rate: [...movie.rate , movieForm.rate], author: [...movie.author , movieForm.author],review: [...movie.review , movieForm.review] })
			history.push('/home')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="movie-form-container">
			<h1>Mi nuevo movie:</h1>
			<Form onSubmit={addRate}>
				<Form.Group controlId="exampleForm.ControlTextarea1">
				<h2>{movieForm.title}</h2>
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
					{id ? 'Enviar!' : 'Enviar'}
				</Button>
			</Form>
		</div>
	)
}

export default NewRate;