import { useState } from "react"
import { useDispatch } from "react-redux"
import { addBook } from "../../store/book"

const AddBook = () => {
    const dispatch = useDispatch()
    const userid = localStorage.getItem("id")
    const [data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        description: "",
        language: ""
    })

    const changeFormData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        if (data.url === "" || data.title === "" || data.author === "" || data.price === "" || data.description === "" || data.language === "") {
            alert("All fields are required")
        } else {
            const response = dispatch(addBook({ userid, data }))
            setData({
                url: "",
                title: "",
                author: "",
                price: "",
                description: "",
                language: ""
            })
            if (response.payload.status === 200) {
                navigate(`/all-books/${bookid}`)
            }
        }
    }

    return (
        <form action="" onSubmit={onFormSubmit}>
            <div className="h-[100%] p-0 md:p-4">
                <h1 className="text-3xl font-semibold text-zinc-500 mb-8">
                    Add Book
                </h1>
                <div className="p-4 bg-zinc-800 rounded">
                    <div>
                        <label className="text-zinc-400">
                            Image
                        </label>
                        <input
                            type="text"
                            name="url"
                            placeholder="Url of image"
                            value={data.url}
                            className="w-full mt-2 bg-zinc-900 p-2 outline-none rounded"
                            onChange={changeFormData} />
                    </div>
                    <div className="mt-4 flex gap-4">
                        <div className="w-3/6">
                            <label className="text-zinc-400">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title of book"
                                value={data.title}
                                className="w-full mt-2 bg-zinc-900 p-2 outline-none rounded"
                                onChange={changeFormData} />
                        </div>
                        <div className="w-3/6">
                            <label className="text-zinc-400">
                                Author
                            </label>
                            <input
                                type="text"
                                name="author"
                                placeholder="Author of book"
                                value={data.author}
                                className="w-full mt-2 bg-zinc-900 p-2 outline-none rounded"
                                onChange={changeFormData} />
                        </div>
                    </div>
                    <div className="mt-4 flex gap-4">
                        <div className="w-3/6">
                            <label className="text-zinc-400">
                                Language
                            </label>
                            <input
                                type="text"
                                name="language"
                                placeholder="Language of book"
                                value={data.language}
                                className="w-full mt-2 bg-zinc-900 p-2 outline-none rounded"
                                onChange={changeFormData} />
                        </div>
                        <div className="w-3/6">
                            <label className="text-zinc-400">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                placeholder="Price of book"
                                value={data.price}
                                className="w-full mt-2 bg-zinc-900 p-2 outline-none rounded"
                                onChange={changeFormData} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="text-zinc-400">
                            Description
                        </label>
                        <textarea
                            rows={3}
                            name="description"
                            placeholder="Description of book"
                            value={data.description}
                            className="w-full mt-2 bg-zinc-900 p-2 outline-none rounded"
                            onChange={changeFormData} />
                    </div>
                    <button type="submit" className="w-full mt-4 px-3 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300">
                        Add Book
                    </button>
                </div>
            </div>
        </form>
    )
}

export default AddBook