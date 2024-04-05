import { useState } from "react"
import { cancelBooking, getBookingByConfirmationCode } from "../utils/RoomService"

const FindBooking = () => {

    const [confirmationCode, setConfirmationCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [bookingInfo, setBookingInfo] = useState({
        id: "",
        room: { id: "" },
        bookingConfirmationCode: "",
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: ""
    })
    const [isDeleted, setIsDeleted] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")

    const clearBookingInfo = {
        id: "",
        room: { id: "" },
        bookingConfirmationCode: "",
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: ""
    }

    const handleInputChange = (e) => {
        setConfirmationCode(e.target.value)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const data = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingInfo.id)
            setIsDeleted(true)
            setBookingInfo(clearBookingInfo)
            setConfirmationCode("")
            setError("")
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div>
            <div className="container mt-5  flex-col
            justify-center flex items-center">
                <h2>Find My Booking</h2>
                <form className="col-md-6" action="" onSubmit={handleFormSubmit}>
                    <div className="input-group mb-3 flex flex-col">
                        <div className="col-md-12 flex">
                            <input
                                className="form-control"
                                type="text"
                                id="confirmationCode"
                                name="confirmationCode"
                                value={confirmationCode}
                                onChange={handleInputChange}
                            />

                            <button type="submit" className="btn btn-hotel input-group-text">Find booking</button>

                        </div>

                        <div className="items-center justify-center flex">
                            {isLoading ? (
                                <div>Finding your booking</div>
                            ) : bookingInfo.bookingConfirmationCode ? (
                                <div className="col-md-6 my-4">
                                    <h3>Booking Information</h3>
                                    <p>Confirmation code: {bookingInfo.bookingConfirmationCode}</p>
                                    <p>Booking ID: {bookingInfo.id}</p>
                                    <p>Room Number: {bookingInfo.room.id}</p>
                                    <p>Check-In Date: {bookingInfo.checkInDate}</p>
                                    <p>Check-Out Date: {bookingInfo.checkOutDate}</p>
                                    <p>Fullname: {bookingInfo.guestName}</p>
                                    <p>Email Address: {bookingInfo.guestEmail}</p>
                                    <p>Adults: {bookingInfo.numOfAdults}</p>
                                    <p>Children: {bookingInfo.numOfChildren}</p>
                                    <p>Total Guests: {bookingInfo.totalNumOfGuest}</p>

                                    {!isDeleted && (
                                        <button className="btn btn-danger" onClick={() => handleBookingCancellation(bookingInfo.id)}>
                                            Cancel booking
                                        </button>
                                    )}
                                </div>
                            ) : error ? (
                                <div className="text-danger">Error: {error}</div>
                            ) : (
                                <div>Find booking.....</div>
                            )}
                        </div>

                        {isDeleted && (
                            <div className="alert alert-success mt-3">Booking has been cancelled successfully !</div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FindBooking