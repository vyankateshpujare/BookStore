import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const role = useSelector(state => state.auth.role)

    const logOut = async () => {
        localStorage.setItem("token", "");
        localStorage.setItem("id", "");
        localStorage.setItem("role", "");
        dispatch(authActions.logout())
        dispatch(authActions.changeRole("user"))
        navigate("/login")
    }
    return (
        <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]">
            <div className="flex flex-col items-center justify-center">
                <img src={data.avatar} alt="profile" className="h-[12vh]" />
                <p className="mt-3 text-xl text-zinc-100 font-semibold">{data.userName}</p>
                <p className="mt-1 text-sm text-zinc-300">{data.email}</p>
                <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:flex"></div>
            </div>
            {role === "user" && (
                <div className="w-full hidden lg:flex flex-col justify-center items-center">
                    <Link to="/profile" className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                        Favourites
                    </Link>
                    <Link to="/profile/orderHistory" className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                        Order History
                    </Link>
                    <Link to="/profile/settings" className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                        Settings
                    </Link>
                </div>
            )}
            {role === "admin" && (
                <div className="w-full hidden lg:flex flex-col justify-center items-center">
                    <Link to="/profile" className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                        All Orders
                    </Link>
                    <Link to="/profile/add-book" className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
                        Add Book
                    </Link>
                </div>
            )}
            <button onClick={logOut} className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300">
                Log Out <FaArrowRightFromBracket className="ms-4" />
            </button>
        </div>
    )
}

export default Sidebar