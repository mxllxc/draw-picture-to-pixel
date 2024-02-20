import { useContext } from "react"
import { AuthContext } from "../shared/context/auth"


export const Header = () => {
    const { setImg } = useContext(AuthContext)

    return (
        <div className="py-8 px-16 flex justify-between border-b-2 border-primary">
            <h1 className="text-white font-extrabold text-xl">Picture to pixel!</h1>
            <input type="file" onChange={(event) => {
                if(event.target.files) {
                    const file = event.target.files[0];
                    setImg(URL.createObjectURL(file))
                }
            }} />
        </div>
    )
}