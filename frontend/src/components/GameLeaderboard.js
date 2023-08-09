import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import Box from "./Box";
import { UserContext } from "../context/UserContext";

const GameLeaderboard = ({error, setError, errorFields, setErrorFields}) => {
    const {room} = useContext(RoomContext);
    const {user, setPlace} = useContext(UserContext);
    const users_array = room.user_ids;
    const place_array = [1];

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
                    <Box rank={place_array[index]} username={user.username} score={user.score} socket_id={user.socket_id} error={error} setError={setError} errorFields={errorFields} setErrorFields={setErrorFields}/>
            ))}
        </div>
    );
}

export default GameLeaderboard;