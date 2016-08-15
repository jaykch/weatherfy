import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {


  render() {
    return (
      <nav class="nav-bar" role="navigation">
        <IndexLink to="/"><div className="search-icon"></div></IndexLink>
      </nav>
    );
  }
}
