import { useContext, useEffect } from "react";
import { RoomContext } from "../context/RoomContext";
import Box from "./Box";
import { UserContext } from "../context/UserContext";
import { MessageContext } from "../context/MessageContext";
import { SocketContext } from "../context/SocketContext";

const GameLeaderboard = ({error, setError, errorFields, setErrorFields}) => {
    const socket = useContext(SocketContext);
    const {room, dispatch: roomDispatch} = useContext(RoomContext);
    const {dispatch: messageDispatch} = useContext(MessageContext);
    const {user, setPlace} = useContext(UserContext);
    const users_array = room.user_ids;
    const place_array = [1];
    
     useEffect(() => {
        socket.on('user solved problem', (user) => {
            console.log('user sovled a problem');
            console.log(user);
            const curr_message = `${user.username} solved problem ${user.current_problem-1}`;
            roomDispatch({
                type:'UPDATE_USER',
                payload: user
            });
            console.log(curr_message)
            messageDispatch({
                type:'SET_MESSAGE',
                payload: curr_message
            });
        });
    }, []);

    const compare = (a, b) => {
        if ( a.score < b.score ){
          return 1;
        }
        if ( a.score > b.score ){
          return -1;
        }
        return 0;
    }

    if(users_array){
        users_array.sort(compare);
        let place = 1;
        let prev_val = users_array[0].score;
        if(users_array[0]._id === user._id){
            setPlace(1);
        }
        for(let i = 1; i < users_array.length; i++){
            if(users_array[i].score !== prev_val){
                place+=1;
            }
            place_array[i] = place;
            if(users_array[i]._id === user._id){
                setPlace(place);
            }
            prev_val = users_array[i].score;
        }
    }

    return (
        <div className="leaderboard">
            {users_array && users_array.length !==0 && users_array.map((user, index) => (
                    <Box rank={place_array[index]} username={user.username} score={user.score} user_id={user._id} error={error} setError={setError} errorFields={errorFields} setErrorFields={setErrorFields}/>
            ))}
        </div>
    );
}

export default GameLeaderboard;