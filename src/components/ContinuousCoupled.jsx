import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import CartesianGraph from "./CartesianGraph";
import RightPanel from "./RightPanel";

export default function Continuouscoupled({ itemdata }) {

	const [items, setItems] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [activeItem, setActiveItem] = useState(undefined);


	useEffect(() => {
		if (Object.keys(itemdata).length > 0) {
			const itemscores = Object.keys(itemdata).map((item) => {
				return {
					item_id: item,
					user_score: itemdata[item].user_score,
					community_score: itemdata[item].community_score
				}
			});
			setItems(itemscores);
		}
	}, [itemdata])


	useEffect(() => {
		if (Object.keys(items).length > 0) { setDataLoaded(true); }
	}, [items])


	return (
		<Container>
			{dataLoaded ?
				<Row>
					<Col lg={9} md={8} sm={12}>
						<Row style={{ margin: "0 0 2em 0" }}>
							<CartesianGraph key={"user"}
								graphID={"user_comm_graph"}
								width={900} height={800}
								data={items} dataInfo={itemdata}
								xCol={"user_score"} yCol={"community_score"}
								onItemHover={setActiveItem} />
						</Row>
					</Col>
					<Col lg={3} md={4} sm={12}>
						<Row style={{ margin: "2em 0 2em 0" }}>
							<RightPanel movie={itemdata[activeItem]} />
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
