import { MovieDb } from 'moviedb-promise';
const moviedb = new MovieDb(process.env.MOVIEDB_API_KEY!);

export default moviedb;
