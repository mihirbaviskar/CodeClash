import { createContext, useReducer, useState} from "react";


export const UserContext = createContext(null);

export const usersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            console.log("Setting up user: ")
            console.log(action.payload);
            return action.payload
        case 'SET_CURRENT_SCORE':
            console.log("Setting up user score: ")
            console.log(action.payload);
            return {...state, score: action.payload}
        case 'SET_CURRENT_PROBLEM':
            console.log("Setting up user problem: ")
            console.log(action.payload);
            return {...state, current_problem: action.payload}
        case 'SET_CURRENT_PROBLEM_AND_SCORE':
            console.log("Setting up user problem & score: ")
            console.log(action.payload);
            return {...state, current_problem: action.payload.current_problem, score:action.payload.score}
        default:
            console.log('Did not recognize ' + action.type);
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
    const [elapsedTime, setElapsedTime] = useState(0);
    return(
        <UserContext.Provider value={{user, dispatch, elapsedTime, setElapsedTime}}>
             {children}
        </UserContext.Provider>
    )
}