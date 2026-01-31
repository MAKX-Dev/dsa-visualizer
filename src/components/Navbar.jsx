import { NavLink } from "react-router-dom";
export default function Navbar() {
    return(
        <div className="navbar">
            <NavLink to="/" end className="nav-btn">Home</NavLink>
             <NavLink to="/sorting" end className="nav-btn"> Sorting</NavLink>
        </div>
    );
}