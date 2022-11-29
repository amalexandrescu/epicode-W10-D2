import { Component } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";

//this component has as prop an id which is the book's asin from CommentArea.jsx
class AddComment extends Component {
  state = {
    commentToAdd: {
      comment: "",
      rate: "",
    },
    writeYourCommentButtonClicked: false,
  };

  onChangeHandler = (value, fieldToSet) => {
    this.setState({
      commentToAdd: {
        ...this.state.commentToAdd,
        [fieldToSet]: value,
      },
    });
  };

  addSingleComment = async () => {
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
            ...this.state.commentToAdd,
            elementId: this.props.id,
          }),
        }
      );

      if (data.ok) {
        this.props.getSingleBookComments();
        this.setState({
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

  render() {
    return (
      <Form.Group className="text-center">
        {!this.state.writeYourCommentButtonClicked && this.props.id && (
          <Button
            type="button"
            variant="outline-info"
            className="my-2"
            onClick={() =>
              this.setState({ writeYourCommentButtonClicked: true })
            }
          >
            Write comment
          </Button>
        )}

        {this.state.writeYourCommentButtonClicked && (
          <Button
            type="button"
            variant="outline-info"
            className="my-2"
            onClick={() =>
              this.setState({ writeYourCommentButtonClicked: false })
            }
          >
            Hide Section
          </Button>
        )}

        {this.state.writeYourCommentButtonClicked && (
          <div
            className={`${
              !this.state.writeYourCommentButtonClicked ? "d-none" : "d-block"
            }`}
          >
            <InputGroup>
              <Form.Control
                placeholder="Type your comm. here"
                as="textarea"
                rows={2}
                className="mb-2"
                onChange={(e) =>
                  this.onChangeHandler(e.target.value, "comment")
                }
              />
            </InputGroup>
            <InputGroup>
              <Form.Control
                as="select"
                value={this.state.rate}
                onChange={(e) => this.onChangeHandler(e.target.value, "rate")}
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
                this.addSingleComment();
                this.setState({ writeYourCommentButtonClicked: false });
              }}
            >
              Post comment
            </Button>
          </div>
        )}
      </Form.Group>
    );
  }
}

export default AddComment;
