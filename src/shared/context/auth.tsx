import { createContext, useState } from "react";
import { AuthState } from "../types";

const defaultState: AuthState = {
    setImg: (img: any) => {},
    img: null
}

export const AuthContext = createContext(defaultState)

function AuthProvider({children}: any){
    const [img, setImgState] = useState(defaultState.img)

    function setImg(img: any){
        setImgState(img)
    }

    return(
        <AuthContext.Provider value={{ setImg, img }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider