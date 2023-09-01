import React from "react";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h2>Movie Preference Visualizations</h2>
        <h3>Implicit Exploration</h3>
        <ul>
          <li><Link to="/ratemovies" state={{ loc: "/contcoupled" }}>
            Continuous Coupled</Link>
          </li>
          <li><Link to="/ratemovies" state={{ loc: "/contdecoupled" }}>
            Continuous Decoupled</Link>
          </li>
          <li><Link to="/ratemovies" state={{ loc: "/disccoupled" }}>
            Discrete Coupled</Link>
          </li>
          <li><Link to="/ratemovies" state={{ loc: "/discdecoupled" }}>
            Discrete Decoupled</Link>
          </li>
        </ul>

        <h3>Explicit Exploration</h3>
        <ul>
          <li><Link to="/ContdCpld"> Continuous Coupled</Link></li>
          <li><Link to="/CdExp">Continuous Decoupled</Link></li>
          <li><Link to="/DcExp">Discrete Coupled</Link></li>
          <li><Link to="/DdExp">Discrete Decoupled</Link></li>
        </ul>
        <li><Link to="/surveypage">Survey Page</Link></li>
      </div>
    )
  }
}
export default HomePage