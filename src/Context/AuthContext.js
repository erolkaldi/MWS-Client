import React,{createContext,useState} from 'react'

export const AuthContext=createContext();

 const AuthProvider =({children})=>{

    const[auth,setAuth]=useState({isLoggedIn:false,token:'',email:''})
const decodeToken=()=>{

}
    return(
        <AuthContext.Provider value={{auth,setAuth,decodeToken}}>{children}</AuthContext.Provider>
    )
}
export default AuthProvider