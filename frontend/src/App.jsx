import React from "react"
import Home from "./pages/Home"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import AllBooks from "./pages/AllBooks"
import Profile from "./pages/Profile"
import Cart from "./pages/Cart"
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"
import Favourites from "./components/profile/Favourites"
import UserOrderHistory from "./components/profile/UserOrderHistory"
import Settings from "./components/profile/Settings"
import { Route, Routes } from "react-router-dom"
import ViewBookDetails from "./components/book/ViewBookDetails"
import { useSelector } from "react-redux"
import AllOrders from "./components/profile/AllOrders"
import AddBook from "./components/profile/AddBook"
import UpdateBook from "./components/profile/UpdateBook"

function App() {
  const role = useSelector(state => state.auth.role)
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-Books" element={<AllBooks />} />
        <Route path="/profile" element={<Profile />} >
          {role === "admin" ? <Route index element={<AllOrders />} /> : <Route index element={<Favourites />} />}
          <Route path="/profile/add-book" element={<AddBook />} />
          <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
          <Route path="/profile/settings" element={<Settings />} />
        </Route>
        <Route path="/update-book/:bookid" element={<UpdateBook />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="view-book-details/:bookid" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
