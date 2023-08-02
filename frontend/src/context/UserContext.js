import { createContext, useReducer} from "react";


export const UserContext = createContext(null);

export const usersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            console.log("Setting up user: ")
            console.log(action.payload);
            return action.payload
        default:
            return state;
    }
}
export const UserContextProvider = ({children}) => {
    //children property represents whatever components or templates that provider wraps
    const [user, dispatch] = useReducer(usersReducer, {
        _id: null,
        socket_id: null,
        username: null,
        room_name: null,
        score: 0,
        current_problem: 1
    });
    return(
        <UserContext.Provider value={{user, dispatch}}>
             {children}
        </UserContext.Provider>
    )
}