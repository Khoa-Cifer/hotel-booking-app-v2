import { useLocation } from "react-router-dom"
import Header from "../common/Header"

const BookingSuccess = () => {
    const location = useLocation()
    const message = location.state?.message
    console.log(message)
    const error = location.state?.error
    console.log(error)
    return (
        <div className="container">
            <Header title="Booking Success" />
            <div className="mt-5">
                {message ? (
                    <div>
                        <h3 className="text-success">Booking Success !!!</h3>
                        <p className="text-success">{message}</p>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-danger">Booking Error !!!</h3>
                        <p className="text-danger">{error}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BookingSuccess