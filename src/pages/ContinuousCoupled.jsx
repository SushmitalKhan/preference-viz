import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {
	Link,
	Navigate
} from "react-router-dom";
import CanvasJSReact from '@canvasjs/react-charts';


// var CanvasJS = CanvasJSReact.CanvasJS
var CanvasJSChart = CanvasJSReact.CanvasJSChart

const handleClick = () => {
	Navigate("/contdecoupled");
}

class ContinuousCoupled extends React.Component {

	render() {
		const options = {
			theme: "light",
			zoomEnabled: true,
			title: {
				text: "Continuous Coupled"
			},
			axisX: {
				title: "Community's Movie Preference",
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				},
				minimum: 0,
				maximum: 5,
				lineThickness: 2,
				tickThickness: 0,
				gridThickness: 0,
				labelFormatter: function () {
					return " ";
				}
			},
			axisY: {
				title: "Your Movie Preferences",
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				},
				minimum: 0,
				maximum: 5,
				lineThickness: 2,
				tickThickness: 0,
				gridThickness: 0,
				labelFormatter: function () {
					return " ";
				}
			},

			data: [{
				type: "scatter",
				markersize: 15,
				dataPoints: [
					{ x: 4.2, y: 2.15 },
					{ x: 2.9, y: 1.75 },
					{ x: 1.64, y: 3.25 },
					{ x: 2.69, y: 3.5 },
					{ x: 3.5, y: 4.64 },
					{ x: 2.21, y: 5 },
					{ x: 1.9, y: 4.12 },
					{ x: 2.5, y: 1.4 },
					{ x: 3.9, y: 3.4 },
					{ x: 2.7, y: 2.5 },
					{ x: 2.4, y: 5 },
					{ x: 3.4, y: 5 },
					{ x: 4, y: 2.62 },
					{ x: 3.4, y: 3.12 },
					{ x: 4.2, y: 2.02 },
					{ x: 3.91, y: 3.02 },
					{ x: 1.72, y: 4.08 }]
			}],

			dataPointSelection: (e) => {
				this.setState({
					showModal: true,
					selectedDataPoint: e.dataPointIndex
				});
			}
		}

		return (
			<div className="row">
				{/* <div className="col custom_side_col">
          <article>
            <p3>Exploration Guide</p3>
          </article>
        </div> */}

				<div className="col-8">
					<Container>
						<Row>
							<Col>
								<CanvasJSChart options={options} />
							</Col>
						</Row>

						<div className="footer">
							<Link to="/contdecoupled" >
								<button type="button" className="btn btn-primary btn-light" >
									Next Page
								</button>
							</Link>
						</div>

					</Container>
				</div>

				<div className="col custom_side_col">
					<article>
						<p>Preference Status</p>
					</article>
				</div>
			</div>

		)
	}
}
export default ContinuousCoupled;