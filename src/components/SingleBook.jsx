import { Card } from "react-bootstrap";
import { useState } from "react";
// import { ConeStriped } from "react-bootstrap-icons";

// const SingleBook = ({ book }) => {
//   return (
//     // <Container>
//     //   <h2>Single Book</h2>
//     //   <Row>
//     <div className="col-6 col-sm-4 col-md-3 col-lg-3 mb-3 mx-auto">
//       <Card>
//         <Card.Img variant="top" src={book.img} />
//         <Card.Body>
//           <Card.Title>{book.title}</Card.Title>
//         </Card.Body>
//       </Card>
//     </div>
//     //   </Row>
//     // </Container>
//   );
// };

const SingleBook = (props) => {
  // state = {
  //   selected: this.props.selected,
  // };

  const [selected, setSelected] = useState(props.selected);
  // render() {
  return (
    <div className={`col-12 col-sm-6 mb-3 mx-auto`}>
      <Card
        className={`${selected ? "shadow-dark" : ""}`}
        onClick={() => {
          props.changeSelectedBookAsin(props.book.asin);
          // this.setState({ selected: !this.state.selected });
          setSelected(!selected);
        }}
      >
        <Card.Img variant="top" src={props.book.img} />
        <Card.Body>
          <Card.Title>{props.book.title}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
  // }
};

export default SingleBook;
