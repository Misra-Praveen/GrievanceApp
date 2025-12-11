import { createContext, useState, useEffect, useContext } from "react";


const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);
    

    // get user after page refresh
     useEffect(()=>{
        const getUser = localStorage.getItem("user");
        if(getUser){
            setUser(JSON.parse(getUser));
        }

    },[])


    // login logic
    const login =(userData, token)=>{
        setUser(userData);
        localStorage.setItem("user",JSON.stringify(userData));
        localStorage.setItem("token",token)
    }

    //logout logic
    const logout = ()=>{
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token")
    }


    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> useContext(AuthContext)