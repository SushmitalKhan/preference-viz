import { useState, useEffect } from 'react';
import { imgurl } from '../middleware/requests';


export default function SingleScaleGraph({ items, itemInfo, xkey, scaleFactor,
	label }) {

	const [canvasId, setCanvasId] = useState(
		`singleScaleGraph_${String(label).replace(' ', '_')}`);
	const [imageCache, setImageCache] = useState({});

	useEffect(() => {
		const canvas = document.getElementById(canvasId);
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		let imgCache = {};

		items.map((item, index) => {
			const img = new Image();
			img.onload = () => {
				ctx.drawImage(img, item[xkey] * scaleFactor, 0, 27, 45);
			};
			img.src = imgurl(itemInfo[item.item_id].poster_identifier);
			imgCache[item.item_id] = img;
			console.log(item[xkey], item[xkey] * scaleFactor);
			console.log(imgCache);
			return null;
		})

	}, [items, itemInfo, xkey, scaleFactor, canvasId]);


	return (
		<canvas id={canvasId}
			width="500" height="100">
		</canvas>
	)
}