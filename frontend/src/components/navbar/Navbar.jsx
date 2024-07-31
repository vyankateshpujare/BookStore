import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGripLines } from "react-icons/fa6"
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Navbar = () => {
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const links = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "All Books",
            link: "/all-books"
        },
        {
            title: "Cart",
            link: "/cart"
        },
        {
            title: "Profile",
            link: "/profile"
        },
    ]
    const [mobileNav, setMobileNav] = useState("hidden")
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const role = useSelector((state) => state.auth.role)

    useEffect(() => {
        if (token) {
            dispatch(authActions.login())
            dispatch(authActions.changeRole(localStorage.getItem("role")))
        }
    }, [])

    if (!token) {
        links.splice(2, 2)
    }

    return (
        <>
            <nav className="z-50 relative flex items-center justify-between bg-zinc-800  text-white px-8 py-4">
                <div className="flex items-center">
                    <img className="h-10 me-4" src="/images/book-logo.png" alt="logo" />
                    <h1 className="text-2xl font-semibold">BookHeaven</h1>
                </div>
                <div className="nav-links-book block md:flex items-center gap-4">
                    <div className="hidden md:flex gap-4">
                        {links.map((item, index) => (
                            <div className="flex items-center" key={index}>
                                {item.title === "Profile" ? (
                                    <Link to={item.link} className="px-2 py-1 rounded border border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300" key={index}>
                                        {role === "admin" ? "Admin Profile" : "Profile"}
                                    </Link>
                                ) : (
                                    <Link to={item.link} className="hover:text-blue-500 transition-all duration-300" key={index}>
                                        {item.title}
                                    </Link>
                                )}
                            </div>

                        ))}
                    </div>
                    {!token && (
                        <div className="hidden md:flex gap-4">
                            <Link to={"/login"} className="px-2 py-1 rounded border border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300">LogIn</Link>
                            <Link to={"/signup"} className="px-2 py-1 rounded bg-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300">SignUp</Link>
                        </div>
                    )}
                    <button className="md:hidden text-white text-2xl hover:text-zinc-400" onClick={() => mobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")}>
                        <FaGripLines />
                    </button>
                </div>
            </nav>
            <div className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
                {links.map((item, index) => (
                    <Link to={item.link} className={`${mobileNav} text-white text-2xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300`} key={index} onClick={() => mobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")} >
                        {item.title}
                    </Link>
                ))}
                {!token && (
                    <>
                        <Link to={"/login"} className={`${mobileNav} px-2 py-1 mb-8 text-2xl font-semibold rounded border border-blue-500 text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}
                            onClick={() => mobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")}
                        >
                            LogIn
                        </Link>
                        <Link to={"/signup"} className={`${mobileNav} px-2 py-1 mb-8 text-2xl font-semibold rounded bg-blue-500 text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}
                            onClick={() => mobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")}
                        >
                            SignUp
                        </Link>
                    </>
                )
                }
            </div>
        </>
    )
}

export default Navbar