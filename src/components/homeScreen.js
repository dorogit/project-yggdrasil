import React from "react";
import { Link } from "react-router-dom";

class homeScreen extends React.Component {
  render() {
    return (
      <div style={{paddingTop:200}} className="ui center aligned text container">
        <h1 style={{fontSize:80, letterSpacing:30}}>
          YGGDRASIL
        </h1>
        <h3>
          The world of magic
        </h3>
        <Link to='/Game'>
          Start Game
        </Link>
      </div>
    )
  }
}

export default homeScreen;