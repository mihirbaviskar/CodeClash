const Powerup = ({name, cost, icon}) => {

    const handleOnDragStart = (e) => {
        console.log('dragging');
        const p = JSON.stringify({name,cost});
        e.dataTransfer.setData("powerup", p);
        console.log(e)
    };

    return(
        <div className='powerup-container'>
            <div draggable onDragStart={(e) => handleOnDragStart(e)} className={`powerup-icon-container ${name}`}>
                <img draggable="false" className="unselectable powerup-icon" src={icon} alt={`${name}-icon`}/>
            </div>
            <p className="powerup-desc">{name}   ${cost}</p>
        </div>
    );
}
export default Powerup;