import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Navbar() {

    const { currentUser } = useContext(AuthContext);

    return (

        <div className="navbar">
            <span className="logoNavbar">React Chat-App</span>
            <div className="user">
                <img src={currentUser.photoURL} />
                <div>
                    {currentUser.displayName}
                    <span>(user)</span>
                </div>


            </div>
        </div>
    )
}

export default Navbar;