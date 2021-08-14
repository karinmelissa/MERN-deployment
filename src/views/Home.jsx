import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import MovieService from '../services/moviesService';
import { Button } from 'react-bootstrap'

const Home = () => {
	const [movies, setmovies] = useState([]);
	const movieService = new MovieService;

	const getAllmovies = async () => {
		const movies = await movieService.getAllmovies()
		setmovies(movies);
	}

	useEffect(() => {
		getAllmovies();
	}, []);

	const movieAverage = (e)=>{
		let sum =0;
		for(let i=0;i<e.length;i++){
			sum += Number(e[i]);
		}
		const avg = sum/e.length;
		return avg.toFixed(2)
	}

	return (
		<div>
			<h1 className='userName'>Welcome {localStorage.getItem('currentUser')}</h1>
			<div className="movies-container">
				<h2>Movie List</h2>
				<Link to="/new">
					<button type="button" class="btn btn-primary">Add a new movie</button>
				</Link>
				<ul>
				<table className='table table-bordered moviesTable'>
						<thead>
						<tr>
							<th scope="col">Movie Title</th>
							<th scope="col">Average Rating</th>
							<th scope="col">Actions</th>
						</tr>

						</thead>
						<tbody>
						{
						movies.length > 0 ? (
							movies.map((movie) => (
								<tr>
									<td><Link to={`/details/${movie._id}`}><p>{movie.title}</p></Link></td>
							<td><p>{movieAverage(movie.rate)}</p></td>
							<td><Link to={`/addRate/${movie._id}`}>
								<Button variant="dark">Review</Button>
							</Link></td>
							</tr>
								
							))
						) : 'No ha creado ningún movie'
					}

						</tbody>
				</table>

				</ul>
			</div>
		</div>
	)

}

export default Home;

