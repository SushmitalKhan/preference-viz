import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function HomePage() {
	const navigate = useNavigate();
	return (
		<div>
			<h2>Movie Preference Visualizations</h2>
			<h3>Implicit Exploration</h3>
			<ul>
				<li>
					<Button onClick={() =>
						navigate("ratemovies",
							{ state: { type: "implicit" } },
							{ replace: true })} >
						Implicit
					</Button>
				</li>
				<li>
					<Button onClick={() =>
						navigate("ratemovies",
							{ state: { type: "explicit" } },
							{ replace: true })} >
						Explicit
					</Button>
				</li>
			</ul>
		</div >
	)
}