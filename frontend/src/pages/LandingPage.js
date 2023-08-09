import { useState } from "react";
import CreateRoom from "../components/CreateRoom";
import Info from "../components/Info";
import JoinRoom from "../components/JoinRoom";
import downarrow from '../images/down-arrow.svg';
import LoadingSpinner from "../components/LoadingSpinner";
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
                </div>
            </div>
            {loading && <LoadingSpinner/>}
        </div> 
    );
}
export default LandingPage