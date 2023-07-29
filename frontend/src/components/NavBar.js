import codeClashLogo from '../images/codeclashlogo.png';

const NavBar = () => {
    return(
        <header>
            <div className="navbar">
                <img className='company-logo'src={codeClashLogo} alt='rocket'/>
                <h3 className="company-name">Code Clash</h3>
            </div>
        </header>
    );
}

export default NavBar;