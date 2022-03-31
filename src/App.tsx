import "./App.css";

import { HashRouter, Route, Switch } from "react-router-dom";

import Landing from "./Landing";
import Mint from "./Mint";
import Typeface from "./Typeface";

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/mint" component={Mint} />
        <Route path="/typeface" component={Typeface} />
      </Switch>
    </HashRouter>
  );
}
