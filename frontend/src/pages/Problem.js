import Description from "../components/Description";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { RoomContext } from "../context/RoomContext";
import Arcade from "../components/Arcade";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";


const Problem = () => {
    const [problem, setProblem] = useState({
        _id:"",
        title:"",
        diff:"",
        desc:"",
        examples:[],
        constraints:[],
        starter_code:""
    });
    const socket = useContext(SocketContext);
    const {user} = useContext(UserContext);
    const {room} = useContext(RoomContext);
    const [accepted, setAccepted] = useState(false);
    const [reload, setReload] = useState(false);
    const [freeze, setFreeze] = useState(false);
    const [bomb, setBomb] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setAccepted(false);
        if(user && user.current_problem > room.num_problems){
            // console.log('player has finished');
            navigate('/finish');
        }
        const fetchProblem = async () => {
            const response = await fetch('/api/problems/' + room.problem_ids[user.current_problem-1]);
            const json = await response.json()
            if(response.ok){
                // console.log("Json");
                // console.log(json);
                setProblem(json);
            }
            else{
                // console.log("Error in use Effect");
            }
        }
        if(room && room.room_state === 'in progress'){
            fetchProblem();
        }
    },[reload]);
    useEffect(() => {
        if(accepted){
            // console.log('Code has been accepted');
            // console.log(user);
            socket.emit('game solve message', user);
        }
    }, [accepted]);
    
    useEffect(() => {
        socket.on('rec powerup', (powerup_name) => {
            // console.log('received ' + powerup_name);
            switch (powerup_name) {
                case "Freeze":
                    setFreeze(true);
                    // console.log("In case freeze");
                    setTimeout(() => {
                        setFreeze(false);
                    }, 30000)
                    break;
                case "Bomb":
                    setBomb(true);
                    // console.log("In case bomb");
                    setTimeout(() => {
                        setBomb(false);
                    }, 1000)
                    break;
                default:
                    break;
            }
        });
    }, []);

    if(!room || !(room.room_state === 'in progress')){
        return (<p>You are not part of this room or you disconnected</p>);
    }
    return(
        <div className="flex-container">
            <div className={`flex-item left ${freeze ? 'freeze-desc' : ''} ${bomb ? 'bomb-desc' : ''}`} id="description">
                <Description title={problem.title} diff={problem.diff} desc={problem.desc} examples={problem.examples} constraints={problem.constraints} freeze={freeze} bomb={bomb}/>
                <Arcade freeze={freeze} bomb={bomb}/>
            </div>
            <div className="flex-item right">
                <Editor _id={problem._id} starter_code={problem.starter_code} accepted={accepted} setAccepted={setAccepted} setReload={setReload} freeze={freeze} bomb={bomb}/>
            </div>
        </div>
    );
}
export default Problem;