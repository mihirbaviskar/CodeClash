import { createContext, useReducer } from "react";

export const ProblemContext = createContext();

// we are creating a Context Provider Component that
// wraps what we want to provide context to

// children property represents whatever component or template this context provider wraps
export const ProblemContextProvider = ({children}) => {
    // const [state, dispatch] = useReducer(problemReducer, {
    //     problem: null
    // });
    return(
        <ProblemContext.Provider>
            {children}
        </ProblemContext.Provider>
    );
};