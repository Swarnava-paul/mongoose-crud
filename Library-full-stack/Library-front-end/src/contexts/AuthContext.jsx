
import { createContext , useState } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{

    const [authStatus,setAuthStatus] = useState (false) ;

    function authCompleted () {
        setAuthStatus(true)
    }

    function authLogout () {
        setAuthStatus(false)
    }

    return (
        <AuthContext.Provider value={{authCompleted,authLogout,authStatus}}>
            {children}
        </AuthContext.Provider>
    )
}