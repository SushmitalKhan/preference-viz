import { useEffect, useMemo, useState } from "react";
import Row from "react-bootstrap/Row";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { imgurl } from "../middleware/requests";

const posterWidth = 54;
const posterHeight = 81;

const svgFontHeight = 12;

const svgDrawingBaseline = posterHeight;

const ticksCount = 5;
const svgTicksColor = "rgb(0, 0, 0)";
const tickHeight = 10;

const xAxisOffset = posterWidth / 2;
const yAxisOffset = posterHeight / 2;

const navDotRadius = 5;
const navDotColor = "rgb(144, 81, 207)"


export default function CartesianGraph({ graphID, width, height, data, dataInfo, xCol, yCol, ...props }) {

	const [collision, setCollision] = useState(false);
	const [navLanes, setNavLanes] = useState(8);

	const [vizVariant, setVizVariant] = useState(1);

	const navLaneXDiv = 20; // We might want to make this dynamic with window size

	useEffect(() => {
		if (collision) {
			setNavLanes(navLanes + 1);
			setCollision(false);
		}
	}, [collision, navLanes]);

	const xSubdivWidth = useMemo(() => {
		return (width - 2 * xAxisOffset) / (ticksCount - 1);
	}, [width]);

	const ySubdivHeight = useMemo(() => {
		return (height - svgDrawingBaseline) / (ticksCount - 1);
	}, [height]);

	const yAugmentedData = useMemo(() => {
		if (data.length > 0) {
			let augmentedData = [];

			data.forEach((d, i) => {
				const cx = (d[xCol] - 1) * xSubdivWidth + xAxisOffset;
				const cy = (d[yCol] - 1) * ySubdivHeight + yAxisOffset;
				d.x = cx;
				d.y = cy;
				augmentedData.push(d);
			});
			return augmentedData;
		}
	}, [data, xSubdivWidth, ySubdivHeight, xCol, yCol]);

	const onItemHover = (evt, effect) => {
		let target = evt.target;
		const item_id = target.getAttribute("item_id");
		imgHoverEffect(target, effect);
		if (props.onItemHover) { props.onItemHover(item_id); }
	}

	const imgHoverEffect = (target, effect) => {
		switch (effect) {
			case "out":
				const itemX = target.getAttribute("x_val");
				const itemY = target.getAttribute("y_val");
				target = transformImg(target, posterWidth, posterHeight,
					(itemX - 1) * xSubdivWidth + xAxisOffset,
					height - (itemY - 1) * ySubdivHeight - yAxisOffset - 2 * svgFontHeight - tickHeight);
				break;
			case "in":
				const parent = target.parentNode;
				target = transformImg(target, posterWidth * 2, posterHeight * 2,
					target.getAttribute("x") - posterWidth / 2,
					target.getAttribute("y") - posterHeight / 2);
				parent.appendChild(target);
				console.log(target.getAttribute("x_val"), target.getAttribute("y_val"));
				break;
			default:
				break;
		}
	}

	const transformImg = (target, w, h, x, y) => {
		target.setAttribute("width", w);
		target.setAttribute("height", h);
		target.setAttribute("x", x);
		target.setAttribute("y", y);

		return target;
	}

	return (
		<>
			<Row style={{ margin: "2em", padding: "0.5em" }}>
				<ToggleButtonGroup type="radio" name="options" defaultValue={1}
					onChange={(val) => setVizVariant(val)}>
					<ToggleButton id="tbg-radio-1" value={1}>
						Posters
					</ToggleButton>
					<ToggleButton id="tbg-radio-2" value={2}>
						Dots
					</ToggleButton>
				</ToggleButtonGroup>
			</Row>
			<svg key={`${graphID}-cc`} id={graphID} width={width} height={height} style={{ margin: "2em" }}>
				{yAugmentedData.map((d, i) =>
					vizVariant === 1 ?
						<image key={`img-${graphID}-cc-${d.item_id}`}
							id={`img-${graphID}-cc-${d.item_id}`}
							width={posterWidth} height={posterHeight}
							x={(d[xCol] - 1) * xSubdivWidth + xAxisOffset}
							y={height - (d[yCol] - 1) * ySubdivHeight - posterHeight - 2 * svgFontHeight - tickHeight}
							xlinkHref={imgurl(dataInfo[d.item_id].poster_identifier)}
							cursor={"pointer"}
							item_id={d.item_id} x_val={d[xCol]} y_val={d[yCol]}
							item_type={"img"}
							onMouseEnter={evt => onItemHover(evt, "in")}
							onMouseLeave={evt => onItemHover(evt, "out")}
						/>
						:
						<circle key={`circle-${graphID}-cc-${d.item_id}`}
							id={`circle-${graphID}-cc-${d.item_id}`}
							cx={(d[xCol] - 1) * xSubdivWidth + xAxisOffset}
							cy={height - (d[yCol] - 1) * ySubdivHeight - posterHeight - 2 * svgFontHeight - tickHeight}
							r={navDotRadius} fill={navDotColor}
							cursor={"pointer"}
							item_id={d.item_id} item_score={d.score}
							item_type={"nav"}
							onMouseEnter={evt => onItemHover(evt, "in")}
							onMouseLeave={evt => onItemHover(evt, "out")} />

				)}
				<line key={`${graphID}-cc-xAxis`}
					x1={xAxisOffset} y1={height - svgFontHeight * 2}
					x2={width - xAxisOffset} y2={height - svgFontHeight * 2}
					style={{ stroke: svgTicksColor, strokeWidth: "2" }} />
				{
					[...Array(ticksCount).keys()].map(i =>
						<line key={`xAxis-${graphID}-cc-${i}`}
							x1={(i) * xSubdivWidth + xAxisOffset}
							y1={height - svgFontHeight * 2}
							x2={(i) * xSubdivWidth + xAxisOffset}
							y2={height - tickHeight - svgFontHeight * 2}
							style={{
								stroke: svgTicksColor, strokeWidth: "2"
							}} />
					)}
				{[...Array(ticksCount).keys()].map(i =>
					<text key={`xAxisLabel-${graphID}-cc-${i}`}
						x={(i) * xSubdivWidth + xAxisOffset}
						y={height - svgFontHeight}
						textAnchor="middle" fill={svgTicksColor}
						fontSize={svgFontHeight}>
						{i + 1}
					</text>

				)
				}
				<line key={`${graphID}-cc-yAxis`}
					x1={parseInt(xAxisOffset / 2)} y1={height - svgFontHeight * 2 - tickHeight}
					x2={parseInt(xAxisOffset / 2)} y2={svgFontHeight * 2 + tickHeight}
					style={{ stroke: svgTicksColor, strokeWidth: "2" }} />
				{
					[...Array(ticksCount).keys()].map(i =>
						<line key={`yAxis-${graphID}-cc-${i}`}
							x1={parseInt(xAxisOffset / 2)}
							y1={height - (i) * ySubdivHeight - 3 * svgFontHeight}
							x2={parseInt(xAxisOffset / 2) + tickHeight}
							y2={height - (i) * ySubdivHeight - 3 * svgFontHeight}
							style={{
								stroke: svgTicksColor, strokeWidth: "2"
							}} />
					)}
				{[...Array(ticksCount).keys()].map(i =>
					<text key={`yAxisLabel-${graphID}-cc-${i}`}
						x={parseInt(xAxisOffset / 2) - tickHeight}
						y={height - (i) * ySubdivHeight - 3 * svgFontHeight}
						textAnchor="middle" fill={svgTicksColor}
						fontSize={svgFontHeight}>
						{i + 1}
					</text>
				)
				}
				<defs className="itemImg">
				</defs>
			</svg >
		</>
	)
}
