import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { removeBookFromFavourites } from "../../store/book"

const BookCard = ({ data, favourite }) => {
    const dispatch = useDispatch()
    const userid = localStorage.getItem("id")

    const handleRemoveFromFavourite = () => {
        dispatch(removeBookFromFavourites({ bookid: data._id, userid }))
    }

    return (
        <div className="bg-zinc-800 rounded p-4 flex flex-col">
            <Link to={`/view-book-details/${data._id}`}>
                <div className="">
                    <div className="bg-zinc-900 rounded flex items-center justify-center">
                        <img src="./images/book-card.png" alt="/" className="h-[25vh] w-full " />
                    </div>
                    <h2 className="mt-4 text-zinc-300 text-xl font-semibold">{data.title}</h2>
                    <p className="mt-2 font-semibold text-zinc-400">by {data.author}</p>
                    <p className="mt-2 font-semibold text-zinc-200 text-xl">RS {data.price}</p>
                </div>
            </Link>
            {favourite && (
                <button className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
                    onClick={handleRemoveFromFavourite}>
                    Romove from favourite
                </button>
            )}
        </div>
    )
}

export default BookCard