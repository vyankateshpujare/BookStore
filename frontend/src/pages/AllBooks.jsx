import { useEffect, useState } from "react"
import axios from "axios"
import Loader from "../components/loader/Loader"
import BookCard from "../components/book/BookCard"
import { useDispatch, useSelector } from "react-redux"
import { getAllBooks } from "../store/book"

const AllBooks = () => {
    const [data, setData] = useState()
    const dispatch = useDispatch()
    const books = useSelector((state) => state.book.books)

    useEffect(() => {
        dispatch(getAllBooks())
        // const fetch = async () => {
        //     const response = await axios.get(`http://localhost:2000/api/book`)
        //     setData(response.data.data)
        // }
        // fetch()
    }, [])
    return (
        <div className="bg-zinc-900 h-auto px-12 py-8">
            <h4 className="text-2xl text-yellow-100">All Books</h4>
            {!books &&
                <div className="flex items-center justify-center my-8">
                    <Loader />
                </div>}
            <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {books && books.map((item, i) =>
                    <div key={i}>
                        <BookCard data={item} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllBooks