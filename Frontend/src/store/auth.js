import {  createContext, useContext, useEffect, useState } from "react";
export const AuthContext =createContext();

export const AuthProvider =({children})=> {
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const storeTokenInLS=(serverToken)=>{
        setToken(serverToken)
        return localStorage.setItem("token",serverToken);
    };
    let isLoggedIn=!!token;
    const LogoutUser=()=>{
        setToken("");
        setUser(null);
        return localStorage.removeItem("token");
    };
    const userAuthentication= async ()=>{
        if (token) { 
            try {
              const response = await fetch('https://employease-3yl4.onrender.com/api/auth/user', {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
      
              if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
            setLoading(false);
          
          } 
    };
    let isEmployee=user?.employee;
    let userID=user?._id;
    useEffect(()=>{
        userAuthentication();
    }, []);
    return <AuthContext.Provider value={{storeTokenInLS,LogoutUser,isEmployee,userID ,user,loading,isLoggedIn}}>
        {children}
    </AuthContext.Provider>
};

export const useAuth =()=> {
    const AuthContextValue = useContext(AuthContext);
    if(!AuthContextValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return AuthContextValue;
}