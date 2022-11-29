import { Container, Row, InputGroup, Form, FormLabel } from "react-bootstrap";
import SingleBook from "./SingleBook";
import fantasy from "../books/fantasy.json";
import history from "../books/history.json";
import romance from "../books/romance.json";
import horror from "../books/horror.json";
import scifi from "../books/scifi.json";
import { Component } from "react";

// const BookList = () => {
//   return (
//     <Container>
//       <h3>History Books</h3>
//       <Row>
//         {history.map((book) => {
//           return <SingleBook book={book} key={book.asin} />;
//         })}
//       </Row>
//     </Container>
//   );
// };

class BookList extends Component {
  state = {
    genre: "fantasy",
    fantasy: fantasy,
    history: history,
    romance: romance,
    horror: horror,
    scifi: scifi,
    search: "",
    isLoading: true,
  };

  filterBookList = (value) => {
    this.setState({
      genre: value,
    });
  };

  onChangeHandler = (value) => {
    this.setState({ genre: value });
  };

  render() {
    return (
      <Container>
        <Row>
          <Form.Group>
            <Form.Label>Search books by genre!</Form.Label>

            <Form.Control
              as="select"
              value={this.state.genre}
              onChange={(e) => this.onChangeHandler(e.target.value)}
            >
              <option value="fantasy">fantasy</option>
              <option value="history">history</option>
              <option value="horror">horror</option>
              <option value="romance">romance</option>
              <option value="scifi">scifi</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <FormLabel>Search books by title!</FormLabel>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Type book title"
              value={this.state.search}
              onChange={(event) => {
                this.setState({ search: event.target.value });
              }}
            />
          </InputGroup>
        </Row>
        <Row>
          <h3> {this.state.genre} Books</h3>
        </Row>
        <Row>
          {this.state[this.state.genre] &&
            this.state[this.state.genre]
              .filter((book) => {
                return book.title
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase());
              })
              .map((book) => {
                return (
                  <SingleBook
                    book={book}
                    key={book.asin}
                    asin={book.asin}
                    selected={false}
                    changeSelectedBookAsin={this.props.changeSelectedBookAsin}
                  />
                );
              })}
        </Row>
      </Container>
    );
  }
}

export default BookList;
