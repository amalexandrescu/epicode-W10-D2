import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// import Welcome from "./components/WarningSigns";

import BookList from "./components/BookList";
import { Container, Row, Col } from "react-bootstrap";
import { Component } from "react";
import CommentArea from "./components/CommentArea";

class App extends Component {
  state = {
    currentBookAsin: "",
  };

  changeSelectedBookAsin = (newBookAsin) => {
    this.setState({
      currentBookAsin: newBookAsin,
    });
  };

  render() {
    return (
      <div>
        <Container>
          <h1 className="text-center">Welcome to my amazing Book Store</h1>
          <Row className="justify-content-center mt-4">
            <Col xs={12} md={6}>
              <h2>Books</h2>
              <BookList
                currentBookAsin={this.state.currentBookAsin}
                changeSelectedBookAsin={this.changeSelectedBookAsin}
                selected={this.state.selected}
              />
            </Col>
            <Col xs={12} md={6}>
              <h2 className="text-center">Comment Area</h2>
              {!this.state.currentBookAsin && (
                <h6 className="mb-0 bg-primary text-center text-light py-3">
                  Please select a book in order to see its comments
                </h6>
              )}
              <CommentArea id={this.state.currentBookAsin} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
