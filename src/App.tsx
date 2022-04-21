import "./App.css";

import { HashRouter, Route, Switch } from "react-router-dom";

import Typeface from "./Typeface";
import Minter from "./Minter";

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Minter} />
        <Route path="/claim" component={() => Minter({ useClaim: true })} />
        <Route path="/weights" component={Typeface} />
      </Switch>
    </HashRouter>
  );
}
