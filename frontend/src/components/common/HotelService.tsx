import { Card, Col, Container, Row } from "react-bootstrap"
import Header from "./Header"
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from "react-icons/fa"

const HotelService = () => {
    return (
        <>
            <Container className='mb-2'>
                <Header title={"Our Services"} />
                <Row>
                    <h4 className="text-center">
                        Services at <span className="hotel-color">lakeSide hotel</span>

                    </h4>
                    <span className="gap-2 text-center">
                        24-Hour Front Desk
                    </span>
                </Row>
                <hr />

                <Row xs={1} md={2} lg={3} className="mt-2">
                    <Col className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaWifi /> Wifi
                                </Card.Title>

                                <Card.Text>Stay connected with high-speed internet access.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaUtensils /> Breakfast
                                </Card.Title>

                                <Card.Text>Start your day with a delicious breakfast buffet.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaTshirt /> Laundry
                                </Card.Title>

                                <Card.Text>Keep your clothes clean and fresh with our laundry service.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaCocktail /> Mini-bar
                                </Card.Title>
                                <Card.Text>Enjoy a refreshing drink or snack from our in-room mini-bar.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaParking /> Parking
                                </Card.Title>
                                <Card.Text>Park your car conveniently in our on-site parking lot.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaSnowflake /> Air conditioning
                                </Card.Title>
                                <Card.Text>Stay cool and comfortable with our air conditioning system.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default HotelService