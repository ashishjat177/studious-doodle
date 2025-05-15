import { useState } from "react";
import ReplyComment from "./ReplyComment";

const CommentBox = ({comment, allComments, onDeleteComment, handleOnReplySubmit}) => {
    const [showReply , setShowReplyInput] = useState(false);

    const handleReplyClick = (value) => {
      setShowReplyInput(!showReply);
    }

    const {id, label, parentId} = comment;
    return (
        <div key={id}> 
            <div className="comment-box">
                <span> {label} </span>
                <span>
                    <button onClick={handleReplyClick} className="reply-btn">reply</button> 
                    <button onClick={() => onDeleteComment(id,parentId)} className="delete-btn">delete</button>
                </span>
            </div>
            {showReply && <ReplyComment setShowReplyInput={setShowReplyInput} handleOnReplySubmit={(value) => handleOnReplySubmit(value, id)}/>}

            <div className="nested-comments">
                {comment?.children?.length > 0 && (
                    comment.children.map((childId) => (
                    <CommentBox key={childId} comment={allComments[childId]} allComments={allComments} onDeleteComment={onDeleteComment} handleOnReplySubmit={handleOnReplySubmit}/>
                    ))
                )}
            </div>

        </div>
    )
}

export default CommentBox;