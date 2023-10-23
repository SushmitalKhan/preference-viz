import React from "react";
import ReactDOM from 'react-dom/client';

//stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import App from "./layouts/RoutingLayout";


// const root = ReactDOMClient.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <MainContainer />
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
		{/* <RouterProvider router={router} /> */}
	</React.StrictMode>
);