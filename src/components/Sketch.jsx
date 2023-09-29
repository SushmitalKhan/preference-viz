import paper from "paper";

export default function Sketch() {
	window.onload = function () {
		paper.install(window);
		paper.setup("paper-canvas");
		draw();

		var myPath;

		paper.view.onMouseDown = function (event) {
			myPath = new paper.Path();
			myPath.strokeColor = 'black';
		}

		paper.view.onMouseDrag = function (event) {
			myPath.add(event.point);
		}

		paper.view.onMouseUp = function (event) {
			var myCircle = new paper.Path.Circle({
				center: event.point,
				radius: 10
			});
			myCircle.strokeColor = 'black';
			myCircle.fillColor = 'white';
		}

		paper.view.draw();
	};

	function draw(event) {
		const path = new paper.Path.Circle({
			center: [80, 50],
			radius: 35,
			fillColor: "red",
		});

		const secondPath = new paper.Path.Circle({
			center: [120, 50],
			radius: 35,
			fillColor: "#00FF00",
		});
	}

	// Most return null
	return null;
}