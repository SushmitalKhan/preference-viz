import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import DiscreteDecoupled from "../pages/DiscreteDecoupled";
import ContinuousCoupled from "../pages/ContinuousCoupled";
import ContinuousDecoupled from "../pages/ContinuousDecoupled";
import DiscreteCoupled from "../pages/DiscreteCoupled";

import CdExp from '../components/CdExp';
import DcExp from "../components/DcExp";
import DdExp from "../components/DdExp";
import SurveyPage from "../components/SurveyPage";
import HomePage from "../pages/HomePage";
import MovieRatingPage from "../pages/MovieRatingPage";
import ExperimentalPage from "../pages/ExperimentalPage";

class RoutingLayout extends React.Component {

  render() {
    return (
      <>
        <Router basename="/preference-visualization">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/ratemovies" element={<MovieRatingPage />} />
            <Route path="/contcoupled" element={<ContinuousCoupled />} />
            <Route path="/contdecoupled" element={<ContinuousDecoupled />} />
            <Route path="/disccoupled" element={<DiscreteCoupled />} />
            <Route path="/discdecoupled" element={<DiscreteDecoupled />} />

            <Route path="/cdexp" element={<CdExp />} />
            <Route path="/dcexp" element={<DcExp />} />
            <Route path="/ddexp" element={<DdExp />} />

            <Route path="/surveypage" element={<SurveyPage />} />

            <Route path="/whiteboard" element={<ExperimentalPage />} />

            {/* <Redirect to="/"/> */}
          </Routes>
        </Router>
      </>
    )
  }
}

export default RoutingLayout;