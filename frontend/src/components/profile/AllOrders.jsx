import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders, updateOrderStatus } from "../../store/order"
import Loader from "../loader/Loader"
import { FaUserLarge } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { FaCheck } from "react-icons/fa"
import { IoOpenOutline } from "react-icons/io5"

const AllOrders = () => {
    const dispatch = useDispatch()
    const userid = localStorage.getItem("id")
    const allOrders = useSelector(state => state.order.orders)
    const [option, setOption] = useState(-1)
    const [selectedStatus, setSelectedStatus] = useState("Order Placed")
    const status = ["Order Placed", "Out For Delivery", "Delivered", "Canceled"]

    useEffect(() => {
        dispatch(getAllOrders())
    }, [])

    const changeStatus = (e) => {
        setSelectedStatus(e.target.value)
    }

    const updateStatus = (order) => {
        setOption(-1)
        dispatch(updateOrderStatus({ orderid: order._id, userid, status: selectedStatus }))
    }

    return (
        <>
            {!allOrders && (
                <div className="h-[100%] flex items-center justify-center">
                    <Loader />
                </div>
            )}
            {allOrders && allOrders.length > 0 && (
                <div className="h-[100%] p-2 md:p-4 text-zinc-100">
                    <h1 className='text-3xl font-semibold text-zinc-500 mb-8'>
                        All Orders
                    </h1>
                    <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
                        <div className='w-[3%]'>
                            <h1 className='text-center'>Sr.</h1>
                        </div>
                        <div className='w-40 md:w-[22%]'>
                            <h1 className=''>Books</h1>
                        </div>
                        <div className='w-0 md:w-[45%] hidden  md:block'>
                            <h1 className=''>Description</h1>
                        </div>
                        <div className='w-[17%]  md:w-[9%]'>
                            <h1 className=''>Price</h1>
                        </div>
                        <div className='w-[30%] md:w-[16%]'>
                            <h1 className=''>Status</h1>
                        </div>
                        <div className='w-[10%] md:w-[5%]'>
                            <h1 className=''>
                                <FaUserLarge />
                            </h1>
                        </div>
                    </div>
                    {allOrders.map((item, index) => (
                        <div className="bg-zinc-800 w-full py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300" key={index}>
                            <div className='w-[3%]'>
                                <h1 className='text-center'>{index + 1}</h1>
                            </div>
                            <div className='w-40 md:w-[22%]'>
                                <Link to={`/view-book-details/${item.book._id}`} className='hover:text-blue-500'>
                                    {item.book.title}
                                </Link>
                            </div>
                            <div className='w-0 md:w-[45%] hidden  md:block'>
                                <h1 className=''>
                                    {item.book.description.slice(0, 50)}...
                                </h1>
                            </div>
                            <div className='w-[17%]  md:w-[9%]'>
                                <h1 className=''>
                                    {item.book.price}
                                </h1>
                            </div>
                            <div className='w-[30%] md:w-[16%]'>
                                <h1 className='font-semibold'>
                                    <button className="hover:scale-105 transition-all duration-300" onClick={() => setOption(index)}>
                                        {item.status === "Order Placed" ? (
                                            <div className='text-yellow-500'>{item.status}</div>
                                        ) : item.status === "Canceled" ? (
                                            <div className='text-red-500'>{item.status}</div>
                                        ) : (
                                            <div className='text-green-500'>{item.status}</div>
                                        )}
                                    </button>
                                    {option === index && (
                                        <div className="flex">
                                            <select name="status" id="" className="bg-gray-800" onChange={changeStatus}>
                                                {status.map((item, index) => (
                                                    <option value={item} key={index}>{item}</option>
                                                ))}
                                            </select>
                                            <button className="mx-2 text-green-500 hover:text-pink-600"
                                                onClick={() => updateStatus(item)}>
                                                <FaCheck />
                                            </button>
                                        </div>
                                    )}
                                </h1>
                            </div>
                            <div className='w-[10%] md:w-[5%]'>
                                <button className="text-xl hover:text-orange-500">
                                    <IoOpenOutline />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default AllOrders