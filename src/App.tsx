import "./App.css";

import { HashRouter, Route, Switch } from "react-router-dom";

import Landing from "./Landing";
import Minter from "./Minter";
import Typeface from "./Typeface";

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/mint" component={Minter} />
        <Route path="/claim" component={() => Minter({ useClaim: true })} />
        <Route path="/fonts" component={Typeface} />
      </Switch>
    </HashRouter>
  );
}
