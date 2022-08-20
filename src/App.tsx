import "./App.css";

import { HashRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Capsules from "./pages/Capsules";
import Contracts from "./pages/Contracts";
import Edit from "./pages/Edit";
import Landing from "./pages/Landing";
import Minter from "./pages/Minter";
import Pause from "./pages/Pause";

export default function App() {
  return (
    <div>
      <Navbar />
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/mint" component={Minter} />
          <Route path="/minted/:wallet" component={Capsules} />
          <Route path="/minted" component={Capsules} />
          <Route path="/contracts" component={Contracts} />
          <Route path="/pause" component={Pause} />
          <Route path="/edit/:id" component={Edit} />
        </Switch>
      </HashRouter>
    </div>
  );
}
