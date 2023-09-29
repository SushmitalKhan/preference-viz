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

	const [communityList, setCommunityList] = useState([]);
	const [userList, setUserList] = useState([]);

	const [dataLoaded, setDataLoaded] = useState(false);

	const [activeMovie, setActiveMovie] = useState(undefined);

	const [movies, setMovies] = useState({});

	const { state } = useLocation();
	const { ratings } = state;

	useEffect(() => {
		console.log("infiniteloop");
		if (ratings.length > 0 && items.length === 0) {
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
		let communityList = [];
		let userList = [];
		let item_map = {};
		for (let item of items) {
			item_map[item.item_id] = {
				community_score: item.community_score,
				user_score: item.user_score
			};
			communityList.push({
				item_id: item.item_id,
				score: item.community_score
			});
			userList.push({
				item_id: item.item_id,
				score: item.user_score
			});
		}

		getMoviesByIDs(item_map);

		setCommunityList(communityList);
		setUserList(userList);
	}, [items])

	useEffect(() => {
		if (Object.keys(movies).length > 0) { setDataLoaded(true); }
	}, [movies])

	useEffect(() => {
		console.log("activeMovie", activeMovie);
	}, [activeMovie])

	return (
		<Container>
			<Row>
				<header><h1>Continuous Decoupled Visualization - Implicit</h1></header>
			</Row>
			{dataLoaded ?
				<Row>
					<Col lg={9} md={8} sm={12}>
						<Row style={{ margin: "2em 0 2em 0" }}>
							<h2>Your Movie Preferences</h2>
							<SingleScaleGraph key={"user"}
								graphID={"user_graph"}
								width={900} height={300}
								data={userList} dataInfo={movies}
								pairingID={"community_graph"}
								onItemHover={setActiveMovie} />
						</Row>

						<Row style={{ margin: "2em 0 2em 0" }}>
							<h2>Community's Movie Preferences</h2>
							<SingleScaleGraph key={"community"}
								graphID={"community_graph"}
								width={900} height={300}
								data={communityList} dataInfo={movies}
								pairingID={"user_graph"}
								onItemHover={setActiveMovie} />
						</Row>
					</Col>
					<Col lg={3} md={4} sm={12}>
						<Row style={{ margin: "2em 0 2em 0" }}>
							<RightPanel movie={movies[activeMovie]} />
						</Row>
					</Col>
				</Row>
				:
				<Row><h1> Please wait some time.... </h1></Row>}
			<Row>
				<header>
					<Link to="/surveypage">
						<button type="button"
							className="btn btn-primary btn-light float-right">
							Next Page
						</button>
					</Link>
				</header>
			</Row>
		</Container>
	)
}
