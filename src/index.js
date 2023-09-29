import React from "react";
import * as ReactDOMClient from 'react-dom/client';

//stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

//component file
import MainContainer from "./layouts/MainLayout";

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainContainer />
  </React.StrictMode>
);