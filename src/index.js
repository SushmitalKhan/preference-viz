import React from "react";
import ReactDOM from 'react-dom/client';

//stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import App from "./layouts/RoutingLayout";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);