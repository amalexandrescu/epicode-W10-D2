import { Container, Row, InputGroup, Form, FormLabel } from "react-bootstrap";
import SingleBook from "./SingleBook";
import fantasy from "../books/fantasy.json";
import history from "../books/history.json";
import romance from "../books/romance.json";
import horror from "../books/horror.json";
import scifi from "../books/scifi.json";
import { useState } from "react";
// import CommentsList from "./CommentsList";

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

const categories = {
  //fantasy <=> fantasy:fantasy
  fantasy,
  history,
  romance,
  horror,
  scifi,
};

const BookList = (props) => {
  // state = {
  //   genre: "fantasy",
  //   search: "",
  //   isLoading: true,
  // };

  const [genre, setGenre] = useState("fantasy");
  const [search, setSearch] = useState("");
  // const [isLoading, setIsLoading] = useState(true);

  // const filterBookList = (value) => {
  //   // this.setState({
  //   //   genre: value,
  //   // });
  //   setGenre(value);
  // };

  const onChangeHandler = (value) => {
    // this.setState({ genre: value });
    setGenre(value);
  };

  // render() {
  return (
    <Container>
      <Row>
        <Form.Group>
          <Form.Label>Search books by genre!</Form.Label>

          <Form.Control
            as="select"
            value={genre}
            onChange={(e) => onChangeHandler(e.target.value)}
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
            value={search}
            onChange={(event) => {
              // this.setState({ search: event.target.value });
              setSearch(event.target.value);
            }}
          />
        </InputGroup>
      </Row>
      <Row>
        <h3> {genre} Books</h3>
      </Row>
      <Row>
        {genre &&
          categories[genre]
            .filter((book) => {
              return book.title.toLowerCase().includes(search.toLowerCase());
            })
            .map((book) => {
              return (
                <SingleBook
                  book={book}
                  key={book.asin}
                  asin={book.asin}
                  selected={false}
                  changeSelectedBookAsin={props.changeSelectedBookAsin}
                />
              );
            })}
      </Row>
    </Container>
  );
  // }
};

export default BookList;
