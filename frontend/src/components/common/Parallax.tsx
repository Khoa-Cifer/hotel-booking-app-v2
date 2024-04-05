import { Container } from "react-bootstrap"

const Parallax = () => {
    return (
        <div className="parallax mb-5">
            <Container className="text-center px-5 py-5 justify-center">
                <div className="animated-texts bounceIn">
                    <h1>Welcome to <span className="hotel-color">lakeSide hotel</span></h1>
                </div>
            </Container>
        </div>
    )
}

export default Parallax