import { Outlet } from "react-router-dom"
import Sidebar from "../components/profile/Sidebar"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../store/user"
import Loader from "../components/loader/Loader"
import MobileNav from "../components/profile/MobileNav"

const Profile = () => {
    const dispatch = useDispatch()
    const profile = useSelector(state => state.user.currentUser)

    useEffect(() => {
        dispatch(getCurrentUser())
    }, [])

    return (
        <div className="bg-zinc-900 text-white px-4 md:px-8 flex flex-col md:flex-row py-8 gap-4">
            {!profile &&
                <div className="flex w-full h-[100%] items-center justify-center">
                    <Loader />
                </div>}
            {profile && (
                <>
                    <div className="w-full md:w-1/6 h-auto lg:h-screen">
                        <Sidebar data={profile} />
                        <MobileNav/>
                    </div>
                    <div className="w-full md:w-5/6">
                        <Outlet />
                    </div>
                </>
            )}
        </div>
    )
}

export default Profile