import { MovieDb } from 'moviedb-promise';
const moviedb = new MovieDb(
	process.env.MOVIEDB_API_KEY!,
	process.env.MOVIEDB_BASE_URL
);

export default moviedb;
