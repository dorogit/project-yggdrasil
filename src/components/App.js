import React from "react";
import homeScreen from "./homeScreen";
import Game from "./Screens/Game";
import { Route,Switch, BrowserRouter } from "react-router-dom";
import PhaserTest from "./Screens/phaserTesting";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={homeScreen} />
            <Route path ='/Game' exact component = {Game} />
            <Route path = '/Phaser' exact component={PhaserTest} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;