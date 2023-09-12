import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = (props) => {
  const [comment, setComment] = useState({ comment: "", rate: "1" });
  console.log(props.asin);

  const sendComment = async (e) => {
    e.preventDefault();
    console.log(comment);
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments", {
        method: "POST",
        body: JSON.stringify({ ...comment, elementId: props.asin }),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY5YjRlMThkM2Q0OTAwMTRjZmQ3ZDQiLCJpYXQiOjE2OTQwODYzNjksImV4cCI6MTY5NTI5NTk2OX0.UMzNavOw7SiIyoEXvdOL_L1zqNhivjz340RkCbm8TtM",
        },
      });
      if (response.ok) {
        alert("Comment was sent!");

        setComment({ comment: "", rate: "1", elementId: props.asin });
        props.fetchComments();
      } else {
        console.log("error");
        alert("something went wrong");
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group>
          <Form.Label>Comment text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add comment here"
            value={comment.comment}
            onChange={(e) => setComment({ ...comment, comment: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={comment.rate}
            onChange={(e) => setComment({ ...comment, rate: e.target.value })}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
