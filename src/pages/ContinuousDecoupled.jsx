import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link, useLocation } from "react-router-dom";
import RightPanel from "../components/RightPanel";
import SingleScaleGraph from "../components/SingleScaleGraph";
import { post } from "../middleware/requests";

export default function ContinuousDecoupled() {

	const [items, setItems] = useState([]);
	const [communityOrderedList, setCommunityOrderedList] = useState([]);
	const [userOrderedList, setUserOrderedList] = useState([]);
	const [dataIsLoaded, setDataIsLoaded] = useState(false);
	const [activeMovie, setActiveMovie] = useState(undefined);
	const [message, setMessage] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [movies, setMovies] = useState({});


	const { state } = useLocation();
	console.log(state);
	const { ratings } = state;

	const handleClick = (num, text) => {
		this.setState({
			count: this.state.count + num,
			message: text,
		});
	}

	const movieClickHandler = (movie, text) => {
		setActiveMovie(movie);
		setMessage(text);
	}

	useEffect(() => {
		post("prefviz/recommendation/", {
			user_id: 0, // TODO: change this to the actual user id
			user_condition: 0, // TODO: change this to the actual user condition
			ratings: ratings,
			rec_type: 0, // TODO: should be irrelevant to this study
			num_rec: 80 // TODO: check if server is handling this right now
		}).then((response: Promise<PrefItem[]>) => response.json())
			.then((items: PrefItem[]) => {
				console.log(items);
				setItems(items);
			}).catch((err) => {
				console.log(err);
			});
	}, [ratings])

	useEffect(() => {
		const getMoviesByIDs = async (ids) => {
			console.log(ids);
			post('ers/movies/', ids)
				.then((response): Promise<movie[]> => response.json())
				.then((movies: movie[]) => {
					console.log(movies);
					const moviemap = movies.reduce((map, movie) => {
						map[movie.movie_id] = movie;
						return map;
					}, {});
					setMovies(moviemap);
				})
				.catch((error) => console.log(error));
		}
		// console.log(Object.keys(items)); // TODO: items is an Array
		// console.log(items.me);
		// if (items.me && items.comm) {
		// console.log("set dataloaded", items);
		// setDataIsLoaded(true); // TODO: uncomment this
		// }

		// Collect all item_ids and fetch their data
		const item_ids = items.map((item) => item.item_id);
		console.log(item_ids);
		getMoviesByIDs(item_ids);

		const communityOrderedList = items.sort((a, b) =>
			(a.community_score > b.community_score) ? 1 : -1);

		const userOrderedList = items.sort((a, b) =>
			(a.user_score > b.user_score) ? 1 : -1);
		console.log("communityOrderedList", communityOrderedList);
		console.log("userOrderedList", userOrderedList);
		setCommunityOrderedList(communityOrderedList);
		setUserOrderedList(userOrderedList);
	}, [items])

	useEffect(() => {
		if (Object.keys(movies).length > 0) {
			setDataIsLoaded(true);
		}
	}, [movies])

	return (
		<Container>
			< div className="row" >
				<header><h1>Continuous Decoupled Visualization - Implicit</h1></header>
			</div >
			{dataIsLoaded ?
				<Row>
					<Col lg={9} md={8} sm={12}>
						<Row style={{ margin: "2em 0 2em 0" }}>
							<h2> Your Movie Preferences</h2>
							<SingleScaleGraph items={items} itemInfo={movies}
								xkey={"user_score"} scaleFactor={100}
								label={"user preference"} />
						</Row>

						<Row style={{ margin: "2em 0 2em 0" }}>
							<h2> Community's Movie Preferences</h2>
							<SingleScaleGraph items={items} itemInfo={movies}
								xkey={"community_score"} scaleFactor={100}
								label={"community preference"} />
						</Row>
					</Col>
					<Col lg={3} md={4} sm={12}>
						<RightPanel movie={activeMovie} />
					</Col>
				</Row>
				:
				<Row><h1> Please wait some time.... </h1></Row>}
			<Row>
				<header>
					<Link to="/surveypage">
						<button type="button" className="btn btn-primary btn-light float-right">
							Next Page
						</button>
					</Link>
				</header>
			</Row>
		</Container>
	)
}
