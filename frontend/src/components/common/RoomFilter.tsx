import { useState } from "react"

const RoomFilter = ({ data, setFilteredData }) => {
    const [filter, setFilter] = useState("");

    const handleSelectChange = (event) => {
        const selectedRoomType = event.target.value;
        setFilter(selectedRoomType);
        const filteredRooms = data.filter((room) => room.roomType.includes(selectedRoomType));
        setFilteredData(filteredRooms);
    }

    const clearFilter = () => {
        setFilter("");
        setFilteredData(data);
    }

    const roomTypes = ["", ...new Set(data && data.map && data.map((room) => room.roomType))];

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="room-type-filter">Filter rooms by type</span>
            <select
                className="form-select"
                value={filter}
                onChange={handleSelectChange}
            >
                <option value={""}>Select a room type to filter</option>
                {roomTypes && roomTypes.map && roomTypes.map((type, index) => (
                    <option key={index} value={String(type)}>{String(type)}</option>
                ))}
            </select>

            <button className="btn btn-hotel" type="button" onClick={clearFilter}>Clear Filter</button>
        </div>
    )
}

export default RoomFilter