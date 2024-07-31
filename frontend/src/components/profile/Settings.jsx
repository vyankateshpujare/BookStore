import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, updateUserAddress } from '../../store/user'
import Loader from '../loader/Loader'

const Settings = () => {
  const dispatch = useDispatch()
  const userid = localStorage.getItem("id");
  const userData = useSelector(state => state.user.currentUser)
  const [values, setValues] = useState({ address: "" })

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [])

  useEffect(() => {
    setValues({ address: userData.address })
  }, [userData])

  const changeValue = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  }

  const updateAddress = () => {
    dispatch(updateUserAddress({ userid, address: values.address }))
  }

  return (
    <>
      {!userData &&
        <div className="w-full flex h-[100%] justify-center items-center">
          <Loader />
        </div>
      }{
        userData && (
          <div className='h-[100%] p-0  md:p-4 text-zinc-100'>
            <h1 className='text-3xl font-semibold text-zinc-500 mb-8'>
              Settings
            </h1>
            <div className='flex gap-12'>
              <div>
                <label htmlFor="">Username</label>
                <p className='p-2 rounded bg-zinc-800 font-semibold mt-2'>{userData.userName}</p>
              </div>
              <div>
                <label htmlFor="">Email</label>
                <p className='p-2 rounded bg-zinc-800 font-semibold mt-2'>{userData.email}</p>
              </div>
            </div>
            <div className='mt-4 flex flex-col'>
              <label htmlFor="">Address</label>
              <textarea
                className='p-2 rounded bg-zinc-800 font-semibold mt-2'
                rows={4}
                placeholder='Address'
                name='address'
                value={values.address}
                onChange={changeValue}
              />
            </div>
            <div className='mt-4 flex justify-end'>
              <button className='bg-yellow-500 text-zinc-900 px-3 py-2 rounded font-semibold hover:bg-yellow-400'
                onClick={updateAddress}>
                Update
              </button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Settings
