import { Link } from 'react-router-dom';
import codeClashLogo from '../images/rocket_logo_thick.png';

const NavBar = () => {
    return(
        <header>
            <div className="navbar">
                <Link to="/">
                    <div className='logo-container'>
                        <img className='company-logo' src={codeClashLogo} alt='rocket'/>
                        <h3 className="company-name">Code Clash</h3>
                    </div>
                </Link>
            </div>
        </header>
    );
}

export default NavBar;