import { useEffect, useState } from "react";
import AddComment from "./AddComment";
import CommentsList from "./CommentsList";
import { Spinner } from "react-bootstrap";

const CommentArea = (props) => {
  // state = {
  //   // bookId: this.props.id,
  //   singleBookCommets: [],
  //   isLoading: true,
  // };

  const [singleBookCommets, setSingleBookCommets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // componentDidMount() {
  //   if (this.props.id !== "") this.getSingleBookComments();
  // }

  // useEffect(() => {
  //   if (props.id !== "") {
  //     getSingleBookComments();
  //   }
  // }, []);

  useEffect(() => {
    console.log("NOW IT'S THE TIME TO FETCH THE NEW MOVIE!");
    getSingleBookComments(props.id);
  }, [props.id]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.id !== this.props.id) {
  //     console.log("NOW IT'S THE TIME TO FETCH THE NEW MOVIE!");
  //     this.getSingleBookComments();
  //   }
  // }

  const getSingleBookComments = async (id) => {
    try {
      if (id) {
        let response = await fetch(
          `https://striveschool-api.herokuapp.com/api/comments/${id}`,
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdmNThmNGQ4MzkzNTAwMTVlOGM0YTQiLCJpYXQiOjE2NjkyOTAyMjgsImV4cCI6MTY3MDQ5OTgyOH0.mx34o8m4iZi7tqC_ghliyE-WV4X9Bysa6Q44k9-W9-A",
            },
          }
        );
        if (response.ok) {
          let result = await response.json();
          console.log(result);
          // this.setState({ singleBookCommets: result, isLoading: false });
          setSingleBookCommets(result);
          setIsLoading(false);
        } else {
          console.log("Error while fetching");
          // this.setState({ isLoading: true });
          setIsLoading(true);
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      // this.setState({ isLoading: true });
      setIsLoading(true);
    }
  };

  // render() {
  return (
    <div className="mt-2 border-rounded">
      {/* <h6 className="mb-0 bg-primary text-center text-light">
          Please select a book in order to see its comments
        </h6> */}
      {isLoading && props.id !== "" && (
        <div className="d-flex justify-content-center my-2">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      )}
      <CommentsList
        getSingleBookComments={getSingleBookComments}
        commentsArray={singleBookCommets}
        id={props.id}
      />
      <AddComment id={props.id} getSingleBookComments={getSingleBookComments} />
    </div>
  );
  // }
};

export default CommentArea;
