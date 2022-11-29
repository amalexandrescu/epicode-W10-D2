// import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import SingleComment from "./SingleComment";

const CommentsList = (props) => {
  //this class has as props commentsArray which is basically the array with the comments
  //and also an id props
  //we need to render them now

  // state = {
  //   isLoading: true,
  // };
  // const [isLoading, setIsLoading] = useState(true);

  // render() {
  return (
    <ListGroup className="text-center border-not-rounded">
      {props.commentsArray.map((comment) => {
        return (
          <SingleComment
            key={comment._id}
            currentComment={comment}
            getSingleBookComments={props.getSingleBookComments}
          />
        );
      })}
    </ListGroup>
  );
  // {
  //   console.log(this.props.commentsArray);
  // }
  // }
};

export default CommentsList;
