import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link, Outlet, useLocation } from "react-router-dom";
import { post } from "../middleware/requests";


export default function VisualizationLayout() {

	const { state } = useLocation();
	const { ratings } = state;
	const { type } = state;

	const [items, setItems] = useState([]);
	const [movies, setMovies] = useState({});

	console.log("VisualizationLayout", ratings);
	console.log("VisualizationLayout", type);

	useEffect(() => {
		console.log("infiniteloop");
		if (ratings.length > 0 && items.length === 0) {
			post("prefviz/recommendation/", {
				user_id: 0, // TODO: change this to the actual user id
				user_condition: 0, // TODO: change this to the actual user condition
				ratings: ratings,
				rec_type: 0, // TODO: should be irrelevant to this study
				num_rec: 20 // TODO: check if server is handling this right now
			}).then((response: Promise<PrefItem[]>) => response.json())
				.then((items: PrefItem[]) => {
					console.log("recs", items);
					setItems(items);
				}).catch((err) => {
					console.log(err);
				});
		}
	}, [ratings, items])


	useEffect(() => {
		const getMoviesByIDs = async (imap) => {
			console.log(imap);
			post('ers/movies/', Object.keys(imap))
				.then((response): Promise<movie[]> => response.json())
				.then((movies: movie[]) => {
					console.log(movies);
					const moviemap = movies.reduce((map, movie) => {
						map[movie.movie_id] = {
							...movie,
							...imap[movie.movie_id]
						};
						return map;
					}, {});
					setMovies(moviemap);
				})
				.catch((error) => console.log(error));
		}

		// Collect all item_ids and fetch their data
		// Create a map of item_id to movie data so we can augment the 
		// movie info once we get i
		let item_map = {};
		for (let item of items) {
			item_map[item.item_id] = {
				community_score: item.community_score,
				user_score: item.user_score
			};
		}

		getMoviesByIDs(item_map);
	}, [items])


	return (
		<Container>
			<Row>
				<header><h1>Implicit Visualizations</h1></header>
			</Row>
			<Row>
				<Outlet context={movies} />
			</Row>
			<Row>
				<header>
					<Link to="/surveypage">
						<Button type="button"
							className="btn btn-primary btn-light float-right">
							Next Page
						</Button>
					</Link>
				</header>
			</Row>
		</Container>
	)
}