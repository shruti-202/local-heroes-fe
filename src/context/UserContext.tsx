import {createContext, useState} from "react";

export const UserContext = createContext({})

const UserContextProvider = ({children}:any) => {
    const [userInfo, setUserInfo] = useState();
    
  return (
    <UserContextProvider value ={{userInfo, setUserInfo}}>
      {children}
    </UserContextProvider>
  )
}

export default UserContextProvider
