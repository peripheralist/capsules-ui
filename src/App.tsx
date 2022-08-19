import "./App.css";

import { HashRouter, Route, Switch } from "react-router-dom";

import Capsules from "./pages/Capsules";
import Edit from "./pages/Edit";
import Landing from "./pages/Landing";
import Minter from "./pages/Minter";
import Pause from "./pages/Pause";
import Typeface from "./Typeface";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { NetworkContext } from "./contexts/networkContext";

export default function App() {
  const { connectedWallet } = useContext(NetworkContext);

  return (
    <div>
      <Navbar />
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/mint" component={Minter} />
          <Route path="/fonts" component={Typeface} />
          <Route path="/minted" component={Capsules} />
          <Route
            path="/mine"
            component={() => Capsules({ owner: connectedWallet })}
          />
          <Route path="/pause" component={Pause} />
          <Route path="/edit/:id" component={Edit} />
        </Switch>
      </HashRouter>
    </div>
  );
}
