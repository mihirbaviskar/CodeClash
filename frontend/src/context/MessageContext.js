import { createContext, useReducer, useState} from "react";


export const MessageContext = createContext(null);

export const messagesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            console.log("Setting up message: ")
            console.log(action.payload);
            return action.payload
        default:
            console.log('Did not recognize ' + action.type);
            return state;
    }
}
export const MessageContextProvider = ({children}) => {
    //children property represents whatever components or templates that provider wraps
    const [message, dispatch] = useReducer(messagesReducer, '');
    return(
        <MessageContext.Provider value={{message, dispatch}}>
             {children}
        </MessageContext.Provider>
    )
}