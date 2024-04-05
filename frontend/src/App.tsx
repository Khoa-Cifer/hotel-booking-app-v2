import './App.css'
import AddRoom from './components/room/AddRoom'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import ExistingRooms from './components/room/ExistingRooms'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import EditRoom from './components/room/EditRoom'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import RoomListing from './components/room/RoomListing'
import Admin from './components/admin/Admin'
import Checkout from './components/bookings/Checkout'
import BookingSuccess from './components/bookings/BookingSuccess'
import Bookings from './components/bookings/Bookings'
import FindBooking from './components/bookings/FindBooking'

function App() {
  return (
    <>
      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/add-room' element={<AddRoom />}></Route>
            <Route path='/edit-room/:id' element={<EditRoom />}></Route>
            <Route path='/existing-rooms' element={<ExistingRooms />}></Route>
            <Route path='/browse-all-rooms' element={<RoomListing />}></Route>
            <Route path='/admin' element={<Admin />}></Route>
            <Route path='/book-room/:id' element={<Checkout />}></Route>
            <Route path='/booking-success' element={<BookingSuccess />}></Route>
            <Route path='/existing-bookings' element={<Bookings />}></Route>
            <Route path='/find-booking' element={<FindBooking />}></Route>
          </Routes>
        </Router>
        <Footer />
      </main>
    </>
  )
}

export default App
