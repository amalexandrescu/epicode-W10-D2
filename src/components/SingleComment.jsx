import { Component } from "react";
import { ListGroup, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

//this class has as props currentComment from CommentsLists.jsx
//in this prop we have a single comment which we have to render inside our div
class SingleComment extends Component {
  state = {
    hovered: false,
  };

  showRemoveButton = () => {
    this.setState({
      hovered: true,
    });
  };

  removeComment = async () => {
    let data = await fetch(
      `https://striveschool-api.herokuapp.com/api/comments/${this.props.currentComment._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdmNThmNGQ4MzkzNTAwMTVlOGM0YTQiLCJpYXQiOjE2NjkyOTAyMjgsImV4cCI6MTY3MDQ5OTgyOH0.mx34o8m4iZi7tqC_ghliyE-WV4X9Bysa6Q44k9-W9-A",
        },
      }
    );

    try {
      if (data.ok) {
        this.props.getSingleBookComments();
      } else {
        alert("An error occured and the comment was not removed");
      }
    } catch (error) {
      console.log("An error occured");
    }
  };

  render() {
    return (
      <ListGroup.Item
        onMouseOver={this.showRemoveButton}
        onMouseLeave={() => this.setState({ hovered: false })}
        className="bg-success write-just-on-one-line d-flex justify-content-between"
      >
        {this.state.hovered && (
          <div className="w-75 write-just-on-one-line text-left">
            {this.props.currentComment.comment}
          </div>
        )}
        {!this.state.hovered && (
          <div className="w-100 write-just-on-one-line text-left">
            {this.props.currentComment.comment}
          </div>
        )}
        {this.state.hovered && (
          <Button variant="outline-danger" onClick={this.removeComment}>
            <Icon.Trash3Fill className="customBinIcon" />
          </Button>
        )}
      </ListGroup.Item>
    );
  }
}

export default SingleComment;
