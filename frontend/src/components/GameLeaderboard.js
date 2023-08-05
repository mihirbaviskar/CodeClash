import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import Box from "./Box";

const GameLeaderboard = () => {
    const {room} = useContext(RoomContext);
    const users_array = room.user_ids;
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
    }
    return (
        <div className="leaderboard">
            {users_array && users_array.length !==0 && users_array.map((user, index) => (
                    <Box rank={index+1} username={user.username} score={user.score}/>
            ))}
        </div>
    );
}

export default GameLeaderboard;