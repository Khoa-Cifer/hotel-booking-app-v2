import { useEffect, useState } from "react"
import { getAllRooms } from "../utils/RoomService";
import RoomCard from "./RoomCard";
import { Col, Container, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPagination from "../common/RoomPagination";

const Room = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(6);
    const [filteredData, setFilteredData] = useState([{ id: "" }]);

    useEffect(() => {
        setIsLoading(true)
        getAllRooms().then((data) => {
            setData(data);
            setFilteredData(data);
            setIsLoading(false);
        }).catch((e) => {
            setError(e.message);
            setIsLoading(false);
        })
    }, [])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const totalPages = Math.ceil(filteredData.length / roomsPerPage)
    const renderRooms = () => {
        const startIndex = (currentPage - 1) * roomsPerPage
        const lastIndex = startIndex + roomsPerPage
        return filteredData
            .slice(startIndex, lastIndex)
            .map((room) => <RoomCard room={room} key={room.id} />);
    }

    if (isLoading) {
        return
        <div>
            Loading rooms......
        </div>
    }

    if (error) {
        return
        <div>
            Unexpected Error has been occured
            {error}
        </div>
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col md={6} className="mb-3 mb-md-0">
                        <RoomFilter
                            data={data}
                            setFilteredData={setFilteredData}
                        />
                    </Col>
                </Row>

                <Row className="flex flex-col">{renderRooms()}</Row>
                
                <Row>
                    <Col md={6} className="d-flex items-center justify-end">
                        <RoomPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Room