import React, { useState, useEffect } from 'react';
import MOCK_DATA from './_mock/comments';
import Image from './components/common/image';
import Input from './components/common/input';
import './App.css';

function App() {
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState('');
  const [selectedComment, setSelectedComment] = useState({});

  useEffect(() => {
    setComments([...MOCK_DATA]);
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleReply = (comment) => {    
    setSelectedComment(comment);
  }

  // const handleSubmit = () => {
  //   updateRespectiveComment();
  //   setSelectedComment({});
  //   setValue('');
  // };

  const handleSubmit = () => {
    if (selectedComment.comment_id) {
      // If a parent comment is selected
      const newComment = {
        comment_id: comments.length + 1, // Generate a unique ID for the new comment
        comment: value,
        reply: [], // Initialize an empty array for replies
        user_id: 1, // Assuming the user ID for the new comment
        user_name: 'Jane Doe', // Assuming the user name for the new comment
        comment_time: new Date().toISOString(), // Timestamp for the new comment
        nesting_levels_id: `${selectedComment.nesting_levels_id}.${comments.length + 1}`, // Generate nesting levels ID
      };
      const updatedComments = addReplyToComment(comments, selectedComment, newComment);
      setComments(updatedComments);
    } else {
      // If no parent comment is selected, add the comment at the top level
      const newComment = {
        comment_id: comments.length + 1, // Generate a unique ID for the new comment
        comment: value,
        reply: [],
        user_id: 1, // Assuming the user ID for the new comment
        user_name: 'Jane Doe', // Assuming the user name for the new comment
        comment_time: new Date().toISOString(), // Timestamp for the new comment
        nesting_levels_id: `${comments.length + 1}`, // Generate nesting levels ID
      };
      setComments([newComment, ...comments]);
    }
    setSelectedComment({});
    setValue('');
  }
  
  // Function to add a reply to the selected parent comment
  const addReplyToComment = (commentsArray, parentComment, newReply) => {
    return commentsArray.map(comment => {
      if (comment.comment_id === parentComment.comment_id) {
        return {
          ...comment,
          reply: [...comment.reply, newReply],
        };
      } else if (comment.reply && comment.reply.length > 0) {
        // Recursively search for the parent comment within replies
        const updatedReplies = addReplyToComment(comment.reply, parentComment, newReply);
        return {
          ...comment,
          reply: updatedReplies,
        };
      } else {
        return comment;
      }
    });
  }
  

  const updateRespectiveComment = () => {
    // TODO: Logic for updating nested comment or respective comment
    const { nesting_levels_id } = selectedComment;

    const updatedComments = updateComment(comments, selectedComment, nesting_levels_id.split('.'));
    setComments(updatedComments);
  }

  const updateComment = (commentsArray, commentToUpdate, nestedIds) => {
    if (nestedIds.length === 1) {
      // If only one level deep, update the comment
      return commentsArray.map(comment => {
        if (comment.comment_id === commentToUpdate.comment_id) {
          return {
            ...comment,
            comment: value,
          };
        } else {
          return comment;
        }
      });
    } else {
      // Otherwise, find the nested comment and update it
      const [nextNestedId, ...remainingNestedIds] = nestedIds;
      return commentsArray.map(comment => {
        if (comment.comment_id === parseInt(nextNestedId)) {
          return {
            ...comment,
            reply: updateComment(comment.reply, commentToUpdate, remainingNestedIds),
          };
        } else {
          return comment;
        }
      });
    }
  }

  return (
    <div className="k-flex k-aic k-fdc k-mt32 k-mb32 comments-container">
      <div className="k-mb32">Comments</div>

      <div className="comment-section k-flex k-gap8">
        <Image Src="/assets/images/logo512.png" Height="50px" Width="50px" Alt="user image" />
        <Input className="flex1" value={value} onChange={handleChange} />
        <span className="post-btn k-flex k-jcc k-aic" onClick={handleSubmit}>Comment</span>
      </div>

      <div>
        {comments.map(comment => (
          <CommentContainer key={comment.comment_id} comment={comment} handleReply={handleReply} />
        ))}
      </div>
    </div>
  );
}

const CommentContainer = ({ comment, handleReply }) => {
  const nestedComments = comment.reply.map(reply => (
    <CommentContainer key={reply.comment_id} comment={reply} handleReply={handleReply} />
  ));

  return (
    <div className="commnet-container k-flex k-gap8 k-mt16 k-mb16">
      <Image Src="/assets/images/logo512.png" Height="50px" Width="50px" Alt="user image" />
      <div>
        <div className="k-flex k-gap8">
          <div>{comment.user_name}</div>
          <div>{comment.comment_time}</div>
        </div>
        <div>{comment.comment}</div>
        <div onClick={() => handleReply(comment)}>Reply</div>
        <div className="nested-comments">{nestedComments}</div>
      </div>
    </div>
  );
}

export default App;
