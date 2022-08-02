import React from "react";
import {Link} from "react-router-dom"
function Navigation({userObj}) {

    return (
        <div className="bg-secondary shadow-lg ">
    <nav>
        <ul className="list-group bg-opacity-75 p-3 list-group-horizontal justify-content-center">
            <li className="list-group-item p-2">
                <Link to="/" className=" text-black">Home</Link>
            </li>
            <li className="list-group-item p-2"  >
                <Link to="/profile" className=" text-black">{userObj.displayName}'s profile</Link>
            </li>
        </ul>
    </nav>
    </div>
    )
}

export default Navigation;