import { parseISO } from "date-fns"
import { useEffect, useState } from "react"

const BookingsTable = ({bookingInfo, handleBookingCancelation}) => {
    
    const [filteredBookings, setFilteredBookings] = useState(false)
    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo
        if(startDate && endDate) {
            filtered = bookingInfo.filter((booking) => {
                const bookingStartDate = parseISO(booking.checkInDate)
                const bookingEndDate = parseISO(booking.checkOutDate)
                return bookingStartDate >= startDate && bookingEndDate <= endDate 
                && bookingEndDate > startDate
            })
        }
        setFilteredBookings(filtered)
    }

    useEffect(() => {
        setFilteredBookings(bookingInfo)
    }, [bookingInfo])

    return (
        <section className="p-4">

        </section>
    )
}

export default BookingsTable