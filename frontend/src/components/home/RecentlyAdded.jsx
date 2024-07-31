import { useState, useEffect } from "react"
import axios from "axios"
import BookCard from "../book/BookCard"
import Loader from "../loader/Loader"
import { useDispatch, useSelector } from "react-redux"
import { getRecentlyAddedBooks } from "../../store/book"

const RecentlyAdded = () => {

    const [data, setData] = useState()
    const dispatch = useDispatch()
    const books = useSelector(state => state.book.books)

    useEffect(() => {
        dispatch(getRecentlyAddedBooks())
        // const fetch = async () => {
        //     const response = await axios.get(`http://localhost:2000/api/book/get-recent-books`)
        //     setData(response.data.data)
        // }
        // fetch()
    }, [])
    return (
        <div className="mt-8 px-4">
            <h4 className="text-2xl text-yellow-100">Recently Added Books</h4>
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

export default RecentlyAdded