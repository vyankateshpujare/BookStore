import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderHistory } from '../../store/order'
import Loader from '../loader/Loader'
import { Link } from 'react-router-dom'

const UserOrderHistory = () => {
  const dispatch = useDispatch()
  const userid = localStorage.getItem("id")
  const orderHistory = useSelector(state => state.order.orderHistoryOfUser)

  useEffect(() => {
    dispatch(getOrderHistory({ userid }))
  }, [])

  return (
    <>
      {!orderHistory &&
        <div className="w-full flex h-[100%] justify-center items-center">
          <Loader />
        </div>}
      {orderHistory && orderHistory.length > 0 && (
        <div className='h-[100%]  p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl font-semibold text-zinc-500 mb-8'>
            Your order history
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[22%]'>
              <h1 className=''>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h1 className=''>Description</h1>
            </div>
            <div className='w-[9%]'>
              <h1 className=''>Price</h1>
            </div>
            <div className='w-[16%]'>
              <h1 className=''>Status</h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className=''>Mode</h1>
            </div>
          </div>
          {orderHistory.map((item, index) => (
            <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer' key={index}>
              <div className='w-[3%]'>
                <h1 className='text-center'>{index + 1}</h1>
              </div>
              <div className='w-[22%]'>
                <Link to={`/view-book-details/${item.book._id}`} className='hover:text-blue-400'>
                  {item.book.title}
                </Link>
              </div>
              <div className='w-[45%]'>
                <h1 className=''>{item.book.description.slice(0, 50)}...</h1>
              </div>
              <div className='w-[9%]'>
                <h1 className=''>RS {item.book.price}</h1>
              </div>
              <div className='w-[16%]'>
                <h1 className='font-semibold text-green-500'>
                  {item.status === "Order Placed" ? (
                    <div className='text-yellow-500'>{item.status}</div>
                  ) : item.status === "Canceled" ? (
                    <div className='text-red-500'>{item.status}</div>
                  ) : (
                    <div className='text-green-500'>{item.status}</div>
                  )}
                </h1>
              </div>
              <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className='text-sm text-zinc-400'>COD</h1>
            </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default UserOrderHistory
