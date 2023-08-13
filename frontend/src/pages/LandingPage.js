import { useState } from "react";
import CreateRoom from "../components/CreateRoom";
import Info from "../components/Info";
import JoinRoom from "../components/JoinRoom";
import LoadingSpinner from "../components/LoadingSpinner";
import linkedin_icon from '../images/linkedin-white.svg';
import github_icon from '../images/github-mark-white.png';

import { Link } from "react-router-dom";

const LandingPage = () => {
    const [loading, setLoading] = useState(false);

    /*
    if(loading){
        return <LoadingSpinner/>
    }
    */
    return(
        <div>
            <div className={loading ? "loading-background-element" : "landing-page"}>
                <div>
                    <p id="welcome-message">Welcome to Code Clash</p>
                </div>
                <div className="entrance-forms">
                    <CreateRoom setLoading={setLoading} />
                    <JoinRoom setLoading={setLoading}/>
                </div>
                <div >
                    <Link to="/learn-more"><p className="learn-more">Learn More</p></Link>
                    {/* <img className='company-logo' src={downarrow} alt='downarrow'/> */}
                    <div className="attribution">
                        {/* <p className="my-name">Built by Mihir Baviskar</p> */}
                        <Link to='mailto:mihirbaviskar@gmail.com'><p className="email">mihirbaviskar@gmail.com</p></Link>
                        <Link to='https://www.linkedin.com/in/mihir-baviskar-913ba1211/'>
                            <img width="30px" src={linkedin_icon} alt="linkedin-icon"/>
                        </Link>
                        <Link to='https://github.com/mihirbaviskar'>
                            <img width="30px" src={github_icon} alt="github-icon"/>
                        </Link>
                    </div>
                </div>
            </div>
            {loading && <LoadingSpinner/>}
        </div> 
    );
}
export default LandingPage