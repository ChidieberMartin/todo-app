import React from 'react';
import './Comment.css'

function Comment({ commentText, setCommentText, submitComment, closeCommentModal }) {
  return (
    <div className="comment-modal">
      <div className="modal-content">
        <h3>Write a Comment</h3>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Enter your comment..."
        ></textarea>
        <button onClick={submitComment}>Submit</button>
        <button onClick={closeCommentModal}>Close</button>
      </div>
    </div>
  );
}

export default Comment;
