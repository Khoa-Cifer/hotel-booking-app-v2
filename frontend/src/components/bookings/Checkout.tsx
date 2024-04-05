import { useEffect, useState } from "react"
import { getRoomById } from "../utils/RoomService"
import { useParams } from "react-router-dom"
import { FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from "react-icons/fa"
import BookingForm from "./BookingForm"
import RoomCarousel from "../common/RoomCarousel"

const Checkout = () => {

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    })

    const { id } = useParams<{ id: string }>();
    const roomIdAsNumber = parseInt(id, 10);

    useEffect(() => {
        setTimeout(() => {
            getRoomById(roomIdAsNumber).then((response) => {
                setRoomInfo(response)
                setIsLoading(false)
            }).catch(error => {
                setError(error)
                setIsLoading(false)
            })
        }, 2000)
    }, [roomIdAsNumber])

    return (
        <div>
            <section className="container">
                <div className="row flex-column flex-md-row items-center">
                    <div className="col-md-4 my-5">
                        {isLoading ? (
                            <p>Loading room information</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div className="room-info">
                                <img
                                    src={`data:image/png;base64,${roomInfo.photo}`}
                                    alt="Room Photo"
                                    style={{ width: "100%", height: "200px" }}
                                />
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th>Room Type: </th>
                                            <th>{roomInfo.roomType}</th>
                                        </tr>

                                        <tr>
                                            <th>Room Price: </th>
                                            <th>{roomInfo.roomPrice}</th>
                                        </tr>

                                        <tr>
                                            <th>Room Service</th>
                                            <td>
                                                <ul className="pl-1">
                                                    <li className="flex gap-2 mt-2"><FaWifi />Wifi</li>
                                                    <li className="flex gap-2 mt-2"><FaTv />Netflix Premium</li>
                                                    <li className="flex gap-2 mt-2"><FaUtensils />Breakfast</li>
                                                    <li className="flex gap-2 mt-2"><FaWineGlassAlt />Bar refreshment</li>
                                                    <li className="flex gap-2 mt-2"><FaCar />Car Service</li>
                                                    <li className="flex gap-2 mt-2"><FaParking />Parking Space</li>
                                                    <li className="flex gap-2 mt-2"><FaTshirt />Laundry</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    <div className="col-md-8">
                        <BookingForm />
                    </div>

                </div>
            </section>

            <div className="container">
                <RoomCarousel/>
            </div>
        </div>
    )
}

export default Checkout