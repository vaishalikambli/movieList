import React, { Component } from 'react';
import { getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import MovieTable from './movieTable';
import _ from "lodash";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path: 'title', order: 'asc' }
    };

    componentDidMount() {
        const genres = [{ name: 'All Genres', _id: "" }, ...getGenres()];

        this.setState({ movies: getMovies(), genres })
    };

    handleDelete = (movie) => {
        console.log(movie);
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = genre => {
        console.log("Select genre", genre);
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    render() {
        const { length: count } = this.state.movies;
        const { 
            pageSize, 
            currentPage, 
            selectedGenre,
            sortColumn, 
            movies: allMovies } = this.state;

        if (count === 0) return <p>There are no movies in the database</p>;

        // Filtered movies based on genre
        const filtered = 
            selectedGenre && selectedGenre._id 
                ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
                : allMovies;

        //Sort the data
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        //Paginate the data
        const movies = paginate(sorted, currentPage, pageSize);
        console.log("Movies:: ", movies);

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <p>Showing {filtered.length} movies in the database</p>
                    <MovieTable
                        movies={movies}
                        sortColumn={sortColumn} 
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange} />
                </div>
            </div>
        );
    }
}

export default Movies;