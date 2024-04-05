import { useState, useEffect } from "react"
import { getRoomTypes } from "../utils/RoomService"

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
    const [roomTypes, setRoomTypes] = useState([""])
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
    const [newRoomType, setNewRoomType] = useState("")

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data)
        })
    }, [])

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value)
    }

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType("")
            setShowNewRoomTypeInput(false)
        }
    }

    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select
                        required
                        className="form-select"
                        name="roomType"
                        onChange={(e) => {
                            if (e.target.value === "Add New") {
                                setShowNewRoomTypeInput(true)
                            } else {
                                handleRoomInputChange(e)
                            }
                        }}
                        value={newRoom.roomType}>
                        <option value="">Select a room type</option>
                        <option value={"Add New"}>Add New</option>
                        {roomTypes && roomTypes.map && roomTypes.map((type, index) => (
                            type.length > 1 && (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            )
                        ))}
                    </select>
                    {showNewRoomTypeInput && (
                        <div className="mt-2">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter New Room Type"
                                    value={newRoomType}
                                    onChange={handleNewRoomTypeInputChange}
                                />
                                <button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>
                                    Add
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default RoomTypeSelector