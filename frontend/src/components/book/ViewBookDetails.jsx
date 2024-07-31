import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Loader from "../loader/Loader"
import { GrLanguage } from "react-icons/gr"
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa"
import { MdOutlineDelete } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { addBookToCart, addBookToFavourites, getBookDetails, removeBook } from "../../store/book"

const ViewBookDetails = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { bookid } = useParams()
    const userid = localStorage.getItem("id")
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const role = useSelector(state => state.auth.role)
    const selectedBookData = useSelector(state => state.book.selectedBookData)

    useEffect(() => {
        dispatch(getBookDetails({ bookid }))
    }, [])

    const handleFavourites = async () => {
        dispatch(addBookToFavourites({ userid, bookid }))
    }

    const handleCart = async () => {
        dispatch(addBookToCart({ userid, bookid }))
    }

    const handleDeleteBook = async () => {
        const response = await dispatch(removeBook({ userid, bookid }))
        if (response.payload.status === 200) {
            alert(response.payload.data.message)
            navigate("/all-books")
        }
    }

    return (
        <>
            {selectedBookData && (
                <div className="px-8 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-3/6">
                        <div className="bg-zinc-800 rounded p-12 flex flex-col lg:flex-row justify-around">
                            <img src="/images/book-card.png" alt="image" className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded" />
                            {isLoggedIn && role === "user" &&
                                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                                    <button className="bg-white rounded lg:rounded-full text-2xl p-2.5 text-red-500 flex items-center justify-center"
                                        onClick={handleFavourites}>
                                        <FaHeart /><span className="ms-4 block lg:hidden">Favourites</span>
                                    </button>
                                    <button className="text-white rounded lg:rounded-full text-2xl p-2.5 mt-8 md:mt-0 lg:mt-8 bg-blue-500 flex items-center justify-center"
                                        onClick={handleCart}>
                                        <FaShoppingCart /><span className="ms-4 block lg:hidden">Add to cart</span>
                                    </button>
                                </div>
                            }
                            {isLoggedIn && role === "admin" &&
                                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                                    <Link to={`/update-book/${bookid}`} className="bg-white rounded lg:rounded-full text-2xl p-2.5 text-blue-500 flex items-center justify-center">
                                        <FaEdit />
                                    </Link>
                                    <button className="bg-white rounded lg:rounded-full text-2xl p-2.5 mt-8 md:mt-0 lg:mt-8 text-red-500 flex items-center justify-center"
                                        onClick={handleDeleteBook}>
                                        <MdOutlineDelete />
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="p-4 w-full lg:w-3/6">
                        <h2 className="mt-4 text-zinc-300 text-4xl font-semibold">{selectedBookData.title}</h2>
                        <p className="mt-1 text-zinc-400">by {selectedBookData.author}</p>
                        <p className="mt-4 font-semibold text-zinc-500 text-lg">{selectedBookData.description}</p>
                        <p className="flex mt-4 items-center justify-start text-zinc-400">
                            <GrLanguage className="me-3" />{selectedBookData.language}
                        </p>
                        <p className="mt-4 font-semibold text-zinc-100 text-3xl">RS {selectedBookData.price}</p></div>
                </div>
            )}
            {!selectedBookData && (
                <div className="h-screen bg-zinc-900 flex items-center justify-center">
                    <Loader />
                </div>
            )}
        </>
    )
}

export default ViewBookDetails