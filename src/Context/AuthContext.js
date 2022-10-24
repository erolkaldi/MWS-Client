import React,{createContext,useState} from 'react'

const AuthContext=createContext({});

 export const AuthProvider =({children})=>{

    const[auth,setAuth]=useState({isLoggedIn:false,token:'',email:'',companyId:'',roles:[]})

    return(
        <AuthContext.Provider value={{auth,setAuth}}>{children}</AuthContext.Provider>
    )
}
export default AuthContext