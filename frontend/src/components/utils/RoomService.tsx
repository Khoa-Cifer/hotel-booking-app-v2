import axios from "./CustomizeApiFunction";

const getToken = () => {
	return sessionStorage.getItem('token');
};

//Add room to database
const addRoom = (photo, roomType, roomPrice) => {
    const formData = new FormData()
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);
    console.log(sessionStorage.getItem("token"))
    return axios.post("/rooms/add/new-room", formData, {
        headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": `multipart/form-data`
        }
    });
}

//Get all room types from the database
const getRoomTypes = () => {
    return axios.get("/rooms/room/types");
}

//Get all rooms from the database
const getAllRooms = () => {
    return axios.get("/rooms/all-rooms");
}

const getRoomById = (id) => {
    return axios.get(`/rooms/room/${id}`)
}

const updateRoom = (id, roomData) => {
    const formData = new FormData();
    formData.append("photo", roomData.photo);
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    return axios.put(`/rooms/update/${id}`, formData, {
        headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": `multipart/form-data`
        }
    })
}

const deleteRoom = (id) => {
    return axios.delete(`/rooms/delete/room/${id}`, {
        headers: {
            "Authorization": `Bearer ${getToken()}`,
        }
    });
}

const bookRoom = (id, booking) => {
    return axios.post(`/bookings/room/${id}/booking`, booking)
}

const getAllBooking = () => {
    return axios.get("/bookings/all-bookings", {
        headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": `application/json`
        }
    })
}

const getBookingByConfirmationCode = (confirmationCode) => {
    return axios.get(`/bookings/confirmation/${confirmationCode}`)
}

const cancelBooking = (id) => {
    return axios.delete(`/bookings/booking/${id}/delete`)
}

const getAvailableRooms = (checkInDate, checkOutDate, roomType) => {
    return axios.get(`/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
}

const registerUser = (registration) => {
    return axios.post("/auth/register-user", registration)
}

const loginUser = (login) => {
    return axios.post("/auth/login", login)
}

const deleteUser = (userId) => {
    return axios.delete(`/users/delete/${userId}`, {
        headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": `application/json`
        }
    })
}

const getUserProfile = (id, token) => {
    return axios.get(`/users/find/${id}`, {
        headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": `application/json`
        }
    })
}

const getBookingsByUserId = (userId, token) => {
    return axios.get(`/bookings/user/${userId}/bookings`, {
        headers: {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": `application/json`
        }
    })
}

export {
    addRoom, getRoomTypes, getAllRooms, deleteRoom, updateRoom, getRoomById,
    bookRoom, getAllBooking, getBookingByConfirmationCode, cancelBooking, getAvailableRooms, getBookingsByUserId,
    registerUser, loginUser, deleteUser, getUserProfile
}