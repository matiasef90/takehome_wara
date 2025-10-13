import { createContext, useState } from "react";

export const AuthContext = createContext()

export function AuthProvider({children}) {
  const [isLogin, setIsLogin] = useState(false)
  const logIn = () => setIsLogin(true)
  const logOut = () => setIsLogin(false)
  const value = {
    isLogin,
    logIn,
    logOut
  }

  return(<AuthContext.Provider value = {value}>
    {children}
  </AuthContext.Provider>)
}