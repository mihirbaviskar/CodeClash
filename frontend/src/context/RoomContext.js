import { createContext, useReducer} from "react";


export const RoomContext = createContext(null);

export const roomReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ROOM':
            // console.log("Setting up room: ")
            // console.log(action.payload);
            return action.payload
        case 'SET_ROOM_STATE':
            return {...state,
                    room_state:action.payload
            };
        case 'UPDATE_USERS':
            // console.log("Updating the users of the room: ")
            // console.log(action.payload);
            return {
                ...state, user_ids: action.payload.user_ids, room_state: action.payload.room_state
            };
        case 'UPDATE_USER':
            // console.log("Updating a particular user of the room");
            // console.log(action.payload);
            return {
                ...state,
                user_ids: state.user_ids.map((user) =>
                  user._id === action.payload._id ? action.payload : user
                )
            };
        default:
            return state;
    }
}
export const RoomContextProvider = ({children}) => {
    //children property represents whatever components or templates that provider wraps
    const [room, dispatch] = useReducer(roomReducer, {
        room_name: null,
        num_players: null,
        diffs: null,
        num_problems: null,
        user_ids: null,
        problem_ids: null,
        room_state: null
    });
    return(
        <RoomContext.Provider value={{room, dispatch}}>
             {children}
        </RoomContext.Provider>
    )
}