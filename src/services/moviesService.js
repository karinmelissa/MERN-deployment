import axios from 'axios';

export default class MovieService {

    constructor() {}

    async getOneSinglemovie(id) {
        try {
            const movie = await axios.get(`http://localhost:8000/api/movies/${id}`)
            return movie.data.movie;
        } catch(err) {
            return err;
        }
    };

    async getAllmovies() {
         try {
            const movieList = await axios.get('http://localhost:8000/api/movies');
            return movieList.data.movies;

        } catch (error) {
            return error;
        }
    }

    async updatemovie(id, movie) {
        try {
            const updatedmovie = await axios.put(`http://localhost:8000/api/movies/update/${id}`, movie)
            return updatedmovie.data.movie;
        } catch(err) {
            return err;
        }
    }

    async deletemovie(id) {
        try{
            const deletemovie = await axios.delete(`http://localhost:8000/api/movies/delete/${id}`)
            return deletemovie.data.response;
        } catch(err) {
            return err;
        }
    }

    async registerUser(user) {
        try {
            const response = await axios.post('http://localhost:8000/api/users/new', user);
            return response.data.user;

        } catch(err) {
            return err;
        }
    }

    async loginUser(user) {
        try {
            const response = await axios.post('http://localhost:8000/api/users/login', user);
            console.log(response)
            return response.data.user;

        } catch(err) {
            return err;
        }
    }



};