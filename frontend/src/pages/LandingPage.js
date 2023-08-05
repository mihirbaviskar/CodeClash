import { useState } from "react";
import CreateRoom from "../components/CreateRoom";
import Info from "../components/Info";
import JoinRoom from "../components/JoinRoom";
import downarrow from '../images/down-arrow.svg';
import LoadingSpinner from "../components/LoadingSpinner";

const LandingPage = () => {
    const [loading, setLoading] = useState(false);
    if(!loading){
        return(
            <div>
                <div className="landing-page">
                    <div>
                        <p id="welcome-message">Welcome to Code Clash</p>
                    </div>
                    <div className="entrance-forms">
                        <CreateRoom setLoading={setLoading} />
                        <JoinRoom setLoading={setLoading}/>
                    </div>
                    <div className="learn-more">
                        <p>Learn More</p>
                        <img className='company-logo' src={downarrow} alt='downarrow'/>
                    </div>
                </div>
                <Info/>
            </div> 
        );
    }
    else{
        return <LoadingSpinner/>;
    }
}
export default LandingPage