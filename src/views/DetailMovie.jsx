import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import MovieService from '../services/moviesService';
import { useHistory } from "react-router-dom";

const Detailmovie = () => {

	const { id } = useParams()
	const movieService = new MovieService();
	const [movie, setmovie] = useState({});
	const history = useHistory();

	const getmovieFromService = async () => {
		try {
			const movie = await movieService.getOneSinglemovie(id);
			setmovie(movie);
		} catch (err) {
			return err;
		}
	}

	const deletemovie = async () => {
		try {
			const deletmovieInDB = await movieService.deletemovie(id);
			deletmovieInDB && history.push('/');

		} catch (err) {
		}
	}

	useEffect(() => {
		getmovieFromService();
	}, [])


	return (
		<div>
			{
				movie? <div className="movie-container">
					<h1>{movie.title}</h1>
					<table className='table table-bordered'>
						<thead>
						<tr>
							<th scope="col">Rated by</th>
							<th scope="col">Rate</th>
							<th scope="col">Review</th>
						</tr>
						</thead>
						<tbody>
							<td>							
								<ul className='reviewersList'>
								{movie.author.map(e=><li>{e}</li>)}
							</ul></td>
							<td>				
								<ul className='ratessList'>
								{movie.rate.map(e=><li>{e}</li>)}
							</ul></td>
							<td>							<ul className='reviesList'>
								{movie.review.map(e=><li>{e}</li>)}
							</ul></td>
						</tbody>
					</table>
					


				</div> : 'No existe el movie'
			}

		</div>
	)

}

export default Detailmovie;