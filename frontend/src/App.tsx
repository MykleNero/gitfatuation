import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GithubAuthCallbackPage from "./pages/GithubAuthCallbackPage";
import { GithubAuthProvider } from "./contexts/GithubAuthContext";

function App() {
  return (
    <div className="App">
      <GithubAuthProvider>
        <Router>
          <Switch>
            <Route path="/github/auth/success">
              {({ location }) => {
                const params = new URLSearchParams(location.search);
                return <GithubAuthCallbackPage code={params.get("code")} />;
              }}
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </GithubAuthProvider>
    </div>
  );
}

export default App;
