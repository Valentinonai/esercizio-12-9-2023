import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { ListGroup } from "react-bootstrap";

const CommentArea = (props) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const fetchComments = async () => {
    setIsFirstLoad(true);
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY5YjRlMThkM2Q0OTAwMTRjZmQ3ZDQiLCJpYXQiOjE2OTQwODYzNjksImV4cCI6MTY5NTI5NTk2OX0.UMzNavOw7SiIyoEXvdOL_L1zqNhivjz340RkCbm8TtM",
        },
      });
      if (response.ok) {
        let comments = await response.json();
        const x = comments.filter((elem) => elem.elementId === props.asin);

        setComments(x);
        setIsLoading(false);
        setIsError(false);
        setIsFirstLoad(false);
      } else {
        console.log("error");
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };
  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.asin]);

  return (
    <div className="text-center">
      <h2>CommentArea</h2>
      {isError && <Error />}
      <AddComment asin={props.asin} fetchComments={fetchComments} />
      {isLoading && <Loading />}

      {!isLoading && !isFirstLoad && comments.length === 0 ? (
        <ListGroup>
          <ListGroup.Item>Non ci sono ancora commenti</ListGroup.Item>
        </ListGroup>
      ) : (
        <CommentList commentsToShow={comments} fetchComments={fetchComments} />
      )}
    </div>
  );
};

export default CommentArea;
