import { Link } from "react-router-dom"

const Admin = () => {
    return (
        <div>
            <h1>Welcome to Admin Panel</h1>
            <Link to={"/add-room"}>Manage Rooms</Link>
        </div>
    )

}

export default Admin