import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";
import { MessageContext } from "../context/MessageContext";

const Box = ({rank, username, score, socket_id, error, setError, errorFields, setErrorFields}) => {
  const {user, money, setMoney} = useContext(UserContext);
  const {dispatch: messageDispatch}= useContext(MessageContext);
  const socket = useContext(SocketContext);
  const [localError, setLocalError] = useState(false);
  const [freeze, setFreeze] = useState(false);
  const [bomb, setBomb] = useState(false);
  const handleDragOver = (e) =>{
    e.preventDefault();
  }
  const handleOnDrop = (e) => {
    e.preventDefault();
    const inc_powerup = JSON.parse(e.dataTransfer.getData('powerup'));
    // console.log(inc_powerup);
    if(inc_powerup.cost > money){
      setError('Not enough money');
      setErrorFields('money');
      setLocalError(true);
      setTimeout(() => {
        setError('');
        setErrorFields('');
        setLocalError(false);
      }, 7500)
    }
    else if(socket_id === user.socket_id){
      setError("Can't harm yourself you fool");
      setErrorFields('self_harm');
      setLocalError(true);
      setTimeout(() => {
        setError('');
        setErrorFields('');
        setLocalError(false);
      }, 7500)
    }
    else{
      setMoney((prev) => prev - inc_powerup.cost);
      // console.log(inc_powerup.name);
      socket.emit('send powerup', {socket_id, powerup_name:inc_powerup.name, send_user: user.username, rec_user: username, room_name:user.room_name});
      switch (inc_powerup.name) {
        case "Freeze":
          setFreeze(true);
          setTimeout(() => {
            setFreeze(false);
          }, 15000);
          break;
        case "Bomb":
          setBomb(true);
          setTimeout(() => {
            setBomb(false);
          }, 1000);
          break;
        default:
            break;
    }
    }
  }
  return (//className={`editor ${freeze ? 'freeze-editor' : ''} ${bomb ? 'bomb-editor' : ''}`}
    <div onDrop={handleOnDrop} onDragOver={handleDragOver} className={`${localError ? 'error-leaderboard-box leaderboard-box' : 'leaderboard-box'} ${freeze ? 'freeze-leaderboard-box' : ''} ${bomb ? 'bomb-leaderboard-box' : ''}`}>
        <p key="1" className={`${localError ? 'error-ranking ranking' : 'ranking'} ${freeze ? 'freeze-ranking' : ''} ${bomb ? 'bomb-ranking' : ''}`}>{rank}</p> {/*className={localError ? 'error-leaderboard-box leaderboard-box' : 'leaderboard-box'} ranking*/}
        <p key="2" className='username'> {socket_id === user.socket_id ? username + ' (You)' : username}</p>
        <p key="3" className={`${localError ? 'error-score score' : 'score'} ${freeze ? 'freeze-score' : ''} ${bomb ? 'bomb-score' : ''}`}>{score}</p>
    </div>
  );
}
export default Box;