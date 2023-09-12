import { ListGroup } from "react-bootstrap";
import SingleComment from "./SingleComment";

const CommentList = ({ commentsToShow, fetchComments }) => (
  <ListGroup style={{ color: "black" }} className="mt-2">
    {commentsToShow.map((comment) => (
      <SingleComment comment={comment} key={comment._id} fetchComments={fetchComments} />
    ))}
  </ListGroup>
);

export default CommentList;
