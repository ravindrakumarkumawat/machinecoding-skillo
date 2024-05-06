import React, { useState, useEffect } from 'react'
import MOCK_DATA from './_mock/comments'
import Image from './components/common/image'
import Input from './components/common/input'
import './App.css';


function App() {
  const [comments, setComments ] = useState([])
  const [value, setValue] = useState('')
  const [ selectedComment, setSelectedComment] = useState({})

  useEffect(() => {
    console.log('ravindra', MOCK_DATA)
    setComments(() => [...MOCK_DATA])
  }, [])

  const handleChange = (e) => {
    setValue(() => e.target.value)
  }

  const handleReply = (comment) => {
    setSelectedComment(() => comment)
    setValue(() => comment.comment)
  }

  const handleSubmit = () => {
    updateRespectiveComment()
    setSelectedComment({})
    setValue('')
  }

  const updateRespectiveComment = () => {
    // TODO: Logic for Update nested comment or respective comment
    const { nesting_levels_id } = selectedComment

    const findParentComment = getTheNestedComment(selectedComment, nesting_levels_id.split('.'))

  }

  const getTheNestedComment = (comment, nested_ids) => { 
    return getTheNestedComment(comment[nested_ids[0]], nested_ids.slice(1)) 
  }

  return (
    <div className="k-flex k-aic k-fdc k-mt32 k-mb32 comments-container">
      <div className="k-mb32">Comments</div>

      <div className="comment-section k-flex k-gap8">
        <div class="image-container">
          <Image Src="/assets/images/logo512.png" Height="50px" Width="50px" Alt="user image"/>
        </div>
        <div className="flex1">
          <Input value={value} onChange={handleChange}/>
          <span className="post-btn" onClick={handleSubmit}>Comment</span>
        </div>
      </div>

      <div>
        {
          comments.map((comment) => ( 
            <div className="">
              <CommentContainer comment={comment} handleReply={handleReply}/>
              { comment.reply && <div className="comment-reply__container">
                {comment.reply.map((reply) => <CommentContainer comment={reply} handleReply={handleReply} />)}</div>}
            </div>
          ))
        }
      </div>
    </div>
  );
}


const CommentContainer = ({ comment, handleReply }) => {
  return (
    <div className="commnet-container k-flex k-gap8 k-mt16 k-mb16">
      <Image Src="/assets/images/logo512.png" Height="50px" Width="50px" Alt="user image"/>
      <div>
        <div className="k-flex k-gap8">
          <div>{comment.user_name}</div>
          <div>{comment.comment_time}</div>
        </div>
        <div>{comment.comment}</div>
        <div onClick={() => handleReply(comment)}>Reply</div>
      </div>
    </div>
  )
}

export default App;
