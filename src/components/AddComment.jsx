import { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";

//this component has as prop an id which is the book's asin from CommentArea.jsx
const AddComment = (props) => {
  // state = {
  //   commentToAdd: {
  //     comment: "",
  //     rate: "",
  //   },
  //   writeYourCommentButtonClicked: false,
  // };

  const [commentToAdd, setCommentToAdd] = useState({ comment: "", rate: "" });
  const [writeYourCommentButtonClicked, setWriteYourCommentButtonClicked] =
    useState(false);

  const onChangeHandler = (value, fieldToSet) => {
    // this.setState({
    //   commentToAdd: {
    //     ...this.state.commentToAdd,
    //     [fieldToSet]: value,
    //   },
    // });
    setCommentToAdd({ ...commentToAdd, [fieldToSet]: value });
  };

  const addSingleComment = async () => {
    try {
      let data = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/ ",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdmNThmNGQ4MzkzNTAwMTVlOGM0YTQiLCJpYXQiOjE2NjkyOTAyMjgsImV4cCI6MTY3MDQ5OTgyOH0.mx34o8m4iZi7tqC_ghliyE-WV4X9Bysa6Q44k9-W9-A",
          },
          body: JSON.stringify({
            ...commentToAdd,
            // ...this.state.commentToAdd,
            elementId: props.id,
          }),
        }
      );

      if (data.ok) {
        props.getSingleBookComments();
        // this.setState({
        //   commentToAdd: {
        //     comment: "",
        //     rate: "",
        //     elementId: "",
        //   },
        // });
        setCommentToAdd({
          commentToAdd: {
            comment: "",
            rate: "",
            elementId: "",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // render() {
  return (
    <Form.Group className="text-center">
      {!writeYourCommentButtonClicked && props.id && (
        <Button
          type="button"
          variant="outline-info"
          className="my-2"
          onClick={
            () => setWriteYourCommentButtonClicked(true)
            // this.setState({ writeYourCommentButtonClicked: true })
          }
        >
          Write comment
        </Button>
      )}

      {writeYourCommentButtonClicked && (
        <Button
          type="button"
          variant="outline-info"
          className="my-2"
          onClick={
            () => setWriteYourCommentButtonClicked(false)
            // this.setState({ writeYourCommentButtonClicked: false })
          }
        >
          Hide Section
        </Button>
      )}

      {writeYourCommentButtonClicked && (
        <div
          className={`${!writeYourCommentButtonClicked ? "d-none" : "d-block"}`}
        >
          <InputGroup>
            <Form.Control
              placeholder="Type your comm. here"
              as="textarea"
              rows={2}
              className="mb-2"
              onChange={(e) => onChangeHandler(e.target.value, "comment")}
            />
          </InputGroup>
          <InputGroup>
            <Form.Control
              as="select"
              value={commentToAdd.rate}
              onChange={(e) => onChangeHandler(e.target.value, "rate")}
            >
              <option value="default">Your Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
          </InputGroup>
          <Button
            type="button"
            variant="outline-info"
            className="mt-2"
            onClick={async () => {
              addSingleComment();
              setWriteYourCommentButtonClicked(false);
              // this.setState({ writeYourCommentButtonClicked: false });
            }}
          >
            Post comment
          </Button>
        </div>
      )}
    </Form.Group>
  );
  // }
};

export default AddComment;
