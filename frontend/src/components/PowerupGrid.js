import Powerup from "./Powerup";
import bomb from "../images/cherrybomb.png"
import snowflake from "../images/snowflake.png"
import Money from "./Money";
const PowerupGrid = ({error, errorFields}) => {
    return (
        <div className="powerup-grid-container">
            <div className="powerup-grid-row-container">
                <Powerup name={"Bomb"} icon={bomb} cost={60}/>
                <Powerup name={"Freeze"} icon={snowflake} cost={90}/>
            </div>
            <Money errorFields={errorFields}/>
            {errorFields !== '' && <p className="powerup-error-msg">{error}</p>}
        </div>
    );
}

export default PowerupGrid;