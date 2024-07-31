import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavouritesBooks } from '../../store/book'
import BookCard from '../book/BookCard'

const Favourites = () => {
  const dispatch = useDispatch()
  const userid = localStorage.getItem("id")
  const favouriteBooks = useSelector(state => state.book.favouriteBooks)

  useEffect(() => {
    dispatch(getFavouritesBooks({ userid }))
  }, [])

  return (
    <>
      {favouriteBooks && favouriteBooks.length === 0 &&
        <div className='text-5xl font-semibold text-zinc-500 flex flex-col items-center justify-center'>
          <img src="/images/no-data.jpg" alt="no-data" className='h-[20vh] my-8' />
          No Favourite Books
        </div>
      }
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {favouriteBooks &&
          favouriteBooks.map((item, index) => (
            <div key={index}>
              <BookCard data={item} favourite={true} />
            </div>
          ))}
      </div>
    </>
  )
}

export default Favourites
