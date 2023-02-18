import React from "react";
import homeScreen from "./homeScreen";
import Game from "./Screens/Game";
import { Route,Switch, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={homeScreen} />
            <Route path ='/Game' exact component = {Game} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;