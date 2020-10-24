import React from 'react';
import {Link} from "react-router-dom";

function LandingPage() {
    return (
        <div>
            <div className="">
                {/*Left Col*/}
                <div className="">
                    <p className="">Clue - Hasbro games</p>
                    <h1 className="">Don’t give up until you find out!</h1>
                    <p className="">Enjoy spending time with friends and family by solving murder mysteries in Clue!</p>
                    <button
                        className="">
                        <Link to="/game">Play</Link>
                    </button>
                </div>

                <div className="">
                    <img className="" src={require("../images/clueless_bg.jpg")} alt=""></img>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
