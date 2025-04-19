import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { FaCommentAlt } from 'react-icons/fa';
import { deleteComment } from '../../utils/HandleTodo';
import '../../App.css'
import '../../index.css';
import './Todo.css'

function Todo({ key, text, comments = [], updateMode, deleteTodo, openCommentModal, todoId, setTodos, userId }) {
  return (
    <div className="todo" key={key}>
      <p className="text">{text}</p>
      <div className="todo-icons">
        <BiEdit className="todo-icon" onClick={updateMode} />
        <AiFillDelete className="todo-icon" onClick={deleteTodo} />
        {comments.length < 10 && <FaCommentAlt className="comment-icon" onClick={openCommentModal} />}
      </div>

      {/* ✅ Display comments with conditional delete button */}
      <div className="comments">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <p className="comment-text">🗨️ {comment.text}</p>

            {/* ✅ Show delete button only if the logged-in user is the comment owner */}
            {comment.userId === userId && (
              <AiFillDelete
                className="comment-delete"
                onClick={() => deleteComment(todoId, comment._id, setTodos)}
              />
            )}
          </div>
        ))}
      </div>

      {comments.length >= 10 && <p className="max-comment-warning">⚠️ Maximum 10 comments reached!</p>}
    </div>
  );
}


export default Todo;
