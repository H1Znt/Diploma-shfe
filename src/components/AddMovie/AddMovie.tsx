import { Col, Container, Row } from "react-bootstrap";
import { ChangeBgImage } from "../ChangeBgImage";
import { Header } from "../Header";

export const AddMovie = () => {
  return (
    <ChangeBgImage>
      <div className="login">
        <Container className="p-0 login__container">
          <Row className="login__header mx-auto">
            <Col>
              <div className="">
                <Header />
              </div>
            </Col>
          </Row>
          <Row className="login__header mx-auto">
            <Col>
              <div className="">
                <p>Add movie</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </ChangeBgImage>
  );
};
