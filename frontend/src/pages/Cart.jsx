import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AiFillDelete } from "react-icons/ai"
import { getCartData, removeBookFromCart } from "../store/cart"
import { placeOrder } from "../store/order"
import Loader from "../components/loader/Loader"

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userid = localStorage.getItem("id")
    const cartData = useSelector(state => state.cart.cartData)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        dispatch(getCartData({ userid }))
    }, [])

    useEffect(() => {
        if (cartData && cartData.length > 0) {
            let total = 0
            cartData.map((item) => {
                total += item.price
            })
            setTotalPrice(total)
        }
    }, [cartData])

    const handleRemoveFromCart = (bookid) => {
        dispatch(removeBookFromCart({ userid, bookid }))
    }

    const handlePlaceOrder = async () => {
        const response = await dispatch(placeOrder({ userid, orders: cartData }))
        if (response?.payload?.status === 200) {
            alert(response.payload.data.message)
            navigate("/profile/orderHistory")
        }
    }

    return (
        <div className="bg-zinc-900 px-12 py-8 h-screen">
            {!cartData &&
                <div className="w-full flex h-[100%] justify-center items-center">
                    <Loader />
                </div>
            }
            {cartData && cartData.length === 0 && (
                <div className="h-screen">
                    <div className="flex flex-col items-center justify-center h-[100%]">
                        <h1 className="text-5xl font-semibold text-zinc-400">
                            Empty Cart
                        </h1>
                    </div>
                </div>
            )}
            {cartData && cartData.length > 0 && (
                <>
                    <h1 className="text-5xl font-semibold mb-8 text-zinc-500">
                        Your Cart
                    </h1>
                    {cartData.map((item, index) => (
                        <div key={index} className="w-full my-4 flex flex-col md:flex-row bg-zinc-800 p-4 justify-between items-center">
                            <img src="/images/book-card.png" alt="" className="h-[20vh] md:h-[10vh] object-cover" />
                            <div className="w-full md:w-auto">
                                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                                    {item.title}
                                </h1>
                                <p className="text-normal  text-zinc-300 mt-2 hidden lg:block">
                                    {item.description.slice(0, 100)}...
                                </p>
                                <p className="text-normal  text-zinc-300 mt-2 hidden md:block lg:hidden">
                                    {item.description.slice(0, 65)}...
                                </p>
                                <p className="text-normal  text-zinc-300 mt-2 md:hidden block">
                                    {item.description.slice(0, 100)}...
                                </p>
                            </div>
                            <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                                    {item.price}
                                </h2>
                                <button className="bg-red-100 text-red-700 rounded p-2 ms-12"
                                    onClick={() => handleRemoveFromCart(item._id)}>
                                    <AiFillDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            )
            }
            {cartData && cartData.length > 0 && (
                <div className="mt-4 w-full flex items-center justify-end">
                    <div className="bg-zinc-800 rounded p-4">
                        <h1 className="text-3xl font-semibold text-zinc-200">
                            Total Amount
                        </h1>
                        <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                            <h2>{cartData.length} {cartData.length === 1 ? "book" : "books"}</h2>
                            <h2>RS {totalPrice}</h2>
                        </div>
                        <div className="w-[100%] mt-3">
                            <button className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200"
                                onClick={handlePlaceOrder}>
                                Place your order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart