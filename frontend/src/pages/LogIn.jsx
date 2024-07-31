import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../store/auth"
import { useDispatch, useSelector } from "react-redux"

const LogIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
    })

    const changeValues = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })

    }

    const onSubmit = async () => {
        try {
            if (formValues.username === "" || formValues.password === "") {
                alert("all fields are required")
            }
            else {
                const response = await dispatch(loginUser(formValues))
                if (response.payload.status === 200) {
                    navigate("/profile")
                }
            }

        } catch (error) {
            console.log("error", error)
        }
    }
    return (
        <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
            <div className="bg-zinc-800 rounded-lg px-6 py-6 w-full md:w-3/6 lg:w-2/6">
                <h1 className="text-zinc-200 text-xl font-semibold">LogIn</h1>
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="text-zinc-400">
                            Username
                        </label>
                        <input type="text"
                            placeholder="username"
                            name="username"
                            value={formValues.username}
                            onChange={changeValues}
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 px-4 py-2 outline-none rounded-lg" />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="text-zinc-400">
                            Password
                        </label>
                        <input type="password"
                            placeholder="password"
                            name="password"
                            value={formValues.password}
                            onChange={changeValues}
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 px-4 py-2 outline-none rounded-lg" />
                    </div>
                    <div className="mt-4">
                        <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 "
                            onClick={onSubmit}>
                            Login
                        </button>
                    </div>
                    <p className="flex mt-4 items-center justify-center font-semibold text-zinc-200">Or</p>
                    <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">Don't have an account? &nbsp;
                        <Link to="/signup" className="text-blue-500">
                            <u>Sign Up</u>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LogIn