import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import socketIOClient from "socket.io-client";
import GameController from "./views/game/GameController";
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from "./views/LandingPage";
import TeamPage from "./views/TeamPage";
import AboutPage from "./views/AboutPage";

/* TODO if we add the "bp3-dark" class here (or any container) we get dark theme! (consider making a switch to do this) */
/* TODO add route for specific game board */
/* TODO Improve landing page UI and colors */
function App() {
  // TODO socket connection should be a context and done on the other route
  useEffect(() => {
    // const socket = io();
    socketIOClient("http://localhost:3001");
  }, []);


return (
    <div>
        <Router path="/">
            <Header />
            <main id="main">
                <div className="">
                    <Switch>
                        <Route exact path ="/">
                            <LandingPage/>
                        </Route>
                        <Route path ="/game">
                            <GameController/>
                        </Route>
                        <Route path ="/about">
                            <AboutPage/>
                        </Route>
                        <Route path ="/team">
                            <TeamPage/>
                        </Route>
                    </Switch>
                </div>
            </main>
        </Router>
        <Footer className="footer"/>
    </div>
);
}

export default App;


{/*<div className="App">*/}
{/*    <Switch>*/}
{/*        /!* TODO add route for specific game board *!/*/}
{/*        /!* NOTE: path="/" MUST be at the end because it will always match *!/*/}
{/*        <Route path="/">*/}
{/*            /!* TODO if we add the "bp3-dark" class here (or any container) we get dark theme! (consider making a switch to do this) *!/*/}
{/*            /!* TODO replace with some landing page *!/*/}
{/*        </Route>*/}
{/*    </Switch>*/}
{/*</div>*/}
